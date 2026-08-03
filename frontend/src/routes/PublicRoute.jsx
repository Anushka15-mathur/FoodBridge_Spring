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

    // Admin ka existing behavior same rahega
    if (isAuthenticated && user?.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Restaurant ko yahan redirect mat karo
    // Restaurant redirect LoginForm aur ProtectedRoute handle karenge

    return <Outlet />;
}