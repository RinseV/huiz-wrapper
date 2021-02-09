import { Huiz, Headers, Query } from "../huiz";
import { HouseModel } from "./houseModels";

export class House {
    constructor(private readonly huiz: Huiz) {}

    async getHouse(houseId: number, headers?: Headers, query?: Query): Promise<HouseModel> {
        return await this.huiz.get(`houses/${houseId}`, headers, query);
    }

    async getHouses(headers?: Headers, query?: Query): Promise<HouseModel[]> {
        return await this.huiz.get(`houses`, headers, query);
    }
}
