# Protein Tracker Elite

A full-stack nutrition and protein tracking application built using React, Node.js, Express, and PostgreSQL.

The application helps users track daily protein intake, calories, body weight, and fitness goals through an interactive dashboard and analytics system.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Profile Management

* Update Name
* Weight Tracking
* Height Tracking
* Goal Selection
* Automatic Protein Goal Calculation

### Food Tracking

* Search from 350+ Indian Vegetarian Foods
* Quantity-Based Nutrition Calculation
* Breakfast, Lunch, and Dinner Logging
* Protein Tracking
* Calorie Tracking

### Dashboard

* Daily Protein Progress
* Goal Progress Tracking
* Meal Breakdown
* Recent Food Logs
* Remaining Protein Calculation

### Analytics

* Weekly Protein Analytics
* Monthly Protein Analytics
* Weight Trend Analysis
* Protein Trend Analysis

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* PostgreSQL

---

## Database Tables

### users

```sql
id
name
email
password
protein_goal
weight
height
goal_type
```

### foods

```sql
id
food_name
protein
calories
serving_unit
reference_quantity
```

### food_logs

```sql
id
user_id
food_id
quantity
meal_type
log_date
```

### weight_logs

```sql
id
user_id
weight
log_date
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/protein-tracker.git

cd protein-tracker
```

---

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000

DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=protein_tracker

JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Dashboard

```http
GET /dashboard
GET /dashboard/trend
GET /dashboard/weekly
GET /dashboard/monthly
```

### Food Logs

```http
GET /food-logs
POST /food-logs
DELETE /food-logs/:id
```

### Profile

```http
GET /profile
PUT /profile
```

### Weight Tracking

```http
GET /weight
POST /weight
```

### Food Search

```http
GET /foods/search?q=paneer
```

---

## Future Improvements

* Favorite Foods
* Recent Foods
* Protein Booster Suggestions
* Streak Tracking
* AI Meal Recommendations
* Mobile Responsiveness
* Cloud Deployment

---

## Author

Darsh Changediya

Built as a full-stack portfolio project demonstrating:

* React
* Express
* PostgreSQL
* JWT Authentication
* REST APIs
* Data Analytics
* Full-Stack Development
