import App from "@/App";
import Protected from "@/components/AuthLayout";
import AddPostPage from "@/page/Addpost.page";
import EditPostPage from "@/page/EditPost.page";
import EditProfilePage from "@/page/EditProfile.page";
import Homepage from "@/page/Home.page";
import ReadpostPage from "@/page/Readpost.page";
import Signuppage from "@/page/signup.page";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const LoginPage = lazy(() => import("@/page/Login.page"));

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: (
            <Protected authentication={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            </Protected>
          ),
        },
        {
          path: "/signup",
          element: (
            <Protected authentication={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <Signuppage />
              </Suspense>
            </Protected>
          ),
        },
        {
          path: "/add-post",
          element: (
            <Protected authentication={true}>
              <AddPostPage />
            </Protected>
          ),
        },
        {
          path: "/post/:authorName/:documentID/:id",
          element: <ReadpostPage />,
        },
        {
          path: "/edit-profile",
          element : (
            <Protected authentication={true}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditProfilePage/>
              </Suspense>
            </Protected>
          )
        },
        {
          path: "/edit-post/:documentID/:id",
          element: (
            <Protected authentication={true}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditPostPage />
              </Suspense>
            </Protected>
          ),
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
