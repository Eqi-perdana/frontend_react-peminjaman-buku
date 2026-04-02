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
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
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
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              borderRadius: 8,
            },
          ],
        },
        status: {
          labels: status.map((s: any) => s.status),
          datasets: [
            {
              data: status.map((s: any) => s.total),
              backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
              borderWidth: 0,
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={s.container}>
      {/* CSS Injection for Hover Effects & Responsive */}
      <style>{`
        .menu-item:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        @media (max-width: 1024px) { 
            .charts-grid { grid-template-columns: 1fr !important; } 
        }
        @media (max-width: 768px) {
            .sidebar { position: fixed !important; left: -260px; z-index: 1000; }
            .sidebar.open { left: 0 !important; }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside
        className={isSidebarOpen ? "sidebar open" : "sidebar"}
        style={{
          ...s.sidebar,
          width: isSidebarOpen ? "260px" : "0",
          opacity: isSidebarOpen ? 1 : 0,
          padding: isSidebarOpen ? "2rem 1rem" : "0",
        }}
      >
        <div style={s.sidebarTop}>
          <div style={s.brand}>
            <span style={{ fontSize: "1.5rem" }}>📚</span>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Admin Panel</h2>
          </div>
          <p style={s.adminName}>
            Halo, <strong>{name || "Admin"}</strong>
          </p>

          <nav style={s.menu}>
            <div
              className="menu-item"
              style={s.activeMenu}
              onClick={() => navigate("/admin")}
            >
              🏠 Dashboard
            </div>
            <div
              className="menu-item"
              style={s.menuItem}
              onClick={() => navigate("/admin/books")}
            >
              📖 Kelola Buku
            </div>
            <div
              className="menu-item"
              style={s.menuItem}
              onClick={() => navigate("/siswa")}
            >
              👥 Data Siswa
            </div>
          </nav>
        </div>

        <button onClick={logout} style={s.logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={s.mainContent}>
        <header style={s.contentHeader}>
          <button
            style={s.toggleBtn}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
            Dashboard Overview 👑
          </h1>
        </header>

        {/* STATS CARDS */}
        <section style={s.statsGrid}>
          <div
            className="stat-card"
            style={{ ...s.statCard, borderBottom: "4px solid #3b82f6" }}
          >
            <div>
              <h3 style={s.statValue}>{stats.total_buku}</h3>
              <p style={s.statLabel}>Total Koleksi Buku</p>
            </div>
            <span style={s.statIcon}>📚</span>
          </div>

          <div
            className="stat-card"
            style={{ ...s.statCard, borderBottom: "4px solid #22c55e" }}
          >
            <div>
              <h3 style={s.statValue}>{stats.total_siswa}</h3>
              <p style={s.statLabel}>Siswa Terdaftar</p>
            </div>
            <span style={s.statIcon}>👥</span>
          </div>

          <div
            className="stat-card"
            style={{ ...s.statCard, borderBottom: "4px solid #f59e0b" }}
          >
            <div>
              <h3 style={s.statValue}>{stats.peminjaman_aktif}</h3>
              <p style={s.statLabel}>Peminjaman Aktif</p>
            </div>
            <span style={s.statIcon}>📋</span>
          </div>
        </section>

        {/* CHARTS */}
        {chartData && (
          <section>
            <h2 style={{ marginBottom: "1.5rem" }}>📊 Analistik Statistik</h2>
            <div className="charts-grid" style={s.chartsGrid}>
              <div style={s.chartWrapper}>
                <h3 style={s.chartTitle}>Peminjaman per Bulan</h3>
                <div style={{ height: "300px" }}>
                  <Bar
                    data={chartData.monthly}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>

              <div style={s.chartWrapper}>
                <h3 style={s.chartTitle}>Distribusi Status</h3>
                <div style={{ height: "300px" }}>
                  <Pie
                    data={chartData.status}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// STYLING OBJECT
const s: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    backgroundColor: "#1e293b",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
  },
  sidebarTop: {
    display: "flex",
    flexDirection: "column",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1rem",
  },
  adminName: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    marginBottom: "2rem",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  menuItem: {
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#cbd5e1",
    transition: "0.2s",
  },
  activeMenu: {
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "2rem",
  },
  toggleBtn: {
    background: "white",
    border: "1px solid #e2e8f0",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  statCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  statValue: {
    fontSize: "2rem",
    margin: 0,
    color: "#1e293b",
  },
  statLabel: {
    color: "#64748b",
    margin: "5px 0 0",
    fontSize: "0.9rem",
  },
  statIcon: {
    fontSize: "2.5rem",
    opacity: 0.2,
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "1.5rem",
  },
  chartWrapper: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  chartTitle: {
    marginBottom: "1.5rem",
    fontSize: "1rem",
    color: "#1e293b",
  },
};
