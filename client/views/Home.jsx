import { useEffect, useState } from "react";
// import "../src/home.css";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../src/components/Logout";
import Profile from "../src/components/Profile";
import Navbar from "../src/components/Navbars";
import Sidebar from "../src/components/Sidebar";
import IncomingMessage from "../src/components/IncomingMessage";
import OutgoingMessage from "../src/components/OutgoingMessage";

export default function Home() {
  const [publicMessage, setPublicMessage] = useState("");

  const fetchPublicMessage = async () => {
    try {
      const { data } = await axios({
        url: "/group",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPublicMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPublicMessage();
  }, []);

  console.log(publicMessage);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Chat Area */}
        <div className="flex-1">
          {/* Chat Header */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">#public</h1>
          </header>
          {/* Chat Messages */}
          <div className="h-screen max-h-[80vh] overflow-y-auto p-4 pb-36">
            {/* Incoming Message */}
            {publicMessage
              ? publicMessage.map((el, index) => {
                  return el.messageBelongsToLoggedUser == true ? (
                    <OutgoingMessage
                      key={index}
                      profileImgUrl={el.User.Profile.profileImgUrl}
                      fullName={el.User.username}
                      text={el.text}
                      id={el.id}
                      createdAt={el.createdAt}
                    />
                  ) : (
                    <IncomingMessage
                      key={index}
                      profileImgUrl={el.User.Profile.profileImgUrl}
                      fullName={el.User.username}
                      text={el.text}
                      createdAt={el.createdAt}
                    />
                  );
                })
              : []}
          </div>
          {/* Chat Input */}
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4 border-solid">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
