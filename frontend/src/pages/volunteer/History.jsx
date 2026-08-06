import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import volunteerService from "../../services/volunteerService";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response =
          await volunteerService.getDeliveryHistory();

        setHistory(response ?? []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load delivery history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-heading">
          Delivery History
        </h1>

        <p className="text-muted-foreground">
          Completed and cancelled deliveries.
        </p>
      </div>

      {history.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: "center" }}>
          No delivery history available.
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Delivery ID</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>NGO</TableCell>
                <TableCell>Pickup Address</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {history.map((delivery) => (
                <TableRow
                  key={delivery.deliveryId}
                  hover
                >
                  <TableCell>
                    #{delivery.deliveryId}
                  </TableCell>

                  <TableCell>
                    {delivery.restaurantName}
                  </TableCell>

                  <TableCell>
                    {delivery.ngoName}
                  </TableCell>

                  <TableCell>
                    {delivery.pickupAddress}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={delivery.status}
                      size="small"
                      color={
                        delivery.status === "DELIVERED"
                          ? "success"
                          : "default"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}