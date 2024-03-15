import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import DirectMessage from "../views/DirectMessage";
import ProfileCreate from "../views/ProfileCreate";
import Register from "../views/Register";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:username/message",
        element: <DirectMessage />,
      },
      {
        path: "/profile/create",
        element: <ProfileCreate />,
      },
    ],
  },
]);

export default router;
