import { Huiz, Headers, Query } from "../huiz";
import { RecipeCommentModel, RecipeIngredientModel, RecipeModel, RecipeStepModel } from "./recipeModels";

export class Recipe {
    constructor(private readonly huiz: Huiz) {}

    async getRecipesFromHouse(houseId: number, headers?: Headers, query?: Query): Promise<RecipeModel[]> {
        return await this.huiz.get(`houses/${houseId}/recipes`, headers, query);
    }

    async getRecipeFromId(recipeId: number, headers?: Headers, query?: Query): Promise<RecipeModel> {
        return await this.huiz.get(`recipes/${recipeId}`, headers, query);
    }

    async getIngredientsFromRecipe(recipeId: number, headers?: Headers, query?: Query): Promise<RecipeIngredientModel[]> {
        return await this.huiz.get(`recipes/${recipeId}/ingredients`, headers, query);
    }

    async getStepsFromRecipe(recipeId: number, headers?: Headers, query?: Query): Promise<RecipeStepModel[]> {
        return await this.huiz.get(`recipes/${recipeId}/steps`, headers, query);
    }

    async getCommentsFromRecipe(recipeId: number, headers?: Headers, query?: Query): Promise<RecipeCommentModel[]> {
        return await this.huiz.get(`recipes/${recipeId}/comments`, headers, query);
    }
}
