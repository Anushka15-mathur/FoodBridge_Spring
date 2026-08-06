import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock3,
  Package,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

import ngoService from "../../services/ngoService";
import { isDonationRequestable } from "../../utils/donationEligibility";

export default function DonationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [requestedQuantity, setRequestedQuantity] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDonation();
  }, []);

  async function loadDonation() {
    try {

      const response = await ngoService.getDonationDetails(id);

      if (!isDonationRequestable(response)) {
        toast.error("This donation is no longer available.");
        navigate("/ngo/donations", { replace: true });
        return;
      }

      setDonation(response);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load donation.");

    } finally {

      setLoading(false);

    }
  }

  async function handleClaimDonation() {

    if (!isDonationRequestable(donation)) {
      toast.error("This donation is no longer available.");
      navigate("/ngo/donations", { replace: true });
      return;
    }

    if (!requestedQuantity) {
      toast.error("Please enter requested quantity.");
      return;
    }

    try {

      setSubmitting(true);

      await ngoService.requestDonation(id, {
        requestedQuantity: Number(requestedQuantity),
        requestMessage,
      });

      toast.success("Donation request submitted successfully.");

      setOpenDialog(false);

      navigate("/ngo/requests");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to submit donation request."
      );

    } finally {

      setSubmitting(false);

    }

  }

  if (loading) {

    return (
      <div className="flex h-72 items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

          <p className="text-gray-500">
            Loading donation...
          </p>

        </div>

      </div>
    );

  }

  if (!donation) {

    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">

        <h2 className="text-2xl font-bold">
          Donation Not Found
        </h2>

      </div>
    );

  }

  return (

    <>
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-xl">

          <div className="flex flex-col items-center gap-6 p-10 md:flex-row">

            <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

              <UtensilsCrossed className="h-16 w-16" />

            </div>

            <div className="flex-1">

              <h1 className="text-4xl font-bold">

                {donation.foodName}

              </h1>

              <p className="mt-2 text-lg text-green-100">

                Fresh food ready for pickup

              </p>

              <div className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-2 font-semibold backdrop-blur">

                Available Quantity : {donation.quantity}

              </div>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

              Donation Information

            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Store className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">

                    Restaurant

                  </p>

                  <p className="font-semibold">

                    {donation.restaurantName}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Package className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">

                    Quantity

                  </p>

                  <p className="font-semibold">

                    {donation.quantity}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Clock3 className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">

                    Pickup Time

                  </p>

                  <p className="font-semibold">

                    {donation.pickupTime}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <MapPin className="text-red-500" />

                <div>

                  <p className="text-sm text-gray-500">

                    Pickup Address

                  </p>

                  <p className="font-semibold">

                    {donation.pickupAddress || "Not Available"}

                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

              Description

            </h2>

            <p className="leading-8 text-gray-600">

              {donation.description || "No description available."}

            </p>

            <Button
              onClick={() => setOpenDialog(true)}
              className="mt-10 w-full rounded-xl bg-green-600 py-6 text-lg hover:bg-green-700"
            >
              Claim Donation
            </Button>

          </div>

        </div>

      </div>

      {/* Claim Donation Dialog */}

      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>

              Request Donation

            </DialogTitle>

          </DialogHeader>

          <div className="space-y-5">

            <div>

              <label className="mb-2 block font-medium">

                Requested Quantity

              </label>

              <Input
                type="number"
                value={requestedQuantity}
                onChange={(e) =>
                  setRequestedQuantity(e.target.value)
                }
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Request Message

              </label>

              <Textarea
                rows={4}
                value={requestMessage}
                onChange={(e) =>
                  setRequestMessage(e.target.value)
                }
              />

            </div>

          </div>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleClaimDonation}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Request"}
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </>

  );
}
