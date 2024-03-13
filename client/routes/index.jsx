import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";

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
    element: <h1> Hello from router</h1>,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
  },
]);

export default router;
