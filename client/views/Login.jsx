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
