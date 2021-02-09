import { Huiz, Headers, Query } from "../huiz";
import { UnitModel } from "./unitModels";

export class Unit {
    constructor(private readonly huiz: Huiz) {}

    async getUnitsFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<UnitModel[]> {
        return await this.huiz.get(`houses/${houseId}/units`, headers, query);
    }

    async getUnitFromId(unitId: number, headers?: Headers, query?: Query): Promise<UnitModel> {
        return await this.huiz.get(`units/${unitId}`, headers, query);
    }
}
