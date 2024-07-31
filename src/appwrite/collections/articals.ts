import config from "@/config/env.config";
import { Models } from "appwrite";
import {
  CreateNewArticall,
  CreateNewArticallResponse,
} from "../appwrite_types";
import { Database } from "../database";

class Articals {
  private collectionId = config.appwriteArticalCollectionId;
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async createNewArticall(
    newAtricalData: CreateNewArticall,
    uniqueId?: string
  ) {
    try {
      const response = await this.database.createDocument(
        this.collectionId,
        uniqueId,
        newAtricalData
      );
      return response as Models.Document & CreateNewArticallResponse;
    } catch (error) {
      console.log("Appwrite service error :: createNewArticall", error);
    }
  }

  async getAllArticals(query?: string[]) {
    try {
      const response = await this.database.getAllDocuments(
        this.collectionId,
        query
      );

      return response as Models.DocumentList<
        CreateNewArticallResponse & Models.Document
      >;
    } catch (error) {
      console.log("Appwrite service error :: getAllArticals", error);
    }
  }

  async deleteArtical(documentID: string) {
    try {
      const response = await this.database.deleteDocument(
        this.collectionId,
        documentID
      );
      return response;
    } catch (error) {
      console.log("Appwrite service error :: deleteArtical", error);

      throw error;
    }
  }

  async getOneArtical(documentID: string, query?: string[]) {
    try {
      const response = await this.database.getOneDocument(
        this.collectionId,
        documentID,
        query
      );
      return response as Models.Document & CreateNewArticallResponse;
    } catch (error) {
      console.log("Appwrite service error :: getOneArtical", error);
    }
  }

  async updateArtical(documentID: string, data: CreateNewArticall) {
    try {
      const response = await this.database.updateDocument(
        this.collectionId,
        documentID,
        data
      );
      return response as Models.Document & CreateNewArticallResponse;
    } catch (error) {
      console.log("Appwrite service error :: updateArtical", error);
    }
  }
}

const database = new Database();
const articals = new Articals(database);
export default articals;
