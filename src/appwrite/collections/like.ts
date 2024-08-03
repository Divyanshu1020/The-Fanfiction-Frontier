import config from "@/config/env.config";
import { Query } from "appwrite";
import { Database } from "../database";

class Likes {
  private collectionId = config.appwriteLikeCollectionId;
  private articalCollectionId = config.appwriteArticalCollectionId;
  private database = new Database();

  async checkUserLikeThisOrNot(userId: string, content: string) {
    try {
      const response = await this.database.getAllDocuments(this.collectionId, [
        Query.equal("userId", userId),
        Query.equal("content", content),
      ]);

      if (response && response.documents.length > 0) {
        return {
          likeId: response.documents[0].$id,
          isLike: true,
        };
      } else {
        return {
          likeId: "",
          isLike: false,
        };
      }
    } catch (error) {
      console.log("Appwrite service error :: checkUserLikeThisOrNot", error);
    }
  }

  private async createLike(userId: string, content: string, uniqueId?: string) {
    try {
      return await this.database.createDocument(this.collectionId, uniqueId, {
        userId,
        content,
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

  async updateLike(
    userId: string,
    contentId: string,
    userIsLikeOrNot: boolean,
    likeId: string
  ) {
    // userIsLikeOrNot = false
    try {
      if (userIsLikeOrNot) {
        const response = await this.deleteLike(likeId);
        if (response) {
          const response2 = await this.database.getOneDocument(
            this.articalCollectionId,
            contentId
          );

          if (response2) {
            const response = await this.database.updateDocument(
              this.articalCollectionId,
              contentId,
              {
                likes: response2.likes - 1,
              }
            );
            if (response) {
              return {
                likeId: "",
                isLike: false,
              };
            } else {
              throw new Error("Artical not update");
            }
          } else {
            throw new Error("Artical not found");
          }
        }
      } else {
        const responseCreateLike = await this.createLike(userId, contentId);
        if (responseCreateLike) {
            const response2 = await this.database.getOneDocument(
                this.articalCollectionId,
                contentId
              );
    
              if (response2) {
                const response = await this.database.updateDocument(
                  this.articalCollectionId,
                  contentId,
                  {
                    likes: response2.likes + 1,
                  }
                );
                if (response) {
                    return {
                        likeId: responseCreateLike?.$id,
                        isLike: true,
                      };
                } else {
                  throw new Error("Artical not update");
                }
              } else {
                throw new Error("Artical not found");
              }
        }
      }
    } catch (error) {
      console.log("Appwrite service error :: checkUserLikeThisOrNot", error);
    }
  }
}

const like = new Likes();
export default like;
