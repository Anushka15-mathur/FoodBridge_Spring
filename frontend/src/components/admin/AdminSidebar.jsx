import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Clock3,
  Users,
  LogOut,
  Leaf,
} from "lucide-react";

import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Pending Users",
    path: "/admin/pending-users",
    icon: Clock3,
  },
  {
    name: "All Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Food Distribution",
    path: "/admin/food-distribution",
    icon: LayoutDashboard,
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-white px-4 py-6 text-slate-900 shadow-sm md:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">FoodBridge</h1>
            <p className="text-xs font-medium text-muted">Admin workspace</p>
          </div>
        </div>

        <div className="mt-10">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm"
                        : "text-slate-700 hover:bg-primary/10 hover:text-primary"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 transition-colors duration-200" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-2xl border border-danger/20 bg-white px-4 py-3 text-sm font-semibold text-danger transition-all duration-200 hover:bg-danger/10 hover:text-danger"
          >
            <LogOut className="h-5 w-5 text-danger transition-colors duration-200 group-hover:text-danger" />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 bg-white px-3 py-2 shadow-lg md:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex flex-1 flex-col items-center justify-center rounded-3xl px-2 py-3 text-[0.72rem] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "text-slate-600 hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="group flex flex-1 flex-col items-center justify-center rounded-3xl border border-danger/20 bg-white px-2 py-3 text-[0.72rem] font-semibold text-danger transition-all duration-200 hover:bg-danger/10 hover:text-danger"
        >
          <LogOut className="mb-1 h-5 w-5 text-danger" />
          Logout
        </button>
      </nav>
    </>
  );
}
