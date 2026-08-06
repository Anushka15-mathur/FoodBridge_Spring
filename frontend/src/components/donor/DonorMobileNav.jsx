import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    UtensilsCrossed,
    IndianRupee,
    Shirt,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/donor/dashboard", icon: LayoutDashboard },
    { name: "Food", path: "/donor/food-donations", icon: UtensilsCrossed },
    { name: "Money", path: "/donor/money-donations", icon: IndianRupee },
    { name: "Clothes", path: "/donor/cloth-donations", icon: Shirt },
];

export default function DonorMobileNav() {

    return (
        <nav className="flex gap-2 overflow-x-auto border-b bg-card px-4 py-3 md:hidden">

            {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/50 hover:bg-muted"
                            }`
                        }
                    >
                        <Icon size={16} />
                        {item.name}
                    </NavLink>
                );
            })}

        </nav>
    );
}
