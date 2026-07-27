import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import authService from "../../services/authService";

import AuthHeader from "../../components/auth/AuthHeader";

import DonorForm from "../../components/forms/DonorForm";
import RestaurantForm from "../../components/forms/RestaurantForm";
import NGOForm from "../../components/forms/NGOForm";
import VolunteerForm from "../../components/forms/VolunteerForm";

export default function AdditionalInfo() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const role = state?.role;

  const handleProfileSubmit = async (formData) => {
    try {

      const response = await authService.completeProfile(
        role,
        formData
      );

      toast.success(
        response.message || "Profile completed successfully."
      );

      navigate("/pending-approval");

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Unable to save profile.";

      toast.error(message);

      console.error(error);
    }
  };

  if (!role) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="space-y-6">

      <AuthHeader
        title="Complete Your Profile"
        subtitle="Tell us a little more about yourself."
      />

      {role === "DONOR" && (
        <DonorForm onSubmit={handleProfileSubmit} />
      )}

      {role === "RESTAURANT" && (
        <RestaurantForm onSubmit={handleProfileSubmit} />
      )}

      {role === "NGO" && (
        <NGOForm onSubmit={handleProfileSubmit} />
      )}

      {role === "VOLUNTEER" && (
        <VolunteerForm onSubmit={handleProfileSubmit} />
      )}

    </div>
  );
}