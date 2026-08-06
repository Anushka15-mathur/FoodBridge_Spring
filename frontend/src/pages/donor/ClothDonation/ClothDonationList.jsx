import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import {
    DONATION_STATUS_OPTIONS,
    formatDateTime,
    selectClassName,
} from "../../../constants/donorOptions";

import { Button } from "../../../components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

import DonorStatusBadge from "../../../components/donor/DonorStatusBadge";
import DeleteDonationDialog from "../../../components/donor/DeleteDonationDialog";
import DonorTableSkeleton from "../../../components/donor/DonorTableSkeleton";
import EmptyState from "../../../components/admin/EmptyState";

export default function ClothDonationList() {

    const navigate = useNavigate();

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");

    const fetchDonations = useCallback(async () => {

        try {

            setLoading(true);

            const response = await donorService.getClothDonations(
                statusFilter || undefined
            );

            setDonations(response ?? []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load cloth donations."
            );

            console.error(error);

        } finally {

            setLoading(false);

        }
    }, [statusFilter]);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const handleDeleted = (id) => {
        setDonations((previous) =>
            previous.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="rounded-xl border bg-card shadow-sm">

            <div className="flex flex-col gap-4 border-b p-4 md:p-6 lg:flex-row lg:items-end lg:justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-heading">
                        Cloth Donations
                    </h2>

                    <p className="mt-1 text-muted-foreground">
                        Every clothing donation you have listed.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">

                    <select
                        className={`${selectClassName} w-auto min-w-44`}
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        aria-label="Filter by status"
                    >
                        <option value="">All statuses</option>

                        {DONATION_STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <Button
                        onClick={() => navigate("/donor/cloth-donations/new")}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Cloth Donation
                    </Button>

                </div>

            </div>

            {loading ? (

                <DonorTableSkeleton rows={5} columns={7} />

            ) : donations.length === 0 ? (

                <EmptyState
                    title="No Cloth Donations Yet"
                    description="You haven't listed any clothing donations so far."
                />

            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Cloth Type</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Condition</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
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
                                        {donation.clothType}
                                    </TableCell>

                                    <TableCell>
                                        {donation.category}
                                    </TableCell>

                                    <TableCell>
                                        {donation.quantity}
                                    </TableCell>

                                    <TableCell>
                                        {donation.clothCondition}
                                    </TableCell>

                                    <TableCell>
                                        <DonorStatusBadge
                                            status={donation.status}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {formatDateTime(donation.createdAt)}
                                    </TableCell>

                                    <TableCell className="text-right">

                                        <div className="flex justify-end gap-2">

                                            <Button
                                                size="icon"
                                                variant="outline"
                                                aria-label="View donation"
                                                onClick={() =>
                                                    navigate(
                                                        `/donor/cloth-donations/${donation.id}`
                                                    )
                                                }
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                aria-label="Edit donation"
                                                className="bg-amber-500 text-white hover:bg-amber-600"
                                                onClick={() =>
                                                    navigate(
                                                        `/donor/cloth-donations/${donation.id}/edit`
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <DeleteDonationDialog
                                                label={donation.clothType}
                                                onDelete={() =>
                                                    donorService.deleteClothDonation(
                                                        donation.id
                                                    )
                                                }
                                                onDeleted={() =>
                                                    handleDeleted(donation.id)
                                                }
                                            />

                                        </div>

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
