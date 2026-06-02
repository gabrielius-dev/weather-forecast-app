# Weather Forecast App

A responsive weather forecast web app built for the IBM JavaScript
Application Developer internship task.

## Live Demo

[Open live demo](https://weather-forecast-app-production-caa2.up.railway.app/)

[![Weather Forecast App](screenshots/app.png)](https://weather-forecast-app-production-caa2.up.railway.app/)

## Features

- Search any city worldwide with autocomplete
- Current conditions: temperature, feels like, wind, humidity, pressure
- 24-hour hourly forecast strip
- 5-day expandable forecast
- Tracks and suggests 3 most-viewed cities
- Dark/light theme toggle
- City selection events logged to console and PostgreSQL

## Stack

- **Frontend:** React, IBM Carbon Design System, SASS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Weather data:** Open-Meteo
- **Icons:** Meteocons

## Local Development

### Prerequisites

- Node.js 20+
- Docker Desktop

### Setup

**1. Install dependencies**

```bash
cd client && npm install
cd ../server && npm install
cd ..
```

**2. Configure environment**

Copy `server/.env.example` to `server/.env` and fill in the values.

**3. Start PostgreSQL**

```bash
docker-compose up -d
```

**4. Run database schema**

```bash
psql postgresql://postgres:postgres@localhost:5432/weatherapp < server/src/db/schema.sql
```

**5. Start dev servers** (two separate terminals)

```bash
npm run dev:client
```

```bash
npm run dev:server
```

## Testing

```bash
# Client tests
cd client && npm test

# Server tests
cd server && npm test
```

## Attribution

Weather and geocoding data provided by
[Open-Meteo](https://open-meteo.com/) under CC BY 4.0.
