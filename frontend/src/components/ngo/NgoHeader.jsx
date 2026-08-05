import { Bell, UserCircle } from "lucide-react";

export default function NgoHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          NGO Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome to FoodBridge
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-600" />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <UserCircle className="h-9 w-9 text-green-600" />
      </div>
    </header>
  );
}