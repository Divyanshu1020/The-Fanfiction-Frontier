import { Comment_Response } from "@/appwrite/appwrite_types";
import commentDB from "@/appwrite/collections/comments";
import {
  addComments,
  deleteComment as deleteCommentRedux,
} from "@/redux/post.slice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSolidComment } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { MdDelete, MdFilterList, MdFilterListOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";

interface CommentFielValue {
  comment: string;
}

export default function Comment({
  comment,
  id,
  openTextediter,
  setOpenTextediter,
}: {
  comment: Comment_Response;
  id: string | null;
  openTextediter: string | null;
  setOpenTextediter: (id: string | null) => void;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [levelOneComment, setLeveOneComment] =
    useState<Comment_Response>(comment);
  const dispatch = useDispatch();
  // const [Allreplies, setAllReplies] = useState<Comment_Response[]>(replies);
  const userIsLogedIn = useSelector(
    (state: RootState) => state.auth.userStatus
  );
  const postId = useSelector((state: RootState) => state.post.postData?.$id);
  const userId = useSelector((state: RootState) => state.auth.userData?.$id);

  const { register, handleSubmit, setValue } = useForm<CommentFielValue>();
  const onSubmit: SubmitHandler<CommentFielValue> = async (data) => {
    try {
      setSubmitBtnDisabled(true);
      await commentDB
        .createLevelTwoComment({
          postId: postId as string,
          userCommenting: userId as string,
          userCommentedOn: comment.userCommenting?.$id as string,
          parentId: id as string,
          content: data.comment,
        })
        .then((res) => {
          if (res) {
            console.log("SubmitHandler", res);
            setLeveOneComment((pre) => {
              return {
                ...pre,
                commentsCount: pre.commentsCount + 1,
                replies: pre.replies ? [res, ...pre.replies] : [res],
              };
            });
            dispatch(addComments({ Comments: [res] }));
            setValue("comment", "");
            setSubmitBtnDisabled(false);
            // setShowReplies(true)
            setOpenTextediter(null);
          }
        });
    } catch (error) {
      console.log("Appwrite service error :: createComment", error);
    }
  };

  const getCommentsOnComments = async () => {
    setShowReplies(!showReplies);
    if (showReplies === false) {
      const levelTwoComments = await commentDB.getLevelTwoComments(comment.$id);
      if (levelOneComment) {
        setLeveOneComment((pre) => {
          return {
            ...pre,
            replies: levelTwoComments,
          };
        });
      }
    }
  };
  const deleteComment = async () => {
    // console.log("object");

    if (userId === levelOneComment.userCommenting?.$id) {
      setLeveOneComment(null);
      dispatch(deleteCommentRedux(levelOneComment.$id));
      // console.log("object");
      // console.log("levelOneComment.$id", levelOneComment.$id);
      // console.log("userId", userId);
      await commentDB.deleteComment(levelOneComment.$id)
    }
  };

  const newCommentOnCommentAdd = (comment: Comment_Response) => {
    setLeveOneComment((pre) => {
      return {
        ...pre,
        commentsCount: pre.commentsCount + 1,
        replies: pre.replies ? [comment, ...pre.replies] : [comment],
      };
    });
  }

  return levelOneComment === null ? null : (
    <div className="flex flex-row gap-2 mb-6">
      <Avatar authorName={levelOneComment.userCommenting?.name} size={7} />
      <div className="flex flex-col gap-2 h-full w-full font-normal resize-none">
        <div className="flex flex-col justify-between min-h-[60px] w-full rounded-md border border-input border-gray-100 bg-transparent px-3 py-2 text-sm">
          <div className="flex flow-row items-center gap-2 text-base font-medium text-gray-800">
            <h6>{levelOneComment.userCommenting?.name}</h6>
            <p className="text-xs font-normal text-gray-600">2 days ago</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>{levelOneComment.content}</p>
          </div>
        </div>
        <div className="flex flex-row w-full gap-2 ml-1">
          <button className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer">
            <p>{levelOneComment.likesCount}</p>
            <p>Likes</p>
            <FaHeart size={10} stroke="black" className="mt-0.5" />
          </button>
          <button
            className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer"
            onClick={() => {
              setOpenTextediter(
                openTextediter === levelOneComment.$id
                  ? null
                  : levelOneComment.$id
              );
            }}
          >
            <p>Reply </p>
            <BiSolidComment size={12} className="mt-0.5" />
          </button>
          <button
            disabled={levelOneComment.commentsCount === 0}
            onClick={() => getCommentsOnComments()}
            className="flex flex-row hover:border-slate-400 disabled:text-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer"
          >
            <p>{`All Replay(${levelOneComment.commentsCount})`}</p>
            {levelOneComment.commentsCount > 0 ? (
              <MdFilterList size={12} />
            ) : (
              <MdFilterListOff size={12} />
            )}
          </button>
          {userId === levelOneComment.userCommenting?.$id && (
            <button
              className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer"
              onClick={() => {
                deleteComment();
              }}
            >
              <p>Delete </p>
              <MdDelete size={12} className="mt-0.5" />
            </button>
          )}
        </div>
        <div className="flex flex-row w-full gap-2 ml-1">
          {openTextediter === levelOneComment.$id && (
            <form className=" w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className=" h-full w-full flex flex-col gap-2  font-normal resize-none ">
                <textarea
                  className=" flex min-h-[60px] h-full w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 "
                  id=""
                  cols={30}
                  placeholder="Write a comment..."
                  {...register("comment", { required: true, minLength: 1 })}
                ></textarea>
                <div className="flex flex-row gap-4 items-center">
                  <button
                    disabled={submitBtnDisabled || !userIsLogedIn}
                    className=" disabled:cursor-default cursor-pointer border bg-[#0217ff] text-white text-base py-1 px-3 font-normal rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-gray-300 disabled:border-gray-300 disabled:hover:text-white hover:text-[#0217ff] hover:border hover:border-[#0217ff]  "
                    type="submit"
                  >
                    <p>Submit</p>
                  </button>
                  <button
                    disabled={submitBtnDisabled || !userIsLogedIn}
                    className=" disabled:cursor-default cursor-pointer  text-base py-1 px-3 font-normal rounded-lg disabled:text-gray-300 disabled:hover:bg-transparent hover:bg-gray-100 "
                    type="button"
                    onClick={() => {
                      setValue("comment", "");
                    }}
                  >
                    <p>Dismiss</p>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* All Replies */}

        {showReplies &&
          levelOneComment.replies &&
          levelOneComment.replies.map((reply, i) => {
            return (
              <Replies
                key={reply.id || i + "levelTwoComment"}
                reply={reply}
                openTextediter={openTextediter}
                setOpenTextediter={setOpenTextediter}
                userIsLogedIn={userIsLogedIn}
                userId={userId || ""}
                postId={postId}
                newCommentOnCommentAdd={newCommentOnCommentAdd}
              />
            );
          })}

        {showReplies && !levelOneComment.replies
          ? Array.from({ length: 4 }).map((_, i) => <RepliesSKL key={i} />)
          : null}
      </div>
    </div>
  );
}

const Replies = ({
  reply,
  openTextediter,
  setOpenTextediter,
  userIsLogedIn,
  userId,
  postId,
  newCommentOnCommentAdd
}: {
  reply: Comment_Response;
  openTextediter: string | null;
  setOpenTextediter: (id: string | null) => void;
  userIsLogedIn: boolean;
  userId: string;
  postId: string | undefined
  newCommentOnCommentAdd: (comment: Comment_Response) => void
}) => {
  const [levelTwoComment, setLevetwoComment] = useState<Comment_Response>(reply);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  // const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm<CommentFielValue>();

  const onSubmit: SubmitHandler<CommentFielValue> = async(data) => {
    try {
      setSubmitBtnDisabled(true);
      await commentDB
        .createLevelTwoComment({
          postId: postId as string,
          userCommenting: userId as string,
          userCommentedOn: levelTwoComment.userCommenting?.$id as string,
          parentId: levelTwoComment.parentId as string,
          content: data.comment,
        })
        .then((res) => {
          if (res) {
            console.log("SubmitHandler", res);
            newCommentOnCommentAdd(res);
            // dispatch(addComments({ Comments: [res] }));
            setValue("comment", "");
            setSubmitBtnDisabled(false);
            // setShowReplies(true)
            setOpenTextediter(null);
          }
        });
    } catch (error) {
      console.log("Appwrite service error :: createComment", error);
    }
  };
  const deleteComment = async () => {
    // console.log("object");

    if (userId === levelTwoComment.userCommenting?.$id) {
      // console.log("object");
      // console.log("levelTwoComment.$id", levelTwoComment.$id);
      // console.log("userId", userId);
      // console.log({parentId: String(reply.parentId), commentId: levelTwoComment.$id});
      setLevetwoComment(null);
      await commentDB.deleteComment(levelTwoComment.$id)
      // dispatch(deleteCommentOnComments({parentId: String(reply.parentId), commentId: levelTwoComment.$id}));
    }
  };
  return levelTwoComment === null ? null : (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-2 ">
        <Avatar authorName={levelTwoComment.userCommenting?.name} size={7} />
        <div className="flex flex-col gap-2 h-full w-full font-normal resize-none">
          <div className="flex flex-col justify-between min-h-[60px] w-full rounded-md border border-input border-gray-100 bg-transparent px-3 py-2 text-sm">
            <div className="flex flow-row items-center gap-2 text-base font-medium text-gray-800">
              <h6>{levelTwoComment.userCommenting?.name}</h6>
              <p className="text-xs font-normal text-gray-600">2 days ago</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-semibold">
                  @{levelTwoComment.userCommentedOn?.name}{" "}
                </span>
                {levelTwoComment.content}
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full gap-2 ml-1">
            <button className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer">
              <p>{levelTwoComment.likesCount}</p>
              <p>Likes</p>
              <FaHeart size={10} stroke="black" className="mt-0.5" />
            </button>
            <button
              className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer"
              onClick={() => {
                setOpenTextediter(
                  openTextediter === levelTwoComment.$id
                    ? null
                    : levelTwoComment.$id
                );
              }}
            >
              <p>Reply </p>
              <BiSolidComment size={12} className="mt-0.5" />
            </button>
            {userId === levelTwoComment.userCommenting?.$id && (
              <button
                className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer"
                onClick={() => {
                  deleteComment();
                }}
              >
                <p>Delete </p>
                <MdDelete size={12} className="mt-0.5" />
              </button>
            )}
          </div>
          <div className="flex flex-row w-full gap-2 ml-1">
            {openTextediter === levelTwoComment.$id && (
              <form className=" w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className=" h-full w-full flex flex-col gap-2  font-normal resize-none ">
                  <textarea
                    className=" flex min-h-[60px] h-full w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 "
                    id=""
                    cols={30}
                    placeholder="Write a comment..."
                    {...register("comment", { required: true, minLength: 1 })}
                  ></textarea>
                  <div className="flex flex-row gap-4 items-center">
                    <button
                      disabled={submitBtnDisabled || !userIsLogedIn}
                      className=" disabled:cursor-default cursor-pointer border bg-[#0217ff] text-white text-base py-1 px-3 font-normal rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-gray-300 disabled:border-gray-300 disabled:hover:text-white hover:text-[#0217ff] hover:border hover:border-[#0217ff]  "
                      type="submit"
                    >
                      <p>Submit</p>
                    </button>
                    <button
                      disabled={submitBtnDisabled || !userIsLogedIn}
                      className=" disabled:cursor-default cursor-pointer  text-base py-1 px-3 font-normal rounded-lg disabled:text-gray-300 disabled:hover:bg-transparent hover:bg-gray-100 "
                      type="button"
                      onClick={() => {
                        setValue("comment", "");
                      }}
                    >
                      <p>Dismiss</p>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="flex flex-col w-full"></div>
        </div>
      </div>
    </div>
  );
};

const RepliesSKL = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-2 ">
        <Avatar authorName={""} size={7} />
        <div className="flex flex-col gap-2 h-full w-full font-normal resize-none">
          <div className="flex flex-col justify-between min-h-[60px] w-full rounded-md border border-input border-gray-100 bg-transparent px-3 py-2 text-sm">
            <div className="flex flow-row items-center gap-2 text-base font-medium text-gray-800">
              <div className=" loading-text h-3 w-24"></div>
              <div className=" loading-text h-3 w-8"></div>
            </div>
            <div className="text-sm text-gray-600">
              <div className=" loading-text h-3 w-full mt-1 "></div>
              <div className=" loading-text h-3 w-full mt-1"></div>
              <div className=" loading-text h-3 w-full mt-1"></div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-2 ml-1">
            <div className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer">
              <p>0</p>
              <p>Likes</p>
              <FaHeart size={10} stroke="black" className="mt-0.5" />
            </div>
            <div className="flex flex-row hover:border-slate-400 items-center justify-between gap-1 border rounded-2xl text-xs font-medium text-slate-600 px-2 py-1 cursor-pointer">
              <p>Reply </p>
              <BiSolidComment size={12} className="mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
