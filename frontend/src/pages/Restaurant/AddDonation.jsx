import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import donationService from "../../services/donationService";

import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

export default function AddDonation() {

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            foodName: "",
            quantity: "",
            foodType: "",
            expiryTime: "",
            pickupAddress: "",
            description: "",
        },
    });

    const onSubmit = async (data) => {

        try {

            setSubmitting(true);

            await donationService.createDonation(data);

            toast.success("Donation added successfully.");

            reset();

            navigate("/restaurant/donations");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add donation."
            );

            console.error(error);

        } finally {

            setSubmitting(false);

        }
    };

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Add Food Donation
                </h1>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">

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
                                placeholder=""
                                {...register("foodName", {
                                    required: "Food name is required",
                                })}
                            />

                            {errors.foodName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.foodName.message}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Quantity *
                            </label>

                            <Input
                                placeholder=""
                                {...register("quantity", {
                                    required: "Quantity is required",
                                })}
                            />

                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        {/* Food Type */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Food Type
                            </label>

                            <Input
                                placeholder="e.g., Vegetarian"
                                {...register("foodType")}
                            />
                        </div>

                        {/* Expiry Time */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Expiry Time *
                            </label>

                            <Input
                                type="datetime-local"
                                {...register("expiryTime", {
                                    required: "Expiry time is required",
                                })}
                            />

                            {errors.expiryTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.expiryTime.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Pickup Address */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Pickup Address *
                        </label>

                        <Input
                            placeholder=""
                            {...register("pickupAddress", {
                                required: "Pickup address is required",
                            })}
                        />

                        {errors.pickupAddress && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.pickupAddress.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>

                        <Textarea
                            rows={4}
                            {...register("description")}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        {submitting ? "Adding..." : "Add Donation"}
                    </Button>

                </form>

            </div>

        </div>
    );
}
