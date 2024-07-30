import { Author } from "@/appwrite/database";
// import { useState } from "react";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopPost from "../TopPost";

interface Porps {
  authorData: Author | undefined;
  postId: string | undefined;
  documentID: string | undefined;
}
export default function ReadPostRight({ authorData, postId, documentID }: Porps) {
  const [owner, setOwner] = useState(false);
  const currentUserID = useSelector(
    (state: RootState) => state.auth.userData?.$id
  );
  useEffect(() => {
    if (authorData?.$id === currentUserID) {
      setOwner(true);
    }
  }, [authorData, currentUserID]);
  return (
    <aside className=" relative  hidden md:block borde cursor-pointer">
      <div className=" w-full h-full flex flex-col gap-4">
        {/* author about section */}
        <div className="shadow-[0_0_0_1px_#1717170d] flex flex-col gap-4 min-h-9 w-full rounded-lg bg-white dark:bg-[#171717] p-5">
          <div className=" flex flex-row">
            <div className=" flex flex-row gap-2 items-center">
              <div className=" p-1 cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative ">
                {authorData ? (
                  <div className="size-12 flex text-2xl font-samibold items-center justify-center bg-slate-200  dark:bg-[#a3a3a3]  rounded-full">
                    {authorData?.name && authorData.name[0]}
                  </div>
                ) : (
                  <div className=" loading-text size-12 rounded-full"></div>
                )}
              </div>
              <div className=" cursor-pointer font-medium flex flex-col leading-3 gap-1">
                {authorData ? (
                  <h6 className=" font-bold text-2xl line-clamp-2">
                    {authorData && authorData.name}
                  </h6>
                ) : (
                  <div className=" loading-text h-8 max-w-44 w-44"></div>
                )}
              </div>
            </div>
          </div>
          <div className=" h-11 w-full">
            {owner ? (
              <EditProfileBtn authorData={authorData} />
            ) : (
              <FollowBtn authorData={authorData} />
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className=" font-medium">About</p>
            {authorData ? (
              <p className=" font-normal line-clamp-4">
                {authorData && authorData.bio}
              </p>
            ) : (
              <>
                <div className=" loading-text mb-2 h-4 w-full"></div>
                <div className=" loading-text h-4 w-full"></div>
              </>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className=" font-medium uppercase">Joined</p>
            {authorData ? (
              <p className=" font-normal line-clamp-1">
                {authorData && authorData.$createdAt.slice(0, 10)}
              </p>
            ) : (
              <div className=" loading-text h-4 w-20"></div>
            )}
          </div>
        </div>

        {owner ? (
          <div className=" h-14 w-full">
            <EditPostBtn postId={postId} documentID={documentID} />
          </div>
        ) : null}

        {/* author top post */}
        <TopPost
          authorName={authorData?.name}
          title={` Top Posts`}
          topPostsData={[]}
        />
      </div>
    </aside>
  );
}

function FollowBtn({
  authorData,
}: {
  authorData: Author | undefined;
}): JSX.Element {
  return (
    <button
      className={` h-full w-full py-2 bg-[#3b49df] text-white rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-0 disabled:hover:text-white hover:text-[#3b49df] hover:border hover:border-[#3b49df]`}
      disabled={!authorData}
    >
      <p className=" text-xl font-medium">Follow</p>
    </button>
  );
}

function EditProfileBtn({
  authorData,
}: {
  authorData: Author | undefined;
}): JSX.Element {
  const navigate = useNavigate();
  const onclickHandle = () => {
    navigate(`/edit-profile}`);
  };
  return (
    <button
      className={` h-full w-full py-2 bg-[#3b49df] text-white rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-0 disabled:hover:text-white hover:text-[#3b49df] hover:border hover:border-[#3b49df]`}
      disabled={!authorData}
      onClick={() => {
        onclickHandle();
      }}
    >
      <p className=" text-xl font-medium">Edit Profile</p>
    </button>
  );
}
function EditPostBtn({
  postId,
  documentID,
}:{
  postId: string | undefined;
  documentID: string | undefined;
}): JSX.Element {
  const navigate = useNavigate();
  const onclickHandle = () => {
    navigate(`/edit-post/${documentID}/${postId}`);
  };
  return (
    <button
      className={` h-full w-full py-2 bg-[#3b49df] text-white rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-0 disabled:hover:text-white hover:text-[#3b49df] hover:border hover:border-[#3b49df]`}
      // disabled={}

      onClick={() => {
        onclickHandle();
      }}
    >
      <p className=" text-xl font-medium">Update Post</p>
    </button>
  );
}
