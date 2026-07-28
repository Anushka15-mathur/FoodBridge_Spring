import { Badge } from "../ui/badge";

const statusStyles = {

  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  APPROVED:
    "bg-green-100 text-green-700 border-green-300",

  REJECTED:
    "bg-red-100 text-red-700 border-red-300",

  SUSPENDED:
    "bg-gray-100 text-gray-700 border-gray-300",

};

export default function UserStatusBadge({ status }) {

  return (

    <Badge
      variant="outline"
      className={statusStyles[status]}
    >
      {status}
    </Badge>

  );

}