import {
  HeartHandshake,
  Store,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import StatCard from "../common/StatCard";

export default function Stats() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="font-semibold uppercase tracking-widest text-primary">
            Our Impact
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-heading">
            Making Every Meal Count
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-text">
            Together with restaurants, NGOs, volunteers and donors,
            we're reducing food waste while feeding communities.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={UtensilsCrossed}
            value="10K+"
            label="Meals Distributed"
          />

          <StatCard
            icon={Store}
            value="250+"
            label="Restaurants"
          />

          <StatCard
            icon={HeartHandshake}
            value="120+"
            label="NGOs"
          />

          <StatCard
            icon={Users}
            value="800+"
            label="Volunteers"
          />

        </div>

      </div>
    </section>
  );
}