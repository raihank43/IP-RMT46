import formatDate from "../../utils/dateFormat";
export default function OutgoingMessage({
  profileImgUrl,
  fullName,
  text,
  id,
  onDeleteMessage,
  createdAt
}) {
  const handleDeleteMessage = (messageId) => {
    onDeleteMessage(messageId);
  };
  return (
    <div className="flex justify-end mb-4 cursor-pointer group">
    <div className="flex flex-col max-w-96">
      {/* <div className="font-bold text-end mb-2 mr-2">{fullName}</div>  */}
      <div className="bg-indigo-500 text-white rounded-lg p-3 gap-3 relative">
        <p className="break-all">{text}</p>
        <button
          onClick={() => handleDeleteMessage(id)}
          className="absolute top-0 right-0 transform translate-x-2/4 -translate-y-2/4 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          🗑️
        </button>
      </div>
      <div className="text-gray-500 text-xs mt-1 text-end">{formatDate(createdAt)}</div> {/* Tambahkan tanggal di sini */}
    </div>
    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
      <img
        src={profileImgUrl}
        alt="My Avatar"
        className="w-8 h-8 rounded-full"
      />
    </div>
  </div>
  
  );
}
