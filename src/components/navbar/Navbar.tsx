import { RootState } from "@/redux/store";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Logo from "../ui/Logo";
const UserIsLogin = lazy(() => import("./UserIsLogin"));
const UserIsLogout = lazy(() => import("./UserIsLogout"));

export default function Navbar() {
    const userIsLoggedIn = useSelector((state: RootState) => state.auth.userStatus);
  return (
    <nav>
      <div className=" h-full px-4 mx-auto max-w-site-width flex flex-row items-center j">
        <Logo/>
        <div className="ml-auto h-full flex flex-row items-center">
          <div className="flex flex-row items-center h-full">
            {
                userIsLoggedIn ? (
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserIsLogin />
                    </Suspense>
                ):(
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserIsLogout />
                    </Suspense>
                )
            }            
          </div>
        </div>
      </div>
    </nav>
  );
}
