import { Huiz, Headers, Query } from "../huiz";
import { ProductModel, VariantModel } from "./productModels";

export class Product {
    constructor(private readonly huiz: Huiz) {}

    async getProductsFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<ProductModel[]> {
        return this.huiz.get(`houses/${houseId}/products`, headers, query);
    }

    async getProductFromId(productId: number, headers?: Headers, query?: Query): Promise<ProductModel> {
        return this.huiz.get(`products/${productId}`, headers, query);
    }

    async getProductVariantsFromId(productId: number, headers?: Headers, query?: Query): Promise<VariantModel[]> {
        return this.huiz.get(`products/${productId}/variants`, headers, query);
    }
}
