import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input type="text" placeholder="Nama Lengkap" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Konfirmasi Password" />

        <button>Register</button>

        <div className="auth-link">
          Sudah punya akun? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}
