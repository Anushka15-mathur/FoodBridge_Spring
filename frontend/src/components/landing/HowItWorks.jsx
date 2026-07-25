import {
  UtensilsCrossed,
  ClipboardList,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";

import ProcessCard from "../common/ProcessCard";

const steps = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description:
      "Restaurants donate fresh surplus food before it expires.",
  },
  {
    icon: ClipboardList,
    title: "NGO Request",
    description:
      "NGOs request food based on their current requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Admin Allocation",
    description:
      "The admin reviews requests and allocates donations fairly.",
  },
  {
    icon: Truck,
    title: "Volunteer Delivery",
    description:
      "Approved volunteers pick up food and deliver it safely.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Fresh meals reach people who need them the most.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">
          <p className="font-semibold uppercase tracking-widest text-primary">
            Workflow
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-heading">
            How FoodBridge Works
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-text">
            Every donation follows a transparent workflow that ensures
            food is safely allocated and delivered to the people who need it.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <ProcessCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}