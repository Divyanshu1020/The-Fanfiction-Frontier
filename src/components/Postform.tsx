import bucket from "@/appwrite/bucket";
import database from "@/appwrite/database";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Button2 from "@/components/ui/btn/Button2";
import { updatePostData } from "@/redux/post.slice";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";
import Select from "./Select";
import Input from "./ui/input/Input";

type AppwriteFile = Models.File;
interface Post {
  title?: string;
  documentID?: string;
  content?: string;
  status?: string;
  featuredImage?: string;
  $id?: string;
  image?: File;
}
interface Data {
  content: string;
  documentID: string;
  image: File[];
  status: string;
  title: string;
}
export default function Postform({ post }: { post: Post }) {
  const [liveViewData, setLiveViewData] = useState({
    documentID: "",
    $id: "",
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting, isSubmitSuccessful, isValid },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      documentID: post?.documentID || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: [],
    },
  });

  const imageUrl = watch("image");

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const slugTransform = useCallback((value: string | undefined) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return "";
  }, []);

  const submit: SubmitHandler<Data> = async (data) => {
    console.log(data);
    if (post) {
      const file = data.image[0] ? await bucket.upload(data.image[0]) : null;
      if (file) {
        bucket.delete(String(post?.featuredImage));
      }

      const dbpost = await database.updateDocument(String(post.$id), {
        documentID: data.documentID,
        title: data.title,
        content: data.content,
        status: data.status,
        featuredImage: file?.$id || post?.featuredImage || "",
        author: userData?.$id || "",
      });
      if (dbpost) {
        console.log("dbpost after submit", dbpost);
        setLiveViewData({
          documentID: dbpost.documentID,
          $id: dbpost.$id,
        });
        dispatch(updatePostData({ postData: dbpost }));
      }
    } else {
      const file: AppwriteFile | null =
        data.image.length > 0 ? await bucket.upload(data.image[0]) : null;
      if (file) {
        const dbpost = await database.createDocument({
          documentID: data.documentID,
          title: data.title,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          author: userData?.$id || "",
        });
        if (dbpost) {
          console.log("dbpost after submit", dbpost);
          setLiveViewData({
            documentID: dbpost.documentID,
            $id: dbpost.$id,
          });
          dispatch(updatePostData({ postData: dbpost }));
        }
      }
    }
  };

  const liveViewHandle = () => {
    if (post) {
      navigate(`/post/${post.documentID}/${post.$id}`);
    } else {
      navigate(`/post/${liveViewData.documentID}/${liveViewData.$id}`);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("documentID", slugTransform(value.title));
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, slugTransform, watch]);

  return (
    <form
      className=" w-full lg:flex lg:flex-row md:gap-4 p-2 sm:p-4 md:p-5"
      onSubmit={handleSubmit(submit)}
    >
      <div className=" w-full lg:w-2/3   border-2  pt-6  bg-white rounded-lg">
        <Input
          type="text"
          placeholder="Here is your title"
          className=" outline-none  !shadow-none !pl-10 !text-4xl !leading-8 !font-bold"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          type="text"
          className=" outline-none  !shadow-none !pl-10 !font-normal !text-sm "
          {...register("documentID", {
            required: true,
          })}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue("documentID", slugTransform(e.currentTarget.value));
          }}
        />
        <RTE
          control={control}
          name="content"
          defaultValue={getValues("content")}
        />
      </div>
      <div className=" w-full lg:w-1/3 px2 flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-7">
        <div className="w-full mb-4">
          <div className=" flex my-3 flex-row items-center justify-between ">
            <p className="font-bold text-2xl mb-2">Featured Image:</p>
            <div className=" relative font-medium text-xl">
              <button
                disabled={!isSubmitSuccessful}
                onClick={() => {
                  liveViewHandle();
                }}
                className=" py-2 px-8 lg:px10 cursor-pointer hover:shadow-[0_0_0_1px_black] whitespace-nowrap bg-[#3b49df3e] disabled:text-gray-400 disabled:cursor-not-allowed  rounded-md "
              >
                Live
              </button>
              <div className={` absolute top-2 right-4 size-2 rounded-full ${isSubmitSuccessful ? "bg-green-500" : "bg-gray-400"}`}></div>
            </div>
          </div>
          <div className="relative bg-[#f9f9f9]  w-full min-h-52 h-full border  rounded-md flex items-center justify-center overflow-hidden">
            <input
              type="file"
              className="cursor-pointer absolute opacity-0 bg-slate-800 h-52 lg:w-full w-80"
              {...register("image", {
                required: true,
              })}
            />
            {!imageUrl[0] && !post?.featuredImage && (
              <div className="flex flex-col items-center">
                <CiImageOn size={50} />
                <p className="text-sm text-slate-500">Upload Featured Image</p>
              </div>
            )}
            {imageUrl[0] && (
              <img
                className=" lg:w-full h-full w-80 border"
                src={URL.createObjectURL(imageUrl[0])}
                alt="Uploaded"
              />
            )}
            {!imageUrl[0] && post?.featuredImage && (
              <img
                className=" lg:w-full h-full w-80 border"
                src={post.featuredImage}
                alt="Post"
              />
            )}
          </div>
          {/* <p>{errors.image?.message}</p> */}
        </div>

        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", {
            required: true,
          })}
        />
        <button
          className="bg-[#3b49df] disabled:bg-slate-400 text-white sm:text-xl p-2 my-2 sm:p-3 rounded-md w-full"
          disabled={isSubmitting || !isValid || isSubmitSuccessful}
          type="submit"
        >
          {post ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
