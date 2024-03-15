export default function OutgoingMessage({ profileImgUrl, fullName, text }) {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p className="break-all">{text}</p>
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
