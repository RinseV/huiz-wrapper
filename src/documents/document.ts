import { Huiz, Headers, Query } from "../huiz";
import { DocumentModel } from "./documentModels";

export class Document {
    constructor(private readonly huiz: Huiz) {}

    async getDocumentsFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<DocumentModel[]> {
        return await this.huiz.get(`houses/${houseId}/documents`, headers, query);
    }

    async getDocumentFromId(documentId: number, headers?: Headers, query?: Query): Promise<DocumentModel> {
        return await this.huiz.get(`documents/${documentId}`, headers, query);
    }
}
