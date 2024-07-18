/* eslint-disable no-useless-catch */
import { Client, ID, Storage } from 'appwrite'
import config from '@/config/env.config'
export class Bucket {
    client = new Client();
    bucket : Storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async upload(file: File) {
        try {
            const response = await this.bucket.createFile(
                config.appwriteBucketId, 
                ID.unique(), 
                file
            );
            return response
        } catch (error) {
            console.log("Appwrite service error :: upload", error);
            throw error
        }
    }

    async delete(fileID: string) {
        try {
            const response = await this.bucket.deleteFile(
                config.appwriteBucketId, 
                fileID
            );
            return response
        } catch (error) {
            console.log("Appwrite service error :: delete", error);
            throw error
        }
    }

    async getFilePreview(fileID: string) {
        try {
            const response = await this.bucket.getFilePreview(
                config.appwriteBucketId, 
                fileID
            );
            return response
        } catch (error) {
            console.log("Appwrite service error :: getFilePreview", error);
            throw error
        }
    }
}

const bucket = new Bucket()

export default bucket