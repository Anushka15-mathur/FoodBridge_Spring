export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">

      <div>
        <h2 className="text-xl font-semibold">
          Admin Dashboard
        </h2>
      </div>

      <div className="text-sm text-muted-foreground">
        Welcome, Admin
      </div>

    </header>
  );
}