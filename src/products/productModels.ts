import { UnitModel } from "../units/unitModels";

export interface ProductModel {
    id: number;
    name: string;
    link: string;
    iri: string;
    house: number;
}

export interface VariantModel {
    id: number;
    name: string;
    slug: string;
    quantity?: number;
    unit?: UnitModel;
    link: string;
    iri: string;
}
