import React, { useEffect, useState } from 'react';
import { getAllDonations, getDonationRequests, allocateDonation } from '../../../services/foodDistributionService';

export default function AllocationCenter(){
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [qtys, setQtys] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allocatingId, setAllocatingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllDonations(), getDonationRequests()])
      .then(([donationsData, requestsData]) => {
        setDonations(donationsData);
        setRequests(requestsData);
      })
      .catch((err) => setError(err?.response?.data?.message || err?.message || 'Unable to load allocation data'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = requests.filter((r) => (selectedDonation ? r.donationId === selectedDonation : true));

  const handleAllocate = async (requestId) => {
    const v = qtys[requestId];
    if (!v) return;
    setAllocatingId(requestId);
    try {
      await allocateDonation({ requestId, allocatedQuantity: v });
      setRequests((current) => current.filter((r) => r.requestId !== requestId));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Allocation failed');
    } finally {
      setAllocatingId(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading allocation center...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Allocation Center</h2>

      <div className="mb-4">
        <label className="mr-2">Select Donation:</label>
        <select
          onChange={(e) => setSelectedDonation(Number(e.target.value) || null)}
          className="border px-2 py-1"
        >
          <option value="">All Donations</option>
          {donations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.restaurant} - {d.title} ({d.remainingQuantity})
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">NGO</th>
              <th className="px-4 py-2">Requested Quantity</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.requestId} className="border-t">
                <td className="px-4 py-3">{r.ngoName}</td>
                <td className="px-4 py-3">{r.requestedQuantity}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="qty"
                    className="mr-2 border px-2 py-1"
                    onChange={(e) => setQtys({ ...qtys, [r.requestId]: e.target.value })}
                  />
                  <button
                    className="bg-olive-600 text-white px-3 py-1 rounded"
                    onClick={() => handleAllocate(r.requestId)}
                    disabled={allocatingId === r.requestId}
                  >
                    {allocatingId === r.requestId ? 'Allocating...' : 'Allocate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
