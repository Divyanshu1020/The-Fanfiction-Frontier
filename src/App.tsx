import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import authService from "./appwrite/auth";
import Navbar from "./components/navbar/Navbar";
import { login, logout } from "./redux/auth.Slice";
import { Models } from "appwrite";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData : Models.User<Models.Preferences> | null) => {
  //     if(userData){
  //       dispatch(login({userData}))
  //     }else{
  //       dispatch(logout())
  //     }
  //   })
  //   .finally(() => setIsLoading(false))
  // }, [dispatch])

  return (
    <div className="App">
      {isLoading ? (
        <main>Loading...</main>
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
