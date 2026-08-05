import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  PlusCircle,
  History,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/restaurant/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/restaurant/profile",
    icon: Store,
  },
  {
    name: "Add Donation",
    path: "/restaurant/add-donation",
    icon: PlusCircle,
  },
  {
    name: "Donation History",
    path: "/restaurant/donations",
    icon: History,
  },
];

export default function RestaurantSidebar() {

  return (
    <aside className="flex h-screen w-64 flex-col bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">FoodBridge</h1>
            <p className="text-sm text-muted">Restaurant Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
