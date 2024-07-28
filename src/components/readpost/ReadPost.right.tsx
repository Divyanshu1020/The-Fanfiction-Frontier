import { Author } from "@/appwrite/database";
// import { useState } from "react";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopPost from "../TopPost";
import { useNavigate } from "react-router-dom";

interface Porps {
  authorData: Author | undefined;
}
export default function ReadPostRight({ authorData }: Porps) {
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
        <div className="shadow-[0_0_0_1px_#1717170d] flex flex-col gap-4 min-h-9 w-full rounded-lg bg-white p-5">
          <div className=" flex flex-row">
            <div className=" flex flex-row gap-2 items-center">
              <div className=" p-1 cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative ">
                {authorData ? (
                  <div className="size-12 flex items-center justify-center bg-slate-200 rounded-full">
                    {authorData?.name && authorData.name[0]}
                  </div>
                ) : (
                  <div className=" loading-text size-12 rounded-full"></div>
                )}
              </div>
              <div className=" cursor-pointer font-medium flex flex-col leading-3 gap-1">
                {authorData ? (
                  <p className=" text-xl hover:text-[#0217ff]">
                    {authorData && authorData.name}
                  </p>
                ) : (
                  <div className=" loading-text h-8 max-w-44 w-44"></div>
                )}
              </div>
            </div>
          </div>
          <div className=" h-11 w-full">
            {owner ? <EditProfileBtn authorData={authorData} /> : <FollowBtn authorData={authorData} />}
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className=" font-medium">About</p>
            {authorData ? (
              <p className=" font-normal line-clamp-4">{authorData && authorData.bio}</p>
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
        <TopPost
          authorName={authorData?.name}
          title={` Top Posts`}
          topPostsData={[]}
        />
      </div>
    </aside>
  );
}

function FollowBtn ({ authorData }: { authorData: Author | undefined }):JSX.Element {
  return (<button
    className={` h-full w-full py-2 bg-[#3b49df] text-white rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-0 disabled:hover:text-white hover:text-[#3b49df] hover:border hover:border-[#3b49df]`}
    disabled={!authorData}
  >
    <p className=" text-xl font-medium">Follow</p>
  </button>);
}

function EditProfileBtn ({ authorData }: { authorData: Author | undefined }):JSX.Element {
  const navigate = useNavigate();
  const onclickHandle = () => {
    navigate(`/edit-profile}`);
  }
  return (<button
    className={` h-full w-full py-2 bg-[#3b49df] text-white rounded-lg hover:bg-transparent disabled:bg-gray-300 disabled:hover:border-0 disabled:hover:text-white hover:text-[#3b49df] hover:border hover:border-[#3b49df]`}
    disabled={!authorData}
    onClick={()=>{onclickHandle()}}
  >
    <p className=" text-xl font-medium">Edit Profile</p>
  </button>);
}
