# Edvin's Todo List

A real-time, collaborative todo list built with **React**, **Tailwind CSS**, and **Firebase Firestore**.

## Features

- ✅ Add, complete, edit, and delete tasks in real-time
- 🔁 Live sync across all open browser tabs/users via Firebase Firestore
- 📅 Tasks stored with a `createdAt` timestamp and ordered chronologically
- 🎨 Clean UI styled with Tailwind CSS

## Data Model

```json
{
  "id": "auto-generated",
  "text": "Buy milk",
  "completed": false,
  "createdAt": "2026-03-30T14:00:00Z"
}
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Firebase](https://firebase.google.com/) project with Firestore enabled

### Setup

1. **Clone the repo and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Firebase:**

   Copy `.env.example` to `.env` and fill in your Firebase project credentials:

   ```bash
   cp .env.example .env
   ```

   You can find these values in the [Firebase Console](https://console.firebase.google.com/) → _Project Settings_ → _Your Apps_.

3. **Create a Firestore collection:**

   In the Firebase Console, go to _Firestore Database_ and create a collection named `todos`. The app will manage documents in this collection automatically.

4. **Run in development:**

   ```bash
   npm run dev
   ```

5. **Build for production:**

   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── firebase.js    # Firebase initialisation (reads from .env)
├── TodoApp.jsx    # Main todo list component
├── App.jsx        # Root component
├── main.jsx       # React entry point
└── index.css      # Global styles + Tailwind import
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firestore project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
