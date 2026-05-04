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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", register);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message[0] || "Error while registering",
      );
    }
  };

  const handleChange = (e: any) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <div className=" mt-20 flex items-center justify-center">
      <div className="p-3 bg-gray-100  shadow-green-200 shadow-2xl border border-green-300 rounded-4xl">
        <h1 className="text-center text-2xl font-bold font-serif"> Register</h1>
        <form
          className="flex flex-col space-y-6 w-100 mt-7 p-4"
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
            type="submit"
            className="bg-green-400 p-3 w-full rounded-2xl text-white font-bold cursor-pointer hover:bg-green-500"
          >
            Register
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
