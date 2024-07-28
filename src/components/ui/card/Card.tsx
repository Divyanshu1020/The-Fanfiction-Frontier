import bucket from "@/appwrite/bucket";
import  { Posts } from "@/appwrite/database";
// import { useEffect, useState } from "react";
// import { DiVim } from "react-icons/di";
import { Link } from "react-router-dom";


export default function Card({
  $id,
  title,
  featuredImage,
  documentID,
  $createdAt,
  author
}:Posts) {

  return (
    <div className=" bg-white rounded-md shadow-[0_0_0_1px_#1717170d]">
      <Link to={`/post/${author?.name}}/${documentID}/${$id}`}>
        <div className=" cursor-pointer overflow-hidden rounded-t-md ">

          {
            title ? (
              
              <img
                src={String(bucket.getFilePreview(featuredImage))}
                // src="https://cloud.appwrite.io/v1/storage/buckets/6698f44a000cf3a6ffe2/files/66a14ed600399f8b4091/preview?project=6698ee40002445454cd6"
                className=" max-w-full max-h-full  "
                alt=""
              />
            ):(
              <div className=" w-full h-72 bg-slate-200"></div>
            )
          }
        </div>
      </Link>
      <div className=" max-h-[250px] p-3">
        <div className=" flex flex-row">
          <div className=" flex flex-row gap-2 items-center">
            <div
              className=" p-1 cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative "
            >
              {title ? (<div className="w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full">
                {author?.name?.slice(0,1)}
              </div>):(<div className="w-7 h-7 rounded-full  loading-text"></div>)}
            </div>
            <div className="  cursor-pointer font-normal flex flex-col gap-1 leading-3">
                {
                  title ? (<div className=" font-medium hover:text-[#0217ff]">{author?.name}</div>):(<div className=" w-24 h-3 loading-text"></div>)
                }
                {
                  title ? (<div className=" text-xs font-normal text-gray-500">{$createdAt.slice(0,10)}</div>):(<div className=" h-3 loading-text"></div>)
                }



              
              
            </div>
          </div>
        </div>
        <div className=" h-full pl-10">
          { title ? (<h3 className=" cursor-pointer py-1 mb-2 text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2">
            {title}
          </h3>): (
            <>
              <div className="  my-2 loading-text h-6 line-clamp-2 "></div>
              <div className="  my-2 loading-text h-6 line-clamp-2 "></div>
            </>) }
        </div>
      </div>
    </div>
  );
}
