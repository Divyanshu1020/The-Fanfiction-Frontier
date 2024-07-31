export default function PopUp({closePopup}:{closePopup:() => void}) {
  return (
    <div className=" z-40 fixed top-0 bottom-0 right-0 left-0  bg-[#ffffff85] flex flex-row items-center justify-center ">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Please Login</h2>
        <p className="mb-4">You need to be logged in to like this post.</p>
        <button 
         onClick={() => closePopup()}
        className="bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
