import { NavLink, useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  return (
    // <div className="logout-button">
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
    // </div>
  );
}
