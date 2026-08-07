import { useEffect, useState } from "react";
import ngoService from "../../services/ngoService";

import AssignVolunteerDialog from "../../components/ngo/AssignVolunteerDialog";
import { Button } from "../../components/ui/button";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const data = await ngoService.getMyRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Donation Requests</h1>

      {requests.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500 shadow-sm">
          No requests found.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-lg">{request.foodName}</h2>

              <p className="text-gray-500">{request.restaurantName}</p>

              <div className="mt-4 flex items-center justify-between">
                <p>
                  Status:
                  <span className="ml-2 font-semibold">{request.status}</span>
                </p>

                {request.status === "APPROVED" &&
                  (!request.volunteerAssigned ? (
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
                      onClick={() => {
                        setSelectedRequestId(request.requestId);
                        setAssignDialogOpen(true);
                      }}
                    >
                      Assign Volunteer
                    </Button>
                  ) : (
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ✓ Volunteer Assigned
                      </p>

                      <p className="text-sm text-gray-500">
                        {request.volunteerName}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AssignVolunteerDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        requestId={selectedRequestId}
        onAssigned={loadRequests}
      />
    </div>
  );
}
