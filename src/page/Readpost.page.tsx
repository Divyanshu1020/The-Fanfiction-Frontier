import database, { Author, Post } from "@/appwrite/database";
import ReadPostLift from "@/components/readpost/ReadPost.Lift";
import ReadPostMain from "@/components/readpost/ReadPost.main";
import ReadPostRight from "@/components/readpost/ReadPost.right";
import { updatePostData } from "@/redux/post.slice";
import { RootState } from "@/redux/store";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ReadpostPage() {
  const [postData, setPostData] = useState<Post | undefined>();
  // console.log(postData);
  const { id } = useParams();
  // const id = "66a14ed9003535e0bca8";
  //"66a14ed9003535e0bca8"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxPostData = useSelector((state: RootState) => state.post.postData);
  console.log("reduxPostData",reduxPostData);

  useEffect(() => {
    if (!reduxPostData || reduxPostData.$id !== id) {
      if (id) {
        database.getOneDocument(id).then((res) => {
          if (res) {
            setPostData(res);
            dispatch(updatePostData({ postData: res }));
          }
        });
      } else {
        navigate("/");
      }
    } else {
      // console.log("We have data", reduxPostData.$id);
      setPostData(reduxPostData);
    }
  }, [dispatch, id, navigate, reduxPostData]);

  return (
    <div className=" gap-2 sm:gap-3 md:gap-4 p-5 h-full grid grid-cols-1 sm:grid-cols-[4rem_1fr] md:grid-cols-[4rem_7fr_3fr]">
      <ReadPostLift postData={postData} />
      <ReadPostMain postData={postData} authorData={postData?.author} />
      <ReadPostRight authorData={postData?.author} />
    </div>
  );
}
