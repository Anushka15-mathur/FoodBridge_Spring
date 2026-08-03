import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    CheckCircle2,
    Clock3,
    Plus,
    Truck,
    UtensilsCrossed,
    History,
} from "lucide-react";
import { toast } from "sonner";

import restaurantService from "../../services/restaurantService";
import { Button } from "../../components/ui/button";
import RestaurantStatCard from "../../components/restaurant/RestaurantStatCard";

const statsConfig = [
    {
        key: "totalDonations",
        title: "Total Donations",
        subtitle: "All food donations created",
        icon: BarChart3,
        accentFrom: "#20d3c1",
        accentTo: "#2a9df4",
        iconBg: "rgba(32, 211, 193, 0.18)",
    },
    {
        key: "totalMealsDonated",
        title: "Total Meals Donated",
        subtitle: "Meals that can be served",
        icon: UtensilsCrossed,
        accentFrom: "#8b5cf6",
        accentTo: "#3b82f6",
        iconBg: "rgba(139, 92, 246, 0.20)",
    },
    {
        key: "availableDonations",
        title: "Available Donations",
        subtitle: "Ready for NGO requests",
        icon: CheckCircle2,
        accentFrom: "#22c55e",
        accentTo: "#14b8a6",
        iconBg: "rgba(34, 197, 94, 0.18)",
    },
    {
        key: "deliveredDonations",
        title: "Delivered Donations",
        subtitle: "Successfully delivered",
        icon: Truck,
        accentFrom: "#38bdf8",
        accentTo: "#3b82f6",
        iconBg: "rgba(59, 130, 246, 0.18)",
    },
    {
        key: "expiredDonations",
        title: "Expired Donations",
        subtitle: "Past their expiry time",
        icon: Clock3,
        accentFrom: "#f43f5e",
        accentTo: "#f59e0b",
        iconBg: "rgba(244, 63, 94, 0.18)",
    },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const response = await restaurantService.getDashboard();
                setDashboard(response);
            } catch (error) {
                if (error.response?.status === 404) {
                    navigate("/additional-info", {
                        replace: true,
                        state: { role: "RESTAURANT" },
                    });
                    return;
                }

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load restaurant dashboard."
                );
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-destructive">Unable to load dashboard.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-heading">
                        Dashboard Overview
                    </h1>
                    <p className="mt-1 max-w-2xl text-muted-foreground">
                        Track your total donations, donated meals, available items,
                        delivered food, and expired stock in one place.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={() => navigate("/restaurant/add-donation")}
                        className="bg-primary text-white hover:bg-primary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Donation
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate("/restaurant/donations")}
                    >
                        <History className="mr-2 h-4 w-4" />
                        View Donation History
                    </Button>
                </div>
            </div>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {statsConfig.map((item) => (
                    <RestaurantStatCard
                        key={item.key}
                        title={item.title}
                        subtitle={item.subtitle}
                        value={dashboard[item.key] ?? 0}
                        icon={item.icon}
                        accentFrom={item.accentFrom}
                        accentTo={item.accentTo}
                        iconBg={item.iconBg}
                    />
                ))}
            </section>

            <section className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold text-heading">
                    Quick Actions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your restaurant donations faster.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <button
                        type="button"
                        onClick={() => navigate("/restaurant/add-donation")}
                        className="flex items-center justify-between rounded-xl border px-4 py-4 text-left transition hover:bg-muted"
                    >
                        <span>
                            <span className="block font-semibold text-heading">
                                Create a donation
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                                Add food and pickup details.
                            </span>
                        </span>
                        <Plus className="h-5 w-5 text-primary" />
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/restaurant/donations")}
                        className="flex items-center justify-between rounded-xl border px-4 py-4 text-left transition hover:bg-muted"
                    >
                        <span>
                            <span className="block font-semibold text-heading">
                                Donation history
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                                View and manage donations.
                            </span>
                        </span>
                        <History className="h-5 w-5 text-primary" />
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/restaurant/profile")}
                        className="flex items-center justify-between rounded-xl border px-4 py-4 text-left transition hover:bg-muted"
                    >
                        <span>
                            <span className="block font-semibold text-heading">
                                Restaurant profile
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                                Check owner and license details.
                            </span>
                        </span>
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                    </button>
                </div>
            </section>
        </div>
    );
}
