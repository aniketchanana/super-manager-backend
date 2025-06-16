# Super Manager Backend

A Node.js backend application for the Super Manager project, built with Express, TypeScript, and MongoDB.

## Features

- User authentication (JWT-based)
- MongoDB database integration
- TypeScript support
- Express.js framework
- Secure password hashing
- Role-based access control

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/super-manager
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRES_IN=30d
   NODE_ENV=development
   ```

## Development

To run the development server:

```bash
npm run dev
```

## Production

To build and run the production server:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

- `GET /api/auth/profile` - Get user profile (requires authentication)
  - Headers: `Authorization: Bearer <token>`

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
└── utils/          # Utility functions
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Helmet for security headers
- CORS enabled
- Input validation

## License

ISC 