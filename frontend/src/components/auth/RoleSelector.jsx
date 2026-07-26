import {
  User,
  Store,
  Building2,
  Bike,
  CheckCircle2,
} from "lucide-react";

const roles = [
  {
    value: "DONOR",
    label: "Donor",
    icon: User,
  },
  {
    value: "RESTAURANT",
    label: "Restaurant",
    icon: Store,
  },
  {
    value: "NGO",
    label: "NGO",
    icon: Building2,
  },
  {
    value: "VOLUNTEER",
    label: "Volunteer",
    icon: Bike,
  },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {roles.map((role) => {
        const Icon = role.icon;
        const selected = value === role.value;

        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`relative rounded-xl border p-4 transition-all duration-200 ${
              selected
                ? "border-primary bg-primary text-white shadow-lg scale-105"
                : "border-border bg-card hover:border-primary hover:bg-primary/5"
            }`}
          >
            {selected && (
              <CheckCircle2
                size={18}
                className="absolute right-3 top-3"
              />
            )}

            <Icon className="mx-auto mb-3" size={24} />

            <p className="font-semibold">
              {role.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}