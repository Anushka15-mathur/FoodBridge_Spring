import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import PendingUsers from "../pages/admin/PendingUsers";
import AllUsers from "../pages/admin/AllUsers";
import FoodDistributionDashboard from "../pages/admin/food-distribution/FoodDistributionDashboard";
import FoodDistributionDonations from "../pages/admin/food-distribution/FoodDistributionDonations";
import FoodRequests from "../pages/admin/food-distribution/FoodRequests";
import AllocationPage from "../pages/admin/food-distribution/AllocationPage";
import AllocationHistory from "../pages/admin/food-distribution/AllocationHistory";
import DeliveryTracking from "../pages/admin/food-distribution/DeliveryTracking";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="pending-users" element={<PendingUsers />} />
      <Route path="users" element={<AllUsers />} />

      <Route path="food-distribution" element={<FoodDistributionDashboard />} />
      <Route path="food-distribution/donations" element={<FoodDistributionDonations />} />
      <Route path="food-distribution/requests" element={<FoodRequests />} />
      <Route path="food-distribution/allocation" element={<AllocationPage />} />
      <Route path="food-distribution/allocation-center" element={<AllocationPage />} />
      <Route path="food-distribution/history" element={<AllocationHistory />} />
      <Route path="food-distribution/delivery" element={<DeliveryTracking />} />

      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
}