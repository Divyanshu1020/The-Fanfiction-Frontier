import config from "@/config/env.config";
import { Database } from "../database";
import { Query } from "appwrite";

class Likes {
    private collectionId = config.appwriteLikeCollectionId
    private database = new Database()

    async checkUserLikeThisOrNot(userId: string , content: string) {
        try {
            const response = await this.database.getAllDocuments(this.collectionId, [
                Query.equal("userId", userId),
                Query.equal("content", content),
            ]);
            
            if(response && response.documents.length > 0) {
                return true
            }else{
                return false
            }

        } catch (error) {
            console.log("Appwrite service error :: checkUserLikeThisOrNot", error);
        }
    }

    async createLike(userId: string, content: string) {
        try {
            
        } catch (error) {
            console.log("Appwrite service error :: checkUserLikeThisOrNot", error);
        }
    }
}

const like = new Likes();
export default like