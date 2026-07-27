import { Input } from "../ui/input";

export default function AddressFields({
  register,
  errors,
}) {
  return (
    <>
      <div>
        <label className="mb-2 block font-medium text-heading">
          Address
        </label>

        <Input
          placeholder="Enter your address"
          {...register("address")}
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
            {...register("city")}
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
            {...register("state")}
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
          {...register("pincode")}
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