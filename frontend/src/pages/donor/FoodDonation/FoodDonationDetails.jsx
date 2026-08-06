import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import { formatDateTime } from "../../../constants/donorOptions";

import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

import DonorStatusBadge from "../../../components/donor/DonorStatusBadge";
import DeleteDonationDialog from "../../../components/donor/DeleteDonationDialog";

const DetailRow = ({ label, children }) => (
    <div className="border-b py-4 last:border-b-0">
        <p className="text-sm text-muted-foreground">
            {label}
        </p>
        <div className="mt-1 font-medium text-heading">
            {children}
        </div>
    </div>
);

export default function FoodDonationDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDonation = async () => {

            try {

                setLoading(true);

                const response = await donorService.getFoodDonationById(id);

                setDonation(response);

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

    }, [id, navigate]);

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!donation) {
        return null;
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-heading md:text-3xl">
                        {donation.foodName}
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Food donation #{donation.id}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">

                    <Button
                        variant="outline"
                        onClick={() => navigate("/donor/food-donations")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        className="bg-amber-500 text-white hover:bg-amber-600"
                        onClick={() =>
                            navigate(`/donor/food-donations/${donation.id}/edit`)
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                    <DeleteDonationDialog
                        label={donation.foodName}
                        onDelete={() =>
                            donorService.deleteFoodDonation(donation.id)
                        }
                        onDeleted={() =>
                            navigate("/donor/food-donations", { replace: true })
                        }
                    />

                </div>

            </div>

            <div className="grid gap-5 lg:grid-cols-2">

                <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

                    <h2 className="text-lg font-bold text-heading">
                        Donation Details
                    </h2>

                    <div className="mt-3">

                        <DetailRow label="Food Name">
                            {donation.foodName}
                        </DetailRow>

                        <DetailRow label="Quantity">
                            {donation.quantity} {donation.unit}
                        </DetailRow>

                        <DetailRow label="Fresh Until">
                            {formatDateTime(donation.freshUntil)}
                        </DetailRow>

                        <DetailRow label="Status">
                            <DonorStatusBadge status={donation.status} />
                        </DetailRow>

                    </div>

                </div>

                <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">

                    <h2 className="text-lg font-bold text-heading">
                        Pickup & Notes
                    </h2>

                    <div className="mt-3">

                        <DetailRow label="Pickup Address">
                            {donation.pickupAddress}
                        </DetailRow>

                        <DetailRow label="Description">
                            {donation.description || "-"}
                        </DetailRow>

                        <DetailRow label="Created At">
                            {formatDateTime(donation.createdAt)}
                        </DetailRow>

                        <DetailRow label="Last Updated">
                            {formatDateTime(donation.updatedAt)}
                        </DetailRow>

                    </div>

                </div>

            </div>

        </div>
    );
}
