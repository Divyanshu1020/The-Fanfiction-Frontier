import { Query } from "appwrite";
import { useEffect, useState } from "react";
import database, { Posts } from "../../appwrite/database";
import Card from "../ui/card/Card";
const dameData : Posts = {
  documentID: "task-management-app-with-react-and-firebase-as-a-backend",
  featuredImage: "66a14ed600399f8b4091",
  userId: "669fbd640012c27a6b23",
  title: "Task Management App with React and Firebase as a Backend",
  $id: "5e5ea5c16897e",
  $createdAt: "2022-08-30T10:58:47.000Z",
  likes : 122,
  comments : 123
};
export default function HomePosts() {
  const [posts, setPosts] = useState<Posts[] | undefined>([]);
  console.log(posts);
  // const [posts, setPosts] = useState([dameData]);

  useEffect(() => {
    const query = [
      Query.equal("status", "active"),
      // Query.select([
      //   "documentID",
      //   "title",
      //   "userId",
      //   "featuredImage",
      //   "$id",
      //   "$createdAt",
      //   "likes",
      //   "comments",
      //   "saves",
      //   "author",
      // ]),
    ];
    const getPosts = async () => {
      await database
        .getAllDocuments(query)
        .then((res) => setPosts(res?.documents));
    };
    getPosts()
  }, []);
  return (
    <div className=" flex flex-col gap-4 ">
      <Card {...dameData} />
      {posts && posts.length > 0  && posts.map((post) => <Card key={post.$id} {...post} />)}

      {posts && posts.length === 0 && Array.from({ length: 5 }).map((_, i) => <Card key={i} {...posts}/>)}

    </div>
  );
}
