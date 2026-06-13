import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <Link to="/" className="title-link">
        Resume Evaluator
      </Link>

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {user ? (
        <div>
          <span>{user.email}</span>

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
