import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1> Hello from router</h1>
  },
]);

export default router