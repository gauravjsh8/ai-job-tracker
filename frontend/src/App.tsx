import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import { Navbar } from "./components/Navbar";
import CreateJob from "./pages/CreateJob";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-jobs" element={<CreateJob />} />
          <Route path="/edit-jobs/:id" element={<Edit />} />

          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
