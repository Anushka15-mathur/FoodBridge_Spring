import { useEffect, useMemo, useState } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { toast } from "sonner";

import adminService from "../../services/adminService";
import { resolveFileUrl } from "../../services/api";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function UserDetailsSheet({ userId, open, onOpenChange, onApprove, onReject, actionLoading }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!open || !userId) return;
    const loadUser = async () => {
      try {
        setLoading(true);
        setUser(await adminService.getUserById(userId));
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to load user.");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [open, userId]);

  const roleInfo = useMemo(() => {
    if (!user) return [];
    const location = user.currentLatitude != null && user.currentLongitude != null
      ? `${user.currentLatitude}, ${user.currentLongitude}`
      : "-";
    switch (user.role) {
      case "RESTAURANT":
        return [{ label: "Restaurant Name", value: user.restaurantName || "-" }, { label: "License Number", value: user.licenseNumber || "-" }, { label: "Address", value: user.address || "-" }];
      case "NGO":
        return [{ label: "NGO Name", value: user.ngoName || "-" }, { label: "Registration Number", value: user.registrationNumber || "-" }, { label: "Address", value: user.address || "-" }, { label: "Operating Radius", value: user.operatingRadius != null ? `${user.operatingRadius} km` : "-" }];
      case "VOLUNTEER":
        return [
          ...(location !== "-" ? [{ label: "Current Location", value: location }] : []),
          { label: "Maximum Delivery Distance", value: user.maxDeliveryDistance != null ? `${user.maxDeliveryDistance} km` : "-" },
        ];
      case "DONOR":
        return [{ label: "Organization", value: user.organization === true ? "Organization" : user.organization === false ? "Individual" : "-" }, { label: "Organization Name", value: user.organizationName || "-" }];
      default:
        return [];
    }
  }, [user]);

  const documents = useMemo(() => {
    if (!user) return [];
    return [
      ["fssaiCertificatePath", "FSSAI Certificate"],
      ["registrationCertificatePath", "Registration Certificate"],
      ["drivingLicensePath", "Driving License"],
      ["identityProofPath", "Identity Proof"],
      ["organizationProofPath", "Organization Proof"],
    ].flatMap(([field, label]) => {
      const path = user[field];
      const url = resolveFileUrl(path);
      return url ? [{ label, url, fileName: path.split("/").pop() }] : [];
    });
  }, [user]);

  const logoUrl = resolveFileUrl(user?.logoPath);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-h-[90vh] w-full max-w-[calc(100%-2rem)] overflow-y-auto rounded-[28px] p-5 sm:max-w-4xl sm:p-6">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl font-semibold text-heading sm:text-2xl">Pending User Verification</DialogTitle>
              <DialogDescription className="mt-2">Review the profile and documents before making a decision.</DialogDescription>
            </div>
            <DialogClose asChild><Button variant="outline" size="icon" aria-label="Close details"><X className="h-4 w-4" /></Button></DialogClose>
          </div>
        </DialogHeader>

        {loading && <div className="space-y-3 py-2"><Skeleton className="h-32 w-full" /><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>}
        {!loading && user && <div className="space-y-5 py-2">
          <div className="grid gap-4 md:grid-cols-2">
            <DetailCard title="Basic Information">
              <DetailRow label="Full Name" value={`${user.firstName || ""} ${user.lastName || ""}`.trim() || "-"} />
              <DetailRow label="Email" value={user.email || "-"} />
              <DetailRow label="Phone" value={user.phone || "-"} />
              <DetailRow label="Role" value={<UserRoleBadge role={user.role} />} />
            </DetailCard>
            <DetailCard title="Account Information">
              <DetailRow label="Account Status" value={<UserStatusBadge status={user.status} />} />
              <DetailRow label="Profile" value={user.profileCompleted ? <Badge className="border border-primary/20 bg-primary/10 text-primary">Completed</Badge> : <Badge variant="outline">Incomplete</Badge>} />
              <DetailRow label="Registration Date" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-"} />
            </DetailCard>
          </div>
          <DetailCard title="Role Specific Information">
            <div className="grid gap-3 sm:grid-cols-2">{roleInfo.map((item) => <DetailRow key={item.label} {...item} />)}</div>
            {logoUrl && <div className="mt-5 flex items-center gap-4 rounded-xl border border-primary/15 bg-primary/5 p-3"><img src={logoUrl} alt="Profile logo" className="h-14 w-14 rounded-lg border bg-white object-contain" /><div><p className="font-medium text-heading">Profile Logo</p><a href={logoUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Open logo</a></div></div>}
          </DetailCard>
          <DetailCard title="Uploaded Documents">
            {documents.length ? <div className="grid gap-3 sm:grid-cols-2">{documents.map((document) => <DocumentCard key={document.label} document={document} />)}</div> : <p className="text-sm text-muted-foreground">No uploaded documents.</p>}
          </DetailCard>
        </div>}

        <DialogFooter className="mt-2 flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <span className="text-sm text-muted-foreground">{user ? `User ID: ${user.id}` : ""}</span>
          {onApprove && onReject && <div className="flex gap-3"><ActionDialog action="reject" loading={actionLoading} onConfirm={onReject} /><ActionDialog action="approve" loading={actionLoading} onConfirm={onApprove} /></div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailCard({ title, children }) { return <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm"><CardHeader className="border-b bg-slate-50/70 px-5 py-3"><CardTitle className="text-base font-semibold text-heading">{title}</CardTitle></CardHeader><CardContent className="space-y-3 px-5 py-4">{children}</CardContent></Card>; }
function DetailRow({ label, value }) { return <div className="min-w-0 rounded-lg bg-slate-50 px-3 py-2"><p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p><div className="mt-1 break-words text-sm font-medium text-slate-800">{value}</div></div>; }
function DocumentCard({ document }) { return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"><div className="flex gap-3"><FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div className="min-w-0"><p className="font-semibold text-heading">{document.label}</p><p className="truncate text-xs text-muted-foreground" title={document.fileName}>{document.fileName}</p></div></div><div className="mt-4 flex gap-2"><a href={document.url} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/20 bg-white px-3 text-sm font-medium text-primary hover:bg-primary/5"><ExternalLink className="h-3.5 w-3.5" />View</a><a href={document.url} target="_blank" rel="noreferrer" download className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-white hover:bg-primary-hover"><Download className="h-3.5 w-3.5" />Download</a></div></div>; }
function ActionDialog({ action, loading, onConfirm }) { const [open, setOpen] = useState(false); const approve = action === "approve"; const submit = async () => { const success = await onConfirm(); if (success) setOpen(false); }; return <AlertDialog open={open} onOpenChange={setOpen}><AlertDialogTrigger asChild><Button disabled={loading} className={approve ? "bg-primary text-white hover:bg-primary-hover hover:text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}>{approve ? "Approve" : "Reject"}</Button></AlertDialogTrigger><AlertDialogContent className="gap-6 rounded-2xl p-6"><AlertDialogHeader className="gap-3"><AlertDialogTitle className="text-lg font-semibold">{approve ? "Approve User" : "Reject User"}</AlertDialogTitle><AlertDialogDescription>{approve ? "This user will immediately gain access to FoodBridge after approval." : "This registration request will be rejected."}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter className="-mx-6 -mb-6 border-0 bg-transparent px-6 pb-6 pt-0"><AlertDialogCancel disabled={loading} className="border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200">Cancel</AlertDialogCancel><AlertDialogAction onClick={submit} disabled={loading} className={approve ? "bg-primary text-white hover:bg-primary-hover hover:text-white" : "bg-destructive text-white hover:bg-destructive/90"}>{loading ? "Processing..." : approve ? "Approve" : "Reject"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>; }
