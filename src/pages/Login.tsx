import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <div className="auth-link">
          Belum punya akun? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
