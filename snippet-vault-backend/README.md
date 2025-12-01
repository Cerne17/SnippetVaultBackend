# SnippetVault Backend

The backend for SnippetVault, a code snippet management application. Built with [NestJS](https://nestjs.com/), [MongoDB](https://www.mongodb.com/), and [TypeScript](https://www.typescriptlang.org/).

## Features

-   **Authentication**: JWT-based authentication with Passport.js.
-   **User Management**: Registration and login functionality.
-   **Snippet Management**: CRUD operations for code snippets with tagging and language support.
-   **Soft Delete**: Snippets are soft-deleted to prevent accidental data loss.
-   **Serverless Ready**: Configured for deployment on Vercel Serverless Functions.

## Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
-   **Authentication**: `passport`, `passport-jwt`, `bcrypt`
-   **Validation**: `class-validator`, `class-transformer`
-   **Testing**: Jest

## Prerequisites

-   Node.js (v18+)
-   MongoDB Instance (Local or Atlas)

## Installation

```bash
$ npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/snippet-vault # Or your Atlas URI
SECRET_KEY=your_super_secret_jwt_key
PORT=3000
```

## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Auth
-   `POST /auth/register`: Register a new user.
-   `POST /auth/login`: Login and receive a JWT.

### Snippets
-   `GET /snippets`: Get all snippets (supports filtering by `language`, `tag`, `search`).
-   `GET /snippets/:id`: Get a specific snippet.
-   `POST /snippets`: Create a new snippet (Protected).
-   `PATCH /snippets/:id`: Update a snippet (Protected).
-   `DELETE /snippets/:id`: Soft delete a snippet (Protected).

## Deployment (Vercel)

This project is configured for Vercel deployment using `vercel.json` and `src/serverless.ts`.

1.  Install Vercel CLI: `npm i -g vercel`
2.  Deploy: `vercel`
3.  Set Environment Variables in Vercel Dashboard (`MONGO_URI`, `SECRET_KEY`).

**Note**: Ensure your MongoDB Atlas Network Access allows connections from `0.0.0.0/0` as Vercel uses dynamic IPs.
