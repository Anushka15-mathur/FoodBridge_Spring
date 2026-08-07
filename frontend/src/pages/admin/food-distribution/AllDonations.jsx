import React, { useEffect, useState } from 'react';
import { getAllDonations } from '../../../services/foodDistributionService';
import StatusBadge from '../../../components/ui/StatusBadge';

export default function AllDonations(){
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllDonations()
      .then(setDonations)
      .catch((err) => setError(err?.response?.data?.message || err?.message || 'Unable to load donations'))
      .finally(() => setLoading(false));
  },[]);

  if (loading) {
    return <div className="p-6">Loading donations...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Donations</h2>

      {donations.length === 0 ? (
        <div className="rounded-lg bg-white p-6 shadow">No donations found.</div>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Donation</th>
                <th className="px-4 py-2">Value</th>
                <th className="px-4 py-2">Remaining</th>
                <th className="px-4 py-2">Expiry</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-3">{d.ownerType} · {d.owner}</td>
                  <td className="px-4 py-3">{d.donationType === "MONEY" ? "Money donation" : d.title}</td>
                  <td className="px-4 py-3">{d.donationType === "MONEY" ? `${d.currency || "INR"} ${d.amount}` : d.quantity}</td>
                  <td className="px-4 py-3">{d.donationType === "MONEY" ? "—" : d.remainingQuantity}</td>
                  <td className="px-4 py-3">{d.expiryTime ? new Date(d.expiryTime).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
