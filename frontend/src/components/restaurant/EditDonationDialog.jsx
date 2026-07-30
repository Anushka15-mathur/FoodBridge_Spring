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

    // Populate the form whenever a new donation is opened for editing
    useEffect(() => {

        if (donation) {

            reset({
                foodName: donation.foodName ?? "",
                quantity: donation.quantity ?? "",
                foodType: donation.foodType ?? "",
                expiryTime: donation.expiryTime ?? "",
                pickupAddress: donation.pickupAddress ?? "",
                description: donation.description ?? "",
            });

        }

    }, [donation, reset]);

    const onSubmit = async (data) => {

        try {

            setSubmitting(true);

            const updated = await donationService.updateDonation(
                donation.id,
                data
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

            <DialogContent className="max-w-lg">

                <DialogHeader>
                    <DialogTitle>
                        Edit Donation
                    </DialogTitle>
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

                            <Input
                                {...register("foodName", { required: true })}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Quantity
                            </label>

                            <Input
                                {...register("quantity", { required: true })}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Food Type
                            </label>

                            <Input
                                placeholder="e.g., Vegetarian"
                                {...register("foodType")}
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

                        <Input
                            {...register("pickupAddress", { required: true })}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>

                        <Textarea
                            rows={3}
                            {...register("description")}
                        />
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

                        <Button
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );
}
