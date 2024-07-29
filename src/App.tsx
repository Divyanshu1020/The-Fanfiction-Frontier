import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import authService from "./appwrite/auth";
import Navbar from "./components/navbar/Navbar";
import { login, logout } from "./redux/auth.Slice";
import { Models } from "appwrite";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData : Models.User<Models.Preferences> | null) => {
      // console.log("user data getcurrentuser", userData);
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).catch(() => {
      console.log("you are not loged in");
    })
    .finally(() => setIsLoading(false))
  }, [dispatch])

  return (
    <div className="App">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="loading-text"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
