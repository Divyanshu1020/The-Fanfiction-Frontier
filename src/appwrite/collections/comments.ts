import config from "@/config/env.config";
import { Models, Query } from "appwrite";
import { Comment_Data, Comment_Response } from "../appwrite_types";
import { Database } from "../database";

class Comment {
  private collectionId = config.appwriteCommentCollectionId;
  private database = new Database();

  async createLevelOneComment(data: Comment_Data, uniqueId?: string) {
    try {
      const response = await this.database.createDocument(
        this.collectionId,
        uniqueId,
        data
      );
      return response as Comment_Response;
    } catch (error) {
      console.log("Appwrite service error :: createComment", error);
    }
  }

  async createLevelTwoComment(data: Comment_Data, uniqueId?: string) {
    try {
      const response = await this.database.createDocument(
        this.collectionId,  
        uniqueId,
        data
      );
  
      if (!response) {
        throw new Error("Failed to create comment");
      }
  
      const commentId = data.parentId || "";
      const getComment = await this.database.getOneDocument(this.collectionId, commentId) as Comment_Response;
  
      if (!getComment) {
        await this.database.deleteDocument(this.collectionId, response.$id);
        throw new Error("Failed to fetch parent comment");
      }
  
      const updatedComment = await this.database.updateDocument(this.collectionId, commentId, { 
        commentsCount: getComment.commentsCount + 1 
      });
  
      if (!updatedComment) {

        await this.database.deleteDocument(this.collectionId, response.$id);
        throw new Error("Failed to update parent comment");
      }
  
      return response as Comment_Response
  
    } catch (error) {
      console.log("Appwrite service error :: createComment", error);
      throw error;
    }
  }
  

  async getLevelOneComments(postId: string) {
    try {
      const response = await this.database.getAllDocuments(this.collectionId, [
        Query.equal("postId", postId),
        Query.isNull("parentId"), // Fetch only top-level comments
        Query.orderDesc("$createdAt"),
      ]);
      return response?.documents as Comment_Response[];
    } catch (error) {
      console.log("Appwrite service error :: getLevelOneComments", error);
    }
  }

  async getLevelTwoComments(commentId: string) {
    try {
      const response = await this.database.getAllDocuments(this.collectionId, [
        Query.equal("parentId", commentId), 
        Query.orderDesc("$createdAt"),
      ]);
      return response?.documents as Comment_Response[];
    } catch (error) {
      console.log("Appwrite service error :: getLevelOneComments", error);
    }
  }

  async deleteComment(commentId: string) {
    try {
      const response = await this.database.deleteDocument(this.collectionId, commentId);
      return response;
    } catch (error) {
      console.log("Appwrite service error :: deleteComment", error);
    }
  }
}
const comment = new Comment();
export default comment;
