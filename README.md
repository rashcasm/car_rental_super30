# 100x Car Rental Backend

A Node.js Express API for a car rental system featuring JWT authentication, authorization, and ownership checks.

## Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (via Prisma ORM)
- **JWT** for authentication
- **bcrypt** for password hashing

## Features

- Database modeling with Prisma
- JWT authentication
- Authorization & ownership checks
- Clean API contracts
- Proper error handling
- Test-driven development readiness

## Project Structure

```
src/
├── app.js                 # Main Express app
├── server.js              # Server startup
├── config/
│   ├── prisma.js          # Prisma client and DB connection
├── controllers/
│   ├── auth.controller.js     # Auth logic
│   └── bookings.controller.js # Bookings logic
├── middlewares/
│   ├── auth.middleware.js     # JWT authentication
│   └── error.middleware.js    # Error handling
├── routes/
│   ├── auth.routes.js         # Auth routes
│   └── bookings.routes.js     # Bookings routes
├── utils/
│   ├── jwt.js                 # JWT utilities
│   └── validators.js          # Validation utilities
└── seed-test.js           # Database seeding script
```


## Database Schema

### Users Table
- `id` (Int, Primary Key, Auto-increment)
- `username` (String, Unique)
- `password` (String)
- `created_at` (DateTime, Default now)

### Bookings Table
- `id` (Int, Primary Key, Auto-increment)
- `user_id` (Int, Foreign Key to Users)
- `car_name` (String)
- `days` (Int)
- `rent_per_day` (Int)
- `status` (Enum: 'booked', 'completed', 'cancelled', Default 'booked')
- `created_at` (DateTime, Default now)

All fields are non-nullable.

## JWT Rules

- JWT is issued only on login
- JWT payload: `{ "userId": 1, "username": "rahul" }`
- Token must be sent in header: `Authorization: Bearer <JWT_TOKEN>`
- All `/bookings` routes are protected
- Responsibilities:
  - Read Authorization header
  - Validate token
  - Attach user info to request: `req.user = { userId: 1, username: "rahul" }`

### Middleware Errors
- 401: Authorization header missing
- 401: Token missing after Bearer
- 401: Token invalid

## API Endpoints

### Authentication Routes

#### POST /auth/signup
Request Body:
```json
{
  "username": "rahul",
  "password": "123"
}
```

Success Response (201):
```json
{
  "success": true,
  "data": {
    "message": "User created successfully",
    "userId": 1
  }
}
```

Errors:
- 400: invalid inputs
- 409: username already exists

#### POST /auth/login
Request Body:
```json
{
  "username": "rahul",
  "password": "123"
}
```

Success Response (200):
```json
{
  "success": true,
  "data": {
    "message": "Login successful",
    "token": "<jwt_token>"
  }
}
```

Errors:
- 400: invalid inputs
- 401: user does not exist
- 401: incorrect password

### Bookings Routes (Protected)

#### POST /bookings
Request Body:
```json
{
  "carName": "Honda City",
  "days": 3,
  "rentPerDay": 1500
}
```

Business Rules:
- Status is always "booked" on creation
- `totalCost = days × rentPerDay`
- `days` should be less than 365
- `rentPerDay` cannot be more than 2000

Success Response (201):
```json
{
  "success": true,
  "data": {
    "message": "Booking created successfully",
    "bookingId": 101,
    "totalCost": 4500
  }
}
```

Errors:
- 400: invalid inputs

#### GET /bookings
Query Parameters:
- `bookingId` → fetch single booking
- `summary=true` → fetch booking summary

Normal Response (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "car_name": "Honda City",
      "days": 3,
      "rent_per_day": 1500,
      "status": "booked",
      "totalCost": 4500
    }
  ]
}
```

Summary Response (200):
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "rahul",
    "totalBookings": 3,
    "totalAmountSpent": 6300
  }
}
```

Notes:
- Summary counts only 'booked' and 'completed' bookings, ignores 'cancelled'

Errors:
- 404: bookingId not found

#### PUT /bookings/:bookingId
Update booking details or status (Only owner can update)

Request Body (Update Details):
```json
{
  "carName": "Verna",
  "days": 4,
  "rentPerDay": 1600
}
```

OR (Update Status Only):
```json
{
  "status": "completed"
}
```

Success Response (200):
```json
{
  "success": true,
  "data": {
    "message": "Booking updated successfully"
  }
}
```

Errors:
- 403: booking does not belong to user
- 404: booking not found
- 400: invalid inputs

#### DELETE /bookings/:bookingId
Success Response (200):
```json
{
  "success": true,
  "data": {
    "message": "Booking deleted successfully"
  }
}
```

Errors:
- 403: booking does not belong to user
- 404: booking not found

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. Run Prisma migrations: `npx prisma migrate dev`
5. Start the server: `npm run dev`