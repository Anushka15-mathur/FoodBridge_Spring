import { Badge } from "../ui/badge";

const roleStyles = {
  ADMIN:
    "bg-danger/10 text-danger border-danger/20",

  DONOR:
    "bg-info/10 text-info border-info/20",

  NGO:
    "bg-success/10 text-success border-success/20",

  RESTAURANT:
    "bg-secondary/10 text-secondary border-secondary/20",

  VOLUNTEER:
    "bg-secondary-background text-muted border-border",
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