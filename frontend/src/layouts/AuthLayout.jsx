import { Outlet } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

        <div className="grid w-full overflow-hidden rounded-3xl bg-card shadow-xl lg:grid-cols-2">

          {/* Left Section */}
          <div className="hidden flex-col justify-center bg-primary px-12 py-16 text-white lg:flex">

            <div className="mb-6 flex items-center gap-3">
              <Leaf size={34} />
              <h1 className="text-3xl font-bold">
                FoodBridge
              </h1>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight">
              Together we can reduce food waste.
            </h2>

            <p className="mb-10 text-white/80">
              Join restaurants, NGOs, volunteers and donors to make surplus
              food reach people who need it.
            </p>

            <div className="space-y-4 text-lg">

              <p>✔ Secure Authentication</p>

              <p>✔ Verified Organizations</p>

              <p>✔ Real-time Food Donations</p>

              <p>✔ Community Impact</p>

            </div>

          </div>

          {/* Right Section */}

          <div className="pt-2 flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-md">

              <div className="mb-10 text-center lg:hidden">

                <Leaf
                  className="mx-auto mb-4 text-primary"
                  size={42}
                />

                <h1 className="text-3xl font-bold text-primary">
                  FoodBridge
                </h1>

              </div>

              <Outlet />

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}