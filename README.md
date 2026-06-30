# 🚀 Last Minute — AI-Powered Productivity Companion

> **An intelligent multi-agent productivity assistant that plans your day, adapts to changing priorities, keeps you accountable, and helps you finish what matters most.**

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-Expo-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FastAPI-Python-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Google-Gemini-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cloud-Google%20Cloud%20Run-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge" />
</p>

---

# 🌟 Overview

**Last Minute** is an AI-powered personal productivity companion designed to move beyond traditional task management. Instead of simply storing to-do lists, it actively understands your workload, intelligently prioritizes tasks, generates optimized daily schedules, detects potential risks before deadlines are missed, and keeps you accountable throughout the day.

Built for the **Google Vibe2Ship Hackathon**, the project demonstrates how agentic AI can be used to create an adaptive productivity assistant that continuously learns from user activity and dynamically replans schedules.

---

# 🎯 Problem Statement

Modern productivity apps suffer from several limitations:

- Static task lists quickly become outdated.
- Users manually prioritize every task.
- Schedules don't adapt when plans change.
- No proactive detection of missed deadlines.
- Minimal personalization based on workload or energy.
- Lack of intelligent accountability.

Last Minute addresses these challenges by introducing specialized AI agents that collaborate to continuously optimize the user's day.

---

# ✨ Features

- 🤖 AI-powered daily schedule generation
- 📅 Intelligent task prioritization
- ⚡ Dynamic schedule replanning
- 📊 Progress tracking
- 🚨 Deadline risk detection
- 💬 Accountability check-ins
- 📈 Personalized workload recommendations
- 🔄 Automatic schedule updates whenever tasks change
- 📆 Google Calendar Integration
- ✅ Google Tasks Integration
- 📧 Gmail Integration
- ☁️ Cloud-hosted backend
- 📱 Cross-platform mobile application

---

# 🧠 Multi-Agent Architecture

The application follows an **agent-based architecture**, where each AI agent has a dedicated responsibility.

## 🔍 Discovery Agent

Responsible for understanding the user's workload.

### Responsibilities

- Analyze imported tasks
- Understand task context
- Categorize work
- Estimate workload
- Extract useful metadata using Gemini

---

## 📅 Scheduler Agent

Creates an optimized plan for the day based on:

- Priority
- Deadlines
- Estimated duration
- Progress
- User availability
- Energy level

The scheduler automatically recalculates today's plan whenever tasks are added, updated, or completed.

---

## ⚠️ Risk Detection Agent

Continuously monitors:

- Upcoming deadlines
- Remaining workload
- Completion percentage

Flags tasks that are likely to be missed and recommends earlier execution.

---

## 💪 Accountability Agent

Acts as a virtual productivity coach.

It periodically checks:

- Mood
- Energy level
- Productivity

Based on these inputs, it recommends:

- Focus duration
- Break frequency
- Suggested workload intensity

---

## 🎼 Agent Orchestrator

Coordinates communication between all AI agents.

Whenever the user updates tasks, the orchestrator determines which agents should execute and in what sequence to keep the entire system synchronized.

---

# 🏗️ System Architecture

```text
                    React Native App (Expo)
                             │
                REST APIs (HTTPS)
                             │
                 Google Cloud Run (FastAPI)
                             │
      ┌──────────────┬──────────────┬──────────────┐
      │              │              │              │
 Discovery      Scheduler       Risk       Accountability
    Agent          Agent         Agent          Agent
      │              │              │              │
      └──────────────┴──────────────┴──────────────┘
                     │
              Agent Orchestrator
                     │
          Gemini + Google APIs
                     │
 Google Calendar • Gmail • Google Tasks
```

---

# 🛠️ Tech Stack

## Frontend

- React Native
- Expo
- TypeScript

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic

## AI

- Google Gemini API
- Agentic AI Architecture

## Database

- SQLite

## Cloud

- Docker
- Google Cloud Run
- Google Cloud Build

## Google Integrations

- Google Calendar API
- Google Tasks API
- Gmail API
- OAuth 2.0

---

# 📂 Project Structure

```text
Last-Minute
│
├── app/                  # React Native screens
├── backend/
│   ├── agents/
│   │   ├── discovery/
│   │   ├── scheduler/
│   │   ├── risk/
│   │   └── accountability/
│   │
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   └── app.py
│
├── context/
├── storage/
├── utils/
└── README.md
```

---

# 🚀 Deployment

## Backend

- Dockerized using Docker
- Deployed on **Google Cloud Run**

## Mobile

- Built using Expo EAS Build
- Android APK generated using EAS

---

# 📱 Screens

- Home Dashboard
- Today's AI Plan
- Task Management
- Reminder Manager
- Progress Tracking
- Mood & Energy Check-ins
- Productivity Analytics

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yuktabande/Last-Minute.git

cd Last-Minute
```

---

## Frontend

```bash
npm install

npx expo start
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload
```

---

# ☁️ Docker

```bash
docker build -t last-minute .

docker run -p 8080:8080 --env-file .env last-minute
```

---

# 🌍 Live Demo

### Backend

```
https://lm-ls-183164363219.asia-south1.run.app
```

### Android APK

```
https://expo.dev/accounts/yuktabande/projects/LM-LS/builds/27bd0fe0-4d9c-41c4-ba06-be3c5747f7ec
```

---

# 📈 Future Improvements

- PostgreSQL migration
- Firebase Authentication
- Push Notifications
- AI-based time estimation
- Habit tracking
- Calendar conflict prediction
- Wear OS integration
- Apple Health & Google Fit integration
- Offline mode
- Voice Assistant
- Multi-user collaboration

---

# 🏆 Google Vibe2Ship Hackathon

Last Minute was developed as a submission for the **Google Vibe2Ship Hackathon**, showcasing how Google's AI ecosystem can power a next-generation productivity assistant through autonomous AI agents, intelligent scheduling, cloud-native deployment, and seamless integration with Google services.

---

# 👨‍💻 Authors

**Yukta Bande**

- GitHub: https://github.com/yuktabande
- LinkedIn: https://linkedin.com/in/yuktabande

---

# ⭐ If you like this project...

Give it a ⭐ on GitHub and feel free to contribute!
