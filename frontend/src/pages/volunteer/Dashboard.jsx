import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

import {
  Truck,
  PackageCheck,
  Navigation,
  CircleCheckBig,
} from "lucide-react";

import volunteerService from "../../services/volunteerService";

const dashboardCards = [
  {
    key: "assignedDeliveries",
    title: "Assigned",
    icon: Truck,
  },
  {
    key: "pickedUpDeliveries",
    title: "Picked Up",
    icon: PackageCheck,
  },
  {
    key: "inTransitDeliveries",
    title: "In Transit",
    icon: Navigation,
  },
  {
    key: "completedDeliveries",
    title: "Completed",
    icon: CircleCheckBig,
  },
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingAvailability, setUpdatingAvailability] =
    useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await volunteerService.getDashboard();
      setDashboard(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load volunteer dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAvailabilityChange = async (event) => {
    const available = event.target.checked;

    try {
      setUpdatingAvailability(true);

      const message =
        await volunteerService.updateAvailability(available);

      setDashboard((previous) => ({
        ...previous,
        available,
      }));

      toast.success(message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update availability."
      );
    } finally {
      setUpdatingAvailability(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-600">
          Unable to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-heading">
            Volunteer Dashboard
          </h1>

          <p className="text-muted-foreground">
            Welcome back, {dashboard.volunteerName}.
          </p>
        </div>

        <Card variant="outlined">
          <CardContent sx={{ py: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(dashboard.available)}
                  onChange={handleAvailabilityChange}
                  disabled={updatingAvailability}
                  color="success"
                />
              }
              label={
                dashboard.available
                  ? "Available for delivery"
                  : "Currently unavailable"
              }
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.key}
              variant="outlined"
              sx={{ borderRadius: 3 }}
            >
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ mt: 1 }}
                    >
                      {dashboard[item.key] ?? 0}
                    </Typography>
                  </div>

                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}