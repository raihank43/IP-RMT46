import React, { useState } from "react";

function DropdownMenu({ loggedProfile }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          Welcome back,{" "}
          {loggedProfile &&
          loggedProfile.Profile &&
          loggedProfile.Profile.fullName
            ? `${loggedProfile.Profile.fullName}`
            : ""}
          {/* Icon untuk dropdown */}
          <img
            className="-mr-1 ml-2 h-5 w-5"
            src={
              loggedProfile &&
              loggedProfile.Profile &&
              loggedProfile.Profile.profileImgUrl
                ? `${loggedProfile.Profile.profileImgUrl}`
                : ""
            }
            alt=""
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Opsi 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Opsi 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Opsi 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
