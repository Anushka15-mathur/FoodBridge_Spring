import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute() {

    const {
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    if (loading) {
        return null;
    }

    // Only bounce ADMIN users to the admin dashboard.
    // Other roles don't have their own dashboard yet, so let
    // them keep browsing the public site instead of looping.
    if (isAuthenticated && user?.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
}