import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export default function AuthSuccess({
  title = "Success",
  description = "",
  buttonText = "Continue",
  onClick,
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-6">

      <CheckCircle2
        className="h-20 w-20 text-green-600"
        strokeWidth={1.8}
      />

      <div className="space-y-2">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-muted-foreground">
          {description}
        </p>

      </div>

      <Button
        onClick={onClick}
        className="w-full"
      >
        {buttonText}
      </Button>

    </div>
  );
}