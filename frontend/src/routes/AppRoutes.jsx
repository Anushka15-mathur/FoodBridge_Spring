import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/additional-info" element={<AdditionalInfo />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard Routes (We'll implement these later) */}
        <Route element={<DashboardLayout />}>
          {/* Admin */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

          {/* Restaurant */}
          {/* <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} /> */}

          {/* NGO */}
          {/* <Route path="/ngo/dashboard" element={<NgoDashboard />} /> */}

          {/* Volunteer */}
          {/* <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} /> */}

          {/* Donor */}
          {/* <Route path="/donor/dashboard" element={<DonorDashboard />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}