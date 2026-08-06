import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    UtensilsCrossed,
    IndianRupee,
    Shirt,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        path: "/donor/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Food Donations",
        path: "/donor/food-donations",
        icon: UtensilsCrossed,
    },
    {
        name: "Money Donations",
        path: "/donor/money-donations",
        icon: IndianRupee,
    },
    {
        name: "Cloth Donations",
        path: "/donor/cloth-donations",
        icon: Shirt,
    },
];

export default function DonorSidebar() {

    return (
        <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-card md:sticky md:top-0 md:flex">

            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-primary">
                    FoodBridge
                </h1>

                <p className="text-sm text-muted-foreground">
                    Donor Panel
                </p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">

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
