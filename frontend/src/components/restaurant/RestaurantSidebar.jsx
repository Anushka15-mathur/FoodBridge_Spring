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
    <aside className="flex h-screen w-64 flex-col border-r bg-card">

      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-primary">
          FoodBridge
        </h1>

        <p className="text-sm text-muted-foreground">
          Restaurant Panel
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

    </aside>
  );
}
