import { useState } from "react";
import { Eye, Check, X, Ban } from "lucide-react";
import { toast } from "sonner";

import adminService from "../../services/adminService";

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

import UserDetailsSheet from "./UserDetailsSheet";

export default function UserRowActions({
  user,
  pageData,
  setPageData,
  refreshUsers,
}) {
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const removeUser = () => {
    setPageData((previous) => ({
      ...previous,
      content: previous.content.filter((u) => u.id !== user.id),
      totalElements: Math.max(previous.totalElements - 1, 0),
    }));
  };

  const handleAction = async (action) => {
    try {
      setLoading(true);

      switch (action) {
        case "approve":
          await adminService.approveUser(user.id);
          toast.success("User approved successfully.");
          break;

        case "reject":
          await adminService.rejectUser(user.id);
          toast.success("User rejected successfully.");
          break;

        case "suspend":
          await adminService.suspendUser(user.id);
          toast.success("User suspended successfully.");
          break;

        default:
          return;
      }

      removeUser();
      setSheetOpen(false);

      const remainingUsers = pageData.content.length - 1;

      if (remainingUsers === 0 && pageData.page > 0) {
        refreshUsers(pageData.page - 1);
      } else {
        refreshUsers(pageData.page);
      }
      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Action failed."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isPending = user.status === "PENDING";
  const canSuspend = user.status === "APPROVED" || user.status === "REJECTED";

  return (
    <>
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setSheetOpen(true)}
          className="h-11 w-11 min-w-[2.75rem] rounded-xl"
        >
          <Eye className="h-4 w-4" />
        </Button>

        {isPending && (
          <>
            <ActionDialog
              action="approve"
              loading={loading}
              onConfirm={() => handleAction("approve")}
              button={
                <Button
                  size="icon"
                  disabled={loading}
                  className="h-11 w-11 min-w-[2.75rem] rounded-xl bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4" />
                </Button>
              }
            />

            <ActionDialog
              action="reject"
              loading={loading}
              onConfirm={() => handleAction("reject")}
              button={
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={loading}
                  className="h-11 w-11 min-w-[2.75rem] rounded-xl"
                >
                  <X className="h-4 w-4" />
                </Button>
              }
            />
          </>
        )}

        {canSuspend && (
          <ActionDialog
            action="suspend"
            loading={loading}
            onConfirm={() => handleAction("suspend")}
            button={
              <Button
                size="icon"
                variant="secondary"
                disabled={loading}
                className="h-11 w-11 min-w-[2.75rem] rounded-xl"
              >
                <Ban className="h-4 w-4" />
              </Button>
            }
          />
        )}
      </div>

      <UserDetailsSheet
        userId={user.id}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onApprove={() => handleAction("approve")}
        onReject={() => handleAction("reject")}
        actionLoading={loading}
      />
    </>
  );
}

function ActionDialog({ action, button, onConfirm, loading }) {
  const [open, setOpen] = useState(false);
  const approve = action === "approve";
  const reject = action === "reject";

  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {button}
      </AlertDialogTrigger>

      <AlertDialogContent className="gap-6 rounded-2xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>{approve ? "Approve User" : reject ? "Reject User" : "Suspend User"}</AlertDialogTitle>

          <AlertDialogDescription>
            {approve
              ? "This user will immediately gain access to FoodBridge after approval."
              : reject
              ? "This registration request will be rejected."
              : "The user will no longer be able to log in."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="-mx-6 -mb-6 border-0 bg-transparent px-6 pb-6 pt-0">
          <AlertDialogCancel disabled={loading} className="border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={approve ? "bg-primary text-white hover:bg-primary-hover hover:text-white" : "bg-destructive text-white hover:bg-destructive/90"}
          >
            {loading ? "Processing..." : approve ? "Approve" : reject ? "Reject" : "Suspend"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
