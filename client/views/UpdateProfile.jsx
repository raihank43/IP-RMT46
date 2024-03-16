import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import showToastSuccess from "../utils/toastSucces";
import { useDispatch } from "react-redux";
import { updateProfile } from "../src/features/Profile/ProfileSlice";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const { username } = useParams();

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
    <div className="flex items-center justify-center py-5 px-4">
      <div className="bg-white shadow rounded-lg p-6 w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Update Profil</h2>
        <form onSubmit={handleOnUpload}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Nama:
            <input
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nama Anda"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Bio:
            <textarea
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Bio Anda"
              defaultValue={""}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Gambar Profil:
            <input
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <button className="w-full px-3 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
