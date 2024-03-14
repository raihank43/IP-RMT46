import { useEffect, useState } from "react";
import "../src/home.css";
import axios from "../utils/axios";
import { Link, useParams } from "react-router-dom";

export default function DirectMessage() {
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const { username } = useParams();

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

  const fetchDirectMessages = async () => {
    try {
      const { data } = await axios({
        url: `/${username}/message`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      console.log(sendMessage);
      await axios({
        url: `/${username}/message`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { text: sendMessage },
      });
      fetchDirectMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    fetchDirectMessages();
  }, [username]);

  // console.log(message)
  return (
    <>
      <div className="homepage-container">
        <div className="profile-tabs">
          {profile
            ? profile.map((el, index) => {
                return (
                  <div className="peoples">
                    <img src={el.profileImgUrl} alt="" />
                    <div className="people-info">
                      <p className="people-name">{el.fullName}</p>
                      <p className="people-bio">{el.bio}</p>
                      <Link to={`/${el.User.username}/message`}>
                        Send Message
                      </Link>
                    </div>
                  </div>
                );
              })
            : []}
        </div>

        <div className="chat-body">
          {message
            ? message.map((el, index) => {
                return (
                  <div className="chat-container">
                    <div className="chat-container-header">
                      <img src={el.Sender.Profile.profileImgUrl} alt="" />
                      <div className="chat-container-message-body"></div>
                      <h2>{el.Sender.username}</h2>
                    </div>

                    <p>{el.text}</p>
                  </div>
                );
              })
            : []}

          <div className="message-form">
            <form action="" onSubmit={handleSendMessage}>
              <textarea
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                name=""
                id=""
              ></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}