import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getRoleDashboardPath } from "../utils/roleRedirect";

export default function PublicRoute() {
    const {
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    if (loading) {
        return null;
    }

    if (isAuthenticated && user?.role) {
        return <Navigate to={getRoleDashboardPath(user.role)} replace />;
    }

    return <Outlet />;
}
