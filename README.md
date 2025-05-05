# 🏃‍♂️ htacker – Personal Fitness Tracker

**htacker** is a simple and lightweight personal fitness tracker where users can log their daily health data — including steps, calorie intake, and water consumption — and view the history of their progress over time.

> ⚠️ **Note:** This project is under active development. Expect changes, feature additions, and improvements as we go.

---

## ✨ Features

- ✅ Log daily fitness data:
  - Steps walked
  - Calories consumed
  - Water intake (liters/ml)
- 📅 View and track historical entries
- 💾 Persistent data storage with MongoDB
- 📱 Built with React Native for cross-platform mobile use
- ⚙️ Next.js backend API for handling and storing data

---

## 🚧 Roadmap

- [x] Log steps, calories, water
- [x] Connect React Native frontend to Next.js backend
- [x] Store and retrieve data using MongoDB
- [x] TypeScript integration across frontend and backend
- [ ] Entry editing and deletion
- [ ] User authentication (JWT/session-based)
- [ ] Analytics and charts (progress over time)
- [ ] Cloud deployment (Vercel + MongoDB Atlas)

---

## 🛠️ Tech Stack

| Layer        | Tech                               |
|--------------|-------------------------------------|
| Frontend     | React Native (Expo)                 |
| Backend      | Next.js (API routes)                |
| Database     | MongoDB (via Mongoose)              |
| Language     | TypeScript                          |


---

## 🧪 Running the App Locally

### Prerequisites

- Node.js + npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- MongoDB (local or Atlas)
- `.env` file for the backend
  
 Frontend (React Native)

 cd htacker-app
yarn install
expo start

Backend (Next.js + MongoDB)

cd htacker-api
yarn install
yarn dev

Ensure your .env file in Server/ looks like this:

PORT=3000 

SECRET_KEY=hey  

NODE_ENV=development 

