import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import ngoService from "../../services/ngoService";
import DonationCard from "../../components/ngo/DonationCard";
import { Input } from "../../components/ui/input";

export default function Donations() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonations();
  }, []);

  useEffect(() => {
    const filtered = donations.filter((donation) =>
      donation.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredDonations(filtered);
  }, [search, donations]);

  async function loadDonations() {
    setLoading(true);

    try {
      const data = await ngoService.getAvailableDonations();

      console.log("Available Donations:", data);

      setDonations(data);
      setFilteredDonations(data);
    } catch (err) {
      console.error("Error loading donations:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleView(id) {
    navigate(`/ngo/donations/${id}`);
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Available Donations
          </h1>

          <p className="mt-2 text-gray-500">
            Browse and request available food donations.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <Input
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

          <h2 className="text-xl font-semibold">
            Loading Donations...
          </h2>

          <p className="mt-2 text-gray-500">
            Please wait while we fetch available donations.
          </p>

        </div>

      ) : filteredDonations.length === 0 ? (

        <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">

          <h2 className="text-2xl font-semibold">
            No Donations Found
          </h2>

          <p className="mt-3 text-gray-500">
            New donations will appear here.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onView={handleView}
            />
          ))}

        </div>

      )}

    </div>
  );
}