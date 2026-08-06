import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  Building2,
  Navigation,
  Globe,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { resolveFileUrl } from "../../services/api";
import ngoService from "../../services/ngoService";
import { Card, CardContent } from "../../components/ui/card";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      setError(false);

      const data = await ngoService.getProfile();

      setProfile(data);
      setFormData(data);
    } catch (err) {
      setError(true);

      toast.error(err.response?.data?.message || "Failed to load NGO profile.");

      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    setEditing(false);
    setFormData(profile);
  }

  async function handleSave() {
    try {
      setSaving(true);

      await ngoService.updateProfile({
        ngoName: formData.ngoName,
        address: formData.address,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        operatingRadius: Number(formData.operatingRadius),
        placeId: formData.placeId,
        phone: formData.phone,
      });

      toast.success("Profile updated successfully.");

      setEditing(false);

      await fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");

      console.error(err);
    } finally {
      setSaving(false);
    }
  }

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
        <p className="text-destructive">Unable to load NGO profile.</p>
      </div>
    );
  }
  const logoUrl = resolveFileUrl(profile.logoPath);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NGO Profile</h1>

          <p className="text-muted-foreground">Registered NGO information.</p>
        </div>

        <div className="flex gap-3">
          {editing && (
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          )}

          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={editing ? handleSave : () => setEditing(true)}
            disabled={saving}
          >
            {editing ? (saving ? "Saving..." : "Save Changes") : "Edit Profile"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-8 p-6">
          {/* NGO Header */}

          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border bg-muted">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="NGO Logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-10 w-10 text-green-600" />
              )}
            </div>

            <div className="flex-1">
              {editing ? (
                <Input
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleChange}
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.ngoName}</h2>
              )}

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-green-600" />

                <span>Registration No : {profile.registrationNumber}</span>
              </div>
            </div>
          </div>

          {/* Address */}

          <div className="border-t pt-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <MapPin className="h-4 w-4" />
              Address
            </h3>

            {editing ? (
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p className="text-muted-foreground">{profile.address}</p>
            )}
          </div>

          {/* Coordinates */}

          <div className="grid gap-5 border-t pt-6 sm:grid-cols-2">
            {!editing && (
              <div className="sm:col-span-2">
                <a
                  href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  View on Google Maps
                </a>
              </div>
            )}

            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Navigation className="h-4 w-4" />
                Latitude
              </h3>

              {editing ? (
                <Input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-muted-foreground">{profile.latitude}</p>
              )}
            </div>

            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Navigation className="h-4 w-4" />
                Longitude
              </h3>

              {editing ? (
                <Input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-muted-foreground">{profile.longitude}</p>
              )}
            </div>
          </div>

          {/* Radius */}

          <div className="border-t pt-6">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Globe className="h-4 w-4" />
              Operating Radius
            </h3>

            {editing ? (
              <Input
                name="operatingRadius"
                value={formData.operatingRadius}
                onChange={handleChange}
              />
            ) : (
              <p className="text-muted-foreground">
                {profile.operatingRadius} KM
              </p>
            )}
          </div>

          {/* Contact */}

          <div className="border-t pt-6">
            <h3 className="mb-4 font-semibold">Contact Information</h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="mt-1 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>

                {editing ? (
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="mt-1 flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
