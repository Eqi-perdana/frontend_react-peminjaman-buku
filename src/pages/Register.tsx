import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import bgImage from "../assets/buku.jpg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/register", { name, email, password });
      alert("Registrasi Berhasil!");
      navigate("/login");
    } catch {
      alert("Register gagal. Coba lagi.");
    }
  };

  return (
    <div style={s.container}>
      <style>{`
        .reg-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .reg-input:focus { border-color: #22c55e; background: rgba(255, 255, 255, 0.15); outline: none; }
        .btn-reg:hover { background: #16a34a; transform: scale(1.02); }
        .back-btn:hover { background: white; color: black; }
      `}</style>

      <div style={s.overlay}></div>

      <button
        onClick={() => navigate("/")}
        className="back-btn"
        style={s.backBtn}
      >
        ← Kembali
      </button>

      <div style={s.content}>
        <form onSubmit={handleRegister} className="reg-card" style={s.card}>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 style={s.title}>Buat Akun</h1>
            <p style={s.subtitle}>Bergabung sebagai anggota perpustakaan</p>
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Nama Lengkap</label>
            <input
              className="reg-input"
              style={s.input}
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Email</label>
            <input
              className="reg-input"
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
              className="reg-input"
              style={s.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-reg" style={s.button}>
            Daftar Sekarang
          </button>

          <p style={s.footerText}>
            Sudah punya akun?{" "}
            <Link to="/login" style={s.link}>
              Login di sini
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
    backgroundImage: `url(${bgImage})`,
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
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
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
    maxWidth: "420px",
    padding: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "35px",
    borderRadius: "24px",
    color: "white",
    transition: "0.4s ease",
  },
  title: { fontSize: "28px", margin: "0 0 5px 0" },
  subtitle: { color: "#cbd5e1", fontSize: "14px" },
  inputGroup: { marginBottom: "15px" },
  label: {
    display: "block",
    fontSize: "13px",
    marginBottom: "6px",
    color: "#e2e8f0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "white",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    transition: "0.3s",
  },
  footerText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  link: { color: "#60a5fa", textDecoration: "none", fontWeight: "bold" },
};
