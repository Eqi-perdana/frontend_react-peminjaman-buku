import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import SiswaDashboard from "./pages/SiswaDashboard";
import RoleRoute from "./components/RoleRoute";
import Buku from "./pages/admin/Books";

export default function App() {
  return (
    <Routes>
      {/* Route Publik */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Grup Route ADMIN */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <RoleRoute role="admin">
            <Buku />
          </RoleRoute>
        }
      />

      {/* Grup Route SISWA - PERBAIKAN: role="siswa" */}
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