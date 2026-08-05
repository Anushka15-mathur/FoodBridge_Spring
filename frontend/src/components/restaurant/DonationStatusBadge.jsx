import { Badge } from "../ui/badge";

const statusStyles = {

  AVAILABLE:
    "bg-success/10 text-success border-success/20",

  REQUESTED:
    "bg-warning/10 text-warning border-warning/20",

  PARTIALLY_ALLOCATED:
    "bg-warning/10 text-warning border-warning/20",

  FULLY_ALLOCATED:
    "bg-info/10 text-info border-info/20",

  PICKED_UP:
    "bg-info/10 text-info border-info/20",

  DELIVERED:
    "bg-success/10 text-success border-success/20",

  EXPIRED:
    "bg-secondary-background text-muted border-border",

  CANCELLED:
    "bg-danger/10 text-danger border-danger/20",

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
