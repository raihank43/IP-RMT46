import { useEffect, useState } from "react";
import "../src/login.css";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      let { data } = await axios({
        url: "/login",
        method: "POST",
        data: { email, password },
      });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //integration OAuth Login
  const handleCredentialResponse = async ({ credential }) => {
    console.log("Encoded JWT ID token: " + credential);
    const { data } = await axios.post("/google-login", {
      googleToken: credential,
    });

    console.log(data);
    // simpan token di localStorage
    localStorage.setItem("token", data.access_token);
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
                  value={email}
                  placeholder="Enter your email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {/* <label for="">Password</label> */}
                <input
                  type="password"
                  required=""
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
                <div className="login-button">
                  <button type="submit">LOGIN</button>
                </div>
              </form>
            </div>
            <div className="login-footer">
              <div className="OR">- OR -</div>
              <div id="buttonDiv"></div>
              <p>
                Belum punya akun? Silahkan <a href="">Register.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}
