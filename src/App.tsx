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

      {/* Grup Route ADMIN (Semua di dalam sini harus jadi Admin) */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <AdminDashboard />
          </RoleRoute>
        }
      />

      {/* Bungkus halaman buku dengan RoleRoute juga! */}
      <Route
        path="/admin/books"
        element={
          <RoleRoute role="admin">
            <Buku />
          </RoleRoute>
        }
      />

      {/* Grup Route SISWA */}
      <Route
        path="/siswa"
        element={
          <RoleRoute role="admin">
            {" "}
            {/* <--- TYPO? Harusnya role="siswa" */}
            <SiswaDashboard />
          </RoleRoute>
        }
      />
    </Routes>
  );
}
