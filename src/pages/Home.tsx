import { Link } from "react-router-dom";
import bgImage from "../assets/buku.jpg";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>📚 Aplikasi Perpustakaan</h2>

        <div style={styles.navButtons}>
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>

          <Link to="/register" style={styles.registerBtn}>
            Register
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>
          Selamat Datang di{" "}
          <span style={styles.highlight}>
            Aplikasi Peminjaman Buku
          </span>
        </h1>

        <p style={styles.subtitle}>
          Kelola data buku, peminjaman, dan anggota dengan lebih mudah,
          cepat, dan aman menggunakan sistem digital modern.
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
    alignItems: "center",
    padding: "20px 40px",
    zIndex: 2,
  },

  logo: {
    color: "#fff",
    fontWeight: "bold",
  },

  navButtons: {
    display: "flex",
    gap: "10px",
  },

  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    padding: "20px",
  },

  title: {
    fontSize: "44px",
    fontWeight: "bold",
    marginBottom: "20px",
    maxWidth: "800px",
  },

  highlight: {
    color: "#ffc107",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    lineHeight: "1.6",
    marginBottom: "35px",
  },

  startBtn: {
    padding: "15px 35px",
    border: "2px solid #fff",
    borderRadius: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },

  loginBtn: {
    background: "#ffffff",
    padding: "8px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
  },

  registerBtn: {
    background: "#ffc107",
    padding: "8px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
  },
};
