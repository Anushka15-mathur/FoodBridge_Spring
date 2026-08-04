import { Input } from "../ui/input";

export default function AddressFields({
  register,
  errors,
  required = false,
}) {
  return (
    <>
      <div>
        <label className="mb-2 block font-medium text-heading">
          Address
        </label>

        <Input
          placeholder="Enter your address"
          {...register("address", {
            required: required ? "Address is required" : false,
          })}
        />

        {errors.address && (
          <p className="mt-1 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-heading">
            City
          </label>

          <Input
            placeholder="City"
            {...register("city", {
              required: required ? "City is required" : false,
            })}
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-heading">
            State
          </label>

          <Input
            placeholder="State"
            {...register("state", {
              required: required ? "State is required" : false,
            })}
          />

          {errors.state && (
            <p className="mt-1 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-heading">
          Pincode
        </label>

        <Input
          placeholder="411001"
          {...register("pincode", {
            required: required ? "Pincode is required" : false,
            pattern: required
              ? {
                  value: /^\d{6}$/,
                  message: "Enter a valid 6-digit pincode",
                }
              : undefined,
          })}
        />

        {errors.pincode && (
          <p className="mt-1 text-sm text-red-500">
            {errors.pincode.message}
          </p>
        )}
      </div>
    </>
  );
}
