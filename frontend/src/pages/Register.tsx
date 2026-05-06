import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const user = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<UserType>(user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/users/register", register);
      toast.success("User registered successfully");
      navigate("/login");
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message[0] || "Error while registering",
      );
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 ">
      <div className=" bg-gray-100 w-130 p-3  shadow-green-200 shadow-2xl border border-green-300 rounded-4xl h-150 mt-30">
        <h1 className="text-center text-2xl font-bold font-serif mt-10">
          Register
        </h1>
        <form
          className="flex flex-col space-y-6 w-full mt-7 p-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="First name"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={register.firstName}
            onChange={handleChange}
            name="firstName"
          />

          <input
            type="text"
            placeholder="Last Name"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={register.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <input
            type="text"
            placeholder="Email"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={register.email}
            onChange={handleChange}
            name="email"
          />
          <input
            type="text"
            placeholder="Password"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={register.password}
            onChange={handleChange}
            name="password"
          />

          <input
            type="text"
            placeholder="Confirm password"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={register.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-green-400 p-3 w-full rounded-2xl text-white font-bold cursor-pointer hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Registering" : "Register"}
          </button>
          <p className="text-center">
            Already registered?{" "}
            <Link to="/login" className="text-green-400">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
