import { Models } from "appwrite";
export interface CreateNewArticall {
    documentID: string;
    title: string;
    content: string;
    featuredImage: string;
    status: string;
    author?: string;
}

export interface CreateNewArticallResponse {
    documentID: string;
    title: string;
    content: string;
    featuredImage: string;
    status: string;
    author: Author;
}

export interface Author extends Models.Document {
    name?: string;
    $createdAt: string;
}