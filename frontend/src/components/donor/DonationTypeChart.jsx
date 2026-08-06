import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = {
    Food: "#22c55e",
    Money: "#8b5cf6",
    Clothes: "#38bdf8",
};

export default function DonationTypeChart({
                                              foodDonations = 0,
                                              moneyDonations = 0,
                                              clothDonations = 0,
                                          }) {

    const data = [
        { name: "Food", value: foodDonations },
        { name: "Money", value: moneyDonations },
        { name: "Clothes", value: clothDonations },
    ].filter((item) => item.value > 0);

    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

            <h2 className="text-xl font-bold text-heading">
                Donation Split
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                How your donations are distributed by type.
            </p>

            {data.length === 0 ? (

                <div className="flex h-64 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No donations to chart yet.
                    </p>
                </div>

            ) : (

                <div className="mt-5 h-72 w-full">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={95}
                                paddingAngle={3}
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[entry.name]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "0.75rem",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    fontSize: "0.8rem",
                                }}
                            />

                            <Legend
                                wrapperStyle={{ fontSize: "0.8rem" }}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}
