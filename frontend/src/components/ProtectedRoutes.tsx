import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: any) => {
  const { user } = useAuthStore();

  if (!user) {
    toast.error(" Please, login first");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
