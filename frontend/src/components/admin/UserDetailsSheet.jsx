import { useEffect, useState } from "react";
import { toast } from "sonner";

import adminService from "../../services/adminService";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function UserDetailsSheet({

  userId,

  open,

  onOpenChange,

}) {

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {

    if (!open || !userId) return;

    loadUser();

  }, [open, userId]);

  const loadUser = async () => {
    try {

      setUser(null);
      setLoading(true);

      const response = await adminService.getUserById(userId);

      setUser(response);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to load user."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <Sheet open={open} onOpenChange={onOpenChange}>

      <SheetContent className="sm:max-w-lg overflow-y-auto">

        <SheetHeader>

          <SheetTitle>

            User Details

          </SheetTitle>

        </SheetHeader>

        {loading && (

          <div className="space-y-4 mt-6">

            <Skeleton className="h-6 w-48" />

            <Skeleton className="h-6 w-full" />

            <Skeleton className="h-6 w-full" />

            <Skeleton className="h-6 w-full" />

            <Skeleton className="h-6 w-full" />

          </div>

        )}

        {!loading && user && (

          <div className="space-y-5 mt-6">

            <InfoRow
              label="First Name"
              value={user.firstName}
            />

            <InfoRow
              label="Last Name"
              value={user.lastName}
            />

            <InfoRow
              label="Email"
              value={user.email}
            />

            <InfoRow
              label="Phone"
              value={user.phone}
            />

            <InfoRow
              label="Role"
              value={<UserRoleBadge role={user.role} />}
            />

            <InfoRow
              label="Status"
              value={<UserStatusBadge status={user.status} />}
            />

            <InfoRow
              label="Profile Completed"
              value={
                user.profileCompleted ? (
                  <Badge className="bg-green-100 text-green-700 border border-green-300">
                    Completed
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-red-300 text-red-600"
                  >
                    Incomplete
                  </Badge>
                )
              }
            />

            <InfoRow
              label="Joined"
              value={
                new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            />

          </div>

        )}

      </SheetContent>

    </Sheet>

  );

}

function InfoRow({

  label,

  value,

}) {

  return (

    <div className="flex justify-between gap-4 border-b pb-3">

      <span className="font-medium text-muted-foreground">

        {label}

      </span>

      <span className="text-right">

        {value}

      </span>

    </div>

  );

}