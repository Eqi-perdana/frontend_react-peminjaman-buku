import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import bgImage from "../assets/buku.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/siswa");
      }
    } catch {
      alert("Login gagal!");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-overlay"></div>

      <button onClick={() => navigate("/")} className="back-btn">
        ← Kembali
      </button>

      <div className="login-content">
        <form onSubmit={submit} className="login-card">
          <h1 className="login-title">Welcome Back 👋</h1>

          <input
            className="login-input"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-text">
            Belum punya akun?{" "}
            <Link to="/register" className="login-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

