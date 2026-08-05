import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Button,
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

export default function Deliveries() {
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      const response =
        await volunteerService.getDeliveries();

      setDeliveries(response ?? []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load assigned deliveries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
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
          Assigned Deliveries
        </h1>

        <p className="text-muted-foreground">
          View food deliveries assigned to you.
        </p>
      </div>

      {deliveries.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: "center" }}>
          No active deliveries are currently assigned.
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Restaurant</TableCell>
                <TableCell>NGO</TableCell>
                <TableCell>Pickup Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned At</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.deliveryId} hover>
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
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {delivery.assignedAt
                      ? new Date(
                          delivery.assignedAt
                        ).toLocaleString("en-IN")
                      : "-"}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/volunteer/deliveries/${delivery.deliveryId}`
                        )
                      }
                    >
                      View
                    </Button>
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