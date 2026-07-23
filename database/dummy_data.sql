-- =====================================================
-- FOODBRIDGE DUMMY DATA
-- PART 1 : USERS + RESTAURANTS + NGOS
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- USERS
-- =====================================================

-- Password : Admin@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'admin1@foodbridge.com','System','Admin',
'$2a$12$SyHQkhtauGRj/Bb2m4o5z.hofLKdqOHfcNe4.HElR4Wo6TlYgVycK',
'9000000001',
'ADMIN',
'APPROVED',
NOW(),
b'1');



-- Password : Rest@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'restaurant1@gmail.com','Raj','Patil',
'$2a$12$ECyPOn6yKPuzaYR8DSgj.OZOl67JP/tsHVg1B6JX7JS6gohBQI8F2',
'9000000002',
'RESTAURANT',
'APPROVED',
NOW(),
b'1');



-- Password : Rest@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'restaurant2@gmail.com','Sneha','Joshi',
'$2a$12$ECyPOn6yKPuzaYR8DSgj.OZOl67JP/tsHVg1B6JX7JS6gohBQI8F2',
'9000000003',
'RESTAURANT',
'APPROVED',
NOW(),
b'1');



-- Password : Ngo@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'ngo1@gmail.com','Helping','Hands',
'$2a$12$ee4/kuq21J.YEV5XSQAVHuiauLxNKgTEBde5gY3FgolYJPcn.ZlMa',
'9000000004',
'NGO',
'APPROVED',
NOW(),
b'1');



-- Password : Ngo@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'ngo2@gmail.com','Food','Care',
'$2a$12$ee4/kuq21J.YEV5XSQAVHuiauLxNKgTEBde5gY3FgolYJPcn.ZlMa',
'9000000005',
'NGO',
'APPROVED',
NOW(),
b'1');



-- Password : Volunteer@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'volunteer1@gmail.com','Amit','Sharma',
'$2a$12$gFGDWGP/mzDv010H2hYc0OyTWyskIRcazBsXHp36KZSPLS7wZjjti',
'9000000006',
'VOLUNTEER',
'APPROVED',
NOW(),
b'1');



-- Password : Volunteer@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'volunteer2@gmail.com','Rohan','More',
'$2a$12$gFGDWGP/mzDv010H2hYc0OyTWyskIRcazBsXHp36KZSPLS7wZjjti',
'9000000007',
'VOLUNTEER',
'APPROVED',
NOW(),
b'1');



-- Password : Donor@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'donor1@gmail.com','Priya','Kulkarni',
'$2a$12$IDkLgdT5D32jdc7iwzAKreJLaOo61p6yVD0bZ9WvvUTt88V.7cJN2',
'9000000008',
'DONOR',
'APPROVED',
NOW(),
b'1');



-- Password : Donor@123

INSERT INTO users
(created_at,email,first_name,last_name,password,phone,role,status,updated_at,profile_completed)
VALUES
(NOW(),'donor2@gmail.com','Kiran','Deshmukh',
'$2a$12$IDkLgdT5D32jdc7iwzAKreJLaOo61p6yVD0bZ9WvvUTt88V.7cJN2',
'9000000009',
'DONOR',
'APPROVED',
NOW(),
b'1');



-- =====================================================
-- RESTAURANTS
-- user_id = 2 & 3
-- =====================================================

INSERT INTO restaurants
(created_at,updated_at,address,is_deleted,latitude,license_number,longitude,place_id,restaurant_name,user_id)
VALUES
(
NOW(),
NOW(),
'FC Road, Pune',
b'0',
18.5204,
'REST001',
73.8567,
'PLACE_REST_001',
'Hotel Annapurna',
2
);

INSERT INTO restaurants
(created_at,updated_at,address,is_deleted,latitude,license_number,longitude,place_id,restaurant_name,user_id)
VALUES
(
NOW(),
NOW(),
'Baner, Pune',
b'0',
18.5590,
'REST002',
73.7868,
'PLACE_REST_002',
'Spice Garden',
3
);



-- =====================================================
-- NGOS
-- user_id = 4 & 5
-- =====================================================

INSERT INTO ngos
(created_at,updated_at,address,is_deleted,latitude,longitude,ngo_name,operating_radius,place_id,registration_number,user_id)
VALUES
(
NOW(),
NOW(),
'Shivajinagar, Pune',
b'0',
18.5300,
73.8470,
'Helping Hands Foundation',
25,
'PLACE_NGO_001',
'NGO001',
4
);

INSERT INTO ngos
(created_at,updated_at,address,is_deleted,latitude,longitude,ngo_name,operating_radius,place_id,registration_number,user_id)
VALUES
(
NOW(),
NOW(),
'Kothrud, Pune',
b'0',
18.5074,
73.8077,
'Food For All',
20,
'PLACE_NGO_002',
'NGO002',
5
);

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- FOODBRIDGE DUMMY DATA
-- PART 2 : VOLUNTEERS + DONORS + FOOD DONATIONS
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- VOLUNTEERS
-- user_id = 6 & 7
-- =====================================================

