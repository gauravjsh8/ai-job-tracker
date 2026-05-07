import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import { Navbar } from "./components/Navbar";
import CreateJob from "./pages/CreateJob";
import Edit from "./pages/Edit";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Users from "./pages/Users";
import {
  AdminProtectedRoutes,
  ProtectedRoutes,
} from "./components/ProtectedRoutes";
import MyProfile from "./pages/MyProfile";
import ForgotPssword from "./pages/ForgotPssword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/add-jobs"
            element={
              <ProtectedRoutes>
                <CreateJob />
              </ProtectedRoutes>
            }
          />
          <Route path="/edit-jobs/:id" element={<Edit />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/jobs"
            element={
              <ProtectedRoutes>
                <Jobs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <AdminProtectedRoutes>
                <Users />
              </AdminProtectedRoutes>
            }
          />
          <Route path="/forgot-password" element={<ForgotPssword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
