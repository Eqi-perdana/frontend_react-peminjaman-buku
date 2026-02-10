import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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

      // simpan token
      localStorage.setItem("token", res.data.token);

      alert("Login berhasil ✅");

      // pindah ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login gagal ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={submit} style={styles.card}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.backBtn}
          >
            ← Kembali
          </button>

          <h1 style={styles.title}>Welcome Back 👋</h1>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.text}>
            Belum punya akun?
            <Link to="/register" style={styles.link}>
              {" "}
              Register
            </Link>
          </p>
        </form>
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
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
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
  link: {
    color: "#667eea",
    fontWeight: "bold",
    textDecoration: "none",
  },
  backBtn: {
    alignSelf: "flex-start",
    background: "transparent",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
