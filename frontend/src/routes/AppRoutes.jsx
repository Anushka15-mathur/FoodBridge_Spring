import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

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
import AdminDashboard from "../pages/admin/Dashboard";
import PendingUsers from "../pages/admin/PendingUsers";
import AllUsers from "../pages/admin/AllUsers";

// Food Distribution Pages
import FoodDistributionDashboard from "../pages/admin/food-distribution/FoodDistributionDashboard";
import FoodDistributionDonations from "../pages/admin/food-distribution/FoodDistributionDonations";
import DonationRequests from "../pages/admin/food-distribution/DonationRequests";
import AllocationCenter from "../pages/admin/food-distribution/AllocationCenter";
import AllocationHistory from "../pages/admin/food-distribution/AllocationHistory";

// Restaurant Pages
import RestaurantDashboard from "../pages/Restaurant/Dashboard";
import Profile from "../pages/Restaurant/Profile";
import AddDonation from "../pages/Restaurant/AddDonation";
import DonationHistory from "../pages/Restaurant/DonationHistory";
import DonationDetails from "../pages/Restaurant/DonationDetails";

// Donor Pages
import DonorLayout from "../layouts/DonorLayout";
import {
    DonorDashboard,
    FoodDonationList,
    FoodDonationForm,
    FoodDonationDetails,
    MoneyDonationList,
    MoneyDonationForm,
    MoneyDonationDetails,
    ClothDonationList,
    ClothDonationForm,
    ClothDonationDetails,
} from "../pages/donor";

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

                    {/* Authentication Pages */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                    </Route>
                </Route>

                {/* Registration Flow */}
                <Route element={<AuthLayout />}>
                    <Route
                        path="/additional-info"
                        element={<AdditionalInfo />}
                    />

                    <Route
                        path="/pending-approval"
                        element={<PendingApproval />}
                    />
                </Route>

                {/* Protected Admin Routes */}
                <Route
                    element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
                >
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin"
                            element={
                                <Navigate
                                    to="/admin/dashboard"
                                    replace
                                />
                            }
                        />

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/pending-users"
                            element={<PendingUsers />}
                        />

                        <Route
                            path="/admin/users"
                            element={<AllUsers />}
                        />

                        {/* Food Distribution main dashboard */}
                        <Route
                            path="/admin/food-distribution"
                            element={<FoodDistributionDashboard />}
                        />

                        {/* View Donations */}
                        <Route
                            path="/admin/food-distribution/donations"
                            element={<FoodDistributionDonations />}
                        />

                        {/* View Requests */}
                        <Route
                            path="/admin/food-distribution/requests"
                            element={<DonationRequests />}
                        />

                        {/* Allocation Center */}
                        <Route
                            path="/admin/food-distribution/allocation"
                            element={<AllocationCenter />}
                        />

                        {/* Allocation History */}
                        <Route
                            path="/admin/food-distribution/history"
                            element={<AllocationHistory />}
                        />
                    </Route>
                </Route>

                {/* Protected Restaurant Routes */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["RESTAURANT"]}
                        />
                    }
                >
                    <Route element={<RestaurantLayout />}>
                        <Route
                            path="/restaurant"
                            element={
                                <Navigate
                                    to="/restaurant/dashboard"
                                    replace
                                />
                            }
                        />

                        <Route
                            path="/restaurant/dashboard"
                            element={<RestaurantDashboard />}
                        />

                        <Route
                            path="/restaurant/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/restaurant/add-donation"
                            element={<AddDonation />}
                        />

                        <Route
                            path="/restaurant/donations"
                            element={<DonationHistory />}
                        />

                        <Route
                            path="/restaurant/donations/:id"
                            element={<DonationDetails />}
                        />
                    </Route>
                </Route>

                {/* Protected Donor Routes */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["DONOR"]}
                        />
                    }
                >
                    <Route element={<DonorLayout />}>
                        <Route
                            path="/donor"
                            element={
                                <Navigate
                                    to="/donor/dashboard"
                                    replace
                                />
                            }
                        />

                        <Route
                            path="/donor/dashboard"
                            element={<DonorDashboard />}
                        />

                        {/* Food Donations */}
                        <Route
                            path="/donor/food-donations"
                            element={<FoodDonationList />}
                        />

                        <Route
                            path="/donor/food-donations/new"
                            element={<FoodDonationForm />}
                        />

                        <Route
                            path="/donor/food-donations/:id"
                            element={<FoodDonationDetails />}
                        />

                        <Route
                            path="/donor/food-donations/:id/edit"
                            element={<FoodDonationForm />}
                        />

                        {/* Money Donations */}
                        <Route
                            path="/donor/money-donations"
                            element={<MoneyDonationList />}
                        />

                        <Route
                            path="/donor/money-donations/new"
                            element={<MoneyDonationForm />}
                        />

                        <Route
                            path="/donor/money-donations/:id"
                            element={<MoneyDonationDetails />}
                        />

                        <Route
                            path="/donor/money-donations/:id/edit"
                            element={<MoneyDonationForm />}
                        />

                        {/* Cloth Donations */}
                        <Route
                            path="/donor/cloth-donations"
                            element={<ClothDonationList />}
                        />

                        <Route
                            path="/donor/cloth-donations/new"
                            element={<ClothDonationForm />}
                        />

                        <Route
                            path="/donor/cloth-donations/:id"
                            element={<ClothDonationDetails />}
                        />

                        <Route
                            path="/donor/cloth-donations/:id/edit"
                            element={<ClothDonationForm />}
                        />
                    </Route>
                </Route>

                {/* Unknown Route */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}