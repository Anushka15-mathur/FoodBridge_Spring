import { Navigate, useLocation } from "react-router-dom";

import AuthHeader from "../../components/auth/AuthHeader";

import DonorForm from "../../components/forms/DonorForm";
import RestaurantForm from "../../components/forms/RestaurantForm";
import NGOForm from "../../components/forms/NGOForm";
import VolunteerForm from "../../components/forms/VolunteerForm";

export default function AdditionalInfo() {
  const { state } = useLocation();

  const role = state?.role;

  if (!role) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="space-y-6">

      <AuthHeader
        title="Complete Your Profile"
        subtitle="Tell us a little more about yourself."
      />

      {role === "DONOR" && <DonorForm />}

      {role === "RESTAURANT" && <RestaurantForm />}

      {role === "NGO" && <NGOForm />}

      {role === "VOLUNTEER" && <VolunteerForm />}

    </div>
  );
}