-- Synchronize the persisted donation-status enum with DonationStatus.java.
-- Run once after migration_v2_shared_donations.sql.

ALTER TABLE food_donations
    MODIFY COLUMN status ENUM(
        'PENDING_REVIEW',
        'APPROVED',
        'REJECTED',
        'AVAILABLE',
        'REQUESTED',
        'PARTIALLY_ALLOCATED',
        'FULLY_ALLOCATED',
        'PICKED_UP',
        'DELIVERED',
        'EXPIRED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'AVAILABLE';
