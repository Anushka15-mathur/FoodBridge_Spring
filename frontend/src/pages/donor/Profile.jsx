import useAuth from "../../hooks/useAuth";

export default function DonorProfile() {
  const { user } = useAuth();
  return <div className="rounded-xl border bg-card p-6"><h1 className="text-3xl font-bold">Donor Profile</h1><p className="mt-1 text-muted-foreground">Your registered account details.</p><dl className="mt-6 grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-muted-foreground">Name</dt><dd className="font-medium">{[user?.firstName, user?.lastName].filter(Boolean).join(" ")}</dd></div><div><dt className="text-sm text-muted-foreground">Email</dt><dd className="font-medium">{user?.email}</dd></div><div><dt className="text-sm text-muted-foreground">Phone</dt><dd className="font-medium">{user?.phone || "—"}</dd></div></dl></div>;
}
