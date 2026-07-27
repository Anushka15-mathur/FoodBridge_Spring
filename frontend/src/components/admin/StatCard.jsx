import { Card, CardContent } from "../ui/card";

export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="flex items-center justify-between p-6">

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-heading">
            {value}
          </h2>
        </div>

        <div className="rounded-full bg-primary/10 p-4 text-primary">
          {icon}
        </div>

      </CardContent>
    </Card>
  );
}