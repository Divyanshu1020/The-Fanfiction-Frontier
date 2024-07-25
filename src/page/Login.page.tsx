import Login from "@/components/login/Login";

export default function LoginPage() {
  return (
    <div className="  p-5 h-full  flex flex-col items-center justify-center">
      <div className=" bg-white w-full  sm:w-1/3  px-10 py-8 md:border border-slate-200 rounded-xl">
        <Login />
      </div>
    </div>
  );
}
