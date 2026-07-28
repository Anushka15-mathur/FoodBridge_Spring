import { toast } from "sonner";

import adminService from "../../services/adminService";

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

export default function ConfirmActionDialog({
  children,
  user,
  action,
  refreshUsers,
}) {

  const handleAction = async () => {

    try {

      if (action === "approve") {

        await adminService.approveUser(user.id);

        toast.success("User approved successfully.");

      } else {

        await adminService.rejectUser(user.id);

        toast.success("User rejected successfully.");

      }

      refreshUsers();

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );

    }

  };

  return (

    <AlertDialog>

      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            {action === "approve"
              ? "Approve User?"
              : "Reject User?"}

          </AlertDialogTitle>

          <AlertDialogDescription>

            {action === "approve"
              ? "The user will be able to access FoodBridge after approval."
              : "The registration request will be rejected."}

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleAction}>

            Confirm

          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}