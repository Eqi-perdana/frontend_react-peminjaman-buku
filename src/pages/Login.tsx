import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/buku.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Di dalam fungsi submit pada Login.tsx
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // DEBUG: Cek isi data di console (Tekan F12 di browser)
      console.log("Response Backend:", res.data);

      const userData = res.data.user;
      const token = res.data.token;

      if (token && userData) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("name", userData.name);

        // Pastikan string "admin" sama persis (case sensitive)
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/siswa");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login gagal! Periksa kembali akun Anda.");
    }
  };

  return (
    <div style={{ ...s.container, backgroundImage: `url(${bgImage})` }}>
      <style>{`
        .login-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .login-input:focus { border-color: #60a5fa; background: rgba(255, 255, 255, 0.15); outline: none; }
        .btn-primary:hover { background: #4338ca; transform: scale(1.02); }
        .back-btn:hover { background: white; color: black; }
      `}</style>
      <div style={s.overlay}></div>
      // Di dalam Login.tsx
      <button
        onClick={() => navigate("/")}
        className="back-btn"
        style={s.backBtn}
      >
        ← Kembali
      </button>
      <div style={s.content}>
        <form onSubmit={submit} className="login-card" style={s.card}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={s.title}>Welcome Back</h1>
            <p style={s.subtitle}>Masuk ke akun Perpustakaan Digital</p>
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Email Address</label>
            <input
              className="login-input"
              style={s.input}
              type="email"
              placeholder="email@anda.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <input
              className="login-input"
              style={s.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={s.button}>
            Login Sekarang
          </button>

          <p style={s.footerText}>
            Belum punya akun?{" "}
            <Link to="/register" style={s.link}>
              Daftar di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontFamily: "'Segoe UI', sans-serif",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(8px)",
  },
  backBtn: {
    position: "absolute",
    top: "30px",
    left: "30px",
    zIndex: 10,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "8px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "0.3s",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "24px",
    color: "white",
    transition: "0.4s ease",
  },
  title: { fontSize: "28px", margin: "0 0 8px 0" },
  subtitle: { color: "#cbd5e1", fontSize: "14px" },
  inputGroup: { marginBottom: "20px" },
  label: {
    display: "block",
    fontSize: "13px",
    marginBottom: "8px",
    color: "#e2e8f0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  link: { color: "#60a5fa", textDecoration: "none", fontWeight: "bold" },
};
