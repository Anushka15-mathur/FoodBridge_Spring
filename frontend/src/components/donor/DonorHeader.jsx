import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { Button } from "../ui/button";

export default function DonorHeader() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully");

        navigate("/login", { replace: true });

    };

    const displayName =
        [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
        "Donor";

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-background px-4 py-4 md:px-6">

            <div>
                <h2 className="text-lg font-bold md:text-xl">
                    Welcome, {displayName}
                </h2>

                <p className="text-sm text-muted-foreground">
                    DONOR
                </p>
            </div>

            <Button
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
            >
                <LogOut className="h-4 w-4" />
                Logout
            </Button>

        </header>
    );
}
