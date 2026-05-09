import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = ({ children }: any) => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const AdminProtectedRoutes = ({ children }: any) => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Only accessible for admins");
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <Navigate to="/jobs" />;
  }

  return children;
};
