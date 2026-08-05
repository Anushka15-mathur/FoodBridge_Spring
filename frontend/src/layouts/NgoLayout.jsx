import { Outlet } from "react-router-dom";
import NgoSidebar from "../components/ngo/NgoSidebar";
import NgoHeader from "../components/ngo/NgoHeader";

export default function NgoLayout() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <NgoSidebar />

      <div className="flex flex-1 flex-col">
        <NgoHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}