FoodBridge Database Schema (Version 1.0)


users

Column         	Data Type	    Constraints                	Description
id           	BIGINT	        PK, AUTO_INCREMENT	        User ID
first_name	    VARCHAR(100)	NOT NULL	                First Name
last_name	    VARCHAR(100)	NOT NULL	                Last Name
email	        VARCHAR(150)	UNIQUE, NOT NULL	        Login Email
phone	        VARCHAR(15)  	UNIQUE, NOT NULL	        Mobile Number
password	    VARCHAR(255)	NOT NULL	                Encrypted Password
role	        ENUM	        NOT NULL	                ADMIN, RESTAURANT, NGO, VOLUNTEER, DONOR
account_status	ENUM	        NOT NULL	                PENDING, APPROVED, REJECTED, SUSPENDED
created_at	    DATETIME	    NOT NULL	                Created Time
updated_at	    DATETIME	    NOT NULL	                Updated Time

==========================================================================================

restaurants

Column       	  Data Type	          Constraints
id           	  BIGINT	          PK
user_id	          BIGINT	          FK → users.id
restaurant_name	  VARCHAR(200)	      NOT NULL
address	          VARCHAR(500)	      NOT NULL
latitude	      DOUBLE	          NOT NULL
longitude	      DOUBLE	          NOT NULL
place_id	      VARCHAR(255)	
license_number	  VARCHAR(100)	      UNIQUE
is_deleted	     BOOLEAN	          DEFAULT FALSE

============================================================================================

ngos

Column	                 Data Type	        Constraints
id	                     BIGINT	            PK
user_id	                 BIGINT	            FK → users.id
ngo_name	             VARCHAR(200)	    NOT NULL
registration_number   	 VARCHAR(100)	    UNIQUE
address	                 VARCHAR(500)	    NOT NULL
latitude	             DOUBLE	            NOT NULL
longitude	             DOUBLE	            NOT NULL
place_id	             VARCHAR(255)	
operating_radius	     DOUBLE	
is_deleted	             BOOLEAN	        DEFAULT FALSE

=============================================================================================

volunteers

Column               	Data Type	    Constraints
id	                    BIGINT	        PK
user_id	                BIGINT	        FK → users.id
available	            BOOLEAN	
verified	            BOOLEAN	
current_latitude	    DOUBLE	
current_longitude	    DOUBLE	
max_delivery_distance	DOUBLE	
is_deleted	            BOOLEAN	        DEFAULT FALSE

=============================================================================================

donors

Column	              Data Type	         Constraints
id	                  BIGINT	         PK
user_id	              BIGINT	         FK → users.id
organization	      BOOLEAN	
organization_name	  VARCHAR(200)	
total_donations	      INT	
total_meals_donated	  INT	
is_deleted	          BOOLEAN	         DEFAULT FALSE

=============================================================================================

food_donations

Column	                       Data Type	          Constraints
id	                           BIGINT	              PK
restaurant_id	               BIGINT	              FK → restaurants.id
title	                       VARCHAR(200)	          NOT NULL
description	                   TEXT	
food_type	                   ENUM	
quantity	                   DECIMAL(10,2)	      NOT NULL
remaining_quantity	           DECIMAL(10,2)	      NOT NULL
quantity_unit	               ENUM	
estimated_meals	               INT	
prepared_at	                   DATETIME	
expiry_time	                   DATETIME	
pickup_address	               VARCHAR(500)	
latitude	                   DOUBLE	
longitude	                   DOUBLE	
place_id	                   VARCHAR(255)	
special_instructions	       VARCHAR(500)	
food_condition              	ENUM	
status	                       ENUM	                 AVAILABLE, PARTIALLY_ALLOCATED, FULLY_ALLOCATED, EXPIRED
is_deleted	                  BOOLEAN	DEFAULT FALSE
created_at	                  DATETIME	
updated_at	                  DATETIME	

====================================================================================================

donation_images

Column	                        Data Type	          Constraints
id	                            BIGINT	              PK
donation_id                    	BIGINT	              FK → food_donations.id
image_url	                    VARCHAR(500)	      NOT NULL
primary_image               	BOOLEAN	

====================================================================================================

donation_requests

Column 	                        Data Type	          Constraints
id	                            BIGINT	              PK
donation_id                    	BIGINT	              FK → food_donations.id
ngo_id	                        BIGINT	              FK → ngos.id
requested_quantity	            DECIMAL(10,2)	      NOT NULL
request_message             	VARCHAR(500)	
status	                        ENUM	              PENDING, APPROVED, REJECTED
requested_at	                DATETIME	
created_at                  	DATETIME	
updated_at	                    DATETIME

========================================================================================================

donation_allocations

Column	                        Data Type	          Constraints
id	                            BIGINT	              PK
request_id	                    BIGINT	              UNIQUE, FK → donation_requests.id
allocated_by	                BIGINT	              FK → users.id
allocated_quantity	            DECIMAL(10,2)	      NOT NULL
status	                        ENUM	              PENDING, ALLOCATED
admin_remarks	                VARCHAR(500)	
allocated_at	                DATETIME	          NOT NULL
created_at	                    DATETIME	
updated_at	                    DATETIME

=========================================================================================================

deliveries-->

Created only after NGO assigns a volunteer.

Column	                       Data Type	            Constraints
id	                           BIGINT	                PK
allocation_id              	   BIGINT	                UNIQUE, FK → donation_allocations.id
volunteer_id	               BIGINT	                FK → volunteers.id
status	                       ENUM	                    ASSIGNED, PICKED_UP, IN_TRANSIT, DELIVERED, CANCELLED
assigned_at                	   DATETIME	
pickup_time	                   DATETIME	
delivered_time	               DATETIME	
delivery_remarks	           VARCHAR(500)	
pickup_otp	                   VARCHAR(10)	
delivery_otp	               VARCHAR(10)	
pickup_verified	               BOOLEAN	
delivery_verified	           BOOLEAN	
pickup_otp_expiry	           DATETIME	
delivery_otp_expiry	           DATETIME	
created_at	                   DATETIME	
updated_at	                    DATETIME	

=============================================================================================================
Entity Relationships

User
 ├──1:1── Restaurant
 ├──1:1── NGO
 ├──1:1── Volunteer
 └──1:1── Donor

Restaurant
      │
      └──────< FoodDonation
                    │
                    └──────< DonationImage

FoodDonation
      │
      └──────< DonationRequest >────── NGO

DonationRequest
      │
      └──────1:1 DonationAllocation

DonationAllocation
      │
      └──────1:1 Delivery

Delivery
      │
      └────── ManyToOne Volunteer

=================================================================================================

Complete Workflow
Restaurant
    │
Creates Donation
    │
    ▼
FoodDonation (AVAILABLE)
    │
    ▼
NGO requests food
    │
    ▼
DonationRequest (PENDING)
    │
    ▼
Admin reviews request
    │
    ▼
DonationAllocation (ALLOCATED)
    │
    ├── FoodDonation.remainingQuantity updated
    ├── FoodDonation.status updated
    └── DonationRequest.status = APPROVED
    │
    ▼
NGO assigns Volunteer
    │
    ▼
Delivery (ASSIGNED)
    │
    ▼
Volunteer Pickup (OTP)
    │
    ▼
Volunteer Delivery (OTP)
    │
    ▼
Delivery Completed