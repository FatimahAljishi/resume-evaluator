import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>Resume Evaluator</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </header>
  );
}
