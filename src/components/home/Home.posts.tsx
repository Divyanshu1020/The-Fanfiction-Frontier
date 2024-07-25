import { useEffect, useState } from "react";
import database, { Posts } from "../../appwrite/database";
import Card from "../ui/card/Card";
const dameData  = {
  documentID: "task-management-app-with-react-and-firebase-as-a-backend",
  featuredImage: "66a14ed600399f8b4091",
  title: "Task Management App with React and Firebase as a Backend",
  $id : "5e5ea5c16897e",
  $createdAt : "2022-08-30T10:58:47.000Z",
};
export default function HomePosts() {
  // const [posts, setPosts] = useState<Posts[]>([]);
  // console.log(posts);
  const [posts, setPosts] = useState([dameData]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     await database.getAllDocuments().then((res) => setPosts(res?.documents));
  //   };
  //   getPosts()
  // }, []);
  return (
    <div className=" flex flex-col gap-4 ">
      {
        posts.map((post)=>(
          <Card 
            key={post.$id}
            {...post}
          />
        ))
      }
    </div>
  );
}
