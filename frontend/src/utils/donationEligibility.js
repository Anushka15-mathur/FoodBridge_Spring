const REQUESTABLE_STATUSES = new Set([
  "AVAILABLE",
  "PARTIALLY_ALLOCATED",
]);

export function isDonationRequestable(donation) {
  const expiryTime = new Date(donation?.expiryTime).getTime();
  const remainingQuantity = Number(
    donation?.remainingQuantity ?? donation?.quantity ?? 0
  );

  return (
    REQUESTABLE_STATUSES.has(donation?.status) &&
    Number.isFinite(expiryTime) &&
    expiryTime > Date.now() &&
    Number.isFinite(remainingQuantity) &&
    remainingQuantity > 0
  );
}
