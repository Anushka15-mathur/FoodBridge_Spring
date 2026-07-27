import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock3,
  Users,
  LogOut,
} from "lucide-react";

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
];

export default function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-primary">
          FoodBridge
        </h1>

        <p className="text-sm text-muted-foreground">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t p-4">

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}