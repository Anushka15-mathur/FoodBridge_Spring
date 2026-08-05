import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { Button } from "../ui/button";

export default function RestaurantHeader() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully");

    navigate("/login", { replace: true });

  };

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Restaurant";

  return (
    <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-bold text-heading">
          Welcome, {displayName}
        </h2>
        <p className="text-sm text-muted">
          RESTAURANT
        </p>
      </div>
      <Button
        variant="destructive"
        className="border border-danger/20 bg-white text-danger hover:bg-danger/10 hover:text-danger"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
