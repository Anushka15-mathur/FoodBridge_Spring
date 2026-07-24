import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Leaf,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
        {/* Left Section */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Leaf size={18} />
            Sustainable Food Network
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-heading lg:text-6xl">
            Bridging
            <br />
            Surplus Food
            <br />
            to Hope.
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg leading-8 text-text">
            FoodBridge connects restaurants, NGOs, volunteers and donors to
            reduce food waste while ensuring quality food reaches people who
            need it the most.
          </p>

          {/* Buttons */}
          <div className="mb-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary text-white transition-all duration-300 hover:opacity-90"
            >
              Donate Food
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Join FoodBridge
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap gap-10">
            <div>
              <h2 className="text-3xl font-bold text-primary">10K+</h2>
              <p className="text-sm text-text">Meals Distributed</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">250+</h2>
              <p className="text-sm text-text">Restaurants</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">120+</h2>
              <p className="text-sm text-text">NGOs</p>
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="relative flex w-full max-w-xl items-center justify-center">

          {/* Main Card */}

          <div className="w-full rounded-3xl border border-primary/10 bg-card p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">

            <div className="mb-8 flex items-center gap-3">

              <div className="rounded-full bg-primary/10 p-3">
                <Leaf className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-heading">
                  FoodBridge
                </h3>

                <p className="text-sm text-text">
                  Connecting Food with Hope
                </p>
              </div>

            </div>

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-primary/10 p-3">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>

                <span className="font-medium">
                  Restaurants Donate Food
                </span>

              </div>

              <div className="flex justify-center text-primary text-2xl">
                ↓
              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-primary/10 p-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>

                <span className="font-medium">
                  NGOs Request Donations
                </span>

              </div>

              <div className="flex justify-center text-primary text-2xl">
                ↓
              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>

                <span className="font-medium">
                  Volunteers Deliver Food
                </span>

              </div>

            </div>

          </div>

          {/* Floating Card 1 */}

          <div className="absolute -top-6 -right-6 hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:block">

            <h4 className="font-semibold text-heading">
              🍱 Donation
            </h4>

            <p className="text-sm text-text">
              25 Meals Ready
            </p>

          </div>

          {/* Floating Card 2 */}

          <div className="absolute -bottom-8 -left-8 hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:block">

            <h4 className="font-semibold text-heading">
              🤝 Volunteer
            </h4>

            <p className="text-sm text-text">
              Pickup Assigned
            </p>

          </div>

          {/* Floating Card 3 */}

          <div className="absolute top-1/2 -right-10 hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:block">

            <h4 className="font-semibold text-heading">
              ❤️ NGO
            </h4>

            <p className="text-sm text-text">
              Request Approved
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}