import { Badge } from "../ui/badge";

const statusStyles = {
  AVAILABLE: "bg-green-100 text-green-700 border-green-300",
  PARTIALLY_ALLOCATED: "bg-amber-100 text-amber-700 border-amber-300",
  ALLOCATED: "bg-blue-100 text-blue-700 border-blue-300",
  FULLY_ALLOCATED: "bg-blue-100 text-blue-700 border-blue-300",
  EXPIRED: "bg-red-100 text-red-700 border-red-300",
  REQUESTED: "bg-yellow-100 text-yellow-700 border-yellow-300",
  PICKED_UP: "bg-blue-100 text-blue-700 border-blue-300",
  DELIVERED: "bg-teal-100 text-teal-700 border-teal-300",
  CANCELLED: "bg-red-100 text-red-700 border-red-300",
};

const statusLabels = {
  AVAILABLE: "Available",
  PARTIALLY_ALLOCATED: "Partially Allocated",
  ALLOCATED: "Allocated",
  FULLY_ALLOCATED: "Allocated",
  EXPIRED: "Expired",
  REQUESTED: "Requested",
  PICKED_UP: "Picked Up",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function DonationStatusBadge({ status }) {

  return (

    <Badge
      variant="outline"
      className={statusStyles[status] ?? "bg-gray-100 text-gray-700 border-gray-300"}
    >
      {statusLabels[status] ?? status}
    </Badge>

  );

}
