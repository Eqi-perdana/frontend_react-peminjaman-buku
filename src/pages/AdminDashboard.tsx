import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>📊 Admin Panel</h2>

        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Kelola Buku</li>
          <li>Data Siswa</li>
          <li>Peminjaman</li>
        </ul>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1>Dashboard Admin 👑</h1>
        <p>Selamat datang di panel admin perpustakaan</p>

        <div style={styles.cardGrid}>
          <div style={styles.card}>📚 Total Buku</div>
          <div style={styles.card}>👨‍🎓 Total Siswa</div>
          <div style={styles.card}>📖 Peminjaman Aktif</div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },

  sidebar: {
    width: "220px",
    background: "#1f2937",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  logout: {
    padding: "10px",
    background: "#ef4444",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },

  content: {
    flex: 1,
    padding: "40px",
    background: "#f3f4f6",
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
