import { Badge } from "../ui/badge";

const statusStyles = {

  AVAILABLE:
    "bg-green-100 text-green-700 border-green-300",

  REQUESTED:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  PARTIALLY_ALLOCATED:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  FULLY_ALLOCATED:
    "bg-blue-100 text-blue-700 border-blue-300",

  PICKED_UP:
    "bg-blue-100 text-blue-700 border-blue-300",

  DELIVERED:
    "bg-teal-100 text-teal-700 border-teal-300",

  EXPIRED:
    "bg-gray-100 text-gray-700 border-gray-300",

  CANCELLED:
    "bg-red-100 text-red-700 border-red-300",

};

const statusLabels = {
  AVAILABLE: "Available",
  REQUESTED: "Requested",
  PARTIALLY_ALLOCATED: "Partially Allocated",
  FULLY_ALLOCATED: "Fully Allocated",
  PICKED_UP: "Picked Up",
  DELIVERED: "Delivered",
  EXPIRED: "Expired",
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
