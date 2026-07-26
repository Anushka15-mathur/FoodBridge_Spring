import { Input } from "../ui/input";

export default function AddressFields() {
  return (
    <>
      <div>
        <label className="mb-2 block font-medium text-heading">
          Address
        </label>

        <Input placeholder="Enter your address" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-heading">
            City
          </label>

          <Input placeholder="City" />
        </div>

        <div>
          <label className="mb-2 block font-medium text-heading">
            State
          </label>

          <Input placeholder="State" />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-heading">
          Pincode
        </label>

        <Input placeholder="411001" />
      </div>
    </>
  );
}