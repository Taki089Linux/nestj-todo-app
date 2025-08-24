# Setup Guide

## Environment Configuration

### 1. Backend Environment (.env)

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/todo-app
```

### 2. Frontend Environment (.env.local)

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Quick Start Commands

1. **Install all dependencies:**

   ```bash
   npm run install:all
   ```

2. **Start both services:**

   ```bash
   npm run dev
   ```

3. **Or start services separately:**

   ```bash
   # Terminal 1 - Backend
   npm run start:dev

   # Terminal 2 - Frontend
   npm run frontend:dev
   ```

## Access URLs

- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:3001

## MongoDB Setup

Make sure MongoDB is running locally or update the MONGO_URI to point to your MongoDB instance.
