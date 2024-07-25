import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name = "content",
  control,
  defaultValue = "",
}) {
  return (
    <div className=" w-full">
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey="joz8vwz9y9fqygz5v2d3pfm46g2b804q1asm2e48pttk2quh"
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: '../index.css'
                
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
