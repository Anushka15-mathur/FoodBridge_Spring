import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import AuthHeader from "../../components/auth/AuthHeader";

import DonorForm from "../../components/forms/DonorForm";
import RestaurantForm from "../../components/forms/RestaurantForm";
import NGOForm from "../../components/forms/NGOForm";
import VolunteerForm from "../../components/forms/VolunteerForm";

import profileService from "../../services/profileService";
import useAuth from "../../hooks/useAuth";

export default function AdditionalInfo() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, refreshUser } = useAuth();

  const role = state?.role || user?.role;

  const handleProfileSubmit = async (formData) => {

    try {

      const multipartData = new FormData();

      // Copy form data so we can remove file fields
      const profileData = { ...formData };

      switch (role) {

        case "RESTAURANT":

          if (formData.logo?.[0]) {
            multipartData.append("logo", formData.logo[0]);
          }

          if (formData.certificate?.[0]) {
            multipartData.append("certificate", formData.certificate[0]);
          }

          delete profileData.logo;
          delete profileData.certificate;

          multipartData.append(
            "data",
            new Blob(
              [JSON.stringify(profileData)],
              { type: "application/json" }
            )
          );

          await profileService.completeRestaurant(multipartData);
          break;

        case "NGO":

          if (formData.logo?.[0]) {
            multipartData.append("logo", formData.logo[0]);
          }

          if (formData.registrationCertificate?.[0]) {
            multipartData.append(
              "registrationCertificate",
              formData.registrationCertificate[0]
            );
          }

          delete profileData.logo;
          delete profileData.registrationCertificate;

          multipartData.append(
            "data",
            new Blob(
              [JSON.stringify(profileData)],
              { type: "application/json" }
            )
          );

          await profileService.completeNgo(multipartData);
          break;

        case "VOLUNTEER":

          if (formData.drivingLicense?.[0]) {
            multipartData.append(
              "drivingLicense",
              formData.drivingLicense[0]
            );
          }

          if (formData.identityProof?.[0]) {
            multipartData.append(
              "identityProof",
              formData.identityProof[0]
            );
          }

          delete profileData.drivingLicense;
          delete profileData.identityProof;

          multipartData.append(
            "data",
            new Blob(
              [JSON.stringify(profileData)],
              { type: "application/json" }
            )
          );

          await profileService.completeVolunteer(multipartData);
          break;

        case "DONOR":

          if (formData.organizationProof?.[0]) {
            multipartData.append(
              "organizationProof",
              formData.organizationProof[0]
            );
          }

          delete profileData.organizationProof;

          multipartData.append(
            "data",
            new Blob(
              [JSON.stringify(profileData)],
              { type: "application/json" }
            )
          );

          await profileService.completeDonor(multipartData);
          break;

        default:
          throw new Error("Invalid user role.");
      }

      toast.success("Profile completed successfully.");

      const refreshedUser = await refreshUser();

      if (
        role === "RESTAURANT" &&
        refreshedUser?.status === "APPROVED"
      ) {
        navigate("/restaurant/dashboard", { replace: true });
      } else {
        navigate("/pending-approval", { replace: true });
      }

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to save profile.";

      toast.error(message);

      console.error(error);

    }
  };

  if (!role) {
    return <Navigate to="/register" replace />;
  }

  if (role === "RESTAURANT" && user?.profileCompleted) {
    return <Navigate to="/restaurant/dashboard" replace />;
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