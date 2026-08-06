import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import {
    CLOTH_CATEGORY_OPTIONS,
    CLOTH_CONDITION_OPTIONS,
    DONATION_STATUS_OPTIONS,
    selectClassName,
} from "../../../constants/donorOptions";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export default function ClothDonationForm() {

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
            clothType: "",
            category: "UNISEX",
            quantity: "",
            clothCondition: "GENTLY_USED",
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

                const donation = await donorService.getClothDonationById(id);

                reset({
                    clothType: donation.clothType ?? "",
                    category: donation.category ?? "UNISEX",
                    quantity: donation.quantity ?? "",
                    clothCondition:
                        donation.clothCondition ?? "GENTLY_USED",
                    pickupAddress: donation.pickupAddress ?? "",
                    description: donation.description ?? "",
                    status: donation.status ?? "PENDING",
                });

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load this cloth donation."
                );

                console.error(error);

                navigate("/donor/cloth-donations", { replace: true });

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
                await donorService.updateClothDonation(id, payload);
                toast.success("Cloth donation updated successfully.");
            } else {
                await donorService.createClothDonation(payload);
                toast.success("Cloth donation added successfully.");
            }

            navigate("/donor/cloth-donations");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to save cloth donation."
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
                            ? "Edit Cloth Donation"
                            : "Add Cloth Donation"}
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Enter the clothing details, condition and pickup
                        address.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate("/donor/cloth-donations")}
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

                        {/* Cloth Type */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Cloth Type *
                            </label>

                            <Input
                                placeholder="e.g., Winter Jacket"
                                {...register("clothType", {
                                    required: "Cloth type is required",
                                    maxLength: {
                                        value: 100,
                                        message:
                                            "Cloth type must not exceed 100 characters",
                                    },
                                })}
                            />

                            {errors.clothType && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.clothType.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Category *
                            </label>

                            <select
                                className={selectClassName}
                                {...register("category", {
                                    required: "Category is required",
                                })}
                            >
                                {CLOTH_CATEGORY_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Quantity (pieces) *
                            </label>

                            <Input
                                type="number"
                                step="1"
                                min="1"
                                placeholder="e.g., 15"
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    min: {
                                        value: 1,
                                        message: "Quantity must be at least 1",
                                    },
                                    max: {
                                        value: 100000,
                                        message:
                                            "Quantity must not exceed 100000",
                                    },
                                })}
                            />

                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Condition *
                            </label>

                            <select
                                className={selectClassName}
                                {...register("clothCondition", {
                                    required: "Condition is required",
                                })}
                            >
                                {CLOTH_CONDITION_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {errors.clothCondition && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.clothCondition.message}
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
                                placeholder="Sizes, packaging, washing notes..."
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
                            onClick={() => navigate("/donor/cloth-donations")}
                        >
                            Cancel
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}
