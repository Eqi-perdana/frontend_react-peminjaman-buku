import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (userName) {
      setName(userName);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>📚 Perpustakaan UKK</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <div style={styles.content}>
        <h1>Selamat Datang, {name} 👋</h1>
        <p>Kelola sistem perpustakaan dengan mudah.</p>

        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>📖 Data Buku</h3>
            <p>Lihat dan kelola daftar buku.</p>
          </div>

          <div style={styles.card}>
            <h3>👨‍🎓 Data Siswa</h3>
            <p>Kelola data siswa perpustakaan.</p>
          </div>

          <div style={styles.card}>
            <h3>📅 Peminjaman</h3>
            <p>Atur peminjaman dan pengembalian buku.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
  },
  navbar: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  content: {
    padding: "40px",
  },
  cardContainer: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.3s",
  },
};
