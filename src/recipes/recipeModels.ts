import { TagModel } from "../tags/tagModels";
import { UserMemberModel } from "../users/userModels";

export interface RecipeModel {
    id: number;
    created_by: UserMemberModel;
    name: string;
    slug: string;
    preparation_time: number;
    tags: TagModel[];
    iri: string;
    house: number;
}

export interface RecipeIngredientModel {
    iri: string;
}

export interface RecipeStepModel {
    iri: string;
}

export interface RecipeCommentModel {
    id: number;
    created_by: UserMemberModel;
    text: string;
    posted_at: Date;
    iri: string;
}
