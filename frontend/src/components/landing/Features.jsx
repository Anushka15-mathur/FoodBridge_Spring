import {
  ShieldCheck,
  Clock3,
  MapPinned,
  Bell,
  ClipboardCheck,
  HeartHandshake,
} from "lucide-react";

import FeatureCard from "../common/FeatureCard";
import SectionHeader from "../common/SectionHeader";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Organizations",
    description:
      "Only approved restaurants, NGOs, volunteers and donors can access the platform.",
  },
  {
    icon: Clock3,
    title: "Real-Time Requests",
    description:
      "Track donations, requests, allocations and deliveries in real time.",
  },
  {
    icon: MapPinned,
    title: "Location Based",
    description:
      "Manage donations using restaurant and NGO locations for efficient distribution.",
  },
  {
    icon: ClipboardCheck,
    title: "Transparent Allocation",
    description:
      "Admin reviews requests and allocates food fairly based on availability.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Users receive updates whenever donation status changes.",
  },
  {
    icon: HeartHandshake,
    title: "Reduce Food Waste",
    description:
      "Help communities while reducing unnecessary food waste.",
  },
];

export default function Features() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why FoodBridge"
          title="Everything Needed to Manage Food Donations"
          description="FoodBridge provides a complete workflow from donation creation to final delivery."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}