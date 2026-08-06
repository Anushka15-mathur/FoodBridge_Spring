import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import {
    DONATION_STATUS_OPTIONS,
    QUANTITY_UNIT_OPTIONS,
    selectClassName,
    toDateTimeLocal,
} from "../../../constants/donorOptions";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export default function FoodDonationForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(isEditMode);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            foodName: "",
            quantity: "",
            unit: "KG",
            freshUntil: "",
            pickupAddress: "",
            description: "",
            status: "PENDING",
        },
    });

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        const loadDonation = async () => {

            try {

                setLoading(true);

                const donation = await donorService.getFoodDonationById(id);

                reset({
                    foodName: donation.foodName ?? "",
                    quantity: donation.quantity ?? "",
                    unit: donation.unit ?? "KG",
                    freshUntil: donation.freshUntil
                        ? toDateTimeLocal(new Date(donation.freshUntil))
                        : "",
                    pickupAddress: donation.pickupAddress ?? "",
                    description: donation.description ?? "",
                    status: donation.status ?? "PENDING",
                });

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load this food donation."
                );

                console.error(error);

                navigate("/donor/food-donations", { replace: true });

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
                quantity: Number(data.quantity),
            };

            if (isEditMode) {
                await donorService.updateFoodDonation(id, payload);
                toast.success("Food donation updated successfully.");
            } else {
                await donorService.createFoodDonation(payload);
                toast.success("Food donation added successfully.");
            }

            navigate("/donor/food-donations");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save food donation."
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
                <Skeleton className="h-[32rem] w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-heading md:text-3xl">
                        {isEditMode
                            ? "Edit Food Donation"
                            : "Add Food Donation"}
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Enter the food details, freshness window and pickup
                        address.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate("/donor/food-donations")}
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

                        {/* Food Name */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Food Name *
                            </label>

                            <Input
                                placeholder="e.g., Vegetable Biryani"
                                {...register("foodName", {
                                    required: "Food name is required",
                                    maxLength: {
                                        value: 150,
                                        message:
                                            "Food name must not exceed 150 characters",
                                    },
                                })}
                            />

                            {errors.foodName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.foodName.message}
                                </p>
                            )}
                        </div>

                        {/* Unit */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Unit *
                            </label>

                            <select
                                className={selectClassName}
                                {...register("unit", {
                                    required: "Unit is required",
                                })}
                            >
                                {QUANTITY_UNIT_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {errors.unit && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.unit.message}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Quantity *
                            </label>

                            <Input
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="e.g., 12"
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    min: {
                                        value: 0.01,
                                        message:
                                            "Quantity must be greater than zero",
                                    },
                                })}
                            />

                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        {/* Fresh Until */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Fresh Until *
                            </label>

                            <Input
                                type="datetime-local"
                                min={toDateTimeLocal(new Date())}
                                {...register("freshUntil", {
                                    required:
                                        "Fresh until date and time is required",
                                    validate: (value) =>
                                        new Date(value) > new Date() ||
                                        "Fresh until must be in the future",
                                })}
                            />

                            {errors.freshUntil && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.freshUntil.message}
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

                        {/* Pickup Address */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-medium">
                                Pickup Address *
                            </label>

                            <Input
                                placeholder="e.g., 22 MG Road, Pune 411001"
                                {...register("pickupAddress", {
                                    required: "Pickup address is required",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Pickup address must be at least 5 characters",
                                    },
                                    maxLength: {
                                        value: 255,
                                        message:
                                            "Pickup address must not exceed 255 characters",
                                    },
                                })}
                            />

                            {errors.pickupAddress && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.pickupAddress.message}
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
                                placeholder="Packaging, allergens, serving notes..."
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
                            onClick={() => navigate("/donor/food-donations")}
                        >
                            Cancel
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}
