/* eslint-disable no-useless-catch */
import config from "@/config/env.config";
import { Client, Databases, ID } from "appwrite";

export class Database {
  client = new Client();
  databases: Databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createDocument(
    collectionId: string,
    uniqueId = ID.unique(),
    data: object
  ) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        collectionId,
        uniqueId,
        data
      );
    } catch (error) {
      console.log("Appwrite service error :: createDocument", error);
    }
  }

  async getAllDocuments(collectionId: string, query: string[] = []) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        collectionId,
        query
      );
    } catch (error) {
      console.log("Appwrite service error :: getAllDocuments", error);
    }
  }

  async getOneDocument(
    collectionId: string,
    documentId: string,
    query: string[] = []
  ) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        collectionId,
        documentId,
        query
      );
    } catch (error) {
      console.log("Appwrite service error :: getOneDocument", error);
    }
  }

  async deleteDocument(collectionId: string, documentId: string) {
    try {
    return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        collectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite service error :: deleteDocument", error);
    }
  }

  async updateDocument(
    collectionId: string,
    documentId: string,
    dataToUpdate: object
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        collectionId,
        documentId,
        dataToUpdate
      );
    } catch (error) {
      console.log("Appwrite service error :: updateDocument", error);
    }
  }

  // async createDocument({
  //   title,
  //   content,
  //   featuredImage,
  //   status,
  //   author,
  //   documentID,
  // }: Data) {
  //   try {
  //     return await this.databases.createDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteArticalCollectionId,
  //       ID.unique(),
  //       {
  //         title,
  //         content,
  //         featuredImage,
  //         status,
  //         author,
  //         documentID,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: createDocument", error);
  //   }
  // }

  // async updateDocument(
  //   appwriteDocumentID: string,
  //   { title, content, featuredImage, status, documentID }: Data
  // ) {
  //   try {
  //     return await this.databases.updateDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteArticalCollectionId,
  //       appwriteDocumentID,
  //       {
  //         title,
  //         content,
  //         featuredImage,
  //         status,
  //         documentID,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: updateDocument", error);
  //   }
  // }

  // async deleteDocument(documentID: string) {
  //   try {
  //     await this.databases.deleteDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteArticalCollectionId,
  //       documentID
  //     );

  //     return true;
  //   } catch (error) {
  //     console.log("Appwrite service error :: deleteDocument", error);
  //   }
  // }

  // async getOneDocument(documentID: string): Promise<Post | undefined> {
  //   try {
  //     return await this.databases.getDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteArticalCollectionId,
  //       documentID
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: getOneDocument", error);
  //   }
  // }

  // async getAllDocuments(
  //   moreQuery: string[]
  // ): Promise<DocumentList | undefined> {
  //   try {
  //     return await this.databases.listDocuments(
  //       config.appwriteDatabaseId,
  //       config.appwriteArticalCollectionId,
  //       moreQuery
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: getAllDocuments", error);
  //   }
  // }

  // async getAuthor(userId: string): Promise<Author | undefined> {
  //   try {
  //     return await this.databases.getDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteAuthorCollectionId,
  //       userId,
  //       [Query.select(["name", "$createdAt"])]
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: getAuthor", error);
  //   }
  // }
  // async createUserDocument(
  //   documentID: string,
  //   { name, bio }: CreateUserDocument
  // ) {
  //   try {
  //     return await this.databases.createDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteAuthorCollectionId,
  //       documentID,
  //       {
  //         name,
  //         bio,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service error :: createDocument", error);
  //   }
  // }
  // async checkLikedOrNot(userId: string, content: string) {
  //   try {
  //     const response = await this.databases.listDocuments(
  //       config.appwriteDatabaseId,
  //       config.appwriteLikeCollectionId,
  //       [Query.equal("userId", userId), Query.equal("content", content)]
  //     );
  //     if (response.documents.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log("Appwrite service error :: getAllDocuments", error);
  //   }
  // }
}

const database = new Database();

export default database;
