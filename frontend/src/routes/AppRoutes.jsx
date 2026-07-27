import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

// Landing Pages
import Home from "../pages/landing/Home";


// Authentication Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdditionalInfo from "../pages/auth/AdditionalInfo";
import PendingApproval from "../pages/auth/PendingApproval";
import ForgotPassword from "../pages/auth/ForgotPassword";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import PendingUsers from "../pages/admin/PendingUsers";
import AllUsers from "../pages/admin/AllUsers";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} /> 
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* Registration Flow */}
        <Route element={<AuthLayout />}>
          <Route path="/additional-info" element={<AdditionalInfo />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/pending-users"
              element={<PendingUsers />}
            />

            <Route
              path="/admin/users"
              element={<AllUsers />}
            />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}