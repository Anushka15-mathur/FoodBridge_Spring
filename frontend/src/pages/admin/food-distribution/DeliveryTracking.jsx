import React, { useState } from 'react';
import { assignDelivery, getDelivery } from '../../../services/foodDistributionService';
import StatusBadge from '../../../components/ui/StatusBadge';

export default function DeliveryTracking(){
  const [allocId, setAllocId] = useState('');
  const [volId, setVolId] = useState('');
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssign = async () => {
    if (!allocId || !volId) {
      setError('Allocation ID and Volunteer ID are required.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await assignDelivery({ allocationId: Number(allocId), volunteerId: Number(volId) });
      setDelivery(response);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to assign delivery');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    if (!delivery?.id) return;
    setLoading(true);
    setError(null);
    try {
      const refreshed = await getDelivery(delivery.id);
      setDelivery(refreshed);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to fetch delivery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Delivery Tracking</h2>

      <div className="mb-4">
        <input
          placeholder="Allocation ID"
          value={allocId}
          onChange={(e) => setAllocId(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          placeholder="Volunteer ID"
          value={volId}
          onChange={(e) => setVolId(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          className="bg-olive-600 text-white px-3 py-1 rounded"
          onClick={handleAssign}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Assign'}
        </button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {delivery && (
        <div className="bg-white p-4 rounded shadow">
          <div>Delivery ID: {delivery.id}</div>
          <div>Status: <StatusBadge status={delivery.status} /></div>
          <div>Assigned At: {new Date(delivery.assignedAt).toLocaleString()}</div>
          <div>Pickup Time: {delivery.pickupTime ? new Date(delivery.pickupTime).toLocaleString() : '—'}</div>
          <div>Delivered Time: {delivery.deliveredTime ? new Date(delivery.deliveredTime).toLocaleString() : '—'}</div>
          <div className="mt-2">
            <button
              className="mr-2 bg-slate-100 px-3 py-1 rounded"
              onClick={handleFetch}
              disabled={loading}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
