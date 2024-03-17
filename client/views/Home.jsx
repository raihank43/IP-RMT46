import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import IncomingMessage from "../src/components/IncomingMessage";
import OutgoingMessage from "../src/components/OutgoingMessage";
import { socket } from "../src/socket";
import toastMsgNotif from "../utils/toastMsgNotif";
import Loading from "../src/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageOnPub,
  fetchPublicMessage,
  sendPublicMessage,
} from "../src/features/PublicMessage/PublicMessageSlice";
import { fetchLoggedProfile } from "../src/features/User/CurrentlyLoggedProfile";
import Modal from "../src/components/Modal";
export default function Home() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const publicMessage = useSelector((state) => state.pubMessage.pubMessageList);
  const [sendPubMessage, setSendPubMessage] = useState("");
  const [fileName, setFileName] = useState("Upload");
  const [loading, setLoading] = useState(false);

  const loggedProfile = useSelector(
    (state) => state.currentlyLoggedProfile.userDataLogin
  );

  const currentUser = {
    currentUsername: loggedProfile.username,
    currentId: loggedProfile.id,
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    setLoading("Loading....");
    const response = dispatch(
      sendPublicMessage(file, sendPubMessage, currentUser)
    ).then(() => {
      if (response) {
        setFileName("Upload");
        setFile(null);
        setSendPubMessage("");
        setLoading(false);
      }
    });
  };

  const onDeleteMessage = async (id) => {
    dispatch(deleteMessageOnPub(id));
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0] ? e.target.files[0].name : "Upload");
  };

  const clearFile = (event) => {
    event.preventDefault();
    setFile(null);
    setFileName("Upload");
  };

  useEffect(() => {
    socket.connect();
    socket.on("broadcastMessage", (newMessage) => {
      if (newMessage.sender !== currentUser.currentUsername) {
        toastMsgNotif(newMessage.message);
      }

      dispatch(fetchPublicMessage());
    });

    socket.on("broadcastDelete", (data) => {
      // setMessage(data)
      dispatch(fetchPublicMessage());
    });

    return () => {
      socket.disconnect();
      socket.off("broadcastMessage");
      socket.off("broadcastDelete");
    };
  }, [publicMessage]);

  useEffect(() => {
    dispatch(fetchLoggedProfile());
    dispatch(fetchPublicMessage());
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
                    <>
                      <OutgoingMessage
                        key={index}
                        profileImgUrl={el.User.Profile.profileImgUrl}
                        fullName={el.User.username}
                        text={el.text}
                        id={el.id}
                        createdAt={el.createdAt}
                        imgUpload={el.imgUploadGroup}
                        onDeleteMessage={onDeleteMessage}
                      />
                    </>
                  ) : (
                    <IncomingMessage
                      key={index}
                      profileImgUrl={el.User.Profile.profileImgUrl}
                      fullName={el.User.username}
                      text={el.text}
                      createdAt={el.createdAt}
                      imgUpload={el.imgUploadGroup}
                    />
                  );
                })
              : []}
          </div>
          {/* Chat Input */}
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4 border-solid">
            <div>
              {/* <Modal /> */}
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={sendPubMessage}
                  onChange={(e) => setSendPubMessage(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 hover:shadow-md transition-shadow duration-300"
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="upload"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 cursor-pointer hover:bg-blue-800 transition-colors duration-300"
                >
                  {fileName}
                </label>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-800 transition-colors duration-300"
                >
                  {loading ? <Loading /> : "Send"}
                </button>
                <button
                  onClick={clearFile}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-800 transition-colors duration-300"
                >
                  Clear
                </button>
                {/* <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
        Send
      </button> */}
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
