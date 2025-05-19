# TypeScript API with Authentication

A secure TypeScript-based API with JWT authentication, role-based access control, and MongoDB integration.

## Features

- User registration and login
- JWT authentication with refresh tokens
- Role-based access control
- Protected API routes
- Error handling middleware
- Logging system
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Update the values in `.env`

4. Start the development server

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/logout` - Logout user (protected)

### Protected Routes

- `GET /api/protected` - Get protected data (requires authentication)
- `GET /api/admin` - Get admin data (requires admin role)

## Authentication Flow

1. Register a user or login to get access and refresh tokens
2. Include the access token in the Authorization header for protected routes
3. Use the refresh token to get a new access token when it expires

## Security Features

- Password hashing with bcrypt
- JWT for stateless authentication
- Role-based access control
- Input validation
- Error handling