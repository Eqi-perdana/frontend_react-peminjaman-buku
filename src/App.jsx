import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}
