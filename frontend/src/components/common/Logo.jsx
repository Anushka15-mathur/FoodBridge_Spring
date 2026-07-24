import { Leaf } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Leaf className="h-8 w-8 text-[#556B2F]" />

      <div>
        <h1 className="text-xl font-bold text-[#556B2F]">
          FoodBridge
        </h1>

        <p className="text-xs text-gray-500">
          Connecting Food with Hope
        </p>
      </div>
    </div>
  );
}