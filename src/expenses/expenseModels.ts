import { UserMemberModel } from "../users/userModels";

export interface ExpenseModel {
    id: number;
    house: number;
    created_by: UserMemberModel;
    paid_by: UserMemberModel;
    date: Date;
    amount: number;
    description: string;
    price: PriceModel;
    price_together: PriceModel;
    discount_total: PriceModel;
    iri: string;
}

export interface PriceModel {
    amount: string;
    currency: string;
}

export enum Currency {
    "EUR" = "€",
    "USD" = "$",
    "GBP" = "£"
}
