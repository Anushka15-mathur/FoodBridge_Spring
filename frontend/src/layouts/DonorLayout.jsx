import { Outlet } from "react-router-dom";
import DonorSidebar from "../components/donor/DonorSidebar";
import DonorHeader from "../components/donor/DonorHeader";
import DonorMobileNav from "../components/donor/DonorMobileNav";

export default function DonorLayout() {
    return (
        <div className="flex min-h-screen bg-muted/30">
            <DonorSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <DonorHeader />
                <DonorMobileNav />

                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
