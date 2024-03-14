import { useEffect, useState } from "react";
import "../src/home.css";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../src/components/Logout";

export default function Home() {
  const [profile, setProfile] = useState("");
  const nav = useNavigate();

  const fetchProfiles = async () => {
    try {
      const { data } = await axios({
        url: "/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <>
      <div className="homepage-container">
        <div className="profile-tabs">
          {profile
            ? profile.map((el) => {
                return (
                  <div className="peoples">
                    <img src={el.profileImgUrl} alt="" />
                    <div className="people-info">
                      <p className="people-name">{el.fullName}</p>
                      <p className="people-bio">{el.bio}</p>

                      <Link to={`/${el.username}/message`}>Send Message</Link>
                    </div>
                  </div>
                );
              })
            : []}
          <LogoutButton />
        </div>

        <div className="chat-body">
          <div className="chat-container">
            <div className="chat-container-header">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                alt=""
              />
              <div className="chat-container-message-body"></div>
              <h2>MyName</h2>
            </div>

            <p>Hello</p>
          </div>

          <div className="message-form">
            <form action="">
              <textarea name="" id=""></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
