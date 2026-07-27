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

        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/additional-info" element={<AdditionalInfo />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          {/* Dashboard routes yaha add honge */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}