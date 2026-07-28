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
  showSuspend = false,
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

      const remainingUsers = pageData.content.length - 1;

      if (remainingUsers === 0 && pageData.page > 0) {
        refreshUsers(pageData.page - 1);
      } else {
        refreshUsers(pageData.page);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Action failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        {/* View */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setSheetOpen(true)}
        >
          <Eye className="h-4 w-4" />
        </Button>

        {/* Approve */}
        <ActionDialog
          title="Approve User?"
          description="The user will be able to access FoodBridge."
          loading={loading}
          onConfirm={() => handleAction("approve")}
          button={
            <Button
              size="icon"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
            </Button>
          }
        />

        {/* Reject */}
        <ActionDialog
          title="Reject User?"
          description="This registration request will be rejected."
          loading={loading}
          onConfirm={() => handleAction("reject")}
          button={
            <Button
              size="icon"
              variant="destructive"
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          }
        />

        {/* Suspend */}
        {showSuspend && (
          <ActionDialog
            title="Suspend User?"
            description="The user will no longer be able to log in."
            loading={loading}
            onConfirm={() => handleAction("suspend")}
            button={
              <Button
                size="icon"
                variant="secondary"
                disabled={loading}
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
      />
    </>
  );
}

function ActionDialog({
  title,
  description,
  button,
  onConfirm,
  loading,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {button}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}