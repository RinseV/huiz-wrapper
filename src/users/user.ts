import { Huiz, Headers, Query } from "../huiz";
import { UserModel, UserMemberModel } from "./userModels";

export class User {
    constructor(private readonly huiz: Huiz) {}

    async getUser(userId: string, headers?: Headers, query?: Query): Promise<UserModel> {
        return await this.huiz.get(`users/${userId}`, headers, query);
    }

    async getHouseUsers(houseId: number, headers?: Headers, query?: Query): Promise<UserMemberModel[]> {
        return await this.huiz.get(`houses/${houseId}/users`, headers, query);
    }
}
