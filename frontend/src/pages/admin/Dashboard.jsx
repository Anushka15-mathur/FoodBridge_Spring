import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardCards from "../../components/admin/DashboardCards";
import adminService from "../../services/adminService";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await adminService.getDashboard();

            setDashboard(response);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard."
            );

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-destructive">
                    Unable to load dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Monitor users and platform statistics.
                </p>
            </div>

            <DashboardCards dashboard={dashboard} />

        </div>
    );
}