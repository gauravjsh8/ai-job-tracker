import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="bg-white p-3 flex items-center justify-between">
      <Link to="/" className="text-green-500 font-extrabold">
        Navbar
      </Link>

      <div className="flex items-center gap-3">
        <Link className="text-green-500 font-bold" to="/">
          Dashboard
        </Link>
        <Link className="text-green-500 font-bold" to="/jobs">
          Jobs
        </Link>
      </div>

      {user ? (
        <div className="flex items-center justify-between gap-3">
          <h1>
            {" "}
            Welcome{" "}
            <span className="text-green-500 font-extrabold">
              {user.firstName}
            </span>
          </h1>
          <button
            className="bg-gray-300 p-2 pl-3 pr-3 text-green-600 rounded-2xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-gray-300 p-2 pl-3 pr-3 text-green-600 rounded-2xl cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};
