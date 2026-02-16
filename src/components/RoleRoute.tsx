import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role }: any) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
