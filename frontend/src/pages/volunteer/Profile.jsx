import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";

import volunteerService from "../../services/volunteerService";
import { resolveFileUrl } from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    currentLatitude: "",
    currentLongitude: "",
    maxDeliveryDistance: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await volunteerService.getProfile();

      setProfile(response);

      setFormData({
        currentLatitude: response.currentLatitude ?? "",
        currentLongitude: response.currentLongitude ?? "",
        maxDeliveryDistance:
          response.maxDeliveryDistance ?? "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load volunteer profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const message = await volunteerService.updateProfile({
        currentLatitude: Number(formData.currentLatitude),
        currentLongitude: Number(formData.currentLongitude),
        maxDeliveryDistance: Number(
          formData.maxDeliveryDistance
        ),
      });

      toast.success(message);
      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update volunteer profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="text-red-600">
        Unable to load volunteer profile.
      </p>
    );
  }

  const licenseUrl = resolveFileUrl(
    profile.drivingLicensePath
  );

  const identityUrl = resolveFileUrl(
    profile.identityProofPath
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-heading">
          Volunteer Profile
        </h1>

        <p className="text-muted-foreground">
          View and update your delivery preferences.
        </p>
      </div>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold">
                {profile.fullName}
              </h2>

              <p className="text-slate-600">
                {profile.email}
              </p>

              <p className="text-slate-600">
                {profile.phone}
              </p>
            </div>

            <div className="flex gap-2">
              <Chip
                label={
                  profile.verified
                    ? "Verified"
                    : "Not Verified"
                }
                color={
                  profile.verified ? "success" : "warning"
                }
              />

              <Chip
                label={
                  profile.available
                    ? "Available"
                    : "Unavailable"
                }
                color={
                  profile.available ? "success" : "default"
                }
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            <TextField
              label="Current Latitude"
              name="currentLatitude"
              type="number"
              value={formData.currentLatitude}
              onChange={handleChange}
              inputProps={{ step: "any" }}
              fullWidth
              required
            />

            <TextField
              label="Current Longitude"
              name="currentLongitude"
              type="number"
              value={formData.currentLongitude}
              onChange={handleChange}
              inputProps={{ step: "any" }}
              fullWidth
              required
            />

            <TextField
              label="Maximum Delivery Distance (km)"
              name="maxDeliveryDistance"
              type="number"
              value={formData.maxDeliveryDistance}
              onChange={handleChange}
              fullWidth
              required
            />

            <div className="flex items-center">
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{
                  backgroundColor: "#556b2f",
                  "&:hover": {
                    backgroundColor: "#465926",
                  },
                }}
              >
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </form>

          <div className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">
                Driving Licence
              </h3>

              {licenseUrl ? (
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary underline"
                >
                  View document
                </a>
              ) : (
                <p className="text-sm text-slate-500">
                  Not uploaded
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold">
                Identity Proof
              </h3>

              {identityUrl ? (
                <a
                  href={identityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary underline"
                >
                  View document
                </a>
              ) : (
                <p className="text-sm text-slate-500">
                  Not uploaded
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}