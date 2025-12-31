import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium ${
      location.pathname === path
        ? "bg-blue-200 text-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="w-full flex justify-between items-center px-56 py-4 bg-slate-900">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Tasks
          </Link>

          <Link to="/profile" className={linkClass("/profile")}>
            My Profile
          </Link>
        </div>
        <button
          onClick={logout}
          className="!bg-red-500 hover:!bg-red-900 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
