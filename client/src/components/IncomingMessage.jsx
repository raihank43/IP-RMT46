import formatDate from "../../utils/dateFormat.js";

export default function IncomingMessage({
  profileImgUrl,
  fullName,
  text,
  createdAt,
  imgUpload,
}) {
  return (
    <div className="flex mb-4 cursor-pointer hover:scale-90 transition-all duration-1000">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <img
          src={profileImgUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex flex-col max-w-96">
        <div className="font-bold mb-1 ml-1">{fullName}</div>{" "}
        {/* Tambahkan nama di sini */}
        <div className="bg-white text-gray-700 rounded-lg p-3 gap-3 hover:bg-gray-100 transition-colors duration-200">
          <p className="break-normal whitespace-pre-wrap">{text}</p>
          <img
            src={imgUpload ? imgUpload : ""}
            className="transition-all duration-500 ease-in-out transform hover:scale-150"
            alt=""
          />
        </div>
        <div className="text-gray-500 text-xs mt-1 ml-2">
          {formatDate(createdAt)}
        </div>{" "}
        {/* Tambahkan tanggal di sini */}
      </div>
    </div>
  );
}
