export default function DonorStatCard({
                                          title,
                                          value,
                                          subtitle,
                                          icon: Icon,
                                          accentFrom,
                                          accentTo,
                                          iconBg,
                                      }) {
    return (
        <div className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                    background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
                }}
            />

            <div className="flex items-start justify-between gap-4 pt-1">
                <div>
                    <p className="text-3xl font-bold text-heading">
                        {value}
                    </p>

                    <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-heading">
                        {title}
                    </p>

                    {subtitle ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: iconBg,
                        color: accentFrom,
                    }}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
