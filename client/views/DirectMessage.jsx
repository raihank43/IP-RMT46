import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useParams } from "react-router-dom";
import { socket } from "../src/socket"; // tambahkan ini di bagian atas file
import toastMsgNotif from "../utils/toastMsgNotif";
import Sidebar from "../src/components/Sidebar";
import IncomingMessage from "../src/components/IncomingMessage";
import OutgoingMessage from "../src/components/OutgoingMessage";
import showToastSuccess from "../utils/toastSucces";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePrivMessageById,
  fetchDirectMessages,
  sendPrivMessage,
  setMessage,
} from "../src/features/DirectMessage/DirectMessageSlice";
import { findProfiles } from "../src/features/Profile/FindUsernameByProfileSlice";
import { fetchLoggedProfile } from "../src/features/User/CurrentlyLoggedProfile";

export default function DirectMessage() {
  // const [, setReceiverUsername] = useState("");
  // const [, setMessage] = useState([]);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.directMessages.allPrivMessage);
  const receiverUsername = useSelector((state) => state.receiver.username);
  const [sendMessage, setSendMessage] = useState("");
  const { username } = useParams();
  const loggedProfile = useSelector(
    (state) => state.currentlyLoggedProfile.userDataLogin
  );

  useEffect(() => {
    fetchLoggedProfile();
  }, []);

  const currentUser = {
    currentUsername: loggedProfile.username,
    currentId: loggedProfile.id,
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    // fetchLoggedProfile();
    // const sender = loggedProfile.Profile.fullName;
    dispatch(sendPrivMessage(username, sendMessage, currentUser));
    setSendMessage("");
  };

  const onDeleteMessage = (id) => {
    dispatch(deletePrivMessageById(id));
  };

  // tambahkan ini di dalam fungsi DirectMessage
  useEffect(() => {
    socket.connect();
    socket.on("broadcastMessage", (newMessage) => {
      // console.log(newMessage, "<<<< ini dari client");
      // setMessage((prevMessages) => [...prevMessages, newMessage]);
      if (currentUser.currentId === newMessage.receiver) {
        toastMsgNotif(newMessage.message);
      }
      dispatch(fetchDirectMessages(username));
      // console.log(message, "<<<<< ini message")
    });

    socket.on("broadcastDelete", (data) => {
      // setMessage(data)
      dispatch(fetchDirectMessages(username));
    });

    // socket.emit("sendMessage", message)

    return () => {
      socket.disconnect();
      socket.off("broadcastMessage");
      socket.off("broadcastDelete");
    };
  }, [message]);

  useEffect(() => {
    dispatch(findProfiles(username));
    dispatch(fetchDirectMessages(username)); //passing username karena butuh username untuk fetchdata
  }, [username]);

  return (
    <>
      <div className="flex h-screen overflow-hidden ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Chat Area */}
        <div className="flex-1 h-100vh">
          {/* Chat Header */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">@{receiverUsername}</h1>
          </header>
          {/* Chat Messages */}
          <div className="h-screen max-h-[80vh] overflow-y-auto p-4 pb-36">
            {message.map((el, index) => {
              return el.messageBelongsToLoggedUser == true ? (
                <OutgoingMessage
                  key={index}
                  profileImgUrl={el.Sender.Profile.profileImgUrl}
                  fullName={el.Sender.username}
                  text={el.text}
                  id={el.id}
                  onDeleteMessage={onDeleteMessage}
                  createdAt={el.createdAt}
                />
              ) : (
                <IncomingMessage
                  key={index}
                  profileImgUrl={el.Sender.Profile.profileImgUrl}
                  fullName={el.Sender.username}
                  text={el.text}
                  createdAt={el.createdAt}
                />
              );
            })}

            {/* Incoming Message */}

            {/* Outgoing Message */}
          </div>
          {/* Chat Input */}
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div>
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                  Send
                </button>
              </form>
            </div>
          </footer>
        </div>
      </div>

      {/* <div className="homepage-container">
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
          <LogoutButton />
        </div>

        <div className="chat-body">
          <div className="chats">
            {message
              ? message.map((el, index) => {
                  return el.messageBelongsToLoggedUser == true ? (
                    <div className="chat-container chat-container-belongs-to-user">
                      <div className="chat-container-header">
                        <img src={el.Sender.Profile.profileImgUrl} alt="" />
                        <div className="chat-container-message-body"></div>
                        <h2>{el.Sender.username}</h2>
                      </div>

                      <p>{el.text}</p>
                    </div>
                  ) : (
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
          </div>

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
      </div> */}
    </>
  );
}
