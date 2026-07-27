import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      {/* Placeholder pages */}
      <Route
        path="pending-users"
        element={<h1 className="p-6 text-2xl font-bold">Pending Users</h1>}
      />

      <Route
        path="users"
        element={<h1 className="p-6 text-2xl font-bold">All Users</h1>}
      />

      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
}