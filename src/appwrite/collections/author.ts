import config from "@/config/env.config";
import { Database } from "../database";

class Author {

    private collectionId = config.appwriteAuthorCollectionId;
    private database = new Database();

    async createAuthor(
        userId: string,
        data: { name: string; bio: string }
    ) {
        try {
            return await this.database.createDocument(
                this.collectionId,
                userId,
                data
            )
        } catch (error) {
            console.log("Appwrite service error :: createAuthor", error);
        }
    }
    

}
const author = new Author();
export default author