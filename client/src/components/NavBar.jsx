import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { isLogIn, setIsLogIn, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsLogIn(false);
      setUser({});
      toast.success("Logout successfully", {
        style: {
          border: "1px solid blue",
          padding: "12px",
          color: "#155DFC",
        },
        iconTheme: {
          primary: "#155DFC",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="w-full bg-white px-2 lg:px-6 py-4 sticky top-0 z-50">

      <div className="bg-blue-50 flex flex-row justify-between items-center gap-4 md:gap-0 px-4 md:px-6 lg:px-10 py-4 rounded-full shadow-md">
        <Link
          to="/"
          className="text-base md:text-2xl font-bold text-blue-700 whitespace-nowrap"
        >
          Job Finder
        </Link>

        <div className="flex gap-2 md:gap-5 lg:gap-8 items-center">

          {!isLogIn && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md font-medium transition ${isActive
                  ? "text-white bg-blue-600 shadow"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Login
            </NavLink>
          )}
          {!isLogIn && (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md font-medium transition ${isActive
                  ? "text-white bg-blue-600 shadow"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Signup
            </NavLink>
          )}

          {isLogIn && (
            <Link
              to="/saved-jobs"
              className="px-2 md:px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-full md:rounded-lg shadow hover:bg-blue-700 transition whitespace-nowrap"
            >
              <span className="hidden md:inline-block">Saved Jobs</span> <i className="fa-solid fa-bookmark text-xl md:text-base"></i>
            </Link>
          )}


          {isLogIn && (
            <Link
              to="/account"
              className="p-2 md:p-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
            >
              <i className="fa-solid fa-user text-xl"></i>
            </Link>
          )}





          {isLogIn && (
            <button
              onClick={() => handleLogout()}
              className="px-2 md:px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
