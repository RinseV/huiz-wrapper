import { Huiz, Headers, Query } from "../huiz";
import { ExpenseModel } from "./expenseModels";
import { parse } from 'date-fns';

export class Expense {
    constructor(private readonly huiz: Huiz) {}

    private convertExpenseResponsesToExpenseModels(res: any): ExpenseModel[] {
        const models: ExpenseModel[] = [];
        res.forEach((expense: any) => {
            models.push(this.convertExpenseResponseToExpenseModel(expense));
        });
        return models;
    }

    private convertExpenseResponseToExpenseModel(res: any): ExpenseModel {
        return {
            ...res,
            date: this.parseDate(res.date)
        }
    }

    private parseDate(stringDate: string): Date {
        return parse(stringDate, "yyyy-MM-dd", new Date());
    }

    async getExpensesFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<ExpenseModel[]> {
        return await this.huiz.get(`houses/${houseId}/expenses`, headers, query);
    }

    async getExpenseFromExpenseId(expenseId: number, headers?: Headers, query?: Query): Promise<ExpenseModel> {
        return this.convertExpenseResponseToExpenseModel(await this.huiz.get(`expenses/${expenseId}`, headers, query));
    }

    async getExpensesFromHouseDescendingDate(houseId: number, headers?: Headers, query?: Query): Promise<ExpenseModel[]> {
        // Return expenses of house in descending date order
        return this.convertExpenseResponsesToExpenseModels(await this.huiz.get(`houses/${houseId}/expenses`, headers, {
            ...query,
            "order[date]": "desc"
        }));
    }

    async getIthExpenseFromHouse(houseId: number, i: number, headers?: Headers, query?: Query): Promise<ExpenseModel> {
        if (i < 0) {
            throw Error("i must be 0 or greater");
        }
        const expense = await this.getExpensesFromHouseDescendingDate(houseId, headers, query);
        return expense[i];
    }
}
