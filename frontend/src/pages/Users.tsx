import { useEffect, useState } from "react";
import api from "../services/api";
import { RefreshCw } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchusers = async () => {
      const response = await api.get("/users/all-users");
      setUsers(response.data.users);
    };
    fetchusers();
  }, []);

  const handleClick = async (id: string) => {
    try {
      setLoading(true);
      await api.patch(`/users/temporary-password/${id}`);
      toast.success("Temporary password setup successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950">
      <div className="p-4 ">
        <h1 className="text-center mt-4  text-white text-3xl">Users</h1>
        <div className=" grid grid-cols-4 text-white mt-10 mb-5 font-bold pl-30">
          <p>User</p>
          <p>Email</p>
          <p>Role</p>
          <p>Action</p>
        </div>

        {users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-4 space-y-4  text-white items-center pl-28"
          >
            <p>{user.firstName} </p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <button onClick={() => handleClick(user._id)}>
              <RefreshCw
                className={` ${loading ? "text-gray-500" : "text-green-400 hover:text-green-700 cursor-pointer"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
