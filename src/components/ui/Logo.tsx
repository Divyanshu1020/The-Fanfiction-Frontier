import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Logo() {
    const navigate = useNavigate()
  return (
    <div 
        onClick={() => {navigate("/")}}
        className=" cursor-pointer flex flex-row items-center">
      <div className=" h-9 flex flex-row items-center gap-3">
        <img className=" dark:border dark:border-white rounded-md h-full" src={logo} alt="" /> 
        <p className=" text-xl font-medium">Write Blog</p>
      </div>
    </div>
  );
}
