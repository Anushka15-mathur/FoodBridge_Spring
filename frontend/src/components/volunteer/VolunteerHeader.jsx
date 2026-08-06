import useAuth from "../../hooks/useAuth";

export default function VolunteerHeader() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">
          Volunteer Portal
        </h2>
      </div>

      <div className="text-sm text-muted-foreground">
        Welcome, {user?.firstName || "Volunteer"}
      </div>
    </header>
  );
}