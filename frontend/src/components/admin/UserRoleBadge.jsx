import { Badge } from "../ui/badge";

const roleStyles = {
  ADMIN:
    "bg-red-100 text-red-700 border-red-300",

  DONOR:
    "bg-blue-100 text-blue-700 border-blue-300",

  NGO:
    "bg-green-100 text-green-700 border-green-300",

  RESTAURANT:
    "bg-orange-100 text-orange-700 border-orange-300",

  VOLUNTEER:
    "bg-purple-100 text-purple-700 border-purple-300",
};

export default function UserRoleBadge({ role }) {

  return (

    <Badge
      variant="outline"
      className={roleStyles[role]}
    >
      {role}
    </Badge>

  );

}