FoodBridge Backend API Documentation (v1.0)


Base URL
http://localhost:8080


1. Authentication APIs
Register User
POST /api/auth/register
Request Body
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "phone": "9876543210",
  "password": "Password@123",
  "role": "RESTAURANT"
}
Response
{
  "message": "Registration successful. Waiting for admin approval."
}
Login
POST /api/auth/login
Request
{
  "email": "admin@foodbridge.com",
  "password": "Admin@123"
}
Response
{
  "token": "JWT_TOKEN",
  "role": "ADMIN",
  "firstName": "System",
  "lastName": "Admin"
}
Complete Profile
PUT /api/auth/profile

Authorization Required

Bearer Token


2. Admin Dashboard APIs
Dashboard Summary
GET /api/admin/dashboard

Returns

Total Users
Total Restaurants
Total NGOs
Total Volunteers
Total Donors


3. User Management APIs
Get All Users
GET /api/admin/users

Supports

Pagination
Sorting
Search

Example

GET /api/admin/users?page=0&size=10
Search Users
GET /api/admin/users/search?keyword=raj
Filter By Role
GET /api/admin/users/role/RESTAURANT

Roles

ADMIN

RESTAURANT

NGO

VOLUNTEER

DONOR
Filter By Status
GET /api/admin/users/status/PENDING

Statuses

PENDING

APPROVED

REJECTED

SUSPENDED
Approve User
PUT /api/admin/users/{id}/approve
Reject User
PUT /api/admin/users/{id}/reject
Suspend User
PUT /api/admin/users/{id}/suspend


4. Donation Allocation APIs
Allocate Donation
POST /api/admin/allocations

Authorization

ADMIN

Request

{
  "requestId": 1,
  "allocatedQuantity": 10,
  "adminRemarks": "Approved"
}

Response

{
  "allocationId": 1,
  "donationId": 1,
  "requestId": 1,
  "ngoName": "Helping Hands Foundation",
  "allocatedQuantity": 10,
  "allocationStatus": "ALLOCATED",
  "adminRemarks": "Approved",
  "allocatedAt": "2026-07-23T10:30:00",
  "message": "Donation allocated successfully."
}
Authentication

Protected APIs require

Authorization

Bearer <JWT_TOKEN>

Roles

Role	             Access
ADMIN	             Full Access
RESTAURANT	         Restaurant Module
NGO	                 NGO Module
VOLUNTEER	         Volunteer Module
DONOR	             Donor Module


HTTP Status Codes

Code	       Meaning
200        	   Success
201	           Resource Created
400	           Bad Request
401	           Unauthorized
403	           Forbidden
404	           Resource Not Found
500	           Internal Server Error