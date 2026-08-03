import { useEffect, useState } from "react";
import { toast } from "sonner";

import donationService from "../../services/donationService";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

import DonationStatusBadge from "../../components/restaurant/DonationStatusBadge";
import DonationRowActions from "../../components/restaurant/DonationRowActions";
import EmptyState from "../../components/admin/EmptyState";

const formatExpiry = (value) => {

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

export default function DonationHistory() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDonations = async () => {

        try {

            setLoading(true);

            const response = await donationService.getMyDonations();

            setDonations(response ?? []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load donation history."
            );

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleUpdated = (updated) => {

        setDonations((previous) =>
            previous.map((item) =>
                item.id === updated.id ? { ...item, ...updated } : item
            )
        );

    };

    const handleDeleted = (id) => {

        setDonations((previous) =>
            previous.filter((item) => item.id !== id)
        );

    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">
                    Loading donation history...
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card shadow-sm">

            {/* Header */}
            <div className="border-b p-6">

                <h2 className="text-2xl font-bold">
                    Donation History
                </h2>

                <p className="mt-1 text-muted-foreground">
                    All donations you've listed on FoodBridge.
                </p>

            </div>

            {donations.length === 0 ? (

                <EmptyState
                    title="No Donations Yet"
                    description="You haven't added any food donations yet."
                />

            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead>
                                    Food Name
                                </TableHead>

                                <TableHead>
                                    Qty
                                </TableHead>

                                <TableHead>
                                    Type
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead>
                                    Expiry
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {donations.map((donation) => (

                                <TableRow
                                    key={donation.id}
                                    className="transition-colors hover:bg-muted/40"
                                >

                                    <TableCell className="font-medium">
                                        {donation.foodName}
                                    </TableCell>

                                    <TableCell>
                                        {donation.quantity} {donation.quantityUnit}
                                    </TableCell>

                                    <TableCell>
                                        {donation.foodType}
                                    </TableCell>

                                    <TableCell>
                                        <DonationStatusBadge
                                            status={donation.status}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {formatExpiry(donation.expiryTime)}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DonationRowActions
                                            donation={donation}
                                            onUpdated={handleUpdated}
                                            onDeleted={handleDeleted}
                                        />
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>

            )}

        </div>
    );
}
