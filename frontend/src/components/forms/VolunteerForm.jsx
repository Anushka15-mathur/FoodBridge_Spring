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
        formState: { errors },
    } = useForm();

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
                    {...register("drivingLicenseNumber")}
                />

                {errors.drivingLicenseNumber && (
                    <p className="text-sm text-red-500">
                        {errors.drivingLicenseNumber.message}
                    </p>
                )}

                <Input
                    placeholder="Aadhaar Number"
                    {...register("aadhaarNumber")}
                />

                <Input
                    placeholder="Emergency Contact"
                    {...register("emergencyContact")}
                />

            </FormSection>

            <FormSection title="Address">

                <AddressFields
                    register={register}
                    errors={errors}
                />

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