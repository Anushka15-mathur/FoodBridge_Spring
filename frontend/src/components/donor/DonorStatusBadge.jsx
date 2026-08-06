import { Badge } from "../ui/badge";

const statusStyles = {

    PENDING:
        "bg-yellow-100 text-yellow-700 border-yellow-300",

    SCHEDULED:
        "bg-blue-100 text-blue-700 border-blue-300",

    PICKED_UP:
        "bg-indigo-100 text-indigo-700 border-indigo-300",

    COMPLETED:
        "bg-green-100 text-green-700 border-green-300",

    CANCELLED:
        "bg-red-100 text-red-700 border-red-300",

};

const statusLabels = {
    PENDING: "Pending",
    SCHEDULED: "Scheduled",
    PICKED_UP: "Picked Up",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export default function DonorStatusBadge({ status }) {

    return (

        <Badge
            variant="outline"
            className={
                statusStyles[status] ??
                "bg-gray-100 text-gray-700 border-gray-300"
            }
        >
            {statusLabels[status] ?? status}
        </Badge>

    );

}
