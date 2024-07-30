import authService from "@/appwrite/auth";
import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CreatePost from "../ui/btn/Button1";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/auth.Slice";
import { RootState } from "@/redux/store";
// import { RootState } from "@/redux/store";
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

      <DropdownMenu />
    </div>
  );
}

const DropdownMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const menuRef = useRef(null);
  const userdata = useSelector((state : RootState)=> state.auth.userData)
  // console.log(userdata);

  const logoutHandler = async() => {
    await authService.logout()
    dispatch(logout())
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left p-1 cursor-pointer whitespace-nowrap mr-2 hover:bg-[#3b49df1a]  rounded-full"
      ref={menuRef}
    >
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center dark:bg-[#a3a3a3] bg-slate-200 rounded-full"
        onClick={toggleMenu}
        onMouseEnter={()=>{toggleMenu()}}
        // onMouseLeave={()=>{toggleMenu()}}
      >
        {userdata?.name && userdata.name[0]}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Account settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              License
            </a> */}

            <button
              onClick={()=>{logoutHandler()}}
              
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
