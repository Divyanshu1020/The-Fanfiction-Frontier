import SignUp from "@/components/signup/SignUp";

export default function Signuppage() {
  return (
    <>
      <div className="p-5 h-full  flex flex-col items-center justify-center">
        <div className=" bg-white w-full  sm:w-1/3  px-10 py-8 md:border border-slate-200 rounded-lg">
          <SignUp />
        </div>
      </div>
    </>
  );
}
