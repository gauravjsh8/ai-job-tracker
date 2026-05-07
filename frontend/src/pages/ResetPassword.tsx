import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/users/reset-password/${token}`, { password });
      toast.success("Password updated successfully");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Please try again");
    }
  };
  return (
    <div className="flex justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 h-screen ">
      <div className="bg-white mt-20 h-60 rounded-3xl p-5 flex flex-col space-y-10">
        <input
          type="text"
          placeholder="New password"
          className="p-3 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 w-80 rounded-2xl mt-7"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleClick}
          className=" cursor-pointer bg-gray-200 p-3 rounded-2xl border border-green-400 hover:bg-green-400 hover:border-none hover:text-white"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
