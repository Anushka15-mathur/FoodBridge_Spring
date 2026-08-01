import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white px-8 py-12 shadow-xl shadow-slate-200/50 sm:px-12 sm:py-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100 sm:h-24 sm:w-24">
            <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>

          <div className="mt-8 text-center sm:mt-10">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Registration Submitted Successfully
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Thank you for completing your profile.
              <br />
              Your account is currently waiting for administrator approval.
              <br />
              You will be notified once your account has been reviewed.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              className="h-12 min-w-[11rem] rounded-xl border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 hover:text-primary-hover sm:text-base"
              onClick={() => navigate("/", { replace: true })}
            >
              Go to Home
            </Button>
            <Button
              className="h-12 min-w-[11rem] rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover hover:text-white sm:text-base"
              onClick={() => navigate("/login", { replace: true })}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
