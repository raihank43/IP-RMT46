import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import showToastSuccess from "../utils/toastSucces";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        url: "/register",
        method: "POST",
        data: { username, email, password },
      });
      showToastSuccess("Register Success! Please Login.")
      nav("/login");
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
              <p>Silahkan Buat Akun</p>
            </div>
            <div className="login-body">
              <form action="" onSubmit={handleRegisterSubmit}>
                {/* <label for="">Email</label> */}
                <input
                  type="text"
                  required=""
                  name="username"
                  value={username}
                  placeholder="Enter your username"
                  onChange={(event) => setUsername(event.target.value)}
                />
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
                  <button type="submit">REGISTER</button>
                </div>
              </form>
            </div>
            <div className="login-footer">
              <p>
                Sudah Punya Akun? Silahkan <Link to={"/login"}>Login.</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}
