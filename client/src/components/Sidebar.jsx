import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../features/Profile/ProfileSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const profile = useSelector((state) => state.profileData.profileList);

  useEffect(() => {
    dispatch(fetchProfiles(searchTerm));
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Profiles</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {/* Menu Dropdown */}
          <div
            id="menuDropdown"
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
          >
            <ul className="py-2 px-3">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 2
                </a>
              </li>
              {/* Add more menu options here */}
            </ul>
          </div>
        </div>
      </header>
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-xl transition-shadow duration-300">
          <input
            className="rounded-l-full w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="p-2">
          </div>
        </div>
      </div>
      {/* Contact List */}
      <div className="overflow-y-auto max-h-[80vh] h-screen p-3 mb-9 pb-20">
        {profile
          ? profile.map((el, index) => {
              return (
                <Profile
                  key={index}
                  profileImgUrl={el.profileImgUrl}
                  fullName={el.fullName}
                  bio={el.bio}
                  username={el.User.username}
                />
              );
            })
          : []}
      </div>
    </div>
  );
}
