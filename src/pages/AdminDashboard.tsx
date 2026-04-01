import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_buku: 0,
    total_siswa: 0,
    peminjaman_aktif: 0,
  });

  const [chartData, setChartData] = useState<any>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("name");

    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    if (userName) setName(userName);

    fetchStats();
    fetchChart();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChart = async () => {
    try {
      const res = await api.get("/admin/chart");

      const monthly = res.data.monthly;
      const status = res.data.status;

      setChartData({
        monthly: {
          labels: monthly.map((m: any) => `Bulan ${m.bulan}`),
          datasets: [
            {
              label: "Total Peminjaman",
              data: monthly.map((m: any) => m.total),
              backgroundColor: "#3b82f6",
            },
          ],
        },
        status: {
          labels: status.map((s: any) => s.status),
          datasets: [
            {
              data: status.map((s: any) => s.total),
              backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          <h2>📚 Admin Panel</h2>
          <p style={{ fontSize: "14px", opacity: 0.8 }}>Halo, saya eqi {name}</p>

          <ul style={styles.menu}>
            <li style={styles.activeMenu}>🏠 Dashboard</li>
            <li style={styles.menuItem}>📖 Kelola Buku</li>
            <li style={styles.menuItem}>👨‍🎓 Data Siswa</li>
            <li style={styles.menuItem}>📅 Peminjaman</li>
          </ul>
        </div>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h1>Dashboard Admin 👑</h1>

        {/* STAT CARD */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h2>{stats.total_buku}</h2>
            <p>Total Buku</p>
          </div>

          <div style={styles.card}>
            <h2>{stats.total_siswa}</h2>
            <p>Total Siswa</p>
          </div>

          <div style={styles.card}>
            <h2>{stats.peminjaman_aktif}</h2>
            <p>Peminjaman Aktif</p>
          </div>
        </div>

        {/* CHART SECTION */}
        {chartData && (
          <div style={{ marginTop: "50px" }}>
            <h2>📊 Statistik Diagram</h2>

            <div style={styles.chartGrid}>
              <div style={styles.chartCard}>
                <h3>Peminjaman per Bulan</h3>
                <Bar data={chartData.monthly} />
              </div>

              <div style={styles.chartCard}>
                <h3>Status Peminjaman</h3>
                <Pie data={chartData.status} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },

  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #1e293b, #0f172a)",
    color: "#fff",
    padding: "25px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  menuItem: {
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  activeMenu: {
    padding: "10px",
    borderRadius: "6px",
    background: "#3b82f6",
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
    background: "#f1f5f9",
    overflowY: "auto",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "20px",
  },

  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
};
