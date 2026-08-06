import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function MonthlyDonationChart({ data }) {

    const chartData = Array.isArray(data) ? data : [];

    const hasAnyDonation = chartData.some(
        (item) => (item.totalCount ?? 0) > 0
    );

    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

            <h2 className="text-xl font-bold text-heading">
                Monthly Donations
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                Your donation activity over the last 12 months.
            </p>

            {!hasAnyDonation ? (

                <div className="flex h-64 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No donations recorded in the last 12 months.
                    </p>
                </div>

            ) : (

                <div className="mt-5 h-72 w-full">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                            data={chartData}
                            margin={{ top: 5, right: 8, left: -16, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="currentColor"
                                className="text-muted-foreground/20"
                            />

                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                interval="preserveStartEnd"
                            />

                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                            />

                            <Tooltip
                                cursor={{ fillOpacity: 0.08 }}
                                contentStyle={{
                                    borderRadius: "0.75rem",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    fontSize: "0.8rem",
                                }}
                            />

                            <Legend
                                wrapperStyle={{ fontSize: "0.8rem" }}
                            />

                            <Bar
                                dataKey="foodCount"
                                name="Food"
                                stackId="donations"
                                fill="#22c55e"
                                radius={[0, 0, 0, 0]}
                            />

                            <Bar
                                dataKey="moneyCount"
                                name="Money"
                                stackId="donations"
                                fill="#8b5cf6"
                                radius={[0, 0, 0, 0]}
                            />

                            <Bar
                                dataKey="clothCount"
                                name="Clothes"
                                stackId="donations"
                                fill="#38bdf8"
                                radius={[4, 4, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}
