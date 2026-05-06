import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
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

      {user ? (
        <div className="flex items-center justify-between gap-3">
          <h1>
            Welcome
            <span className="text-green-500 font-extrabold ml-2">
              {user.firstName}
            </span>
          </h1>
          <div className="relative" ref={dropDownRef}>
            <img
              src={user.imageUrl}
              className="w-10 h-10 rounded-full "
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
            {open && (
              <div className="bg-white p-3 absolute top-15 right-5 flex flex-col space-y-2 w-35">
                <Link
                  to="/my-profile"
                  onClick={() => setOpen(false)}
                  className="hover:text-white hover:bg-green-500"
                >
                  My-profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-white hover:bg-green-500 text-left cursor-pointer "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
