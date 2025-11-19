import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  const setActive = ({ isActive }) =>
    isActive ? "underline" : "hover:underline";

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Harsh's TodoApp
      </Link>

      <nav className="flex gap-4 items-center">
        {!user ? (
          <>
            <NavLink to="/login" className={setActive} end>
              Login
            </NavLink>
            <NavLink to="/signup" className={setActive} end>
              Signup
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/todo" className={setActive} end>
              My Todos
            </NavLink>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
