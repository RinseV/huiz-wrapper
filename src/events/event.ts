import { Huiz, Headers, Query } from "../huiz";
import { format, parse } from "date-fns";
import { AvailabilityModel, EventInstanceModel, EventModel, ResponsibilityModel } from "./eventModels";
import { UserMemberModel } from "../users/userModels";

export class Event {
    constructor(private readonly huiz: Huiz) {}

    private convertEventInstanceResponseToModel(res: any): EventInstanceModel {
        return {
            ...res,
            original_start_date: this.parseDate(res.original_start_date),
            start_date: this.parseDate(res.start_date),
            original_end_date: this.parseDate(res.original_end_date),
            end_date: this.parseDate(res.end_date),
        };
    }

    private parseDate(stringDate: string): Date {
        return parse(stringDate, "yyyy-MM-dd", new Date());
    }

    async getEventsFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<EventModel[]> {
        return await this.huiz.get(`houses/${houseId}/events`, headers, query);
    }

    async getEventFromId(eventId: number, headers?: Headers, query?: Query): Promise<EventModel> {
        return await this.huiz.get(`events/${eventId}`, headers, query);
    }

    async getEventParticipantsFromId(eventId: number, headers?: Headers, query?: Query): Promise<UserMemberModel[]> {
        return await this.huiz.get(`events/${eventId}/participants`, headers, query);
    }

    async getEventInstanceFromEventId(eventId: number, headers?: Headers, query?: Query): Promise<EventInstanceModel[]> {
        return await this.huiz.get(`events/${eventId}/instances`, headers, query);
    }

    async getOnlyEventInstanceFromEventInstanceId(eventInstanceId: string, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        return await this.huiz.get(`event-instances/${eventInstanceId}`, headers, query);
    }

    async getEventAvailabilityFromEventInstanceId(eventInstanceId: string, headers?: Headers, query?: Query): Promise<AvailabilityModel[]> {
        return await this.huiz.get(`event-instances/${eventInstanceId}/availabilities`, headers, query);
    }

    async getEventResponsibilityFromEventInstanceId(eventInstanceId: string, headers?: Headers, query?: Query): Promise<ResponsibilityModel[]> {
        return await this.huiz.get(`event-instances/${eventInstanceId}/responsibilities`, headers, query);
    }

    async getEventInstanceFromEventInstanceId(eventInstanceId: string, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        // Get event instance and its responsibility and availability
        const eventInstance = this.convertEventInstanceResponseToModel(await this.getOnlyEventInstanceFromEventInstanceId(eventInstanceId, headers, query));
        const responsibilities = await this.getEventResponsibilityFromEventInstanceId(eventInstanceId, headers, query);
        const availabilities = await this.getEventAvailabilityFromEventInstanceId(eventInstanceId, headers, query);
        // Return combined EventInstanceModel
        return {
            ...eventInstance,
            availabilities: availabilities,
            responsibilities: responsibilities,
        };
    }

    async getEventInstanceOnDateWithEventId(eventId: number, date: Date, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        // Format date
        const formattedDate = format(date, "yyyy-MM-dd");
        // Query for date and select first one
        const eventInstances = await this.getEventInstanceFromEventId(eventId, undefined, {
            "start_date[before]": formattedDate,
            "order[start_date]": "desc",
        });
        return await this.getEventInstanceFromEventInstanceId(eventInstances[0].id, headers, query);
    }

    async getEventInstanceOnDateWithSlug(houseId: number, date: Date, slug: string, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        // Get all events from house to find slug
        const events = await this.getEventsFromHouse(houseId);
        const eventId = events.find((event: any) => event.slug == slug)?.id;
        // Find event instance on date and return
        return await this.getEventInstanceOnDateWithEventId(eventId!, date, headers, query);
    }

    async getTodaysEatEventInstance(houseId: number, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        // Simply query for an eat event with today's date and the slug
        return await this.getEventInstanceOnDateWithSlug(houseId, new Date(), "eten", headers, query);
    }

    async getTodaysChoreEventInstance(houseId: number, headers?: Headers, query?: Query): Promise<EventInstanceModel> {
        // Query for chore event with today's date and slug
        return await this.getEventInstanceOnDateWithSlug(houseId, new Date(), "schoonmaken", headers, query);
    }

    /**
     * Set current user event availability for given event instance ID
     * @param availability Must be true (available), false (unavailable) or null (undecided)
     */
    async setEventAvailabilityWithEventInstanceId(eventInstanceId: string, availability?: boolean, headers?: Headers): Promise<AvailabilityModel> {
        const body = {
            instance: eventInstanceId,
            availability: availability,
        };
        return await this.huiz.post(`set-availability`, JSON.stringify(body), headers);
    }
}
