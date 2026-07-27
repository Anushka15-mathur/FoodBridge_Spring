import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  ShieldAlert,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardCards({ dashboard }) {

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Total Users"
        value={dashboard.totalUsers}
        icon={<Users size={30} />}
      />

      <StatCard
        title="Pending Users"
        value={dashboard.pendingUsers}
        icon={<UserPlus size={30} />}
      />

      <StatCard
        title="Approved Users"
        value={dashboard.approvedUsers}
        icon={<UserCheck size={30} />}
      />

      <StatCard
        title="Rejected Users"
        value={dashboard.rejectedUsers}
        icon={<UserX size={30} />}
      />

      <StatCard
        title="Suspended Users"
        value={dashboard.suspendedUsers}
        icon={<ShieldAlert size={30} />}
      />

    </div>
  );
}