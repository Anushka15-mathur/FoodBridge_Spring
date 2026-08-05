import { Badge } from "../ui/badge";

const statusStyles = {

  PENDING:
    "bg-warning/10 text-warning border-warning/20",

  APPROVED:
    "bg-success/10 text-success border-success/20",

  REJECTED:
    "bg-danger/10 text-danger border-danger/20",

  SUSPENDED:
    "bg-secondary-background text-muted border-border",

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