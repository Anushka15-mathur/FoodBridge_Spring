import { useEffect, useState } from "react";
import ngoService from "../../services/ngoService";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

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

      <h1 className="text-3xl font-bold">
        My Donation Requests
      </h1>

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
              <h2 className="font-semibold">
                {request.foodName}
              </h2>

              <p className="text-gray-500">
                {request.restaurantName}
              </p>

              <p className="mt-2">
                Status:
                <span className="ml-2 font-semibold">
                  {request.status}
                </span>
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}