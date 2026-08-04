import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, MapPin } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function RestaurantForm({ onSubmit }) {
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      restaurantName: "",
      licenseNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      latitude: "",
      longitude: "",
    },
  });

  const useCurrentLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by this browser. Enter latitude and longitude manually."
      );
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("latitude", Number(coords.latitude.toFixed(7)), {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue("longitude", Number(coords.longitude.toFixed(7)), {
          shouldValidate: true,
          shouldDirty: true,
        });
        setLocating(false);
      },
      (error) => {
        setLocationError(
          error.message ||
            "Unable to read your location. Enter latitude and longitude manually."
        );
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
        <AddressFields register={register} errors={errors} required />

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">Restaurant coordinates</p>
              <p className="text-sm text-muted-foreground">
                Required for pickup and nearby-donation matching.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={useCurrentLocation}
              disabled={locating}
            >
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              {locating ? "Getting location..." : "Use Current Location"}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Latitude *
              </label>
              <Input
                type="number"
                step="any"
                placeholder="18.5204"
                {...register("latitude", {
                  required: "Latitude is required",
                  valueAsNumber: true,
                  min: {
                    value: -90,
                    message: "Latitude must be at least -90",
                  },
                  max: {
                    value: 90,
                    message: "Latitude must be at most 90",
                  },
                })}
              />
              {errors.latitude && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Longitude *
              </label>
              <Input
                type="number"
                step="any"
                placeholder="73.8567"
                {...register("longitude", {
                  required: "Longitude is required",
                  valueAsNumber: true,
                  min: {
                    value: -180,
                    message: "Longitude must be at least -180",
                  },
                  max: {
                    value: 180,
                    message: "Longitude must be at most 180",
                  },
                })}
              />
              {errors.longitude && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          {locationError && (
            <p className="mt-3 text-sm text-red-500">{locationError}</p>
          )}
        </div>
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
        disabled={isSubmitting || locating}
        className="w-full bg-primary text-white hover:bg-primary/90"
      >
        {isSubmitting ? "Saving..." : "Save & Continue"}
      </Button>
    </form>
  );
}
