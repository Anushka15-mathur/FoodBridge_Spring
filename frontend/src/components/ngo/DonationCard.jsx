import { MapPin, Clock3, UtensilsCrossed } from "lucide-react";
import { Button } from "../ui/button";

export default function DonationCard({ donation, onView }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="flex h-44 items-center justify-center bg-gradient-to-r from-green-100 to-emerald-50">
        <UtensilsCrossed className="h-16 w-16 text-green-600" />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-semibold">{donation.title}</h2>

          <p className="mt-1 text-sm text-gray-500">
            {donation.restaurantName}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span>{donation.pickupAddress}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-orange-500" />
            <span>{new Date(donation.expiryTime).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {donation.quantity} {donation.quantityUnit}
          </span>

          <Button
            onClick={() => onView(donation.id)}
            className="rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md px-5"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
