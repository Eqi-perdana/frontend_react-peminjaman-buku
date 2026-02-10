import { Link } from "react-router-dom";
import bgImage from "../assets/buku.jpg";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ color: "#fff" }}>Aplikasi Perpustakaan</h2>

        <Link to="/login" style={styles.loginBtn}>
          Login
        </Link>
      </div>

      {/* Hero */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>
          Selamat Datang di <span style={styles.highlight}>Aplikasi Peminjaman buku</span>
        </h1>

        <p style={styles.subtitle}>
          Kelola data Anda dengan lebih mudah, cepat, dan aman bersama aplikasi ini.
        </p>

        <Link to="/login" style={styles.startBtn}>
          Mulai Sekarang
        </Link>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    fontFamily: "sans-serif",
  },

  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
  },

  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    padding: "20px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  highlight: {
    color: "#ffc107",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
  },

  startBtn: {
    padding: "14px 35px",
    border: "2px solid #fff",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },

  loginBtn: {
    background: "#fff",
    padding: "8px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
  },
};
