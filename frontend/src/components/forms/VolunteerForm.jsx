import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function VolunteerForm() {
  return (
    <form className="space-y-8">

      <FormSection
        title="Volunteer Information"
        description="Provide your personal details."
      >
        <Input placeholder="Driving License Number" />

        <Input placeholder="Aadhaar Number" />

        <Input placeholder="Emergency Contact" />
      </FormSection>

      <FormSection
        title="Address"
      >
        <AddressFields />
      </FormSection>

      <FormSection
        title="Documents"
      >
        <FileUpload
          label="Driving License"
          accept=".pdf,image/*"
        />

        <FileUpload
          label="Aadhaar Card"
          accept=".pdf,image/*"
        />
      </FormSection>

      <Button className="w-full bg-primary text-white">
        Save & Continue
      </Button>

    </form>
  );
}