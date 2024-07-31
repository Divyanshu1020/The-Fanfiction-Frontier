import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";
import Card from "../ui/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { newPosts } from "@/redux/posts.Slice";
import articals from "@/appwrite/collections/articals";
import { CreateNewArticallResponse } from "@/appwrite/appwrite_types";
// const dameData : Posts = {
//   documentID: "task-management-app-with-react-and-firebase-as-a-backend",
//   featuredImage: "66a14ed600399f8b4091",
//   userId: "669fbd640012c27a6b23",
//   title: "Task Management App with React and Firebase as a Backend",
//   $id: "5e5ea5c16897e",
//   $createdAt: "2022-08-30T10:58:47.000Z",
//   likes : 122,
//   comments : 123
// };
export default function HomePosts() {
  const [posts, setPosts] = useState<(CreateNewArticallResponse & Models.Document)[] | undefined>();
  const postsInRedux = useSelector((state: RootState) => state.posts.posts)
  const dispatch = useDispatch()
  console.log("postsInRedux" , postsInRedux);
  // console.log(posts);
  // const [posts, setPosts] = useState([dameData]);

  useEffect(() => {
    if(postsInRedux.length > 0){
      setPosts(postsInRedux)
    }else{
      //* First api call
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
        await articals
          .getAllArticals(query)
          .then((res) => {
            console.log(res?.documents);
            const posts = res?.documents as (CreateNewArticallResponse & Models.Document)[] 
            dispatch(newPosts(posts));
            setPosts(posts);
          });
      };
      getPosts()
    }
    
  }, [dispatch, postsInRedux]);
  return (
    <div className=" flex flex-col gap-4 ">
      {/* <Card {...dameData} /> */}
      {posts && posts.length > 0  && posts.map((post) => <Card key={post.$id} {...post} />)}

      {posts && posts.length === 0 && Array.from({ length: 5 }).map((_, i) => <Card key={i} {...posts}/>)}

    </div>
  );
}
