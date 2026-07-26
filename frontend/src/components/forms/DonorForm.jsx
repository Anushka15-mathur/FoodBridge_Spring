import { Button } from "../ui/button";

import AddressFields from "../common/AddressFields";
import FormSection from "../common/FormSection";

export default function DonorForm() {
  return (
    <form className="space-y-8">

      <FormSection
        title="Address Information"
        description="Tell us where you're located."
      >
        <AddressFields />
      </FormSection>

      <Button className="w-full bg-primary text-white hover:bg-primary/90">
        Save & Continue
      </Button>

    </form>
  );
}