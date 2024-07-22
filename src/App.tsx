import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/auth.Slice";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if(userData){
  //       dispatch(login(userData))
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
          <Navbar/>
          <main>
            <h1 className="text-3xl from-neutral-600 font-bold underline">
            
            </h1>
            
          </main>
        </>
      )}
    </div>
  );
}

export default App;
