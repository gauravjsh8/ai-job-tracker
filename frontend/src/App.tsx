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

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-jobs" element={<CreateJob />} />
          <Route path="/edit-jobs/:id" element={<Edit />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
