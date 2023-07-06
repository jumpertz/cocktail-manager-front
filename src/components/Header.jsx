import { useState, useEffect } from "react";
import { Dialog, Popover } from "@headlessui/react";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import API from "../api"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage?.getItem("token"))
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setUser(response)
      }).catch((error) => console.error(error))
    }
  }, [token]);

  // fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null)
    setUser(null);
    navigate("/login")
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/admin" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {user ? (  
          <span className="text-sm font semibold leading-6 text-gray-900">
            Bienvenue {user.firstName} {user.lastName}
            <button
              type="button"
              onClick={handleLogout}
              className="ml-6 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
            >
              Se deconnecter
            </button>
          </span>
        ) : (
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >Log in
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          
        </div>
      </nav>
    </header>
  );
}
