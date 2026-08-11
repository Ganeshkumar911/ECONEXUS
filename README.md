# 🌱 EcoNexus – Smart Waste Management Platform

> A modern web application that helps users understand, sort, track, and manage waste responsibly while promoting sustainable living.

## 🌐 Live Demo

🔗 https://econexus-pearl.vercel.app/

## 📌 Overview

EcoNexus is a smart waste management platform designed to help individuals make better decisions about waste disposal and recycling.

The platform provides interactive tools and educational resources that help users identify different types of waste, learn how to sort them correctly, understand decomposition, track their waste-management activities, and discover recycling centers.

The goal of EcoNexus is to make waste management simple, interactive, and accessible while encouraging environmentally responsible habits.

## ✨ Features

### 🏠 Home
- Clean and modern landing page
- Introduction to EcoNexus
- Quick access to waste-management features
- Sustainability-focused interface

### ♻️ Sorting Guide
- Learn how to properly separate different types of waste
- Understand recyclable, organic, hazardous, and other waste categories
- Interactive waste information

### 🗑️ Waste Tracking
- Track personal waste-management activities
- Record daily waste-related information
- Monitor progress toward better waste-management habits

### 🌱 Waste Decomposition Explorer
- Learn how different waste materials decompose
- Understand approximate decomposition periods
- Explore environmental impacts of different waste types

### 📚 Educational Resources
- Waste-management learning content
- Courses and educational materials
- Learn about recycling, decomposition, and sustainability

### 🏆 Achievements
- Track user progress
- Display achievements and milestones
- Encourage consistent sustainable habits

### ♻️ Recycling Centers
- Explore recycling-center information
- Find suitable locations for recycling-related activities

### 🎮 Interactive Learning
- Interactive waste-sorting activities
- Educational components designed to make learning engaging

### 👤 User Profile
- User-specific information
- Personal progress and activity tracking

### 📩 Connect With Us
- Users can submit feedback
- Collects user contact information through the feedback form
- Helps improve the platform based on user suggestions

## 🔐 User Access

EcoNexus provides user-based access to selected features.

Users can register and log in to access personalized features such as:

- Waste Tracking
- Sorting Guide
- Recycling Centers
- Educational content
- Progress and achievements

User information is maintained separately so that one user's data does not overwrite another user's information.

## 🛠️ Technologies Used

### Frontend

- React.js
- TypeScript
- HTML5
- CSS3
- Tailwind CSS
- JavaScript

### Build Tools

- Vite
- PostCSS
- ESLint
- npm

### Deployment

- Vercel

### Version Control

- Git
- GitHub

## 📂 Project Structure

```text
ECONEXUS/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AchievementCard.tsx
│   │   ├── ConnectWithUsSection.tsx
│   │   ├── CourseDetailModal.tsx
│   │   ├── DailyLogForm.tsx
│   │   ├── DoorstepPickupModal.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageAnalyzer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProgressChart.tsx
│   │   ├── RecyclingCenterCard.tsx
│   │   ├── RecyclingMap.tsx
│   │   ├── SortingGameModal.tsx
│   │   ├── WasteCard.tsx
│   │   └── WasteDecompositionExplorer.tsx
│   │
│   ├── data/
│   │   ├── courses.ts
│   │   ├── recyclingCenters.ts
│   │   └── wasteTypes.ts
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── EducationPage.tsx
│   │   ├── SortingGuidePage.tsx
│   │   ├── TrackingPage.tsx
│   │   ├── RecyclingCentersPage.tsx
│   │   ├── AchievementsPage.tsx
│   │   └── ProfilePage.tsx
│   │
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── README.md
