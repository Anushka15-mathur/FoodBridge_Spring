import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    BadgeCheck,
    FileText,
    Mail,
    MapPin,
    Phone,
    Store,
    User,
} from "lucide-react";

import restaurantService from "../../services/restaurantService";
import { resolveFileUrl } from "../../services/api";
import { Card, CardContent } from "../../components/ui/card";

export default function Profile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(false);
                setProfile(await restaurantService.getProfile());
            } catch (err) {
                if (err.response?.status === 404) {
                    navigate("/additional-info", {
                        replace: true,
                        state: { role: "RESTAURANT" },
                    });
                    return;
                }

                setError(true);
                toast.error(
                    err.response?.data?.message ||
                    "Failed to load restaurant profile."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-destructive">
                    Unable to load restaurant profile.
                </p>
            </div>
        );
    }

    const logoUrl = resolveFileUrl(profile.logoPath);
    const certificateUrl = resolveFileUrl(profile.fssaiCertificatePath);
    const isCertificatePdf = certificateUrl?.toLowerCase().endsWith(".pdf");
    const owner = profile.owner;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Restaurant Profile</h1>
                <p className="text-muted-foreground">
                    Your registered restaurant and owner details.
                </p>
            </div>

            <Card>
                <CardContent className="space-y-8 p-6">
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt="Restaurant logo"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Store className="h-8 w-8 text-muted-foreground" />
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                {profile.restaurantName}
                            </h2>
                            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                <BadgeCheck className="h-4 w-4" />
                                <span>License No: {profile.licenseNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold">
                            <MapPin className="h-4 w-4" />
                            Address
                        </h3>
                        <p className="text-muted-foreground">
                            {profile.address}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                            {[profile.city, profile.state, profile.pincode]
                                .filter(Boolean)
                                .join(", ")}
                        </p>
                        {profile.latitude != null && profile.longitude != null && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Coordinates: {profile.latitude}, {profile.longitude}
                            </p>
                        )}
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="mb-4 flex items-center gap-2 font-semibold">
                            <User className="h-4 w-4" />
                            Owner Details
                        </h3>

                        {owner ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Owner Name
                                    </p>
                                    <p className="font-medium">
                                        {[owner.firstName, owner.lastName]
                                            .filter(Boolean)
                                            .join(" ")}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Email
                                    </p>
                                    <p className="flex items-center gap-2 font-medium">
                                        <Mail className="h-4 w-4" />
                                        {owner.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Phone
                                    </p>
                                    <p className="flex items-center gap-2 font-medium">
                                        <Phone className="h-4 w-4" />
                                        {owner.phone}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Owner details are unavailable.
                            </p>
                        )}
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold">
                            <FileText className="h-4 w-4" />
                            FSSAI Certificate
                        </h3>

                        {certificateUrl ? (
                            isCertificatePdf ? (
                                <a
                                    href={certificateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-primary hover:bg-muted"
                                >
                                    <FileText className="h-4 w-4" />
                                    View Certificate (PDF)
                                </a>
                            ) : (
                                <a
                                    href={certificateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={certificateUrl}
                                        alt="FSSAI Certificate"
                                        className="max-h-64 rounded-lg border object-contain"
                                    />
                                </a>
                            )
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No certificate uploaded.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
