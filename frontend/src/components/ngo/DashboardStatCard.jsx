import { Card, CardContent } from "../ui/card";

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <Card className="rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-white ${color}`}
        >
          <Icon size={28} />
        </div>
      </CardContent>
    </Card>
  );
}