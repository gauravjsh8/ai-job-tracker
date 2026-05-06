import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="bg-white p-3 flex items-center justify-between ">
      <Link to="/" className="text-green-500 font-extrabold">
        Job-Tracker
      </Link>
      {user && (
        <div className="flex items-center gap-5">
          <Link className="text-green-500 font-bold" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-green-500 font-bold" to="/jobs">
            Jobs
          </Link>
          {user.role === "admin" && (
            <Link className="text-green-500 font-bold" to="/users">
              Users
            </Link>
          )}
        </div>
      )}
      {open && (
        <div className="bg-white p-3 absolute top-15 right-20">
          <Link to="/my-profile">My-profile</Link>
        </div>
      )}
      {user ? (
        <div className="flex items-center justify-between gap-3">
          <h1>
            Welcome
            <span className="text-green-500 font-extrabold ml-2">
              {user.firstName}
            </span>
          </h1>
          <img
            src={user.imageUrl}
            className="w-10 h-10 rounded-full relative"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />

          <button
            className="bg-gray-300 p-2 pl-3 pr-3 text-green-600 rounded-2xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-green-400 p-2 pl-3 pr-3 text-white rounded-2xl cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};
