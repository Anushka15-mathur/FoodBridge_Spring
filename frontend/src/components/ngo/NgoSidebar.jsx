import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  User,
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
  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-green-600">
          FoodBridge
        </h1>

        <p className="text-sm text-gray-500">
          NGO Portal
        </p>
      </div>

      <nav className="flex flex-col gap-2 p-4">
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
      </nav>
    </aside>
  );
}