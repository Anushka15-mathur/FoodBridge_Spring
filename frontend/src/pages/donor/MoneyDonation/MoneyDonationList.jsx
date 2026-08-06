import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import donorService from "../../../services/donorService";
import {
    DONATION_STATUS_OPTIONS,
    formatCurrency,
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

export default function MoneyDonationList() {

    const navigate = useNavigate();

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");

    const fetchDonations = useCallback(async () => {

        try {

            setLoading(true);

            const response = await donorService.getMoneyDonations(
                statusFilter || undefined
            );

            setDonations(response ?? []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load money donations."
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
                        Money Donations
                    </h2>

                    <p className="mt-1 text-muted-foreground">
                        Every financial contribution you have made.
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
                        onClick={() => navigate("/donor/money-donations/new")}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Money Donation
                    </Button>

                </div>

            </div>

            {loading ? (

                <DonorTableSkeleton rows={5} columns={6} />

            ) : donations.length === 0 ? (

                <EmptyState
                    title="No Money Donations Yet"
                    description="You haven't recorded any financial contributions so far."
                />

            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Mode</TableHead>
                                <TableHead>Transaction Reference</TableHead>
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
                                        {formatCurrency(donation.amount)}
                                    </TableCell>

                                    <TableCell>
                                        {donation.paymentMode}
                                    </TableCell>

                                    <TableCell className="max-w-56 truncate">
                                        {donation.transactionReference || "-"}
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
                                                        `/donor/money-donations/${donation.id}`
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
                                                        `/donor/money-donations/${donation.id}/edit`
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <DeleteDonationDialog
                                                label={formatCurrency(
                                                    donation.amount
                                                )}
                                                onDelete={() =>
                                                    donorService.deleteMoneyDonation(
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
