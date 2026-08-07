-- FoodBridge shared donation migration
-- Run once against an existing MySQL database before deploying donor money donations.
-- Food-only values are nullable because MONEY rows do not have food attributes.

ALTER TABLE food_donations
    MODIFY COLUMN restaurant_id BIGINT NULL,
    MODIFY COLUMN title VARCHAR(150) NULL,
    MODIFY COLUMN food_type VARCHAR(255) NULL,
    MODIFY COLUMN quantity DECIMAL(10,2) NULL,
    MODIFY COLUMN remaining_quantity DECIMAL(10,2) NULL,
    MODIFY COLUMN quantity_unit VARCHAR(255) NULL,
    MODIFY COLUMN estimated_meals INT NULL,
    MODIFY COLUMN prepared_at DATETIME NULL,
    MODIFY COLUMN expiry_time DATETIME NULL,
    MODIFY COLUMN pickup_address VARCHAR(255) NULL,
    MODIFY COLUMN latitude DOUBLE NULL,
    MODIFY COLUMN longitude DOUBLE NULL,
    MODIFY COLUMN food_condition VARCHAR(255) NULL;
