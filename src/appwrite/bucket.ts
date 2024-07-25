/* eslint-disable no-useless-catch */
import config from "@/config/env.config";
import { Client, ID, Storage } from "appwrite";
export class Bucket {
  client = new Client();
  bucket: Storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  upload(file: File) {
    try {
      const response = this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log("Appwrite service error :: upload", error);
      throw error;
    }
  }

  async delete(fileID: string) {
    try {
      const response = await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileID
      );
      return response;
    } catch (error) {
      console.log("Appwrite service error :: delete", error);
      throw error;
    }
  }

   getFilePreview(fileID: string) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileID);
  }
}

const bucket = new Bucket();

export default bucket;
