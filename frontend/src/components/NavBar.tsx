import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function Navbar() {
  const { authUser, logout } = useAuthStore();

  //need to check the current route, if in login, we hide the login button, same for register
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center m-4 p-4 border-b-1 border-primary">
      <div>
        <h2 className="text-2xl font-bold hover:shadow-2xl hover:shadow-secondary" onClick={() => navigate("/")}>
          Real Time Chat App
        </h2>
      </div>
      <div className="flex gap-4">
        <button
          className="cursor-pointer border-2 border-primary p-4 rounded-2xl hover:shadow-2xl hover:shadow-secondary"
          onClick={() => navigate("/profile")}
          hidden={!authUser}
        >
          Profile
        </button>
        <button
          className="cursor-pointer border-2 border-primary p-4 rounded-2xl hover:shadow-2xl hover:shadow-secondary"
          onClick={() => navigate("/settings")}
          hidden={!authUser}
        >
          Settings
        </button>
        <button
          className="cursor-pointer border-2 border-primary p-4 rounded-2xl hover:shadow-2xl hover:shadow-secondary"
          onClick={() => logout()}
          hidden={!authUser}
        >
          Logout
        </button>
        <button
          className="cursor-pointer border-2 border-primary p-4 rounded-2xl hover:shadow-2xl hover:shadow-secondary"
          onClick={() => navigate("/login")}
          hidden={authUser !== null || location.pathname === "/login"}
        >
          Login
        </button>
        <button
          className="cursor-pointer border-2 border-primary p-4 rounded-2xl hover:shadow-2xl hover:shadow-secondary"
          onClick={() => navigate("/register")}
          hidden={authUser !== null || location.pathname === "/register"}
        >
          register
        </button>
      </div>
    </div>
  );
}
