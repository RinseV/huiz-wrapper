import { TagModel } from "../tags/tagModels";
import { UserMemberModel } from "../users/userModels";

export interface DocumentModel {
    id: number;
    created_by: UserMemberModel;
    title: string;
    slug: string;
    tags: TagModel[];
    iri: string;
    house: number;
}
