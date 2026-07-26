import { Input } from "../ui/input";
import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FileUpload from "../common/FileUpload";
import FormSection from "../common/FormSection";

export default function RestaurantForm() {
  return (
    <form className="space-y-8">

      <FormSection
        title="Restaurant Information"
        description="Provide your restaurant details."
      >
        <Input placeholder="Restaurant Name" />

        <Input placeholder="Owner Name" />

        <Input placeholder="GST Number" />

        <Input placeholder="FSSAI License Number" />

        <div className="grid gap-4 md:grid-cols-2">
          <Input type="time" />
          <Input type="time" />
        </div>
      </FormSection>

      <FormSection
        title="Restaurant Address"
      >
        <AddressFields />
      </FormSection>

      <FormSection
        title="Documents"
      >
        <FileUpload
          label="Restaurant Logo"
          accept="image/*"
        />

        <FileUpload
          label="FSSAI Certificate"
          accept=".pdf,image/*"
        />
      </FormSection>

      <Button className="w-full bg-primary text-white">
        Save & Continue
      </Button>

    </form>
  );
}