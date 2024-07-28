import { Post } from "@/appwrite/database";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineBookmarkAdd, MdOutlineModeComment } from "react-icons/md";

export default function ReadPostLift({postData}:{postData: Post | undefined;}) {

  const actionIconsArray = [
    {
      Icon: AiOutlineLike,
      color: "hover:text-red-500",
      text: "Like",
      num: postData?.likes | 0,
      onclick: () => {
        console.log("like");
      },
    },
    {
      Icon: MdOutlineModeComment,
      color: "hover:text-blue-500",
      size:30,
      text: "Comment",
      num: postData?.comments | 0,
      onclick: () => {
        console.log("comment");
      },
    },
    {
      Icon: MdOutlineBookmarkAdd,
      color: "hover:text-gray-500",
      text: "Share",
      num: postData?.saves | 0,
      onclick: () => {
        console.log("share");
      },
    },
  ];
  return (
    <aside className="  fixed sm:relative w-full bottom-0 left-0 ">
      <div className=" bg-white sm:bg-transparent sm:gap-6 md:gap-10 justify-between px-7 border-t-2 sm:border-0 border-gray-400 sticky top-32 flex flex-raw sm:flex-col  items-center h-20 w-full  ">
        {actionIconsArray.map(({ Icon, onclick, color,num}, index) => (
          <div key={index} className=" max-w-11 flex flex-col items-center justify-center">
            <Icon 
              onClick={onclick} 
              className={` h-10 w-10 sm:h-7 sm:w-7 cursor-pointer ${color}`}
            />
            <div className=" max-w-11 text-wrap ">
              <p className=" line-clamp-1">{num}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
