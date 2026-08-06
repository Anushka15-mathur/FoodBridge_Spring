import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import {
    DONATION_STATUS_OPTIONS,
    PAYMENT_MODE_OPTIONS,
    REFERENCE_OPTIONAL_MODES,
    selectClassName,
} from "../../../constants/donorOptions";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export default function MoneyDonationForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(isEditMode);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: "",
            paymentMode: "UPI",
            transactionReference: "",
            description: "",
            status: "PENDING",
        },
    });

    const paymentMode = watch("paymentMode");

    const referenceRequired =
        !REFERENCE_OPTIONAL_MODES.includes(paymentMode);

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        const loadDonation = async () => {

            try {

                setLoading(true);

                const donation = await donorService.getMoneyDonationById(id);

                reset({
                    amount: donation.amount ?? "",
                    paymentMode: donation.paymentMode ?? "UPI",
                    transactionReference:
                        donation.transactionReference ?? "",
                    description: donation.description ?? "",
                    status: donation.status ?? "PENDING",
                });

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load this money donation."
                );

                console.error(error);

                navigate("/donor/money-donations", { replace: true });

            } finally {

                setLoading(false);

            }
        };

        loadDonation();

    }, [id, isEditMode, navigate, reset]);

    const onSubmit = async (data) => {

        try {

            setSubmitting(true);

            const payload = {
                ...data,
                amount: Number(data.amount),
                transactionReference:
                    data.transactionReference?.trim() || null,
            };

            if (isEditMode) {
                await donorService.updateMoneyDonation(id, payload);
                toast.success("Money donation updated successfully.");
            } else {
                await donorService.createMoneyDonation(payload);
                toast.success("Money donation added successfully.");
            }

            navigate("/donor/money-donations");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save money donation."
            );

            console.error(error);

        } finally {

            setSubmitting(false);

        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-[28rem] w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-heading md:text-3xl">
                        {isEditMode
                            ? "Edit Money Donation"
                            : "Add Money Donation"}
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Record the amount, payment mode and transaction
                        reference.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate("/donor/money-donations")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to list
                </Button>

            </div>

            <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Amount */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Amount (INR) *
                            </label>

                            <Input
                                type="number"
                                step="0.01"
                                min="1"
                                placeholder="e.g., 2500"
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: {
                                        value: 1,
                                        message: "Amount must be at least 1",
                                    },
                                })}
                            />

                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.amount.message}
                                </p>
                            )}
                        </div>

                        {/* Payment Mode */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Payment Mode *
                            </label>

                            <select
                                className={selectClassName}
                                {...register("paymentMode", {
                                    required: "Payment mode is required",
                                })}
                            >
                                {PAYMENT_MODE_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {errors.paymentMode && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.paymentMode.message}
                                </p>
                            )}
                        </div>

                        {/* Transaction Reference */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Transaction Reference
                                {referenceRequired ? " *" : ""}
                            </label>

                            <Input
                                placeholder="e.g., UPI-2026-08-05-99182"
                                {...register("transactionReference", {
                                    validate: (value) => {

                                        if (!referenceRequired) {
                                            return true;
                                        }

                                        return (
                                            (value && value.trim().length > 0) ||
                                            "Transaction reference is required for this payment mode"
                                        );
                                    },
                                    maxLength: {
                                        value: 100,
                                        message:
                                            "Transaction reference must not exceed 100 characters",
                                    },
                                })}
                            />

                            <p className="mt-1 text-xs text-muted-foreground">
                                Required for every mode except Cash. Must be
                                unique across your donations.
                            </p>

                            {errors.transactionReference && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.transactionReference.message}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Status *
                            </label>

                            <select
                                className={selectClassName}
                                {...register("status", {
                                    required: "Status is required",
                                })}
                            >
                                {DONATION_STATUS_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <Textarea
                                rows={4}
                                placeholder="Purpose of this contribution..."
                                {...register("description", {
                                    maxLength: {
                                        value: 1000,
                                        message:
                                            "Description must not exceed 1000 characters",
                                    },
                                })}
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                            {submitting
                                ? "Saving..."
                                : isEditMode
                                    ? "Update Donation"
                                    : "Add Donation"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            disabled={submitting}
                            onClick={() => navigate("/donor/money-donations")}
                        >
                            Cancel
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}
