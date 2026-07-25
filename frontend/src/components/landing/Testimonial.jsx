import TestimonialCard from "../common/TestimonialCard";
import SectionHeader from "../common/SectionHeader";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Restaurant Owner",
    message:
      "FoodBridge helped us donate surplus meals instead of wasting them. The process is simple and the impact is incredible.",
  },
  {
    name: "Rahul Patil",
    role: "NGO Coordinator",
    message:
      "Managing food requests is much easier now. The allocation process is transparent and volunteers receive updates instantly.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Volunteer",
    message:
      "I love contributing to my community. FoodBridge makes every delivery organized and meaningful.",
  },
];

export default function Testimonial() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by Our Community"
          description="People using FoodBridge every day to reduce food waste and help communities."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              role={item.role}
              message={item.message}
            />
          ))}

        </div>

      </div>
    </section>
  );
}