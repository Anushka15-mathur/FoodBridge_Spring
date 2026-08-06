import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    CheckCircle2,
    Clock3,
    HandCoins,
    IndianRupee,
    Layers,
    Plus,
    Shirt,
    UtensilsCrossed,
} from "lucide-react";
import { toast } from "sonner";

import donorService from "../../services/donorService";
import { formatCurrency, formatDateTime } from "../../constants/donorOptions";

import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

import DonorStatCard from "../../components/donor/DonorStatCard";
import DonorStatusBadge from "../../components/donor/DonorStatusBadge";
import DonationTypeBadge from "../../components/donor/DonationTypeBadge";
import MonthlyDonationChart from "../../components/donor/MonthlyDonationChart";
import DonationTypeChart from "../../components/donor/DonationTypeChart";

const statsConfig = [
    {
        key: "totalDonations",
        title: "Total Donations",
        subtitle: "Across all donation types",
        icon: Layers,
        accentFrom: "#20d3c1",
        accentTo: "#2a9df4",
        iconBg: "rgba(32, 211, 193, 0.18)",
    },
    {
        key: "foodDonations",
        title: "Food Donations",
        subtitle: "Meals and food items",
        icon: UtensilsCrossed,
        accentFrom: "#22c55e",
        accentTo: "#14b8a6",
        iconBg: "rgba(34, 197, 94, 0.18)",
    },
    {
        key: "moneyDonations",
        title: "Money Donations",
        subtitle: "Financial contributions",
        icon: IndianRupee,
        accentFrom: "#8b5cf6",
        accentTo: "#3b82f6",
        iconBg: "rgba(139, 92, 246, 0.20)",
    },
    {
        key: "clothDonations",
        title: "Cloth Donations",
        subtitle: "Clothing and footwear",
        icon: Shirt,
        accentFrom: "#38bdf8",
        accentTo: "#3b82f6",
        iconBg: "rgba(56, 189, 248, 0.18)",
    },
    {
        key: "activeDonations",
        title: "Active Donations",
        subtitle: "Pending, scheduled or picked up",
        icon: BarChart3,
        accentFrom: "#f59e0b",
        accentTo: "#f43f5e",
        iconBg: "rgba(245, 158, 11, 0.18)",
    },
    {
        key: "completedDonations",
        title: "Completed Donations",
        subtitle: "Successfully delivered",
        icon: CheckCircle2,
        accentFrom: "#22c55e",
        accentTo: "#38bdf8",
        iconBg: "rgba(34, 197, 94, 0.18)",
    },
    {
        key: "pendingPickups",
        title: "Pending Pickups",
        subtitle: "Food and clothes awaiting pickup",
        icon: Clock3,
        accentFrom: "#f43f5e",
        accentTo: "#f59e0b",
        iconBg: "rgba(244, 63, 94, 0.18)",
    },
];

const DashboardSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-24 w-full" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-36 w-full" />
            ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    </div>
);

export default function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                setLoading(true);

                const response = await donorService.getDashboard();

                setDashboard(response);

            } catch (error) {

                // A missing donor profile means registration was
                // never completed, mirroring the restaurant flow.
                if (error.response?.status === 404) {
                    navigate("/additional-info", {
                        replace: true,
                        state: { role: "DONOR" },
                    });
                    return;
                }

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load donor dashboard."
                );

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, [navigate]);

    if (loading) {
        return <DashboardSkeleton />;
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

    const statistics = dashboard.statistics ?? {};
    const recentDonations = dashboard.recentDonations ?? [];

    return (
        <div className="space-y-8">

            {/* Page heading + primary actions */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-heading md:text-3xl">
                        Welcome back, {dashboard.donorName || "Donor"}
                    </h1>

                    <p className="mt-1 max-w-2xl text-muted-foreground">
                        Track your food, money and cloth donations, pickups
                        and monthly giving in one place.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <Button
                        onClick={() => navigate("/donor/food-donations/new")}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Donate Food
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate("/donor/money-donations/new")}
                    >
                        <HandCoins className="mr-2 h-4 w-4" />
                        Donate Money
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate("/donor/cloth-donations/new")}
                    >
                        <Shirt className="mr-2 h-4 w-4" />
                        Donate Clothes
                    </Button>

                </div>

            </div>

            {/* Dashboard cards */}
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                {statsConfig.map((item) => (
                    <DonorStatCard
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

            {/* Charts */}
            <section className="grid gap-5 lg:grid-cols-2">

                <MonthlyDonationChart data={dashboard.monthlyChart} />

                <DonationTypeChart
                    foodDonations={dashboard.foodDonations}
                    moneyDonations={dashboard.moneyDonations}
                    clothDonations={dashboard.clothDonations}
                />

            </section>

            {/* Donation statistics */}
            <section className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

                <h2 className="text-xl font-bold text-heading">
                    Donation Statistics
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    A breakdown of every donation you have made.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Total Amount Donated
                        </p>
                        <p className="mt-1 text-2xl font-bold text-heading">
                            {formatCurrency(statistics.totalAmountDonated)}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Total Food Quantity
                        </p>
                        <p className="mt-1 text-2xl font-bold text-heading">
                            {statistics.totalFoodQuantity ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Total Cloth Pieces
                        </p>
                        <p className="mt-1 text-2xl font-bold text-heading">
                            {statistics.totalClothPieces ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Cancelled Donations
                        </p>
                        <p className="mt-1 text-2xl font-bold text-heading">
                            {statistics.cancelledCount ?? 0}
                        </p>
                    </div>

                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Pending
                        </p>
                        <p className="mt-1 text-xl font-bold text-heading">
                            {statistics.pendingCount ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Scheduled
                        </p>
                        <p className="mt-1 text-xl font-bold text-heading">
                            {statistics.scheduledCount ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Picked Up
                        </p>
                        <p className="mt-1 text-xl font-bold text-heading">
                            {statistics.pickedUpCount ?? 0}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-muted-foreground">
                            Completed
                        </p>
                        <p className="mt-1 text-xl font-bold text-heading">
                            {statistics.completedCount ?? 0}
                        </p>
                    </div>

                </div>

            </section>

            {/* Recent donations */}
            <section className="rounded-xl border bg-card shadow-sm">

                <div className="border-b p-4 md:p-6">
                    <h2 className="text-xl font-bold text-heading">
                        Recent Donations
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Your ten most recent donations across all types.
                    </p>
                </div>

                {recentDonations.length === 0 ? (

                    <div className="p-10 text-center">
                        <p className="text-muted-foreground">
                            You haven't made any donations yet.
                        </p>

                        <Button
                            className="mt-4 bg-primary text-white hover:bg-primary/90"
                            onClick={() => navigate("/donor/food-donations/new")}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Make your first donation
                        </Button>
                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Quantity / Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {recentDonations.map((item) => (

                                    <TableRow
                                        key={`${item.type}-${item.id}`}
                                        className="transition-colors hover:bg-muted/40"
                                    >

                                        <TableCell>
                                            <DonationTypeBadge type={item.type} />
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {item.title}
                                        </TableCell>

                                        <TableCell>
                                            {item.type === "MONEY"
                                                ? formatCurrency(item.amount)
                                                : item.quantityLabel || "-"}
                                        </TableCell>

                                        <TableCell>
                                            <DonorStatusBadge status={item.status} />
                                        </TableCell>

                                        <TableCell>
                                            {formatDateTime(item.createdAt)}
                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </div>

                )}

            </section>

        </div>
    );
}
