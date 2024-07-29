/* eslint-disable no-useless-catch */
import config from "@/config/env.config";
import { Client, Databases, ID, Models, Query } from "appwrite";

interface CreateUserDocument {
  name: string;
  bio: string;
}
interface Data {
  documentID: string;
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  author?: string;
}
export interface Author extends Models.Document {
  name?: string;
  $createdAt: string;
}
export interface Posts extends Models.Document {
  documentID: string;
  title: string;
  featuredImage: string;
  userId: string;
  likes: number;
  comments: number;
  saves: number;
  author?: Author;
}
export interface Post extends Models.Document {
  title?: string;
  content?: string;
  userId?: string;
  documentID?: string;
  featuredImage?: string;
  author?: Author;
}

type DocumentList = Models.DocumentList<Posts>;

export class Database {
  client = new Client();
  databases: Databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createDocument({
    title,
    content,
    featuredImage,
    status,
    author,
    documentID,
  }: Data) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          author,
          documentID,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: createDocument", error);
    }
  }

  async updateDocument(
    appwriteDocumentID: string,
    { title, content, featuredImage, status, documentID }: Data
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        appwriteDocumentID,
        {
          title,
          content,
          featuredImage,
          status,
          documentID,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: updateDocument", error);
    }
  }

  async deleteDocument(documentID: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentID
      );

      return true;
    } catch (error) {
      console.log("Appwrite service error :: deleteDocument", error);
    }
  }

  async getOneDocument(documentID: string): Promise<Post | undefined> {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentID
      );
    } catch (error) {
      console.log("Appwrite service error :: getOneDocument", error);
    }
  }

  async getAllDocuments(
    moreQuery: string[]
  ): Promise<DocumentList | undefined> {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        moreQuery
      );
    } catch (error) {
      console.log("Appwrite service error :: getAllDocuments", error);
    }
  }

  async getAuthor(userId: string): Promise<Author | undefined> {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteAuthorCollectionId,
        userId,
        [Query.select(["name", "$createdAt"])]
      );
    } catch (error) {
      console.log("Appwrite service error :: getAuthor", error);
    }
  }
  async createUserDocument(
    documentID: string,
    {name, bio}: CreateUserDocument) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteAuthorCollectionId,
        documentID,
        {
          name,
          bio
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: createDocument", error);
    }
  }
}

const database = new Database();

export default database;
