/* eslint-disable no-useless-catch */
import config from "@/config/env.config";
import { Client, Databases, Query } from "appwrite";

interface Data {
  documentID: string;
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userID: string;
}

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
    documentID,
    title,
    content,
    featuredImage,
    status,
    userID,
  }: Data) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentID,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: createDocument", error);
    }
  }

  async updateDocument({
    documentID,
    title,
    content,
    featuredImage,
    status,
  }: Data){
    try {
        await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            documentID,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
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

  async getOneDocument(documentID: string) {
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

  async getAllDocuments() {
    try {
       await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [
          Query.equal("status", "published"),
        ]
      );

      return true
    } catch (error) {
      console.log("Appwrite service error :: getAllDocuments", error);
    }
  }


}

const database = new Database();

export default database;
