import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

import ngoService from "../../services/ngoService";

export default function AssignVolunteerDialog({
  open,
  onOpenChange,
  requestId,
  onAssigned,
}) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigningId, setAssigningId] = useState(null);

  useEffect(() => {
    if (!open) return;

    fetchVolunteers();
  }, [open]);

  async function fetchVolunteers() {
    try {
      setLoading(true);

      const data = await ngoService.getAvailableVolunteers();

      setVolunteers(data);
    } catch (err) {
      toast.error("Failed to load volunteers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAssign(volunteerId) {
    try {
      setAssigningId(volunteerId);

      await ngoService.assignVolunteer(requestId, volunteerId);

      toast.success("Volunteer assigned successfully.");

      onOpenChange(false);

      if (onAssigned) {
        onAssigned();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to assign volunteer."
      );
      console.error(err);
    } finally {
      setAssigningId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Assign Volunteer</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p>Loading volunteers...</p>
        ) : volunteers.length === 0 ? (
          <p>No volunteers available.</p>
        ) : (
          <div className="space-y-3">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.volunteerId}
                className="rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  {volunteer.fullName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {volunteer.email}
                </p>

                <p className="text-sm text-muted-foreground">
                  {volunteer.phone}
                </p>

                <Button
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
                  disabled={assigningId === volunteer.volunteerId}
                  onClick={() => handleAssign(volunteer.volunteerId)}
                >
                  {assigningId === volunteer.volunteerId
                    ? "Assigning..."
                    : "Assign"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}