import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import donationService from "../../services/donationService";

import { Button } from "../ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

import EditDonationDialog from "./EditDonationDialog";

export default function DonationRowActions({
    donation,
    onUpdated,
    onDeleted,
}) {

    const navigate = useNavigate();

    const [editOpen, setEditOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {

        try {

            setDeleting(true);

            await donationService.deleteDonation(donation.id);

            toast.success("Donation deleted successfully.");

            onDeleted?.(donation.id);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete donation."
            );

            console.error(error);

        } finally {

            setDeleting(false);

        }
    };

    return (
        <>
            <div className="flex justify-end gap-2">

                {/* View */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                        navigate(`/restaurant/donations/${donation.id}`)
                    }
                >
                    <Eye className="h-4 w-4" />
                </Button>

                {/* Edit */}
                <Button
                    size="icon"
                    variant="secondary"
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    onClick={() => setEditOpen(true)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>

                {/* Delete */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            size="icon"
                            variant="destructive"
                            disabled={deleting}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete Donation?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                This will permanently remove{" "}
                                <span className="font-medium text-foreground">
                                    {donation.foodName}
                                </span>{" "}
                                from your donation history. This action
                                cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={deleting}>
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>

            <EditDonationDialog
                donation={donation}
                open={editOpen}
                onOpenChange={setEditOpen}
                onUpdated={(updated) => {
                    onUpdated?.(updated);
                    setEditOpen(false);
                }}
            />
        </>
    );
}
