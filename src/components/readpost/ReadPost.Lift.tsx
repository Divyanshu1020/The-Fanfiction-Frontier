import { CreateNewArticallResponse } from "@/appwrite/appwrite_types";
import { useDebounce } from "@/hooks/debounce";
import { RootState } from "@/redux/store";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineBookmarkAdd, MdOutlineModeComment } from "react-icons/md";
import { useSelector } from "react-redux";
import DbLike from "../../appwrite/collections/like";
import PopUp from "../ui/PopUp";

export default function ReadPostLift({
  postData,
}: {
  postData: (CreateNewArticallResponse & Models.Document) | undefined;
}) {
  const [like, setLike] = useState(false);
  const [userLikrOrNot, setUserLikrOrNot] = useState(false);
  const [userSaveOrNot, setUserSaveOrNot] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dbounceValue = useDebounce(like, 1000);
  const user = useSelector((state: RootState) => state.auth.userData);

  const closePopup = () => {
    setShowPopup(false);
  };

  const actionIconsArray = [
    {
      Icon: AiOutlineLike,
      color: `${like ? "text-red-500" : "text-gray-500" }`,
      text: "Like",
      num: postData?.likes | 0,
      onclick: () => {
        if (user === null) {
          setShowPopup(true);
        } else {
          setLike(!like);
        }
      },
    },
    // {
    //   Icon: MdOutlineModeComment,
    //   color: "text-blue-500",
    //   size: 30,
    //   text: "Comment",
    //   num: postData?.comments | 0,
    //   onclick: () => {
    //     if (user === null) {
    //       setShowPopup(true);
    //     } else {
    //     }
    //   },
    // },
    {
      Icon: MdOutlineBookmarkAdd,
      color: `${userSaveOrNot ? "text-blue-500" : "text-gray-500" }`,
      text: "Share",
      num: postData?.saves | 0,
      onclick: () => {
        if (user === null) {
          setShowPopup(true);
        } else {
        }
      },
    },
  ];

  useEffect(() => {
    if (user) {
      if (dbounceValue !== userLikrOrNot) {
        console.log("call Api");
      }
    }
  }, [dbounceValue, user, userLikrOrNot]);

  useEffect(() => {
    if (user && postData) {
      // DbLike.checkUserLikeThisOrNot(user.$id, postData?.$id).then((data) => {
      //   if (typeof data !== "undefined") {
      //     setUserLikrOrNot(data);
      //     setLike(data);
      //   }
      // }
    
      console.log("call Api");
    }
      
  }, [postData, user]);

  return (
    <>
    <aside className="  fixed sm:relative w-full bottom-0 left-0 ">
      <div className=" bg-white sm:bg-transparent sm:gap-6 md:gap-10 justify-between px-7 border-t-2 sm:border-0 border-gray-400 sticky top-32 flex flex-raw sm:flex-col  items-center h-20 w-full  ">
        {actionIconsArray.map(({ Icon, onclick, color, num }, index) => (
          <div
            key={index}
            className={` cursor-pointer max-w-11 flex flex-col items-center justify-center ${color} `}
          >
            <Icon
              onClick={onclick}
              className={` h-10 w-10 sm:h-7 sm:w-7 lg:h-9 lg:w-9  `}
            />
            <div className=" max-w-11 text-wrap ">
              <p className={` line-clamp-1 text-ellipsis  `}>{num}</p>
            </div>
          </div>
        ))}
      </div>
    { showPopup && <PopUp closePopup={closePopup}/>}
    </aside>
    </>
  );
}
