import database, { Post } from "@/appwrite/database";
import ReadPostLift from "@/components/readpost/ReadPost.Lift";
import ReadPostMain from "@/components/readpost/ReadPost.main";
import { updatePostData } from "@/redux/post.slice";
import { RootState } from "@/redux/store";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ReadpostPage() {
  const [postData, setPostData] = useState<Post | undefined>();
  // const { id } = useParams();
  const id = "66a14ed9003535e0bca8";
  //"66a14ed9003535e0bca8"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxPostData = useSelector((state: RootState) => state.post.postData);

  useEffect(() => {
    if (!reduxPostData || reduxPostData.$id !== id ) {
      if (id) {
        database.getOneDocument("66a14ed9003535e0bca8").then((res) => {
          if (res) {
            setPostData(res);
            dispatch(updatePostData({ postData: res }));
            console.log(res);
          }
        });
      } else {
        navigate("/");
      }
    }else{
      console.log("We have data" ,reduxPostData.$id );
      setPostData(reduxPostData)
    }
  }, [dispatch, id, navigate, reduxPostData]);

  return (
    <div className=" gap-2 sm:gap-3 md:gap-4 p-5 h-full grid grid-cols-1 sm:grid-cols-[4rem_1fr] md:grid-cols-[4rem_7fr_3fr]">
      <ReadPostLift />
      <ReadPostMain />
      <div className=" hidden md:block border   border-emerald-300"></div>
    </div>
  );
}
