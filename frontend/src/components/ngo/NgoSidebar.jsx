import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/ngo/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Available Donations",
    path: "/ngo/donations",
    icon: UtensilsCrossed,
  },
  {
    title: "My Requests",
    path: "/ngo/requests",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: "/ngo/profile",
    icon: User,
  },
];

export default function NgoSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white shadow-sm">
      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-green-600">
          FoodBridge
        </h1>

        <p className="text-sm text-gray-500">
          NGO Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}