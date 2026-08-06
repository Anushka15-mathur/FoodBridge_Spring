import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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

// Reusable delete confirmation for every donor donation type.
// `onDelete` must return a promise (the donorService call).
export default function DeleteDonationDialog({
                                                 label,
                                                 onDelete,
                                                 onDeleted,
                                                 triggerVariant = "destructive",
                                             }) {

    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {

        try {

            setDeleting(true);

            await onDelete();

            toast.success("Donation deleted successfully.");

            onDeleted?.();

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

        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button
                    size="icon"
                    variant={triggerVariant}
                    disabled={deleting}
                    aria-label="Delete donation"
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
                            {label}
                        </span>{" "}
                        from your donation history. This action cannot
                        be undone.
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
    );
}
