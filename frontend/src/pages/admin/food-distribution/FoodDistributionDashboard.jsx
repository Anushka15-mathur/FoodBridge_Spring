import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Archive,
  Sparkles,
  Truck,
  HeartHandshake,
  PieChart,
  Box,
  Clock,
  Layers,
} from "lucide-react";
import {
  getAllDonations,
  getAllocationHistory,
  getDonationRequests,
} from "../../../services/foodDistributionService";
import EmptyState from "../../../components/admin/EmptyState";

const cards = [
  {
    title: "View Donations",
    description: "Browse all food donations available for allocation.",
    path: "/admin/food-distribution/donations",
    icon: Archive,
  },
  {
    title: "View Requests",
    description: "See NGO donation requests and allocate donations.",
    path: "/admin/food-distribution/requests",
    icon: ClipboardList,
  },
  {
    title: "Allocation Center",
    description: "Allocate donations to pending requests within one view.",
    path: "/admin/food-distribution/allocation",
    icon: Layers,
  },
  {
    title: "Allocation History",
    description: "Review past allocations and status updates.",
    path: "/admin/food-distribution/history",
    icon: Clock,
  },
];

const placeholderStats = {
  totalDonations: "--",
  pendingRequests: "--",
  activeAllocations: "--",
  mealsDistributed: "--",
};

export default function FoodDistributionDashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);

      try {
        const [donationResult, requestResult, historyResult] = await Promise.allSettled([
          getAllDonations(),
          getDonationRequests(),
          getAllocationHistory(),
        ]);

        setDonations(Array.isArray(donationResult.value) ? donationResult.value : []);
        setRequests(Array.isArray(requestResult.value) ? requestResult.value : []);
        setHistory(Array.isArray(historyResult.value) ? historyResult.value : []);

        if (
          donationResult.status === "rejected" ||
          requestResult.status === "rejected" ||
          historyResult.status === "rejected"
        ) {
          setError(true);
        }
      } catch (fetchError) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(() => {
    if (loading || error) {
      return placeholderStats;
    }

    const totalDonations = donations.length;
    const pendingRequests = requests.length;

    const activeAllocations = history.length
      ? history.filter((allocation) => {
          const status = allocation.status?.toString().toLowerCase();
          if (!status) return true;
          return ["active", "allocated", "approved", "inprogress", "pending"].some((token) =>
            status.includes(token)
          );
        }).length
      : 0;

    const mealsDistributed = history.reduce((sum, allocation) => {
      const qty = Number(allocation.allocatedQuantity ?? allocation.quantity ?? 0);
      return sum + (Number.isFinite(qty) ? qty : 0);
    }, 0);

    return {
      totalDonations,
      pendingRequests,
      activeAllocations,
      mealsDistributed,
    };
  }, [donations, error, history, loading, requests]);

  const recentActivity = useMemo(() => {
    const donationItems = donations.slice(0, 3).map((item) => ({
      id: `donation-${item.id ?? item.donationId ?? item.title}`,
      title: item.title || item.donationTitle || "Donation",
      subtitle: item.restaurant || item.restaurantName || "Restaurant donation",
      detail: `Available: ${item.remainingQuantity ?? item.quantity ?? "N/A"}`,
      date: item.expiryTime ? new Date(item.expiryTime) : null,
      type: "Donation",
      icon: Box,
    }));

    const requestItems = requests.slice(0, 3).map((item) => ({
      id: `request-${item.requestId ?? item.id}`,
      title: item.donationTitle || item.title || "NGO Request",
      subtitle: item.ngoName || "NGO request",
      detail: `Requested: ${item.requestedQuantity ?? "N/A"}`,
      date: item.requestedAt ? new Date(item.requestedAt) : null,
      type: "Request",
      icon: ClipboardList,
    }));

    const historyItems = history.slice(0, 3).map((item) => ({
      id: `allocation-${item.allocationId ?? item.id}`,
      title: item.donationTitle || item.title || "Allocation",
      subtitle: item.ngoName || item.restaurantName || "Allocation record",
      detail: `Allocated: ${item.allocatedQuantity ?? item.quantity ?? "N/A"}`,
      date: item.allocatedAt ? new Date(item.allocatedAt) : null,
      type: "Allocation",
      icon: HeartHandshake,
    }));

    return [...donationItems, ...requestItems, ...historyItems]
      .filter((item) => item)
      .sort((a, b) => {
        if (a.date && b.date) return b.date - a.date;
        if (a.date) return -1;
        if (b.date) return 1;
        return 0;
      })
      .slice(0, 5);
  }, [donations, history, requests]);

  const statCards = [
    {
      label: "Total Donations",
      value: stats.totalDonations,
      icon: Archive,
      description: "Donations queued for allocation.",
    },
    {
      label: "Pending NGO Requests",
      value: stats.pendingRequests,
      icon: ClipboardList,
      description: "Requests awaiting approval.",
    },
    {
      label: "Active Allocations",
      value: stats.activeAllocations,
      icon: Layers,
      description: "Allocations currently in progress.",
    },
    {
      label: "Meals Distributed",
      value: stats.mealsDistributed,
      icon: Truck,
      description: "Meals assigned to NGOs.",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-olive-700">
              Food Distribution
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Distribution Overview
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              A modern overview of donations, NGO requests, and allocation activity in the FoodBridge admin panel.
            </p>
          </div>

          <div className="inline-flex items-center rounded-3xl bg-olive-50 px-4 py-3 text-olive-800 shadow-sm">
            <PieChart className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">FoodBridge</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-olive-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-olive-50 text-olive-700 transition duration-300 group-hover:scale-105">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Actions</h2>
              <p className="mt-1 text-sm text-slate-600">
                Quick access to the food distribution workflow.
              </p>
            </div>
            <div className="rounded-3xl bg-olive-50 px-4 py-2 text-sm font-semibold text-olive-800">
              Start here
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => navigate(card.path)}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-olive-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{card.description}</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-olive-50 text-olive-700 transition duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <span className="mt-6 inline-flex w-max items-center rounded-full border border-olive-100 bg-olive-50 px-4 py-2 text-sm font-semibold text-olive-800 transition group-hover:bg-olive-100">
                    Open
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-600">
                Track the latest donation, request, and allocation updates.
              </p>
            </div>
            <div className="rounded-3xl bg-olive-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-olive-700">
              Live feed
            </div>
          </div>

          {recentActivity.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-8">
              <EmptyState
                title={loading ? "Loading activity" : "No recent activity yet"}
                description={
                  loading
                    ? "Fetching your recent donations, requests, and allocation updates."
                    : "When activity is available, you'll see the latest distribution updates here."
                }
              />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {recentActivity.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-olive-300 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-olive-50 text-olive-700 transition duration-300 group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{item.detail}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.date ? item.date.toLocaleString() : "No date"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
