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
import { socket } from "../src/socket";
import toastMsgNotif from "../utils/toastMsgNotif";

export default function Home() {
  const [publicMessage, setPublicMessage] = useState("");
  const [sendPubMessage, setSendPubMessage] = useState("");

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

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      // console.log(sendMessage);
      const { data } = await axios({
        url: `/group`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { text: sendPubMessage },
      });
      // fetchDirectMessages();
      socket.emit("sendMessage", `${data.text}`);
      setSendPubMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("broadcastMessage", (newMessage) => {
      // console.log(newMessage, "<<<< ini dari client");
      // setMessage((prevMessages) => [...prevMessages, newMessage]);
      toastMsgNotif(newMessage);
      fetchPublicMessage();
      // console.log(message, "<<<<< ini message")
    });

    // socket.emit("sendMessage", message)

    return () => {
      socket.disconnect();
      socket.off("broadcastMessage");
    };
  }, [publicMessage]);

  useEffect(() => {
    fetchPublicMessage();
  }, []);
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
            <div>
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={sendPubMessage}
                  onChange={(e) => setSendPubMessage(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                  Send
                </button>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
