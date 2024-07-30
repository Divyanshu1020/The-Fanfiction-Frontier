import { Link } from "react-router-dom";

export default function Login({
  title="",
  navigateTo="",
}) {
  return (
    <span className="">
      <Link
        to={navigateTo}
        className="py-2 px-4 cursor-pointer whitespace-nowrap mr-2 hover:bg-[#3b49df1a] dark:hover:bg-[#312e81bf]  rounded-md "
      >
        {title}
      </Link>
    </span>
  );
}
