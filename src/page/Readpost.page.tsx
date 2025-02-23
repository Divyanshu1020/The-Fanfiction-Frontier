import {
  Comment_Response,
  CreateNewArticallResponse,
} from "@/appwrite/appwrite_types";
import articals from "@/appwrite/collections/articals";
import commentDB from "@/appwrite/collections/comments";
import ReadPostLift from "@/components/readpost/ReadPost.Lift";
import ReadPostMain from "@/components/readpost/ReadPost.main";
import ReadPostRight from "@/components/readpost/ReadPost.right";
import {
  addComments,
  updatePostData,
  userLikeThisPost,
} from "@/redux/post.slice";
import { RootState } from "@/redux/store";
import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ReadpostPage() {
  const scrollToComments = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<
    (CreateNewArticallResponse & Models.Document) | undefined
  >();
  const [comments, setComments] = useState<Comment_Response[]>([]);
  const { id, documentID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxPostData = useSelector((state: RootState) => state.post.postData);
  const reduxOldComments = useSelector(
    (state: RootState) => state.post.postReplies
  );


  useEffect(() => {
    if (!reduxPostData || reduxPostData.$id !== id) {
      console.log("we get data from appwrite");
      if (id) {
        articals.getOneArtical(id).then((res) => {
          if (res) {
            setPostData(res);
            dispatch(updatePostData({ postData: res }));
            // dispatch(makeCommentEmpty());
            dispatch(userLikeThisPost(null));
          }

          commentDB
          .getLevelOneComments(res?.$id as string)
          .then((response) => {
            console.log("data from commentDb", response);
            if (response) {
              setComments(response);
              dispatch(addComments({ Comments: response }));
            }
          });
        });
      } else {
        navigate("/");
      }
    } else {
      setPostData(reduxPostData);
      console.log("we get data from redux store: setPostData", reduxPostData);
      setComments(reduxOldComments);
      console.log("we get data from redux store: setComments", reduxOldComments);
    }
  }, []);

  return (
    <div className=" gap-2 sm:gap-3 md:gap-4 p-1 sm:p-3 md:p-4 lg:p-5 h-full grid grid-cols-1 sm:grid-cols-[4rem_1fr] md:grid-cols-[4rem_7fr_3fr]">
      <ReadPostLift postData={postData} scrollToComments={scrollToComments} />
      <ReadPostMain
        postData={postData}
        authorData={postData?.author}
        scrollToComments={scrollToComments}
        comments={comments}
      />
      <ReadPostRight
        authorData={postData?.author}
        postId={id}
        documentID={documentID}
      />
    </div>
  );
}
