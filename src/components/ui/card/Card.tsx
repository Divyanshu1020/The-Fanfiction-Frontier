import bucket from "@/appwrite/bucket";
import { Link } from "react-router-dom";


export default function Card({
  $id,
  title,
  featuredImage,
  documentID,
}:{
  $id : string,
  title: string,
  featuredImage: string,
  documentID : string

}) {
  return (
    <div className=" bg-white rounded-md shadow-[0_0_0_1px_#1717170d]">
      <Link to={`/post/${documentID}/${$id}`}>
        <div className=" cursor-pointer overflow-hidden rounded-t-md ">
          <img
            // src={bucket.getFilePreview(featuredImage)}
            src="https://cloud.appwrite.io/v1/storage/buckets/6698f44a000cf3a6ffe2/files/66a14ed600399f8b4091/preview?project=6698ee40002445454cd6"
            className=" max-w-full max-h-full  "
            alt=""
          />
        </div>
      </Link>
      <div className=" max-h-[250px] p-3">
        <div className=" flex flex-row">
          <div className=" flex flex-row gap-2 items-center">
            <div
              className=" p-1 cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative "
            >
              <div className="w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full">
                D
              </div>
            </div>
            <div className=" cursor-pointer font-normal flex flex-col leading-3 gap-1">
              <div className=" hover:text-[#0217ff]">namekdslng</div>
              <div className=" text-xs font-thin">tikm ,lmbd l</div>
            </div>
          </div>
        </div>
        <div className=" h-full pl-10">
          <h3 className=" cursor-pointer py-1 mb-2 text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
