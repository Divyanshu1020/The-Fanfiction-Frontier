import { useState } from "react";
import Comment from "./card/Comment";
import { Comment_Response } from "@/appwrite/appwrite_types";


const CommentList = ( {comments}:{comments: Comment_Response[]}) => {
  const [openTextediter, setOpenTextediter] = useState(null as string | null);
  console.log(comments);

  return (
    <div>
      {comments && comments?.length > 0 && comments.map((replay, i) => (
        <Comment
          key={replay.$id || i+'topComment'}
          comment = {replay}
          id={replay.$id}
          openTextediter={openTextediter}
          setOpenTextediter={setOpenTextediter}
        >
        </Comment>
      ))}
    </div>
  );
};

export default CommentList;
