const dashboardPaths = {
  ADMIN: "/admin/dashboard",
  RESTAURANT: "/restaurant/dashboard",
  NGO: "/ngo/dashboard",
  VOLUNTEER: "/volunteer/dashboard",
  DONOR: "/donor/dashboard",
};

export function getRoleDashboardPath(role) {
  return dashboardPaths[role] || "/";
}
