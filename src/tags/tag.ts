import { Huiz, Headers, Query } from "../huiz";
import { TagModel } from "./tagModels";

export class Tag {
    constructor(private readonly huiz: Huiz) {}

    async getTagsFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<TagModel[]> {
        return await this.huiz.get(`houses/${houseId}/tags`, headers, query);
    }

    async getTagFromId(tagId: number, headers?: Headers, query?: Query): Promise<TagModel> {
        return await this.huiz.get(`tags/${tagId}`, headers, query);
    }
}
