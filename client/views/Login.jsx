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
    document.title = "Login - KoneksiON";
    // function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }
    // window.onload = function () {};

    google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google?.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );

    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 animate-gradient-x antialiased">
        {/* Blur background */}
        {/* <div className="absolute inset-0 bg</div>-blue-900 opacity-75 backdrop-blur-md"></div> */}

        {/* Login form in the center */}
        <div className="relative w-full max-w-md  bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-300 hover:ease-in-out hover:duration-500">
          <div className="flex flex-col bg-blue-300 rounded-t-lg p-6">
            <img src="/koneksion.svg" className="h-28"></img>
            <h1 className="text-2xl font-bold text-white text-center">
              Selamat Datang di{" "}
              <span className="text-2xl">
                <i className="em em-grinning" />
                <Link to={"/"} className="font-varino">
                  Koneksi
                  <span className="text-blue-700 text-3xl font-extrabold italic">
                    ON
                  </span>
                </Link>
              </span>
            </h1>
            <p className="text-gray-800  text-center">Silahkan Login</p>
          </div>

          <form
            action=""
            onSubmit={handleLoginSubmit}
            className="space-y-4 p-6 "
          >
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

          <div className=" flex flex-col gap-1 pb-6">
            <p className="text-gray-600 text-center">
              Belum punya akun? Silahkan{" "}
              <Link to={"/register"} className="text-blue-500 underline">
                Buat Akun.
              </Link>
            </p>
            <div className="text-center text-gray-500">- OR -</div>
            <div id="buttonDiv" className=" flex justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
}
