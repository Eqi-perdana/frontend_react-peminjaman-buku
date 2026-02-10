import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard Perpustakaan 📚</h1>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
