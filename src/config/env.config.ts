 const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteArticalCollectionId: String(import.meta.env.VITE_APPWRITE_ATICAL_COLLECTION_ID),
    appwriteAuthorCollectionId: String(import.meta.env.VITE_APPWRITE_Author_COLLECTION_ID),
    appwriteLikeCollectionId : String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID),
    appwriteCommentCollectionId : String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwriteCommentLikesCollectionId : String(import.meta.env.VITE_APPWRITE_COMMENT_LIKES_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    RTE_KEY: String(import.meta.env.VITE_RTE),

}

export default config