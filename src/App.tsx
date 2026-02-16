import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import SiswaDashboard from "./pages/SiswaDashboard";
import RoleRoute from "./components/RoleRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/siswa"
        element={
          <RoleRoute role="siswa">
            <SiswaDashboard />
          </RoleRoute>
        }
      />
    </Routes>
  );
}
