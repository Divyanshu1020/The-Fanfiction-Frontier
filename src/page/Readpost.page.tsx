import { CreateNewArticallResponse } from "@/appwrite/appwrite_types";
import articals from "@/appwrite/collections/articals";
import ReadPostLift from "@/components/readpost/ReadPost.Lift";
import ReadPostMain from "@/components/readpost/ReadPost.main";
import ReadPostRight from "@/components/readpost/ReadPost.right";
import { updatePostData, userLikeThisPost, makeCommentEmpty } from "@/redux/post.slice";
import { RootState } from "@/redux/store";
import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ReadpostPage() {
  const scrollToComments = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<(CreateNewArticallResponse & Models.Document) | undefined>();
  // console.log(postData);
  const { id, documentID } = useParams();
  // const id = "66a14ed9003535e0bca8";
  //"66a14ed9003535e0bca8"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxPostData = useSelector((state: RootState) => state.post.postData);
  // console.log("reduxPostData",reduxPostData);

  useEffect(() => {
    if (!reduxPostData || reduxPostData.$id !== id) {
      if (id) {
        articals.getOneArtical(id).then((res) => {
          if (res) {
            setPostData(res);
            dispatch(updatePostData({ postData: res }));
            dispatch(makeCommentEmpty());
            dispatch(userLikeThisPost(null));
          }
        });
      } else {
        navigate("/");
      }
    } else {
      // console.log("We have data", reduxPostData.$id);
      setPostData(reduxPostData);
    }
  }, []);

  return (
    <div className=" gap-2 sm:gap-3 md:gap-4 p-1 sm:p-3 md:p-4 lg:p-5 h-full grid grid-cols-1 sm:grid-cols-[4rem_1fr] md:grid-cols-[4rem_7fr_3fr]">
      <ReadPostLift postData={postData} scrollToComments={scrollToComments} />
      <ReadPostMain postData={postData} authorData={postData?.author} scrollToComments={scrollToComments} />
      <ReadPostRight authorData={postData?.author} postId={id} documentID={documentID} />
    </div>
  );
}
