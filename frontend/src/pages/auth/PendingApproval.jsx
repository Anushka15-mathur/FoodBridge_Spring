import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { AuthContext } from "../../context/AuthContext";

export default function PendingApproval() {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        // Remove the temporary registration token
        logout();
    }, [logout]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">

            <div className="w-full max-w-xl rounded-2xl border bg-white shadow-lg p-8 text-center space-y-6">

                <div className="text-5xl">
                    🎉
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        Registration Submitted Successfully
                    </h1>

                    <p className="mt-4 text-muted-foreground">
                        Thank you for completing your profile.
                    </p>

                    <p className="mt-2 text-muted-foreground">
                        Your account is currently waiting for administrator approval.
                    </p>

                    <p className="mt-2 text-muted-foreground">
                        Once your account has been approved, you can log in and start using FoodBridge.
                    </p>
                </div>

                <div className="flex justify-center gap-4">

                    <Button
                        variant="outline"
                        onClick={() => navigate("/", { replace: true })}
                    >
                        Go to Home
                    </Button>

                    <Button
                        onClick={() => navigate("/login", { replace: true })}
                    >
                        Go to Login
                    </Button>

                </div>

            </div>

        </div>
    );
}