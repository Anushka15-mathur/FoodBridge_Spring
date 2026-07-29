import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function NGOForm({ onSubmit }) {

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
                title="NGO Information"
                description="Provide your organization details."
            >

                <Input
                    placeholder="NGO Name"
                    {...register("ngoName", {
                        required: "NGO name is required",
                    })}
                />

                {errors.ngoName && (
                    <p className="text-sm text-red-500">
                        {errors.ngoName.message}
                    </p>
                )}

                <Input
                    placeholder="Registration Number"
                    {...register("registrationNumber")}
                />

                {errors.registrationNumber && (
                    <p className="text-sm text-red-500">
                        {errors.registrationNumber.message}
                    </p>
                )}

                
            </FormSection>

            <FormSection title="Address">

                <AddressFields
                    register={register}
                    errors={errors}
                />

            </FormSection>

            <FormSection title="Documents">

                <FileUpload
                    label="NGO Logo"
                    name="logo"
                    accept=".jpg,.jpeg,.png"
                    register={register}
                    error={errors.logo}
                />

                <FileUpload
                    label="Registration Certificate"
                    name="registrationCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    register={register}
                    required
                    error={errors.registrationCertificate}
                />

            </FormSection>

            <Input
                type="number"
                placeholder="Operating Radius (km)"
                {...register("operatingRadius", {
                    required: "Operating radius is required",
                    valueAsNumber: true,
                    min: 1,
                })}
            />

            {errors.operatingRadius && (
                <p className="text-sm text-red-500">
                    {errors.operatingRadius.message}
                </p>
            )}

            <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
            >
                Save & Continue
            </Button>

        </form>
    );
}