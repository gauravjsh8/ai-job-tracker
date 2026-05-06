import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }: any) => {
  const { user } = useAuthStore();

  if (!user) {
    toast.error(" Please, login first");
    return <Navigate to="/login" />;
  }

  return children;
};

export const AdminProtectedRoutes = ({ children }: any) => {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    toast.error("Only accessible for admins");
    return <Navigate to="/jobs" />;
  }

  return children;
};
