import React from "react";

export default function StatCard({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="group rounded-3xl border border-primary/10 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-4xl font-extrabold text-primary">
        {value}
      </h2>

      <p className="mt-2 text-text">
        {label}
      </p>
    </div>
  );
}