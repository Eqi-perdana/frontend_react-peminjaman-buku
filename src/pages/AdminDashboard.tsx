import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Registrasi ChartJS agar tidak error
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Stats {
  total_buku: number;
  total_siswa: number;
  peminjaman_aktif: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 1. Ambil Data Stats
      const resStats = await axios.get("http://localhost:8000/api/admin/stats", config);
      setStats(resStats.data);

      // 2. Ambil Data Chart
      const resChart = await axios.get("http://localhost:8000/api/admin/chart", config);
      
      // Format data untuk Chart.js
      setChartData({
        bar: {
          labels: resChart.data.monthly.map((d: any) => `Bulan ${d.bulan}`),
          datasets: [
            {
              label: "Jumlah Peminjaman",
              data: resChart.data.monthly.map((d: any) => d.total),
              backgroundColor: "#3b82f6",
            },
          ],
        },
        pie: {
          labels: resChart.data.status.map((s: any) => s.status),
          datasets: [
            {
              data: resChart.data.status.map((s: any) => s.total),
              backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
            },
          ],
        },
      });
    } catch (err) {
      console.error("Gagal mengambil data dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div style={{ padding: "20px" }}>Memuat Dashboard...</div>;

  return (
    <div style={s.container}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarTop}>
          <div style={s.brand}>
            <span style={{ fontSize: "1.5rem" }}>📚</span>
            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Perpus Admin</h2>
          </div>
          <p style={s.adminName}>Halo, Administrator</p>
        </div>

        <nav style={s.menu}>
          <div style={s.activeMenu}>🏠 Dashboard</div>
          <div style={s.menuItem} onClick={() => navigate("/admin/books")}>📖 Kelola Buku</div>
          <div style={s.menuItem} onClick={() => navigate("/admin/users")}>👥 Data Siswa</div>
        </nav>

        <button style={s.logoutBtn} onClick={handleLogout}>Keluar</button>
      </aside>

      {/* Main Content */}
      <main style={s.mainContent}>
        <header style={s.contentHeader}>
          <h1>Statistik Perpustakaan</h1>
        </header>

        {/* Stats Cards */}
        <div style={s.statsGrid}>
          <div style={s.statCard}>
            <p style={{ color: "#64748b" }}>Total Buku</p>
            <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>{stats?.total_buku || 0}</h2>
          </div>
          <div style={s.statCard}>
            <p style={{ color: "#64748b" }}>Total Siswa</p>
            <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>{stats?.total_siswa || 0}</h2>
          </div>
          <div style={s.statCard}>
            <p style={{ color: "#64748b" }}>Peminjaman Aktif</p>
            <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>{stats?.peminjaman_aktif || 0}</h2>
          </div>
        </div>

        {/* Charts Section */}
        <div style={s.chartsSection}>
          {chartData ? (
            <>
              <div style={s.chartCard}>
                <h3>Tren Peminjaman</h3>
                <Bar data={chartData.bar} />
              </div>
              <div style={s.chartCard}>
                <h3>Status Buku</h3>
                <Pie data={chartData.pie} />
              </div>
            </>
          ) : (
            <p>Data grafik belum tersedia.</p>
          )}
        </div>
      </main>
    </div>
  );
}

// --- STYLING OBJECT ---
const s: Record<string, React.CSSProperties> = {
  container: { display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" },
  sidebar: { width: "260px", backgroundColor: "#1e293b", color: "white", display: "flex", flexDirection: "column" },
  sidebarTop: { padding: "30px 20px" },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  adminName: { fontSize: "0.85rem", color: "#94a3b8", margin: 0 },
  menu: { flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: "10px" },
  menuItem: { padding: "12px 15px", borderRadius: "8px", cursor: "pointer", transition: "0.2s" },
  activeMenu: { padding: "12px 15px", borderRadius: "8px", backgroundColor: "#3b82f6", color: "white" },
  logoutBtn: { margin: "20px", padding: "12px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" },
  mainContent: { flex: 1, padding: "40px", overflowY: "auto" },
  contentHeader: { marginBottom: "30px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" },
  statCard: { background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
  chartsSection: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" },
  chartCard: { background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
};