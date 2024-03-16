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
                  value={userData.username}
                  placeholder="Enter your username"
                  onChange={handleChangeInput}
                />
                <input
                  type="email"
                  required=""
                  name="email"
                  value={userData.email}
                  placeholder="Enter your email"
                  onChange={handleChangeInput}
                />
                {/* <label for="">Password</label> */}
                <input
                  type="password"
                  required=""
                  name="password"
                  value={userData.password}
                  onChange={handleChangeInput}
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
