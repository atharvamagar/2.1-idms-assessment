# Employee Management Module

This is my submission for the SDE Technical Assessment from IDMS Infotech — a full-stack Employee Management app built using the MERN stack.

## Tech Stack

- Frontend: React (Vite), React Router, Axios, Context API
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Auth: JWT stored in HTTP-only cookies
- Image uploads: Multer

## Folder Structure

```
idms-assessment/
├── server/         # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── client/         # React frontend
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── services/
```

## How to run this locally

### You'll need
- Node.js v18 or above
- MongoDB running locally, or a free Atlas cluster

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in the `.env` values (listed below), then start it:

```bash
npm run dev
```

This runs on `http://localhost:5000`.

### 2. Create a test login

Since there's no seed script, I'm using the register endpoint once to create a user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@idms.com","password":"Admin@123"}'
```

Login with:
- Email: `admin@idms.com`
- Password: `Admin@123`

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:3000`.

### 4. Try the login flow
1. Go to `http://localhost:3000`
2. It'll redirect you to `/login`
3. Log in with the credentials above
4. You should land on `/dashboard`

## Environment Variables

**Server (`server/.env`)**

| Variable | What it's for |
|---|---|
| `PORT` | Port for the server (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRY` | Token expiry, e.g. `1h`, `24h` |
| `CLIENT_URL` | Frontend URL, needed for CORS |
| `NODE_ENV` | `development` or `production` |

**Client (`client/.env`)**

| Variable | What it's for |
|---|---|
| `VITE_API_URL` | Backend base URL, e.g. `http://localhost:5000/api` |

## What I built

- JWT auth with HTTP-only cookies, token expiry, protected routes
- Full CRUD for employees
- Search (name/email/department) + filters (department/designation/gender) + pagination, combined into one API call instead of separate endpoints
- Image upload with Multer, with file type/size checks
- Form validation on both frontend and backend
- Toast notifications for create/update/delete/errors
- Custom confirm dialog for deletes instead of the browser's default `alert()`
- Responsive layout, tested at tablet (768px) and desktop (1440px/1920px)
- Kept API responses in a consistent `{status, message, data}` shape across all routes

## A note on design assets

The Inter font and the screen references I used for styling were provided as part of the assessment — used them here strictly for that purpose.