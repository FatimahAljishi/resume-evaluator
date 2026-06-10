import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Resume Evaluator</h1>

      {user ? (
        <div>
          <span>{user.email}</span>

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
