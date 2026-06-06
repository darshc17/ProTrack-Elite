# Protein Tracker Elite

A full-stack nutrition and protein tracking application built using React, Node.js, Express, and PostgreSQL.
The application helps users track daily protein intake, calories, body weight, and fitness goals through an interactive dashboard and analytics system.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Profile Management
- Update Name
- Weight Tracking
- Height Tracking
- Goal Selection
- Automatic Protein Goal Calculation

### Food Tracking
- Search from 350+ Indian Vegetarian Foods
- Quantity-Based Nutrition Calculation
- Breakfast, Lunch, and Dinner Logging
- Protein Tracking
- Calorie Tracking

### Dashboard
- Daily Protein Progress
- Goal Progress Tracking
- Meal Breakdown
- Recent Food Logs
- Remaining Protein Calculation

### Analytics
- Weekly Protein Analytics
- Monthly Protein Analytics
- Weight Trend Analysis
- Protein Trend Analysis

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- PostgreSQL

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/protein-tracker.git
cd protein-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the server folder:
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=protein_tracker
JWT_SECRET=your_secret_key

### 3. Database Setup

Create the database in PostgreSQL:
```sql
CREATE DATABASE protein_tracker;
```

Then run the seed script to create all tables and load 350+ foods automatically:
```bash
node seed.js
```

### 4. Run Backend
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 5. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
POST /auth/register
POST /auth/login

### Dashboard
GET /dashboard
GET /dashboard/trend
GET /dashboard/weekly
GET /dashboard/monthly

### Food Logs
GET /food-logs
POST /food-logs
DELETE /food-logs/:id

### Profile
GET /profile
PUT /profile

### Weight Tracking
GET /weight
POST /weight

### Food Search
GET /foods/search?q=paneer

## Database Tables

### users
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| password | VARCHAR |
| protein_goal | NUMERIC |
| weight | NUMERIC |
| height | NUMERIC |
| goal_type | VARCHAR |

### foods
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| food_name | VARCHAR |
| protein | NUMERIC |
| calories | NUMERIC |
| serving_unit | VARCHAR |
| reference_quantity | NUMERIC |

### food_logs
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| user_id | INTEGER |
| food_id | INTEGER |
| quantity | NUMERIC |
| meal_type | VARCHAR |
| log_date | DATE |

### weight_logs
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| user_id | INTEGER |
| weight | NUMERIC |
| log_date | DATE |

## Future Improvements
- Favorite Foods
- Recent Foods
- Streak Tracking
- AI Meal Recommendations
- Mobile Responsiveness

## Author
**Darsh Changediya**

Built as a full-stack portfolio project demonstrating:
- React
- Express
- PostgreSQL
- JWT Authentication
- REST APIs
- Data Analytics
- Full-Stack Development
Just replace YOUR_USERNAME with your actual GitHub username before pushing.