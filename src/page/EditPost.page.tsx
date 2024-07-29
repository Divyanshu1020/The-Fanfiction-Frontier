import database, { Posts } from "@/appwrite/database";
import Postform from "@/components/Postform";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function EditPostPage() {
  const [postData , setPostData] = useState<Posts | undefined>()
  const [checking, setChecking] = useState(true);
  const [owner, setOwner] = useState(false);
  const { id } = useParams();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const postDataRedux = useSelector((state: RootState) => state.post.postData);
  // console.log(postData);
  useEffect(() => {
    if (postDataRedux) {
      if (postDataRedux.author?.$id === userData?.$id) {
        setPostData(postDataRedux as Posts);
        setOwner(true);
      }
      setChecking(false);
    }else{
      database.getOneDocument(String(id))
        .then((data) => {
          if(data?.author?.$id === userData?.$id){
            setPostData(data as Posts);
            setOwner(true)
          }
          setChecking(false)
        })
    }
  }, [id, postDataRedux, userData?.$id]);
  return !checking ? (
    <div className=" h-full lg:flex flex-row items-center justify-center">
      {owner ? (
        postData && <Postform post={postData} />
      ) : (
        <div className=" h-full flex flex-col items-center justify-center">
          <h1>You are not authorized to edit this post</h1>
        </div>
      )}

      {/* <Postform/> */}
    </div>
  ) : (
    <div className=" w-full h-full flex flex-col items-center justify-center ">
      <div className=" text-2xl">
        <h1>Checking if you are owner or not...</h1>
      </div>
    </div>
  );
}