INSERT INTO volunteers
(created_at,updated_at,available,current_latitude,current_longitude,is_deleted,max_delivery_distance,verified,user_id)
VALUES
(
NOW(),
NOW(),
b'1',
18.5204,
73.8567,
b'0',
20,
b'1',
6
);

INSERT INTO volunteers
(created_at,updated_at,available,current_latitude,current_longitude,is_deleted,max_delivery_distance,verified,user_id)
VALUES
(
NOW(),
NOW(),
b'1',
18.5074,
73.8077,
b'0',
15,
b'1',
7
);

-- =====================================================
-- DONORS
-- user_id = 8 & 9
-- =====================================================

INSERT INTO donors
(created_at,updated_at,is_deleted,organization,organization_name,total_donations,total_meals_donated,user_id)
VALUES
(
NOW(),
NOW(),
b'0',
b'1',
'TCS Foundation',
15,
350,
8
);

INSERT INTO donors
(created_at,updated_at,is_deleted,organization,organization_name,total_donations,total_meals_donated,user_id)
VALUES
(
NOW(),
NOW(),
b'0',
b'0',
NULL,
4,
90,
9
);

-- =====================================================
-- FOOD DONATIONS
-- restaurant_id = 1 & 2
-- =====================================================

INSERT INTO food_donations
(
created_at,
updated_at,
description,
estimated_meals,
expiry_time,
food_type,
is_deleted,
latitude,
longitude,
pickup_address,
place_id,
prepared_at,
quantity,
quantity_unit,
remaining_quantity,
special_instructions,
status,
title,
restaurant_id,
food_condition
)
VALUES
(
NOW(),
NOW(),
'Fresh Veg Biryani prepared for lunch.',
50,
DATE_ADD(NOW(),INTERVAL 6 HOUR),
'VEG',
b'0',
18.5204,
73.8567,
'FC Road Pune',
'PLACE_DON_001',
DATE_SUB(NOW(),INTERVAL 1 HOUR),
25.00,
'KG',
25.00,
'Collect before expiry.',
'AVAILABLE',
'Veg Biryani',
1,
'FRESH'
);

INSERT INTO food_donations
(
created_at,
updated_at,
description,
estimated_meals,
expiry_time,
food_type,
is_deleted,
latitude,
longitude,
pickup_address,
place_id,
prepared_at,
quantity,
quantity_unit,
remaining_quantity,
special_instructions,
status,
title,
restaurant_id,
food_condition
)
VALUES
(
NOW(),
NOW(),
'Chapati and Mixed Vegetable Curry',
35,
DATE_ADD(NOW(),INTERVAL 5 HOUR),
'VEG',
b'0',
18.5590,
73.7868,
'Baner Pune',
'PLACE_DON_002',
DATE_SUB(NOW(),INTERVAL 30 MINUTE),
18.00,
'KG',
18.00,
'Pickup immediately.',
'AVAILABLE',
'Chapati Meal',
2,
'HOT'
);

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- FOODBRIDGE DUMMY DATA
-- PART 3 : REQUESTS + ALLOCATIONS + DELIVERIES
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- DONATION REQUESTS
-- donation_id = 1 & 2
-- ngo_id = 1 & 2
-- =====================================================

INSERT INTO donation_requests
(
created_at,
updated_at,
request_message,
requested_at,
requested_quantity,
status,
donation_id,
ngo_id
)
VALUES
(
NOW(),
NOW(),
'We need food for today's evening distribution.',
NOW(),
10.00,
'APPROVED',
1,
1
);

INSERT INTO donation_requests
(
created_at,
updated_at,
request_message,
requested_at,
requested_quantity,
status,
donation_id,
ngo_id
)
VALUES
(
NOW(),
NOW(),
'Food required for senior citizens.',
NOW(),
8.00,
'PENDING',
2,
2
);



-- =====================================================
-- DONATION ALLOCATION
--
-- request_id = 1
-- allocated_by = Admin (user_id = 1)
-- =====================================================

INSERT INTO donation_allocations
(
created_at,
updated_at,
admin_remarks,
allocated_at,
allocated_quantity,
status,
allocated_by,
request_id
)
VALUES
(
NOW(),
NOW(),
'Approved by admin.',
NOW(),
10.00,
'ALLOCATED',
1,
1
);



-- =====================================================
-- UPDATE DONATION AFTER ALLOCATION
-- =====================================================

UPDATE food_donations
SET
remaining_quantity = 15.00,
status = 'PARTIALLY_ALLOCATED'
WHERE id = 1;



-- =====================================================
-- DELIVERY
--
-- allocation_id = 1
-- volunteer_id = 1
-- =====================================================

INSERT INTO deliveries
(
created_at,
updated_at,
assigned_at,
delivered_time,
delivery_otp,
delivery_otp_expiry,
delivery_remarks,
delivery_verified,
pickup_otp,
pickup_otp_expiry,
pickup_time,
pickup_verified,
status,
allocation_id,
volunteer_id
)
VALUES
(
NOW(),
NOW(),
NOW(),
NULL,
NULL,
NULL,
NULL,
b'0',
NULL,
NULL,
NULL,
b'0',
'ASSIGNED',
1,
1
);

SET FOREIGN_KEY_CHECKS = 1;
