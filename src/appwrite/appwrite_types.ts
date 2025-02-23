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

export interface Comment_Data {
    postId: string;
    content: string;
    userCommenting:string;
    userCommentedOn?:string;
    parentId?: string;
    // commentsCount?: number;
    // likesCount?: number;
}

export interface Comment_Response extends Models.Document {
    postId: string;
    userId: string;
    content: string;
    userCommenting:Author;
    userCommentedOn:Author | null;
    parentId: string | null;
    commentsCount: number;
    likesCount: number;
    replies?: Comment_Response[];
    userLikeThisComment? : boolean
}