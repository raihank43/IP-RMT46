import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerSubmit } from "../src/features/User/RegisterSlice";

export default function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerSubmit(nav, userData));
  };
  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-blue-900">
        {/* Blur background */}
        <div className="absolute inset-0 bg-blue-900 opacity-75 backdrop-blur-md"></div>

        {/* Register form in the center */}
        <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Selamat Datang di{" "}
            <span className="text-2xl pl-2">
              <i className="em em-grinning" />
              <Link to={"/"} className="font-varino">
                Koneksi
                <span className="text-blue-500 text-3xl font-extrabold italic">
                  ON
                </span>
              </Link>
            </span>
          </h1>
          <p className="text-gray-600 mb-8 text-center">Silahkan Buat Akun</p>
          <form action="" onSubmit={handleRegisterSubmit} className="space-y-6">
            <input
              type="text"
              required=""
              name="username"
              value={userData.username}
              placeholder="Enter your username"
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <input
              type="email"
              required=""
              name="email"
              value={userData.email}
              placeholder="Enter your email"
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <input
              type="password"
              required=""
              name="password"
              value={userData.password}
              onChange={handleChangeInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              REGISTER
            </button>
          </form>
          <p className="text-gray-600 mt-8 text-center">
            Sudah Punya Akun? Silahkan{" "}
            <Link to={"/login"} className="text-blue-500 underline">
              Login.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
