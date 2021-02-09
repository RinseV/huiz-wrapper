export interface UserModel {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    profile_picture_url: string;
    iri: string;
}

export interface UserMemberModel {
    id: string;
    user?: UserModel;
    display_name: string;
    iri: string;
    house: number;
}
