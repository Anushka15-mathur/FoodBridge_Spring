import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import donationService from "../../services/donationService";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const selectClassName =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const dateTimeValue = (value) => value ? String(value).slice(0, 16) : "";

export default function EditDonationDialog({
    donation,
    open,
    onOpenChange,
    onUpdated,
}) {

    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        if (donation) {
            reset({
                foodName: donation.foodName ?? "",
                quantity: donation.quantity ?? "",
                quantityUnit: donation.quantityUnit ?? "KG",
                estimatedMeals: donation.estimatedMeals ?? "",
                foodType: donation.foodType ?? "VEG",
                foodCondition: donation.foodCondition ?? "FRESH",
                preparedAt: dateTimeValue(donation.preparedAt),
                expiryTime: dateTimeValue(donation.expiryTime),
                pickupAddress: donation.pickupAddress ?? "",
                description: donation.description ?? "",
                specialInstructions: donation.specialInstructions ?? "",
            });
        }
    }, [donation, reset]);

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);

            const updated = await donationService.updateDonation(
                donation.id,
                {
                    ...data,
                    quantity: Number(data.quantity),
                    estimatedMeals: Number(data.estimatedMeals),
                }
            );

            toast.success("Donation updated successfully.");
            onUpdated?.(updated ?? { ...donation, ...data });
            onOpenChange(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update donation."
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Donation</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Food Name
                            </label>
                            <Input {...register("foodName", { required: true })} />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Food Type
                            </label>
                            <select className={selectClassName} {...register("foodType")}>
                                <option value="VEG">Vegetarian</option>
                                <option value="NON_VEG">Non-Vegetarian</option>
                                <option value="VEGAN">Vegan</option>
                                <option value="JAIN">Jain</option>
                                <option value="MIXED">Mixed</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Quantity
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                min="0.01"
                                {...register("quantity", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Quantity Unit
                            </label>
                            <select className={selectClassName} {...register("quantityUnit")}>
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
                            <label className="mb-2 block text-sm font-medium">
                                Estimated Meals
                            </label>
                            <Input
                                type="number"
                                min="1"
                                {...register("estimatedMeals", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Food Condition
                            </label>
                            <select className={selectClassName} {...register("foodCondition")}>
                                <option value="FRESH">Fresh</option>
                                <option value="HOT">Hot</option>
                                <option value="COLD">Cold</option>
                                <option value="FROZEN">Frozen</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Prepared At
                            </label>
                            <Input
                                type="datetime-local"
                                {...register("preparedAt", { required: true })}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Expiry Time
                            </label>
                            <Input
                                type="datetime-local"
                                {...register("expiryTime", { required: true })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Pickup Address
                        </label>
                        <Input {...register("pickupAddress", { required: true })} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>
                        <Textarea rows={3} {...register("description")} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Special Instructions
                        </label>
                        <Textarea rows={3} {...register("specialInstructions")} />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
