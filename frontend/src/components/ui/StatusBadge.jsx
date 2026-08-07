/**
 * StatusBadge Component
 * 
 * Displays donation/allocation status with formatted text and themed colors.
 * Converts enum values (e.g., PARTIALLY_ALLOCATED) to user-friendly badges.
 * 
 * Usage:
 * <StatusBadge status="AVAILABLE" />
 * <StatusBadge status={d.status} />
 */

const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    bgColor: "#DCFCE7",
    textColor: "#166534",
  },
  PARTIALLY_ALLOCATED: {
    label: "Partially Allocated",
    bgColor: "#FEF3C7",
    textColor: "#92400E",
  },
  ALLOCATED: {
    label: "Allocated",
    bgColor: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  FULLY_ALLOCATED: {
    label: "Allocated",
    bgColor: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  EXPIRED: {
    label: "Expired",
    bgColor: "#FEE2E2",
    textColor: "#B91C1C",
  },
  PENDING: {
    label: "Pending",
    bgColor: "#FEF9C3",
    textColor: "#854D0E",
  },
  REJECTED: {
    label: "Rejected",
    bgColor: "#F3F4F6",
    textColor: "#6B7280",
  },
  PENDING_REVIEW: {
    label: "Pending Review",
    bgColor: "#FEF3C7",
    textColor: "#92400E",
  },
  APPROVED: {
    label: "Approved",
    bgColor: "#DCFCE7",
    textColor: "#166534",
  },
  // Additional statuses for restaurant/donation context
  REQUESTED: {
    label: "Requested",
    bgColor: "#FEF9C3",
    textColor: "#854D0E",
  },
  PICKED_UP: {
    label: "Picked Up",
    bgColor: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  DELIVERED: {
    label: "Delivered",
    bgColor: "#DCFCE7",
    textColor: "#166534",
  },
  CANCELLED: {
    label: "Cancelled",
    bgColor: "#F3F4F6",
    textColor: "#6B7280",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    // Fallback for unknown statuses
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 12px",
          borderRadius: "9999px",
          fontSize: "13px",
          fontWeight: "600",
          whiteSpace: "nowrap",
          backgroundColor: "#E5E7EB",
          color: "#4B5563",
        }}
      >
        {status}
      </span>
    );
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 12px",
        borderRadius: "9999px",
        fontSize: "13px",
        fontWeight: "600",
        whiteSpace: "nowrap",
        backgroundColor: config.bgColor,
        color: config.textColor,
      }}
    >
      {config.label}
    </span>
  );
}
