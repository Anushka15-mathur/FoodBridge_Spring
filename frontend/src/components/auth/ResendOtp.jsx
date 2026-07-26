import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ResendOtp({
  initialTime = 30,
  onResend,
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    if (typeof onResend === "function") {
      await onResend();
    }

    setTimeLeft(initialTime);
  };

  return (
    <div className="flex items-center justify-center gap-2 text-sm">

      {timeLeft > 0 ? (
        <>
          <span className="text-muted-foreground">
            Resend OTP in
          </span>

          <span className="font-semibold text-primary">
            {timeLeft}s
          </span>
        </>
      ) : (
        <Button
          type="button"
          variant="link"
          className="p-0 h-auto"
          onClick={handleResend}
        >
          Resend OTP
        </Button>
      )}

    </div>
  );
}