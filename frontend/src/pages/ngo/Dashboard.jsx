import { useEffect, useState } from "react";
import {
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  Ban,
  BarChart3,
} from "lucide-react";

import DashboardStatCard from "../../components/ngo/DashboardStatCard";
import ngoService from "../../services/ngoService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    ngoName: "",
    availableDonations: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    cancelledRequests: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await ngoService.getDashboard();
      setDashboard(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome 👋
        </h1>

        <p className="mt-2 text-gray-500">
          {dashboard.ngoName}
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <DashboardStatCard
          title="Available Donations"
          value={dashboard.availableDonations}
          icon={Package}
          color="bg-emerald-500"
        />

        <DashboardStatCard
          title="Pending Requests"
          value={dashboard.pendingRequests}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <DashboardStatCard
          title="Approved Requests"
          value={dashboard.approvedRequests}
          icon={CheckCircle2}
          color="bg-green-500"
        />

        <DashboardStatCard
          title="Rejected Requests"
          value={dashboard.rejectedRequests}
          icon={XCircle}
          color="bg-red-500"
        />

        <DashboardStatCard
          title="Cancelled Requests"
          value={dashboard.cancelledRequests}
          icon={Ban}
          color="bg-gray-500"
        />

        <DashboardStatCard
          title="Total Requests"
          value={dashboard.totalRequests}
          icon={BarChart3}
          color="bg-blue-600"
        />

      </div>

      {/* Quick Actions */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <button className="rounded-xl border p-6 text-left transition hover:border-green-600 hover:shadow">
            <h3 className="font-semibold">
              Browse Donations
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View food donations available nearby.
            </p>
          </button>

          <button className="rounded-xl border p-6 text-left transition hover:border-blue-600 hover:shadow">
            <h3 className="font-semibold">
              My Requests
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Track all donation requests.
            </p>
          </button>

          <button className="rounded-xl border p-6 text-left transition hover:border-orange-600 hover:shadow">
            <h3 className="font-semibold">
              Edit Profile
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Update NGO information.
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}