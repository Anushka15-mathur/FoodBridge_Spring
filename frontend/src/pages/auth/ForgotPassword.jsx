import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ForgotPasswordEmail from "../../components/auth/ForgotPasswordEmail";
import OtpVerification from "../../components/auth/OtpVerification";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import AuthSuccess from "../../components/auth/AuthSuccess";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    return (
        <div className="w-full">

            {step === 1 && (
                <ForgotPasswordEmail
                    setStep={setStep}
                    setEmail={setEmail}
                />
            )}

            {step === 2 && (
                <OtpVerification
                    email={email}
                    setStep={setStep}
                />
            )}

            {step === 3 && (
                <ResetPasswordForm
                    email={email}
                    setStep={setStep}
                />
            )}

            {step === 4 && (
                <AuthSuccess
                    title="Password Reset Successful"
                    description="Your password has been updated successfully. You can now log in using your new password."
                    buttonText="Go to Login"
                    onClick={() => navigate("/login")}
                />
            )}

        </div>
    );
}