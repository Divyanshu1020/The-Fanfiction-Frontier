import {
  Author,
  Comment_Response,
  CreateNewArticallResponse,
} from "@/appwrite/appwrite_types";
import bucket from "@/appwrite/bucket";
import commentDB from "@/appwrite/collections/comments";
// import { addComments } from "@/redux/post.slice";
import { RootState } from "@/redux/store";
import { Models } from "appwrite";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../ui/Avatar";
import Comments from "../ui/Comments";
interface Props {
  postData: (CreateNewArticallResponse & Models.Document) | undefined;
  authorData: Author | undefined;
  scrollToComments: React.MutableRefObject<HTMLInputElement | null>;
  comments: Comment_Response[];
}
export default function ReadPostMain({
  postData,
  authorData,
  scrollToComments,
  comments
}: Props) {
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  // const [newComment, setNewComment] = useState<Comment_Response | undefined>();
  const user = useSelector((state: RootState) => state.auth.userData);
  const userIsLogedIn = useSelector(
    (state: RootState) => state.auth.userStatus
  );
  // console.log("oldComments", oldComments);
  const { register, handleSubmit, setValue } = useForm<{ comment: string }>();

  const [updatedcomments, setUpdatedComments] = useState<Comment_Response[]>(comments);

  // const dispatch = useDispatch();

  // console.log(comments);
  // useEffect(() => {
  //   if (oldComments.length > 0) {
  //     setComments(oldComments);
  //     console.log("we get comments from redux store");
  //   } else {
  //     const getComments = async () => {
  //       console.log("postData", postData?.$id);
  //       await commentDB
  //         .getLevelOneComments(postData?.$id as string)
  //         .then((response) => {
  //           if (response) {
  //             setComments(response);
  //             dispatch(addComments({ Comments: response }));
  //           }
  //         });
  //     };
  //     getComments();
  //   }
  // }, []);
  const onSubmit: SubmitHandler<{ comment: string }> = async (data) => {
    try {
      setSubmitBtnDisabled(true);
      await commentDB
        .createLevelOneComment({
          postId: postData?.$id as string,
          userCommenting: user?.$id as string,
          content: data.comment,
        })
        .then((data) => {
          if (data) {
            setUpdatedComments([data, ...updatedcomments]);
          }
          setSubmitBtnDisabled(false);
          setValue("comment", "");
        });
    } catch (error) {
      console.log("Appwrite service error :: createComment", error);
    }
  };

  return (
    <div className=" flex flex-col ">
      <div className=" bg-white dark:bg-[#171717] rounded-md shadow-[0_0_0_1px_#1717170d]">
        {/* post thumbnail */}
        <div className=" cursor-pointer overflow-hidden rounded-t-md ">
          {postData?.title ? (
            <img
              src={String(
                bucket.getFilePreview(String(postData?.featuredImage))
              )}
              // src="https://cloud.appwrite.io/v1/storage/buckets/6698f44a000cf3a6ffe2/files/66a14ed600399f8b4091/preview?project=6698ee40002445454cd6"
              className=" max-w-full max-h-full  "
              alt=""
            />
          ) : (
            <div className=" w-full h-[30rem] bg-slate-200 "></div>
          )}
        </div>

        {/* post content */}
        <div className=" p-3">
          <div className=" flex flex-row">
            <div className=" flex flex-row gap-2 items-center">
              <Avatar authorName={authorData?.name} size={7} />
              <div className=" cursor-pointer font-normal flex flex-col leading-3 gap-1">
                {authorData ? (
                  <div className=" hover:text-[#0217ff]">
                    {authorData && authorData.name}
                  </div>
                ) : (
                  <div className=" loading-text h-3 w-44"></div>
                )}
                {authorData ? (
                  <div className=" text-xs font-thin">
                    Posted on{" "}
                    {authorData && authorData?.$createdAt?.slice(0, 10)}
                  </div>
                ) : (
                  <div className=" loading-text h-3 w-44"></div>
                )}
              </div>
            </div>
          </div>
          <div className=" h-full px-1 sm:px-10">
            {postData?.title ? (
              <h3 className=" cursor-pointer py-1 mb-2 text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2">
                {postData?.title}
              </h3>
            ) : (
              <div>
                <div className=" loading-text h-5 my-2 sm:h-8 md:h-10 w-full"></div>
                <div className=" loading-text h-5 mb-2 sm:h-8 md:h-10 w-full"></div>
              </div>
            )}
            <div className="RTE flex flex-col gap-2">
              {postData?.title ? (
                parse(String(postData?.content))
              ) : (
                <div className=" min-h-[calc(40vh)] flex flex-col items-center justify-center mb-2 sm:h-8 md:h-10 w-full">
                  {/* <div className=" size-20">(❁´◡`❁)</div> */}
                  <div className="">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* comments */}

        <div ref={scrollToComments} className=" border-t p-1 sm:px-10 sm:py-5 ">
          <section className=" p-3 ">
            <header className=" flex flex-row items-center justify-between mb-6">
              <div className=" flex flex-row items-center">
                <h2 className="  text-xl sm:text-2xl text-slate-800 lg:text-3xl font-bold">
                  Comments
                </h2>
              </div>
            </header>
            <div className=" flex flex-row gap-2 mb-6 ">
              <Avatar authorName={authorData?.name} size={7} />

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
            </div>
            <Comments comments={updatedcomments} />
          </section>
        </div>
      </div>
    </div>
  );
}
