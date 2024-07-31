import { Author, CreateNewArticallResponse } from "@/appwrite/appwrite_types";
import bucket from "@/appwrite/bucket";
import { Models } from "appwrite";
import parse from "html-react-parser";
interface Props {
  postData: (CreateNewArticallResponse & Models.Document) | undefined;
  authorData: Author | undefined;
}
export default function ReadPostMain({ postData, authorData }: Props) {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" bg-white dark:bg-[#171717] rounded-md shadow-[0_0_0_1px_#1717170d]">
        <div className=" cursor-pointer overflow-hidden rounded-t-md ">
          {postData?.title ? (<img
            src={String(bucket.getFilePreview(String(postData?.featuredImage)))}
            // src="https://cloud.appwrite.io/v1/storage/buckets/6698f44a000cf3a6ffe2/files/66a14ed600399f8b4091/preview?project=6698ee40002445454cd6"
            className=" max-w-full max-h-full  "
            alt=""
          />):(<div className=" w-full h-[30rem] bg-slate-200 "></div>)}
        </div>

        <div className=" p-3">
          <div className=" flex flex-row">
            <div className=" flex flex-row gap-2 items-center">
              <div className=" p-1 cursor-pointer whitespace-nowrap hover:bg-[#3b49df1a]  rounded-full relative ">
                { authorData ?  (<div className="w-7 h-7 flex items-center justify-center bg-slate-200 rounded-full">
                  {authorData?.name && authorData.name[0]}
                </div>):(
                  <div className=" loading-text w-7 h-7 rounded-full"></div>
                )}
              </div>
              <div className=" cursor-pointer font-normal flex flex-col leading-3 gap-1">
                {authorData ? (<div className=" hover:text-[#0217ff]">
                  {authorData && authorData.name}
                </div>):(
                  <div className=" loading-text h-3 w-44"></div>
                )}
                {authorData ? (<div className=" text-xs font-thin">
                  Posted on {authorData && authorData.$createdAt.slice(0, 10)}
                </div>):(
                  <div className=" loading-text h-3 w-44"></div>
                )}
              </div>
            </div>
          </div>
          <div className=" h-full pl-10">
          { postData?.title ? (<h3 className=" cursor-pointer py-1 mb-2 text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2">
              {postData?.title}
            </h3>):(
              <div>
                <div className=" loading-text h-5 my-2 sm:h-8 md:h-10 w-full"></div>
                <div className=" loading-text h-5 mb-2 sm:h-8 md:h-10 w-full"></div>
              </div>
            )}
            <div className=" flex flex-col gap-2">
              {
                postData?.title ? parse(String(postData?.content)):(

                  <div className=" min-h-[calc(40vh)] flex flex-col items-center justify-center mb-2 sm:h-8 md:h-10 w-full">
                    {/* <div className=" size-20">(❁´◡`❁)</div> */}
                    <div className="">Loading...</div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
