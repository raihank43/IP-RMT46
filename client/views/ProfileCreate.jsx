import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProfile } from "../src/features/Profile/ProfileSlice";

export default function ProfileCreate() {
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleOnUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("name", "test");
    formData.append("bio", bio);
    formData.append("fullName", fullName);
    dispatch(createProfile(nav, formData));
  };

  return (
    <>
      <div className="page-container">
        <div className="empty-div"></div>
        <div className="login-outer-container">
          <div className="login-container">
            <div className="login-header">
              <h1>Silahkan Setup Profile mu terlebih dahulu.</h1>
              <p></p>
            </div>
            <div className="login-body">
              <form action="">
                {/* <label for="">Email</label> */}
                <input
                  type="text"
                  required=""
                  name="fullName"
                  value={fullName}
                  placeholder="Enter your name..."
                  onChange={(event) => setFullName(event.target.value)}
                  //   onChange={(event) => setEmail(event.target.value)}
                />
                {/* <label for="">Password</label> */}
                <input
                  type="text"
                  required=""
                  name="bio"
                  value={bio}
                  placeholder="describe a little bit about yourself..."
                  onChange={(event) => setBio(event.target.value)}
                />

                <input
                  type="file"
                  className="form-control pb-2"
                  id="inputGroupFile02"
                  autoComplete="off"
                  required=""
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <div className="login-button">
                  <button type="submit" onClick={handleOnUpload}>
                    SAVE
                  </button>
                </div>
              </form>
            </div>
            <div className="login-footer">
              {/* <div className="OR">- OR -</div> */}
              <p>{/* Belum punya akun? Silahkan <a href="">Register.</a> */}</p>
            </div>
          </div>
        </div>
        <div className="empty-div"></div>
      </div>
    </>
  );
}
