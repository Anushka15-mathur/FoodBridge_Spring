import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, History, User } from "lucide-react";

const items = [
  ["Dashboard", "/donor/dashboard", LayoutDashboard],
  ["Create Donation", "/donor/create-donation", PlusCircle],
  ["Donation History", "/donor/donations", History],
  ["Profile", "/donor/profile", User],
];

export default function DonorSidebar() {
  return <aside className="flex h-screen w-64 flex-col border-r bg-card"><div className="border-b p-6"><h1 className="text-2xl font-bold text-primary">FoodBridge</h1><p className="text-sm text-muted-foreground">Donor Panel</p></div><nav className="flex-1 p-4">{items.map(([name, path, Icon]) => <NavLink key={path} to={path} className={({isActive}) => `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}><Icon size={20}/>{name}</NavLink>)}</nav></aside>;
}
