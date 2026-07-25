import {
  Building2,
  Heart,
  Store,
  Truck,
} from "lucide-react";

import RoleCard from "../common/RoleCard";

const roles = [
  {
    icon: Store,
    title: "Restaurant",
    description:
      "Donate fresh surplus food that can nourish communities instead of going to waste.",
  },
  {
    icon: Building2,
    title: "NGO",
    description:
      "Request food donations and distribute meals to people who need them the most.",
  },
  {
    icon: Truck,
    title: "Volunteer",
    description:
      "Pick up allocated donations and ensure timely delivery to NGOs.",
  },
  {
    icon: Heart,
    title: "Donor",
    description:
      "Support FoodBridge by contributing resources and helping us expand our impact.",
  },
];

export default function Role() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="font-semibold uppercase tracking-widest text-primary">
            Join Our Mission
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-heading">
            Who Can Join FoodBridge?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-text">
            Whether you want to donate food, request meals, volunteer your
            time, or support the cause, there's a place for you in the
            FoodBridge community.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {roles.map((role) => (
            <RoleCard
              key={role.title}
              icon={role.icon}
              title={role.title}
              description={role.description}
            />
          ))}

        </div>

      </div>
    </section>
  );
}