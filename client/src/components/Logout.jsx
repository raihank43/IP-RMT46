import { NavLink, useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}
