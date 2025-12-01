# SnippetVault Frontend

The frontend for SnippetVault, built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/).

## Features

-   **Modern UI**: Clean and responsive interface using Tailwind CSS.
-   **Authentication**: User registration and login with JWT handling.
-   **Snippet Management**: Create, view, and delete code snippets.
-   **Syntax Highlighting**: Code blocks with syntax highlighting.
-   **Protected Routes**: Secure navigation for authenticated features.

## Tech Stack

-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS
-   **State/Data Fetching**: React Query (TanStack Query)
-   **Forms**: React Hook Form
-   **Routing**: React Router DOM
-   **Icons**: Lucide React

## Prerequisites

-   Node.js (v18+)
-   Running Backend Instance

## Installation

```bash
$ npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000 # URL of your backend
```

## Running the App

```bash
# development
$ npm run dev

# build for production
$ npm run build

# preview production build
$ npm run preview
```

## Project Structure

-   `src/components`: Reusable UI components (`Layout`, `ProtectedRoute`, etc.).
-   `src/context`: React Context providers (`AuthContext`).
-   `src/pages`: Page components (`Home`, `Login`, `CreateSnippet`, etc.).
-   `src/services`: API service layers (`authService`, `snippetService`).
-   `src/types`: TypeScript interfaces and types.

## Deployment (Vercel)

This project is ready for Vercel deployment.

1.  Install Vercel CLI: `npm i -g vercel`
2.  Deploy: `vercel`
3.  Set Environment Variable in Vercel Dashboard: `VITE_API_URL` (point to your deployed backend URL).
