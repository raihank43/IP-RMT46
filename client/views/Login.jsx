import { useEffect, useState } from "react";
import "../src/login.css";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import showToastSuccess from "../utils/toastSucces";
import { useDispatch } from "react-redux";
import { loginSubmit } from "../src/features/DirectMessage/LoginSlice";

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
      <div className="page-container">
        <div className="empty-div"></div>
        <div className="login-outer-container">
          <div className="login-container">
            <div className="login-header">
              <h1>Selamat Datang di KoneksiON</h1>
              <p>Silahkan Login</p>
            </div>
            <div className="login-body">
              <form action="" onSubmit={handleLoginSubmit}>
                {/* <label for="">Email</label> */}
                <input
                  type="email"
                  required=""
                  name="email"
                  value={loginData.email}
                  placeholder="Enter your email"
                  onChange={handleChangeInput}
                />
                {/* <label for="">Password</label> */}
                <input
                  type="password"
                  required=""
                  name="password"
                  value={loginData.password}
                  onChange={handleChangeInput}
                  placeholder="Enter your password"
                />
                <div className="login-button">
                  <button type="submit">LOGIN</button>
                </div>
              </form>
            </div>
            <div className="login-footer">
              <p>
                Belum punya akun? Silahkan{" "}
                <Link to={"/register"}>Buat Akun.</Link>
              </p>
              <div className="OR">- OR -</div>
              <div id="buttonDiv"></div>
            </div>
          </div>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}
