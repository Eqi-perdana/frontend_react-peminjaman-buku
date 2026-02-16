import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import bgImage from "../assets/buku.jpg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Register gagal");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.backBtn}
          >
            ← Kembali
          </button>
          <h1 style={styles.title}>Buat Akun Baru</h1>

          <input
            style={styles.input}
            placeholder="Nama Lengkap"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleRegister}>
            Register
          </button>

          <p style={styles.text}>
            Sudah punya akun?{" "}
            <Link to="/login" style={styles.link}>
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "sans-serif",
  },

  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "14px",
    width: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  text: {
    textAlign: "center",
    fontSize: "14px",
  },

  backBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    color: "#667eea",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
