import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success("Logged in successfully");

      navigate("/dashboard");
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Error while logging in");
      setLoading(false);
    }
  };

  return (
    <div className="p-20  flex justify-center  bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950  h-220  ">
      <div className="bg-gray-200 p-3 h-90  w-90 rounded-2xl shadow-green-300 shadow-2xl  mt-30 ">
        <h1 className="text-center mb-4 font-bold text-3xl">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-7">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-green-500  p-2 rounded-2xl  focus:outline-none focus:ring-2 focus:ring-green-500   "
                value={email}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-green-500  p-2 rounded-2xl  focus:outline-none focus:ring-2 focus:ring-green-500    "
                value={password}
                placeholder="password"
              />
            </div>

            <div className="text-center mb-3">
              <button
                type="submit"
                className="bg-green-500 w-full p-2 rounded-2xl cursor-pointer text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Logging in" : "Login"}
              </button>
            </div>
          </div>
          <p className="text-center">
            Not registered yet?{" "}
            <Link to="/register" className="text-blue-500 ">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
