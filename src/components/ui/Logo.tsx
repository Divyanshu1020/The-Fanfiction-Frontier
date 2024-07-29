import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Logo() {
    const navigate = useNavigate()
    const onClick = () => {
        navigate("/")
    }
  return (
    <div 
        onClick={() => {onClick()}}
        className=" cursor-pointer flex flex-row items-center">
      <div className=" h-9 flex flex-row items-center gap-3">
        <img className=" h-full" src={logo} alt="" />
        <p className=" text-xl font-medium">Write Blog</p>
      </div>
    </div>
  );
}
