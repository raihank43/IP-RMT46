import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import DirectMessage from "../views/DirectMessage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    path: "/",
    element: <Home />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
  },
  {
    path: "/:username/message",
    element: <DirectMessage />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
  },
]);

export default router;
