import { UserMemberModel } from "../users/userModels";

export interface AvailabilityModel {
    instance: string;
    user: UserMemberModel;
    availability?: boolean;
    iri: string;
    id: string;
}

export interface ResponsibilityModel {
    instance: string;
    user: UserMemberModel;
    iri: string;
    id: string;
}

export interface EventInstanceModel {
    event: number;
    id: string;
    original_start_date: Date;
    start_date: Date;
    original_end_date: Date;
    end_date: Date;
    description?: string;
    link: Link;
    iri: string;
    availabilities: AvailabilityModel[];
    responsibilities: ResponsibilityModel[];
}

export interface EventModel {
    id: number;
    name: string;
    slug: string;
    participants: UserMemberModel[];
    iri: string;
    house: number;
}

export interface Link {
    web_link: string;
}
