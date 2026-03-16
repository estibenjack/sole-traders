# Sole Traders

A fullstack web application connecting tradespeople with clients looking to hire their services.

Built as part of **CSC7084 Web Development** at Queen's University Belfast (2025–2026).

---

## Overview

Sole Traders is a platform where tradespeople can register, manage their profile, list their services and handle incoming booking requests from clients. Clients can browse traders, view their profiles, submit booking requests and leave star ratings — all without needing an account.

The application runs across two independent Node/Express servers:

- **API** (`port 3002`) — handles all data operations, queries the MySQL database and returns JSON
- **Web App** (`port 3001`) — handles session management and server-side rendering with EJS

The web app never interacts with the database directly. All data operations go through axios calls to the REST API, keeping database credentials isolated within the API layer.

---

## Tech Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| Runtime        | Node.js                 |
| Framework      | Express.js              |
| Templating     | EJS                     |
| Styling        | Bulma CSS, custom CSS   |
| Database       | MySQL                   |
| Authentication | express-session, bcrypt |
| HTTP client    | axios                   |
| Charts         | Chart.js                |
| Icons          | Font Awesome            |

---

## Features

**Trader functionality:**

- Register and login with bcrypt password hashing (salt rounds: 10)
- Session-based authentication with protected routes via `isAuth` middleware
- Dashboard with tabbed navigation - Overview, Profile, Services, Bookings
- Profile management - trade type, region and bio
- Service management - add, edit and delete service listings
- Booking management - view, filter by status, accept and reject bookings
- Overview tab with Chart.js doughnut chart showing bookings by service and monthly average stat

**Client functionality:**

- Browse public trader directory with filtering by trade type and region
- View individual trader profile pages with services and reviews
- Submit booking requests without requiring an account
- Leave a star rating (1–5) for a trader

**System:**

- REST API with full CRUD operations across all entities
- Consistent JSON response structure across all endpoints
- Input validation at both client-side (HTML attributes) and server-side (API controllers)
- Input normalisation — trimming, lowercasing, title-casing, etc.
- Cascading deletes via foreign key constraints
- Performance indexes on frequently queried columns
- Responsive layout for mobile and desktop

---

## Project Structure

```
sole-traders/
├── api/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── availabilityController.js
│   │   ├── bookingController.js
│   │   ├── ratingController.js
│   │   ├── serviceController.js
│   │   └── traderController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── availabilityRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── ratingRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── traderRoutes.js
│   ├── sql/
│   │   └── sole_traders_schema.sql
│   ├── utils/
│   │   └── dbconn.js
│   ├── app.js
│   ├── config.env
│   └── server.js
└── webapp/
    ├── controllers/
    │   └── webAppController.js
    ├── middleware/
    │   └── middleware.js
    ├── public/
    │   ├── css/
    │   │   └── styles.css
    │   └── images/
    │       └── ST.png
    ├── routes/
    │   └── routes.js
    ├── utils/
    │   └── constants.js
    ├── views/
    │   ├── browseTraders.ejs
    │   ├── dashboard.ejs
    │   ├── error404.ejs
    │   ├── home.ejs
    │   ├── login.ejs
    │   ├── register.ejs
    │   └── traderProfile.ejs
    ├── app.js
    └── config.env
```

---

## Prerequisites

- Node.js
- MySQL (via XAMPP or any MySQL server)
- npm

---

## Setup

**1. Clone the repo**

```bash
git clone https://github.com/estibenjack/sole-traders.git
cd sole-traders
```

**2. Set up the database**

Open MySQL and run the schema file:

```
api/sql/sole_traders_schema.sql
```

This will create the `sole_traders` database, all tables and populate them with seed data.

**3. Create `config.env` in `/api`**

```
PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=sole_traders
```

**4. Create `config.env` in `/webapp`**

```
PORT=3001
SECRET=yourchosensecret
```

**5. Install dependencies**

```bash
cd api && npm install
cd ../webapp && npm install
```

---

## Running the App

Open two separate terminals:

```bash
# Terminal 1 - API
cd api && npm start

# Terminal 2 - Web App
cd webapp && npm start
```

Then visit **http://localhost:3001**

---

## REST API Endpoints

All endpoints return JSON with a consistent `status` and `result` or `message` field.

| Method | Endpoint                    | Description                                    |
| ------ | --------------------------- | ---------------------------------------------- |
| POST   | /register                   | Register a new trader                          |
| POST   | /login                      | Authenticate a trader                          |
| GET    | /traders                    | Get all traders                                |
| GET    | /traders/:id                | Get a single trader (public)                   |
| GET    | /traders/:id/private        | Get a single trader (includes email, username) |
| PUT    | /traders/:id                | Update a trader's profile                      |
| DELETE | /traders/:id                | Delete a trader                                |
| GET    | /services                   | Get all services                               |
| GET    | /services/:id               | Get a single service                           |
| GET    | /services/trader/:id        | Get all services for a trader                  |
| POST   | /services                   | Add a new service                              |
| PUT    | /services/:id               | Update a service                               |
| DELETE | /services/:id               | Delete a service                               |
| GET    | /bookings/:id               | Get a single booking                           |
| GET    | /bookings/trader/:id        | Get all bookings for a trader                  |
| GET    | /bookings/trader/:id/stats  | Get booking stats for a trader                 |
| POST   | /bookings                   | Submit a booking request                       |
| PUT    | /bookings/:id/status        | Accept or reject a booking                     |
| GET    | /ratings/trader/:id         | Get all ratings for a trader                   |
| GET    | /ratings/trader/:id/average | Get a trader's average rating                  |
| GET    | /ratings/averages           | Get average ratings for all traders            |
| POST   | /ratings                    | Submit a rating                                |
| GET    | /availability/trader/:id    | Get availability for a trader                  |

---

## Seed Data

The schema file includes seed data for 8 traders, each with services, bookings across multiple months and ratings. All seed trader passwords are bcrypt hashes of `password123`.

You can log in as any seed trader using their username (e.g. `johnmurphy`) and the password `password123`.

---

## Development Notes

This project was built as part of a university assignment where the use of frontend JavaScript frameworks was not permitted. As a result, the frontend uses EJS server-side templating rather than a component-based framework.

As a personal development goal, I'm planning to migrate the frontend to React, breaking the EJS views into reusable components and moving data fetching from the webapp server into the browser using the existing REST API directly. This will also involve replacing session-based authentication with JWT.

---

## Planned Improvements

- [ ] React frontend migration
- [ ] JWT authentication
- [ ] API key authentication between webapp and API
- [ ] Trader availability timeslot generation
- [ ] Overlapping booking detection
- [ ] Password change functionality
- [ ] Trader profile photos
- [ ] Pagination on bookings and trader directory
