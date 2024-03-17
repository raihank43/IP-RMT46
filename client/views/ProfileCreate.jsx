import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProfile } from "../src/features/Profile/ProfileSlice";

export default function ProfileCreate() {
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleOnUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("name", "test");
    formData.append("bio", bio);
    formData.append("fullName", fullName);
    dispatch(createProfile(nav, formData));
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-800 to-blue-400 animate-gradient-x">
        {/* Profile creation form in the center */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Silahkan Setup Profile mu terlebih dahulu.
          </h1>
          <form action="" onSubmit={handleOnUpload} className="space-y-6">
            <input
              type="text"
              required=""
              name="fullName"
              value={fullName}
              placeholder="Enter your name..."
              onChange={(event) => setFullName(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <input
              type="text"
              required=""
              name="bio"
              value={bio}
              placeholder="Describe a little bit about yourself..."
              onChange={(event) => setBio(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <input
              type="file"
              className="form-control pb-2"
              id="inputGroupFile02"
              autoComplete="off"
              required=""
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
