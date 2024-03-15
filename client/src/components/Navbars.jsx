import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import DropdownMenu from "./DropDownMenu";


export default function Navbar() {
  const [loggedProfile, setLoggedProfile] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchLoggedProfile = async () => {
    try {
      setLoading("loading....")
      const { data } = await axios({
        url: "/user/find",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoggedProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchLoggedProfile();
    setLoading
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <nav className="bg-gray-800 p-2 mt-0 w-full">
      {" "}
      {/* Bagian ini adalah navbar */}
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a
            className="text-white no-underline hover:text-white hover:no-underline"
            href="#"
          >
            👻{" "}
            <span className="text-2xl pl-2">
              <i className="em em-grinning" />
              <Link to={"/"}>KoneksiON</Link>
            </span>
          </a>
        </div>
        <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="#"
              >
                Active
              </a>
            </li>
        
            <li className="mr-3">
              <a
                className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="#"
              >
                link
              </a>
            </li>
          </ul>

          <DropdownMenu loggedProfile={loggedProfile} />

          <li className="mr-3">
            <LogoutButton />
          </li>
        </div>
      </div>
    </nav>
  );
}
