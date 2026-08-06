// Option lists mirroring the donor module backend enums.
// Keep these in sync with com.foodbridge.donor.enums.*
// and com.foodbridge.donation.enums.QuantityUnit.

export const DONATION_STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "PICKED_UP", label: "Picked Up" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
];

export const QUANTITY_UNIT_OPTIONS = [
    { value: "KG", label: "Kilogram (kg)" },
    { value: "GRAM", label: "Gram (g)" },
    { value: "LITER", label: "Litre (L)" },
    { value: "PLATE", label: "Plate" },
    { value: "PACKET", label: "Packet" },
    { value: "BOX", label: "Box" },
    { value: "PIECES", label: "Pieces" },
];

export const PAYMENT_MODE_OPTIONS = [
    { value: "CASH", label: "Cash" },
    { value: "UPI", label: "UPI" },
    { value: "CARD", label: "Card" },
    { value: "NET_BANKING", label: "Net Banking" },
    { value: "WALLET", label: "Wallet" },
    { value: "CHEQUE", label: "Cheque" },
];

export const CLOTH_CATEGORY_OPTIONS = [
    { value: "MEN", label: "Men" },
    { value: "WOMEN", label: "Women" },
    { value: "KIDS", label: "Kids" },
    { value: "INFANT", label: "Infant" },
    { value: "UNISEX", label: "Unisex" },
    { value: "WINTER_WEAR", label: "Winter Wear" },
    { value: "FOOTWEAR", label: "Footwear" },
];

export const CLOTH_CONDITION_OPTIONS = [
    { value: "NEW", label: "New" },
    { value: "GENTLY_USED", label: "Gently Used" },
    { value: "USED", label: "Used" },
];

// Transaction reference is mandatory for every mode except CASH,
// matching DonorDonationValidator.validateMoneyDonation on the backend.
export const REFERENCE_OPTIONAL_MODES = ["CASH"];

// Shared native-select styling, copied from the existing
// restaurant AddDonation form so donor forms look identical.
export const selectClassName =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export const toDateTimeLocal = (date) => {
    const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60_000
    );
    return localDate.toISOString().slice(0, 16);
};

export const formatDateTime = (value) => {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatCurrency = (value) => {

    const amount = Number(value ?? 0);

    if (Number.isNaN(amount)) {
        return "₹0";
    }

    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    });
};
