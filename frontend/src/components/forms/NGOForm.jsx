import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function NGOForm() {
  return (
    <form className="space-y-8">

      <FormSection
        title="NGO Information"
        description="Provide your organization details."
      >
        <Input placeholder="NGO Name" />

        <Input placeholder="Registration Number" />

        <Input placeholder="NGO Type" />

        <Input placeholder="Contact Person" />
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
          label="Registration Certificate"
          accept=".pdf,image/*"
        />
      </FormSection>

      <Button className="w-full bg-primary text-white">
        Save & Continue
      </Button>

    </form>
  );
}