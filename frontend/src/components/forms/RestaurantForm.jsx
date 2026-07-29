import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function RestaurantForm({ onSubmit }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      <FormSection
        title="Restaurant Information"
        description="Provide your restaurant details."
      >

        <Input
          placeholder="Restaurant Name"
          {...register("restaurantName", {
            required: "Restaurant name is required",
          })}
        />

        {errors.restaurantName && (
          <p className="text-sm text-red-500">
            {errors.restaurantName.message}
          </p>
        )}


        {/* Backend expects licenseNumber */}
        <Input
          placeholder="FSSAI License Number"
          {...register("licenseNumber", {
            required: "License number is required",
          })}
        />

        {errors.licenseNumber && (
          <p className="text-sm text-red-500">
            {errors.licenseNumber.message}
          </p>
        )}

        
      </FormSection>

      <FormSection title="Restaurant Address">

        <AddressFields
          register={register}
          errors={errors}
        />

      </FormSection>

      <FormSection title="Documents">

        <FileUpload
          label="Restaurant Logo"
          name="logo"
          accept=".jpg,.jpeg,.png"
          register={register}
          error={errors.logo}
        />

        <FileUpload
          label="FSSAI Certificate"
          name="certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          register={register}
          required
          error={errors.certificate}
        />

      </FormSection>

      <Button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary/90"
      >
        Save & Continue
      </Button>

    </form>
  );
}