import { Outlet } from "react-router-dom";
import RestaurantSidebar from "../components/restaurant/RestaurantSidebar";
import RestaurantHeader from "../components/restaurant/RestaurantHeader";

export default function RestaurantLayout() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <RestaurantSidebar />

      <div className="flex flex-1 flex-col">
        <RestaurantHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
