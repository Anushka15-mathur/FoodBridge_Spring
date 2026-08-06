import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
    const {
        isAuthenticated,
        loading,
        user,
    } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

   if (
    ["RESTAURANT", "VOLUNTEER"].includes(user.role) &&
    allowedRoles?.includes(user.role) &&
    !user.profileCompleted
) {
    return (
        <Navigate
            to="/additional-info"
            replace
            state={{ role: user.role }}
        />
    );
  }

    return <Outlet />;
}
