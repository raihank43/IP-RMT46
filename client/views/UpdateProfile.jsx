import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import showToastSuccess from "../utils/toastSucces";
import { useDispatch } from "react-redux";
import { updateProfile } from "../src/features/Profile/ProfileSlice";
import "../src/updateProfile.css";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const { username } = useParams();
  document.title = "Update Profile - KoneksiON";

  const nav = useNavigate();

  const handleOnUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", "test");
    formData.append("bio", bio);
    formData.append("fullName", fullName);

    dispatch(updateProfile(nav, formData, username));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-blue-300 animate-gradient-xy">
      {/* Update profile form in the center with a glassmorphism effect */}
      <div className="w-full max-w-lg p-8 bg-white/80 rounded-xl shadow-xl backdrop-blur-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Update Profil
        </h2>
        <form onSubmit={handleOnUpload} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
              Nama:
              <input
                className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Nama Anda"
                name="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>
            <label className="block text-sm font-bold text-gray-700">
              Bio:
              <textarea
                className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Bio Anda"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </label>
            <label className="block text-sm font-bold text-gray-700">
              Gambar Profil:
              <input
                className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <button className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
