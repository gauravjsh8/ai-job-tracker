import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="bg-gray-200 p-3 h-80  w-100 rounded-2xl shadow-green-300 shadow-2xl   ">
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
                className="bg-green-500 w-50 p-2 rounded-2xl cursor-pointer text-white"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
