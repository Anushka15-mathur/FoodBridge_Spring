import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import AddressFields from "../common/AddressFields";
import FormSection from "../common/FormSection";
import FileUpload from "../common/FileUpload";

export default function DonorForm({ onSubmit }) {

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
                title="Address Information"
                description="Tell us where you're located."
            >

                <AddressFields
                    register={register}
                    errors={errors}
                />

            </FormSection>

            <FormSection title="Documents">

                <FileUpload
                    label="Organization Proof"
                    name="organizationProof"
                    accept=".pdf,.jpg,.jpeg,.png"
                    register={register}
                    error={errors.organizationProof}
                />

            </FormSection>

            <FormSection
                title="Organization Information"
                description="Tell us about your organization."
            >

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("organization")}
                    />
                    Donating on behalf of an organization
                </label>

                <Input
                    placeholder="Organization Name"
                    {...register("organizationName")}
                />

                {errors.organizationName && (
                    <p className="text-sm text-red-500">
                        {errors.organizationName.message}
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