import React, { useEffect, useState } from 'react';
import { getDonationRequests, allocateDonation } from '../../../services/foodDistributionService';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function DonationRequests(){
  const [requests, setRequests] = useState([]);
  const [allocQty, setAllocQty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allocatingId, setAllocatingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDonationRequests()
      .then(setRequests)
      .catch((err) => setError(err?.response?.data?.message || err?.message || 'Unable to load donation requests'))
      .finally(() => setLoading(false));
  }, []);

  const handleAllocate = async (requestId) => {
    const qty = allocQty[requestId];
    if (!qty) return;
    setAllocatingId(requestId);
    try {
      await allocateDonation({ requestId, allocatedQuantity: qty });
      setRequests((current) => current.filter((r) => r.requestId !== requestId));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Allocation failed');
    } finally {
      setAllocatingId(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading donation requests...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Donation Requests</h2>

      {requests.length === 0 ? (
        <div className="rounded-lg bg-white p-6 shadow">No donation requests found.</div>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">NGO</th>
                <th className="px-4 py-2">Donation</th>
                <th className="px-4 py-2">Requested Quantity</th>
                <th className="px-4 py-2">Requested Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.requestId} className="border-t">
                  <td className="px-4 py-3">{r.ngoName}</td>
                  <td className="px-4 py-3">{r.donationTitle}</td>
                  <td className="px-4 py-3">{r.requestedQuantity}</td>
                  <td className="px-4 py-3">{new Date(r.requestedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="grid gap-3">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Quantity"
                        value={allocQty[r.requestId] ?? ""}
                        onChange={(e) => setAllocQty({
                          ...allocQty,
                          [r.requestId]: e.target.value,
                        })}
                        className="w-full"
                      />

                      <Button
                        type="button"
                        onClick={() => handleAllocate(r.requestId)}
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        disabled={allocatingId === r.requestId}
                      >
                        {allocatingId === r.requestId
                          ? "Allocating..."
                          : "Approve & Allocate"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
