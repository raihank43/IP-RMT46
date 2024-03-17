import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import DropdownMenu from "./DropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedProfile } from "../features/User/CurrentlyLoggedProfile";

export default function Navbar() {
  const dispatch = useDispatch();
  const loggedProfile = useSelector(
    (state) => state.currentlyLoggedProfile.userDataLogin
  );

  useEffect(() => {
    dispatch(fetchLoggedProfile());
  }, []);

  // if (loading) {
  //   return <h1>Loading....</h1>;
  // }

  return (
    <nav className="bg-gray-800 p-2 mt-0 w-full">
      {" "}
      {/* Bagian ini adalah navbar */}
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a
            className="text-white no-underline hover:text-white hover:no-underline"
            href="#"
          >
            👻{" "}
            <span className="text-2xl pl-2">
              <i className="em em-grinning" />
              <Link to={"/"}>KoneksiON</Link>
            </span>
          </a>
        </div>
        <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="#"
              >
                Active
              </a>
            </li>

            <li className="mr-3">
              <a
                className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="#"
              >
                link
              </a>
            </li>
          </ul>

          <DropdownMenu loggedProfile={loggedProfile} />

          <li className="mr-3">
            <LogoutButton />
          </li>
        </div>
      </div>
    </nav>
  );
}
