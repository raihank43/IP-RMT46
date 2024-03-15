import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbars";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
