import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPssword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users/forgot-password", { email });
      toast.success("Reset email sent successfully to your email");
      setEmail("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Please try again");
    }
  };
  return (
    <div className="flex justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 h-screen ">
      <div className="bg-white mt-20 h-80 rounded-3xl p-5 flex flex-col space-y-10">
        <input
          type="text"
          placeholder="Enter your email"
          className="p-3 border-b border-green-500 focus:outline-none   w-80   mt-7"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleClick}
          className=" cursor-pointer bg-white-200 p-3 rounded-2xl border border-green-400 hover:bg-green-400 hover:border-none hover:text-white"
        >
          Forgot Password
        </button>
        <button
          type="submit"
          onClick={() => navigate("/")}
          className=" cursor-pointer bg-gray-200 p-3 rounded-2xl border border-green-400 hover:bg-green-400 hover:border-none hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgotPssword;
