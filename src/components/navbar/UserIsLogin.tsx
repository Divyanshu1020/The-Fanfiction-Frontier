import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CreatePost from "../ui/btn/Button1";
export default function UserIsLogin() {
  return (
    <div className=" h-full flex flex-row items-center">
      <CreatePost title="Create Post" navigateTo="/add-post" />

      <Link
        to="/"
        className="py-1 px-2 cursor-pointer whitespace-nowrap mr-2 hover:bg-[#3b49df1a]  rounded-md relative "
      >
        <IoMdNotificationsOutline size={35} />
        <span className="p-3 absolute top-0 right-1 text-xs bg-red-500 text-white rounded-md w-4 h-4 flex items-center justify-center">
          7
        </span>
      </Link>

      <Link
        to="/n"
        className=" p-1 cursor-pointer whitespace-nowrap mr-2 hover:bg-[#3b49df1a]  rounded-full relative "
      >
        <div className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full">
          D
        </div>
      </Link>
    </div>
  );
}
