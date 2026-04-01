import { Link } from "react-router-dom";
import "./Home.css";
import bgImage from "../assets/buku.jpg";

export default function Home() {
  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content">
        {/* Navbar */}
        <header className="navbar">
          <h1 className="logo">📚 Perpustakaan Digital</h1>

          <div className="nav-buttons">
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/register" className="btn register">
              Register
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="hero">
          <h2 className="title">
            Selamat Datang di <br />
            <span>Aplikasi Peminjaman Buku</span>
          </h2>

          <p className="subtitle">
            Kelola buku, anggota, dan peminjaman dengan sistem digital modern,
            cepat, dan efisien.
          </p>

          <Link to="/login" className="start-btn">
            Mulai Sekarang →
          </Link>
        </section>

        {/* Features */}
        <section className="features">
          <div className="card">
            <div className="icon">📖</div>
            <h3>Koleksi Buku</h3>
            <p>Lihat semua buku tersedia</p>
          </div>

          <div className="card">
            <div className="icon">👥</div>
            <h3>Anggota</h3>
            <p>Kelola data anggota</p>
          </div>

          <div className="card">
            <div className="icon">📋</div>
            <h3>Peminjaman</h3>
            <p>Cek status peminjaman</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">© 2026 Perpustakaan Digital</footer>
      </div>
    </div>
  );
}
