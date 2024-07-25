import { Link } from "react-router-dom";

export default function CreateAccount({
  title="",
  navigateTo="/",
}) {
  return (
    <Link
      to={navigateTo}
      className=" w-full py-2 px-4 cursor-pointer mr-2 whitespace-nowrap create-account-btn"
    >
      {title}
    </Link>
  );
}
