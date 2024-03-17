import { useEffect, useState } from "react";
import "../src/login.css";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import showToastSuccess from "../utils/toastSucces";
import { useDispatch } from "react-redux";
import { loginSubmit } from "../src/features/User/LoginSlice";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setloginData({
      ...loginData,
      [key]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginSubmit(loginData, navigate));
  };

  //integration OAuth Login
  const handleCredentialResponse = async ({ credential }) => {
    // console.log("Encoded JWT ID token: " + credential);
    const { data } = await axios.post("/google-login", {
      googleToken: credential,
    });

    // simpan token di localStorage
    localStorage.setItem("token", data.access_token);
    showToastSuccess("Success Login, Welcome to KoneksiON!");
    navigate("/");
  };
  // google OAuth
  useEffect(() => {
    // function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }
    // window.onload = function () {};
    google.accounts.id.initialize({
      client_id:
        "1044060974853-lb9uqphq6g3esqsuf2u0lv2063dgnonh.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-blue-900">
        {/* Blur background */}
        <div className="absolute inset-0 bg-blue-900 opacity-75 backdrop-blur-md"></div>

        {/* Login form in the center */}
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
          <p className="text-gray-600 mb-8 text-center">Silahkan Login</p>
          <form action="" onSubmit={handleLoginSubmit} className="space-y-6">
            <input
              type="email"
              required=""
              name="email"
              value={loginData.email}
              placeholder="Enter your email"
              onChange={handleChangeInput}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <input
              type="password"
              required=""
              name="password"
              value={loginData.password}
              onChange={handleChangeInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              LOGIN
            </button>
          </form>
          <p className="text-gray-600 mt-8 text-center">
            Belum punya akun? Silahkan{" "}
            <Link to={"/register"} className="text-blue-500 underline">
              Buat Akun.
            </Link>
          </p>
          <div className="text-center mt-4 text-gray-500">- OR -</div>
          <div id="buttonDiv" className="mt-4 flex justify-center"></div>
        </div>
      </div>
    </>
  );
}
