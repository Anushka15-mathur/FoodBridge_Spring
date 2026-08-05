import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  History,
  UserRound,
  LogOut,
  Leaf,
} from "lucide-react";

import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/volunteer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Deliveries",
    path: "/volunteer/deliveries",
    icon: Truck,
  },
  {
    name: "History",
    path: "/volunteer/history",
    icon: History,
  },
  {
    name: "Profile",
    path: "/volunteer/profile",
    icon: UserRound,
  },
];

export default function VolunteerSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-primary/15 bg-white px-4 py-6 shadow-sm md:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Leaf className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-primary">
              FoodBridge
            </h1>

            <p className="text-xs font-medium text-slate-500">
              Volunteer workspace
            </p>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-white p-2 shadow-lg md:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center rounded-xl px-1 py-2 text-xs ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600"
                }`
              }
            >
              <Icon className="mb-1 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-1 flex-col items-center rounded-xl px-1 py-2 text-xs text-red-600"
        >
          <LogOut className="mb-1 h-5 w-5" />
          Logout
        </button>
      </nav>
    </>
  );
}