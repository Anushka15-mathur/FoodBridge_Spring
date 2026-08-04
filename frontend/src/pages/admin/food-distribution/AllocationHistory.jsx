import React, { useEffect, useState } from 'react';
import { getAllocationHistory } from '../../../services/foodDistributionService';

export default function AllocationHistory(){
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllocationHistory()
      .then(setHistory)
      .catch((err) => setError(err?.response?.data?.message || err?.message || 'Unable to load allocation history'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading allocation history...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Allocation History</h2>

      {history.length === 0 ? (
        <div className="rounded-lg bg-white p-6 shadow">No allocation history found.</div>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Donation</th>
                <th className="px-4 py-2">Restaurant</th>
                <th className="px-4 py-2">NGO</th>
                <th className="px-4 py-2">Allocated Quantity</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.allocationId} className="border-t">
                  <td className="px-4 py-3">{h.donationTitle}</td>
                  <td className="px-4 py-3">{h.restaurantName}</td>
                  <td className="px-4 py-3">{h.ngoName}</td>
                  <td className="px-4 py-3">{h.allocatedQuantity}</td>
                  <td className="px-4 py-3">{String(h.status)}</td>
                  <td className="px-4 py-3">{new Date(h.allocatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
