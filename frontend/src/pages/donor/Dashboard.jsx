import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import donationService from "../../services/donationService";
import { Button } from "../../components/ui/button";
import DonationStatusBadge from "../../components/restaurant/DonationStatusBadge";

export default function DonorDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => { donationService.getDonorDashboard().then(setData).catch(e => toast.error(e.response?.data?.message || "Failed to load donor dashboard.")); }, []);
  if (!data) return <div className="flex h-96 items-center justify-center text-muted-foreground">Loading dashboard...</div>;
  const stats = [["Total Donations", data.totalDonations], ["Total Food Donations", data.totalFoodDonations], ["Total Money Donations", data.totalMoneyDonations], ["Total Amount Donated", `INR ${data.totalAmountDonated ?? 0}`], ["Total Meals Donated", data.totalMealsDonated]];
  return <div className="space-y-6"><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Donor Dashboard</h1><p className="text-muted-foreground">Track your food and money donations.</p></div><Button onClick={() => navigate("/donor/create-donation")}>Create Donation</Button></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{stats.map(([label,value]) => <div key={label} className="rounded-xl border bg-card p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-bold">{value ?? 0}</p></div>)}</div><div className="rounded-xl border bg-card"><div className="border-b p-5"><h2 className="font-bold">Recent Donations</h2></div><div className="divide-y">{data.recentDonations?.length ? data.recentDonations.map(d => <div key={d.id} className="flex items-center justify-between p-4"><div><p className="font-medium">{d.donationType === "MONEY" ? d.donationPurpose || "Money Donation" : d.foodName}</p><p className="text-sm text-muted-foreground">{d.donationType === "MONEY" ? `${d.currency || "INR"} ${d.amount}` : `${d.quantity} ${d.quantityUnit}`}</p></div><DonationStatusBadge status={d.status}/></div>) : <p className="p-5 text-muted-foreground">No donations yet.</p>}</div></div></div>;
}
