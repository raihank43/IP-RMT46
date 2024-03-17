import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../socket";
import toastMsgNotif from "../../utils/toastMsgNotif";
export default function Profile({
  profileImgUrl,
  fullName,
  bio,
  username,
  UserId,
}) {
  // const [loggedUser, setLoggedUser] = useState({});

  // useEffect(() => {
  //   socket.on("broadcastUser", (newUser) => {
  //     toastMsgNotif(newUser);
  //     console.log(newUser)
  //   });

  //   return () => {
  //     socket.off("broadcastUser");
  //   };
  // });
  return (
    <Link
      to={`/${username}/message`}
      className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-all duration-500 cursor-pointer transform hover:scale-90"
    >
      <div className="relative">
        <img
          src={profileImgUrl}
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400"></span>
      </div>
      <div>
        <h3 className="text-gray-700 font-semibold">{fullName}</h3>
        <p className="text-sm text-gray-500">{bio}</p>
      </div>
    </Link>
  );
}
