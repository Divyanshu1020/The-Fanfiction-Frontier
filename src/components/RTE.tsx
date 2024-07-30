import config from "@/config/env.config";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function RTE({ name = "content", control, defaultValue = "" }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const darkModeListener = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", darkModeListener);

    return () => {
      darkModeMediaQuery.removeEventListener("change", darkModeListener);
    };
  }, []);

  const contentStyle = `
    body {
      background-color: ${isDarkMode ? "#171717" : "#ffffff"};
      color: ${isDarkMode ? "#ffffff" : "#000000"};
    }
    .tox-editor-header{
      background-color: ${isDarkMode ? "#171717" : "#ffffff"}
    }
    a {
      color: ${isDarkMode ? "#4e9aff" : "#0066cc"};
    }
    h1, h2, h3, h4, h5, h6 {
      color: ${isDarkMode ? "#ffffff" : "#000000"};
    }
  `;

  return (
    <div className={`w-full ${isDarkMode ? "dark" : ""}`}>
      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Content is required",
          },
          minLength: {
            value: 20,
            message: "Content must be at least 20 characters",
          },
        }}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={config.RTE_KEY}
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
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              // content_style: contentStyle,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
