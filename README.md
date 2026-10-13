# Real-Time Chat App

A full-stack real-time messaging application built with React, Node.js, Express, PostgreSQL, and Socket.IO. Users can register, log in, find other users, and exchange messages with real-time conversation updates.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Real-time messaging updates using Socket.IO
- Persistent users, conversations, and messages in PostgreSQL
- REST API for authentication and chat functionality
- React-based frontend with client-side routing

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- Axios
- Socket.IO Client

**Backend**
- Node.js
- Express
- Socket.IO
- JSON Web Tokens (JWT)
- bcryptjs

**Database**
- PostgreSQL
- `pg` (node-postgres)


## Prerequisites

Install the following before running the application:

- Node.js and npm
- PostgreSQL
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jaiyadav1704/Chat-App.git
cd Chat-App
```

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create your environment file from the example:

```bash
cp .env.example .env
```

Update `Backend/.env` with your own PostgreSQL credentials and a strong JWT secret.

### 3. Set up the PostgreSQL database

Create a PostgreSQL database named `Chat_app`, or choose another name and update `DB_NAME` in your `.env` file.

Run the SQL statements provided in `Backend/src/config/sql.txt` against that database to create the required tables:

- `users`
- `conversations`
- `messages`

### 4. Start the backend

From the `Backend` directory, run:

```bash
npm run dev
```

The backend and Socket.IO server run at `http://localhost:3000`.

Keep this terminal running.

### 5. Start the frontend

Open a second terminal from the project root:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.


## Environment Variables

The backend uses the following variables in `Backend/.env`:

| Variable | Description |
|---|---|
| `JWT_SECRET` | Secret used to sign and verify authentication tokens |
| `DB_USER` | PostgreSQL username |
| `DB_HOST` | PostgreSQL host, usually `localhost` for local development |
| `DB_NAME` | PostgreSQL database name |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_PORT` | PostgreSQL port, usually `5432` |

**Security:** Never commit your actual `.env` file or expose database passwords and JWT secrets in a public repository.

## Future Improvements

- Improve deployment configuration and production security
- Add message delivery and read status indicators
- Enhance the chat interface and responsive design


## Project Structure

```text
Chat-App/
├── Backend/
│   ├── src/
│   │   ├── Controller/
│   │   ├── Middleware/
│   │   ├── Model/
│   │   ├── Route/
│   │   ├── config/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── Frontend/
│   ├── src/
│   └── package.json
└── README.md
```
