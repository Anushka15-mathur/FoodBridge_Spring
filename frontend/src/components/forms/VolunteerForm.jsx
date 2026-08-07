import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function VolunteerForm({ onSubmit }) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [locationError, setLocationError] = useState("");
    const [locating, setLocating] = useState(false);

    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError(
                "Location is not supported by this browser. Enter the coordinates manually."
            );
            return;
        }

        setLocating(true);
        setLocationError("");

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setValue("currentLatitude", coords.latitude, {
                    shouldValidate: true,
                });
                setValue("currentLongitude", coords.longitude, {
                    shouldValidate: true,
                });
                setLocating(false);
            },
            () => {
                setLocationError(
                    "We could not get your location. Allow location access or enter the coordinates manually."
                );
                setLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >

            <FormSection
                title="Volunteer Information"
                description="Provide your personal details."
            >

                <Input
                    placeholder="Driving License Number"
                    {...register("drivingLicenseNumber", {
                        required: "Driving license number is required",
                    })}
                />

                {errors.drivingLicenseNumber && (
                    <p className="text-sm text-red-500">
                        {errors.drivingLicenseNumber.message}
                    </p>
                )}

                <Input
                    placeholder="Aadhaar Number"
                    {...register("aadhaarNumber", {
                        required: "Aadhaar number is required",
                    })}
                />

                {errors.aadhaarNumber && (
                    <p className="text-sm text-red-500">
                        {errors.aadhaarNumber.message}
                    </p>
                )}

                <Input
                    placeholder="Emergency Contact"
                    {...register("emergencyContact", {
                        required: "Emergency contact is required",
                    })}
                />

                {errors.emergencyContact && (
                    <p className="text-sm text-red-500">
                        {errors.emergencyContact.message}
                    </p>
                )}

            </FormSection>

            <FormSection title="Address">

                <AddressFields
                    register={register}
                    errors={errors}
                    required
                />

            </FormSection>

            <FormSection
                title="Current Location"
                description="This helps us assign nearby deliveries."
            >

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Input
                            type="number"
                            step="any"
                            placeholder="Current Latitude"
                            {...register("currentLatitude", {
                                required: "Current latitude is required",
                                valueAsNumber: true,
                                min: {
                                    value: -90,
                                    message: "Latitude must be between -90 and 90",
                                },
                                max: {
                                    value: 90,
                                    message: "Latitude must be between -90 and 90",
                                },
                            })}
                        />

                        {errors.currentLatitude && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.currentLatitude.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="number"
                            step="any"
                            placeholder="Current Longitude"
                            {...register("currentLongitude", {
                                required: "Current longitude is required",
                                valueAsNumber: true,
                                min: {
                                    value: -180,
                                    message: "Longitude must be between -180 and 180",
                                },
                                max: {
                                    value: 180,
                                    message: "Longitude must be between -180 and 180",
                                },
                            })}
                        />

                        {errors.currentLongitude && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.currentLongitude.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={useCurrentLocation}
                        disabled={locating}
                    >
                        {locating ? "Getting location..." : "Use My Current Location"}
                    </Button>

                    {locationError && (
                        <p className="mt-2 text-sm text-red-500">
                            {locationError}
                        </p>
                    )}
                </div>

            </FormSection>

            <FormSection title="Documents">

                <FileUpload
                    label="Driving License"
                    name="drivingLicense"
                    accept=".pdf,.jpg,.jpeg,.png"
                    register={register}
                    required
                    error={errors.drivingLicense}
                />

                <FileUpload
                    label="Identity Proof"
                    name="identityProof"
                    accept=".pdf,.jpg,.jpeg,.png"
                    register={register}
                    required
                    error={errors.identityProof}
                />

            </FormSection>

            <FormSection title="Delivery Preferences">

    <Input
        type="number"
        placeholder="Maximum Delivery Distance (km)"
        {...register("maxDeliveryDistance", {
            required: "Maximum delivery distance is required",
            valueAsNumber: true,
            min: 1,
        })}
    />

    {errors.maxDeliveryDistance && (
        <p className="text-sm text-red-500">
            {errors.maxDeliveryDistance.message}
        </p>
    )}

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
