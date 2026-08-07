import { Outlet } from "react-router-dom";
import DonorSidebar from "../components/donor/DonorSidebar";
import RestaurantHeader from "../components/restaurant/RestaurantHeader";

export default function DonorLayout() {
  return <div className="flex min-h-screen bg-muted/30"><DonorSidebar /><div className="flex flex-1 flex-col"><RestaurantHeader roleLabel="DONOR" /><main className="flex-1 p-6"><Outlet /></main></div></div>;
}
