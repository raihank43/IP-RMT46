import { Link } from "react-router-dom";
export default function Profile({ profileImgUrl, fullName, bio, username }) {
  return (
    <Link
      to={`/${username}/message`}
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
          src={profileImgUrl}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{fullName}</h2>
        <p className="text-gray-600">{bio}</p>
      </div>
    </Link>
  );
}
