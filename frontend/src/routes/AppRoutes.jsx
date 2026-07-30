import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

// Landing Pages
import Home from "../pages/landing/Home";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import HowItWorks from "../pages/landing/HowItWorks";

// Authentication Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdditionalInfo from "../pages/auth/AdditionalInfo";
import PendingApproval from "../pages/auth/PendingApproval";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import PendingUsers from "../pages/admin/PendingUsers";
import AllUsers from "../pages/admin/AllUsers";

// Restaurant Pages
import Profile from "../pages/Restaurant/Profile";
import AddDonation from "../pages/Restaurant/AddDonation";
import DonationHistory from "../pages/Restaurant/DonationHistory";
import DonationDetails from "../pages/Restaurant/DonationDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Route>

          {/* Authentication */}
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

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/pending-users" element={<PendingUsers />} />
            <Route path="/admin/users" element={<AllUsers />} />
          </Route>
        </Route>

        {/* Protected Restaurant Routes */}
        <Route element={<ProtectedRoute allowedRoles={["RESTAURANT"]} />}>
          <Route element={<RestaurantLayout />}>
            <Route path="/restaurant/profile" element={<Profile />} />
            <Route path="/restaurant/add-donation" element={<AddDonation />} />
            <Route path="/restaurant/donations" element={<DonationHistory />} />
            <Route path="/restaurant/donations/:id" element={<DonationDetails />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}