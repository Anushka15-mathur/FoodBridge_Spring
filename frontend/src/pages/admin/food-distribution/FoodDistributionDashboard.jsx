import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "View Donations",
    description: "Browse all food donations available for allocation.",
    path: "/admin/food-distribution/donations",
  },
  {
    title: "View Requests",
    description: "See NGO donation requests and allocate donations.",
    path: "/admin/food-distribution/requests",
  },
  {
    title: "Allocation Center",
    description: "Allocate donations to pending requests.",
    path: "/admin/food-distribution/allocation",
  },
  {
    title: "Allocation History",
    description: "Review past allocations and statuses.",
    path: "/admin/food-distribution/history",
  },
];

export default function FoodDistributionDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Food Distribution</h1>
        <p className="mt-2 text-slate-600">
          Manage donations, requests, and allocations from the admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <button
            key={card.title}
            type="button"
            onClick={() => navigate(card.path)}
            className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-slate-600">{card.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
