// Barrel export for the donor module.
// Keeps the edit to the shared AppRoutes.jsx down to a
// single import line.

export { default as DonorDashboard } from "./Dashboard";

export { default as FoodDonationList } from "./FoodDonation/FoodDonationList";
export { default as FoodDonationForm } from "./FoodDonation/FoodDonationForm";
export { default as FoodDonationDetails } from "./FoodDonation/FoodDonationDetails";

export { default as MoneyDonationList } from "./MoneyDonation/MoneyDonationList";
export { default as MoneyDonationForm } from "./MoneyDonation/MoneyDonationForm";
export { default as MoneyDonationDetails } from "./MoneyDonation/MoneyDonationDetails";

export { default as ClothDonationList } from "./ClothDonation/ClothDonationList";
export { default as ClothDonationForm } from "./ClothDonation/ClothDonationForm";
export { default as ClothDonationDetails } from "./ClothDonation/ClothDonationDetails";
