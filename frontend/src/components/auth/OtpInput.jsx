import { useEffect, useRef } from "react";

export default function OtpInput({ value = "", onChange, length = 6, error = false, disabled = false, className = "", }) {
    const inputRefs = useRef([]);

    const otp = value.padEnd(length).split("").slice(0, length);

    const updateOtp = (index, digit) => {
        const newOtp = [...otp];
        newOtp[index] = digit;
        onChange(newOtp.join("").trimEnd());
    };

    const handleChange = (e, index) => {
        const input = e.target.value;

        if (!/^\d?$/.test(input)) return;

        updateOtp(index, input);

        if (input && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        switch (e.key) {
            case "Backspace":
                if (!otp[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
                break;

            case "ArrowLeft":
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
                break;

            case "ArrowRight":
                if (index < length - 1) {
                    inputRefs.current[index + 1]?.focus();
                }
                break;

            default:
                break;
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        if (!pasted) return;

        onChange(pasted);

        const lastIndex = Math.min(pasted.length - 1, length - 1);

        inputRefs.current[lastIndex]?.focus();
    };

    useEffect(() => {
        inputRefs.current[0]?.setAttribute(
            "autocomplete",
            "one-time-code"
        );
    }, []);

    return (
        <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    value={digit}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`
    h-14
    w-14
    rounded-lg
    border
    text-center
    text-xl
    font-semibold
    outline-none
    transition-all
    durartion-200

    ${error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                        }
        
        disabled:cursor-not-allowed
        disabled:opacity-50                

    ${className}
`}
                />
            ))}
        </div>
    );
}