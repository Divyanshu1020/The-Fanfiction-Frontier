import config from "@/config/env.config";
import { Query } from "appwrite";
import { Database } from "../database";

class Comment_Likes {
    private collectionId = config.appwriteCommentLikesCollectionId;
    // private articalCollectionId = config.appwriteArticalCollectionId;
    private database = new Database();

    private async createLike(commentId: string, userId: string, uniqueId?: string) {
        try {
          return await this.database.createDocument(this.collectionId, uniqueId, {
            commentId,
            userId,
          });
        } catch (error) {
          console.log("Appwrite service error :: createLike", error);
        }
    }

    private async deleteLike(likeId: string) {
        try {
          return await this.database.deleteDocument(this.collectionId, likeId);
        } catch (error) {
          console.log("Appwrite service error :: deleteLike", error);
        }
    }

    
}

const comment_Likes = new Comment_Likes();
export default comment_Likes;
