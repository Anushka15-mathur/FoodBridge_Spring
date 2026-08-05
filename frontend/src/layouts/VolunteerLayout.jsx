import { Outlet } from "react-router-dom";
import VolunteerSidebar from "../components/volunteer/VolunteerSidebar";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";

export default function VolunteerLayout() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <VolunteerSidebar />

      <div className="flex flex-1 flex-col">
        <VolunteerHeader />

        <main className="flex-1 p-6 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}