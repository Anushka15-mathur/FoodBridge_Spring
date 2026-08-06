import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
} from "@mui/material";

import volunteerService from "../../services/volunteerService";

export default function DeliveryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchDelivery = async () => {
    try {
      const response =
        await volunteerService.getDeliveryDetails(id);

      setDelivery(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load delivery details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDelivery();
  }, [id]);

  const updateStatus = async (action) => {
    try {
      setUpdating(true);

      let message;

      if (action === "pickup") {
        message = await volunteerService.markPickup(id);
      }

      if (action === "transit") {
        message =
          await volunteerService.markInTransit(id);
      }

      if (action === "delivered") {
        message =
          await volunteerService.markDelivered(id);
      }

      toast.success(message);
      await fetchDelivery();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update delivery status."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!delivery) {
    return (
      <p className="text-red-600">
        Delivery not found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold">
                Delivery #{delivery.deliveryId}
              </h1>

              <p className="text-slate-600">
                Donation ID: {delivery.donationId}
              </p>
            </div>

            <Chip
              label={delivery.status}
              color="primary"
            />
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Restaurant
              </p>

              <p className="font-semibold">
                {delivery.restaurantName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                NGO
              </p>

              <p className="font-semibold">
                {delivery.ngoName}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-slate-500">
                Pickup Address
              </p>

              <p className="font-semibold">
                {delivery.pickupAddress}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t pt-6">
            {delivery.status === "ASSIGNED" && (
              <Button
                variant="contained"
                disabled={updating}
                onClick={() => updateStatus("pickup")}
              >
                Mark Picked Up
              </Button>
            )}

            {delivery.status === "PICKED_UP" && (
              <Button
                variant="contained"
                disabled={updating}
                onClick={() => updateStatus("transit")}
              >
                Start Transit
              </Button>
            )}

            {delivery.status === "IN_TRANSIT" && (
              <Button
                variant="contained"
                color="success"
                disabled={updating}
                onClick={() =>
                  updateStatus("delivered")
                }
              >
                Mark Delivered
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}