/* eslint-disable no-useless-catch */
import { Client, Account, ID } from 'appwrite'
import config from '@/config/env.config'

export class AuthService {
    client = new Client();
    account : Account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async login(email: string, password: string) {
        return await this.account.createEmailPasswordSession(email, password)
    }

    async createUser(email: string, password: string) {
        try {
            const user = await this.account.create(ID.unique(), email, password)
            if(user){
                this.login(email, password)
            }else {
                return user
            }
        } catch (error) {
            console.log("Appwrite service error :: createUser", error);
            throw error
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service error :: logout", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service error :: getCurrentUser", error);
        }

        return null
    }
}

const authService = new AuthService()

export default authService