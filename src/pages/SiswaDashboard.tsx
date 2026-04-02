import { useNavigate } from "react-router-dom";

export default function SiswaDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2>📚 Dashboard Siswa</h2>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1>Selamat Datang 👋</h1>
        <p>Silakan lihat buku yang tersedia dan lakukan peminjaman.</p>

        <div style={styles.cardGrid}>
          <div style={styles.card}>📚 Daftar Buku</div>
          <div style={styles.card}>📖 Buku Dipinjam</div>
          <div style={styles.card}>⏰ Riwayat Peminjaman</div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    fontFamily: "sans-serif",
    background: "#f9fafb",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "#4f46e5",
    color: "#fff",
  },

  logout: {
    padding: "8px 16px",
    background: "#ef4444",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },

  content: {
    padding: "40px",
  },

  cardGrid: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
};
