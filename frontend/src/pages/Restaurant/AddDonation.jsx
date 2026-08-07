import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import donationService from "../../services/donationService";
import restaurantService from "../../services/restaurantService";

import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const toDateTimeLocal = (date) => {
    const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60_000
    );
    return localDate.toISOString().slice(0, 16);
};

const selectClassName =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export default function AddDonation({ donorMode = false }) {

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [donationType, setDonationType] = useState("FOOD");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            foodName: "",
            donationType: "FOOD",
            amount: "",
            currency: "INR",
            donationPurpose: "",
            quantity: "",
            quantityUnit: "KG",
            estimatedMeals: "",
            foodType: "VEG",
            foodCondition: "FRESH",
            preparedAt: toDateTimeLocal(new Date()),
            expiryTime: "",
            pickupAddress: "",
            description: "",
            specialInstructions: "",
        },
    });

    useEffect(() => {
        if (donorMode) return;
        const loadRestaurantAddress = async () => {
            try {
                const profile = await restaurantService.getProfile();
                const address = [
                    profile.address,
                    profile.city,
                    profile.state,
                    profile.pincode,
                ]
                    .filter(Boolean)
                    .join(", ");

                if (address) {
                    setValue("pickupAddress", address);
                }
            } catch {
                // The form remains usable if profile prefill fails.
            }
        };

        loadRestaurantAddress();
    }, [setValue, donorMode]);

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);

            const payload = donationType === "MONEY"
                ? { donationType, amount: Number(data.amount), currency: data.currency || "INR", donationPurpose: data.donationPurpose, description: data.description }
                : { ...data, donationType, quantity: Number(data.quantity), estimatedMeals: Number(data.estimatedMeals) };
            await donationService.createDonation(payload);

            toast.success("Donation added successfully.");
            reset();
            navigate(donorMode ? "/donor/donations" : "/restaurant/donations");
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
                    {donorMode ? "Create Donation" : "Add Food Donation"}
                </h1>
                <p className="mt-1 text-muted-foreground">
                    {donorMode ? "Choose food or money and provide the relevant details." : "Enter the food, timing, quantity, and pickup details."}
                </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {donorMode && (
                        <div className="rounded-lg border p-4">
                            <p className="mb-3 font-medium">Donation Type</p>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2"><input type="radio" checked={donationType === "FOOD"} onChange={() => setDonationType("FOOD")} /> Food Donation</label>
                                <label className="flex items-center gap-2"><input type="radio" checked={donationType === "MONEY"} onChange={() => setDonationType("MONEY")} /> Money Donation</label>
                            </div>
                        </div>
                    )}
                    {donationType === "MONEY" ? (
                        <div className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2"><div><label className="mb-2 block font-medium">Amount *</label><Input type="number" min="0.01" step="0.01" {...register("amount", { required: "Amount is required", min: { value: 0.01, message: "Amount must be greater than zero" } })} />{errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>}</div><div><label className="mb-2 block font-medium">Currency</label><Input value="INR" readOnly {...register("currency")} /></div></div>
                            <div><label className="mb-2 block font-medium">Purpose</label><Input placeholder="Optional donation purpose" {...register("donationPurpose")} /></div>
                            <div><label className="mb-2 block font-medium">Description</label><Textarea rows={4} placeholder="Optional description" {...register("description")} /></div>
                        </div>
                    ) : <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium">
                                Food Name *
                            </label>
                            <Input
                                placeholder="e.g., Vegetable Biryani"
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

                        <div>
                            <label className="mb-2 block font-medium">
                                Food Type *
                            </label>
                            <select
                                className={selectClassName}
                                {...register("foodType", {
                                    required: "Food type is required",
                                })}
                            >
                                <option value="VEG">Vegetarian</option>
                                <option value="NON_VEG">Non-Vegetarian</option>
                                <option value="VEGAN">Vegan</option>
                                <option value="JAIN">Jain</option>
                                <option value="MIXED">Mixed</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Quantity *
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="10"
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0.01,
                                        message: "Quantity must be greater than zero",
                                    },
                                })}
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Quantity Unit *
                            </label>
                            <select
                                className={selectClassName}
                                {...register("quantityUnit", {
                                    required: "Quantity unit is required",
                                })}
                            >
                                <option value="KG">Kilogram</option>
                                <option value="GRAM">Gram</option>
                                <option value="LITER">Liter</option>
                                <option value="PLATE">Plate</option>
                                <option value="PACKET">Packet</option>
                                <option value="BOX">Box</option>
                                <option value="PIECES">Pieces</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Estimated Meals *
                            </label>
                            <Input
                                type="number"
                                min="1"
                                placeholder="25"
                                {...register("estimatedMeals", {
                                    required: "Estimated meals is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Estimated meals must be at least 1",
                                    },
                                })}
                            />
                            {errors.estimatedMeals && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.estimatedMeals.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Food Condition *
                            </label>
                            <select
                                className={selectClassName}
                                {...register("foodCondition", {
                                    required: "Food condition is required",
                                })}
                            >
                                <option value="FRESH">Fresh</option>
                                <option value="HOT">Hot</option>
                                <option value="COLD">Cold</option>
                                <option value="FROZEN">Frozen</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Prepared At *
                            </label>
                            <Input
                                type="datetime-local"
                                {...register("preparedAt", {
                                    required: "Prepared time is required",
                                })}
                            />
                            {errors.preparedAt && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.preparedAt.message}
                                </p>
                            )}
                        </div>

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

                    <div>
                        <label className="mb-2 block font-medium">
                            Pickup Address *
                        </label>
                        <Input
                            placeholder="Restaurant pickup address"
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

                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>
                        <Textarea
                            rows={4}
                            placeholder="Describe the donated food"
                            {...register("description")}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium">
                            Special Instructions
                        </label>
                        <Textarea
                            rows={3}
                            placeholder="Packaging, pickup, allergy, or handling instructions"
                            {...register("specialInstructions")}
                        />
                    </div>
                    </>}

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
