import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      alert("Login berhasil!");
    } catch (err) {
      alert("Login gagal!");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.card}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <p style={styles.subtitle}>Silakan login ke akun kamu</p>

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #2fd129)",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    margin: 0,
    textAlign: "center",
  },
  subtitle: {
    marginTop: "-10px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
