# Q&A Forum API — Code Challenge Milestone 2

RESTful API for a Simple Q&A Forum application that helps users ask questions and participate in discussions.

## Tech Stack

- **Framework:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL via Prisma ORM (Prisma Cloud)
- **Authentication:** JWT (JSON Web Token)
- **Documentation:** Swagger / OpenAPI

## Getting Started

### Prerequisites
- Node.js
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository
```
   git clone https://github.com/adsrchve/code-challenge-restapi.git
   cd repo
```

2. Install dependencies
```
   pnpm install
```

3. Setup environment variables
```
   cp .env.example .env
```
   Fill in your `.env`:
```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=3000
```

4. Generate Prisma client
```
   npx prisma generate
```

5. Run migrations
```
   npx prisma migrate dev
```

6. Seed dummy data
```
   npx prisma db seed
```

7. Start the server
```
   pnpm start:dev
```

## API Documentation

Swagger UI available at: http://localhost:3000/api/docs

## API Endpoints

### Auth & User

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user (password is hashed) | ❌ |
| POST | /api/auth/login | Login and return JWT token | ❌ |
| GET | /api/users/:id | View a user's public profile by ID | ❌ |

### Threads

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/threads | Create a new thread | ✅ |
| GET | /api/threads | List all threads | ❌ |
| GET | /api/threads/my-threads | List threads of logged-in user | ✅ |
| GET | /api/threads/:id | View a specific thread by ID | ❌ |
| PUT | /api/threads/:id | Update a thread (owner only) | ✅ |
| DELETE | /api/threads/:id | Delete a thread (owner only) | ✅ |

## Validation & Error Handling

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request — empty or invalid input |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — not the owner of the thread |
| 404 | Not Found — resource doesn't exist |
| 500 | Internal Server Error |

## Database Relations

One-to-many relationship between `users` and `threads`:
- One user can create multiple threads
- Each thread belongs to exactly one user

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| PORT | Server port (default: 3000) |