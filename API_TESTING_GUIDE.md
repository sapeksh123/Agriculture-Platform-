# API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication Flow

### 1. Admin Login
```
POST /auth/login
```
Request Body:
```json
{
    "email": "admin@agriculture.com",
    "password": "admin123"
}
```
Response:
```json
{
    "message": "Login successful",
    "token": "your_jwt_token",
    "user": {
        "id": "user_id",
        "name": "Admin",
        "email": "admin@agriculture.com",
        "role": "admin"
    }
}
```
- Save the token for subsequent admin requests

### 2. Create Equipment Owner (Admin only)
```
POST /admin/owners
```
Headers:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "businessName": "John's Equipment Rental",
    "address": "123 Farm Road, Rural Area",
    "phoneNumber": "1234567890",
    "aadharNumber": "1111 2222 3333 4444"
}
```
Response:
```json
{
    "message": "Owner created successfully",
    "owner": {
        "user": {
            "id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "owner"
        },
        "businessName": "John's Equipment Rental",
        "address": "123 Farm Road, Rural Area",
        "phoneNumber": "1234567890",
        "aadharNumber": "1111 2222 3333 4444",
        "status": "active",
        "_id": "owner_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

### 3. Create Shopkeeper (Admin only)
```
POST /admin/shopkeepers
```
Headers:
```
Authorization: Bearer your_jwt_token
```
Request Body:
```json
{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "shopName": "Green Agro Shop",
    "address": "456 Market Street, City Area",
    "phoneNumber": "9876543210",
    "aadharNumber": "5555 6666 7777 8888"
}
```
Response:
```json
{
    "message": "Shopkeeper created successfully",
    "shopkeeper": {
        "user": {
            "id": "user_id",
            "name": "Jane Smith",
            "email": "jane@example.com",
            "role": "shopkeeper"
        },
        "shopName": "Green Agro Shop",
        "address": "456 Market Street, City Area",
        "phoneNumber": "9876543210",
        "aadharNumber": "5555 6666 7777 8888",
        "status": "active",
        "_id": "shopkeeper_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

### 4. Farmer Registration (Public)
```
POST /auth/signup
```
Request Body:
```json
{
    "name": "Robert Farmer",
    "email": "robert@example.com",
    "password": "password123"
}
```
Response:
```json
{
    "message": "Farmer registered successfully",
    "token": "your_jwt_token",
    "user": {
        "id": "user_id",
        "name": "Robert Farmer",
        "email": "robert@example.com",
        "role": "farmer"
    }
}
```

### 5. Get All Owners (Admin only)
```
GET /admin/owners
```
Headers:
```
Authorization: Bearer your_jwt_token
```
Response:
```json
{
    "owners": [
        {
            "_id": "owner_id",
            "user": {
                "_id": "user_id",
                "name": "John Doe",
                "email": "john@example.com",
                "role": "owner"
            },
            "businessName": "John's Equipment Rental",
            "address": "123 Farm Road, Rural Area",
            "phoneNumber": "1234567890",
            "aadharNumber": "1111 2222 3333 4444",
            "status": "active",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
}
```

### 6. Get All Shopkeepers (Admin only)
```
GET /admin/shopkeepers
```
Headers:
```
Authorization: Bearer your_jwt_token
```
Response:
```json
{
    "shopkeepers": [
        {
            "_id": "shopkeeper_id",
            "user": {
                "_id": "user_id",
                "name": "Jane Smith",
                "email": "jane@example.com",
                "role": "shopkeeper"
            },
            "shopName": "Green Agro Shop",
            "address": "456 Market Street, City Area",
            "phoneNumber": "9876543210",
            "aadharNumber": "5555 6666 7777 8888",
            "status": "active",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
}
```

## Testing Steps

1. **Initial Setup**
   - Ensure the server is running
   - Admin user is already seeded with provided credentials

2. **Authentication Testing**
   - Test admin login with seeded credentials
   - Try farmer registration
   - Try login with farmer credentials
   - Try login with invalid credentials (should fail)

3. **Owner Management (Admin)**
   - Login as admin
   - Create an owner
   - Try creating owner with duplicate email (should fail)
   - Try creating owner with duplicate aadhar (should fail)
   - Get all owners list
   - Verify owner creation in the list

4. **Shopkeeper Management (Admin)**
   - Login as admin
   - Create a shopkeeper
   - Try creating shopkeeper with duplicate email (should fail)
   - Try creating shopkeeper with duplicate aadhar (should fail)
   - Get all shopkeepers list
   - Verify shopkeeper creation in the list

5. **Role-based Access Testing**
   - Try accessing admin routes with farmer token (should fail)
   - Try accessing admin routes with owner token (should fail)
   - Try accessing admin routes with shopkeeper token (should fail)
   - Try accessing admin routes without token (should fail)

## Error Cases to Test

1. **Authentication Errors**
   - Invalid credentials
   - Missing token
   - Invalid token
   - Expired token

2. **Validation Errors**
   - Missing required fields
   - Invalid email format
   - Invalid phone number format
   - Invalid aadhar number format

3. **Duplicate Entry Errors**
   - Duplicate email
   - Duplicate aadhar number

4. **Authorization Errors**
   - Non-admin accessing admin routes
   - Unauthenticated access to protected routes

## Postman Collection Setup

1. Create a new collection named "Agriculture Platform"
2. Set up environment variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: (to be set after login)

3. Create folders:
   - Authentication
   - Admin
   - Error Tests

4. For each request:
   - Set the appropriate URL
   - Add headers (Content-Type, Authorization)
   - Add request body
   - Add tests to verify response status and structure