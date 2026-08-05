import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Clock, FileText, MapPin, Utensils } from "lucide-react";

import donationService from "../../services/donationService";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import DonationStatusBadge from "../../components/restaurant/DonationStatusBadge";

const formatDate = (value) => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const readableValue = (value) =>
    value ? String(value).replaceAll("_", " ") : "-";

export default function DonationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                setLoading(true);
                setError(false);
                setDonation(await donationService.getDonationById(id));
            } catch (err) {
                setError(true);
                toast.error(
                    err.response?.data?.message ||
                    "Failed to load donation details."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonation();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">
                    Loading donation details...
                </p>
            </div>
        );
    }

    if (error || !donation) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <p className="text-destructive">
                    Unable to load this donation.
                </p>
                <Button
                    variant="outline"
                    onClick={() => navigate("/restaurant/donations")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Donation History
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Button
                variant="outline"
                onClick={() => navigate("/restaurant/donations")}
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Donation History
            </Button>

            <Card>
                <CardContent className="space-y-6 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-2xl font-bold">
                            {donation.foodName}
                        </h1>
                        <DonationStatusBadge status={donation.status} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Quantity
                            </p>
                            <p className="font-medium">
                                {donation.quantity} {donation.quantityUnit}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Remaining
                            </p>
                            <p className="font-medium">
                                {donation.remainingQuantity} {donation.quantityUnit}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Food Type
                            </p>
                            <p className="font-medium capitalize">
                                {readableValue(donation.foodType).toLowerCase()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Condition
                            </p>
                            <p className="font-medium capitalize">
                                {readableValue(donation.foodCondition).toLowerCase()}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold">
                            <Utensils className="h-4 w-4" />
                            Meal Estimate
                        </h3>
                        <p className="text-muted-foreground">
                            Approximately {donation.estimatedMeals} meals
                        </p>
                    </div>

                    <div className="grid gap-6 border-t pt-6 sm:grid-cols-2">
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                <Clock className="h-4 w-4" />
                                Prepared At
                            </h3>
                            <p className="text-muted-foreground">
                                {formatDate(donation.preparedAt)}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                <Clock className="h-4 w-4" />
                                Expiry Time
                            </h3>
                            <p className="text-muted-foreground">
                                {formatDate(donation.expiryTime)}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                            <MapPin className="h-4 w-4" />
                            Pickup Address
                        </h3>
                        <p className="text-muted-foreground">
                            {donation.pickupAddress}
                        </p>
                    </div>

                    {donation.description && (
                        <div className="border-t pt-6">
                            <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                <FileText className="h-4 w-4" />
                                Description
                            </h3>
                            <p className="text-muted-foreground">
                                {donation.description}
                            </p>
                        </div>
                    )}

                    {donation.specialInstructions && (
                        <div className="border-t pt-6">
                            <h3 className="mb-2 flex items-center gap-2 font-semibold">
                                <FileText className="h-4 w-4" />
                                Special Instructions
                            </h3>
                            <p className="text-muted-foreground">
                                {donation.specialInstructions}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
