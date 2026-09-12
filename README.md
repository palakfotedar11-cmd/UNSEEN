# 🌐 UNSEEN — Discover Connections You Didn't Know Existed

> **Discover the people you didn't know you needed.**

UNSEEN is an AI-powered student discovery platform designed to help students discover meaningful connections within their campus.

Students often have the same interests, skills, goals, and ambitions — but never meet because they belong to different classes, branches, friend groups, or communities.

**UNSEEN makes these hidden connections visible.**

---

## 💡 The Problem

College campuses are full of students who could potentially become:

* Project partners
* Hackathon teammates
* Mentors
* Friends
* Community members
* Learning partners
* Startup collaborators

But students usually discover people through their existing social circles.

A CSE student interested in AI may never know that an ECE student across campus is also working on AI.

A student looking for a hackathon teammate may not know who else is interested in hackathons.

### The problem

**Students with shared interests exist around us, but there is no simple way to discover them.**

---

# 🚀 Our Solution

UNSEEN creates an interest-based campus discovery network.

Students create their profile and select their interests.

The platform identifies students with overlapping interests and visually represents these connections as a **network of hidden connections**.

Instead of simply showing a list of students, UNSEEN tries to answer:

> **"Who around me could I connect with?"**

---

# ✨ Key Features

## 👤 Student Profiles

Students can create a profile using:

* Name
* Email
* Roll Number
* Branch
* Year
* Interests

Available interests include:

* AI / ML
* Web Development
* Photography
* Music
* Dance
* Writing
* Startups
* Hackathons
* Gaming
* Robotics
* Sports
* Public Speaking

---

## 🧠 Interest-Based Matching

UNSEEN compares a student's selected interests with other student profiles.

Students with overlapping interests are identified as potential connections.

The matching system calculates a compatibility percentage based on shared interests.

### Example

**Student A**

```text
AI / ML
Web Development
Hackathons
```

**Student B**

```text
AI / ML
Web Development
Hackathons
Startups
```

**Shared interests**

```text
AI / ML
Web Development
Hackathons
```

**Total interests of Student B**

```text
4
```

**Compatibility**

```text
3 / 4 × 100 = 75%
```

The results are then presented through a **network-style visualization** instead of a traditional student list.

---

# 🌐 Discover Connections

The matching interface represents the student as the center of a network.

Potential connections branch out from the student and show:

* Student name
* Branch and year
* Match percentage
* Shared interests
* Connection option

This makes the discovery process more visual and interactive.

---

# 🤝 AI-Powered Connection Requests

Finding someone is only the first step.

UNSEEN allows students to send a connection request based on their purpose.

Students can choose:

* Project Partner
* Hackathon Team
* Learn Together
* Find a Mentor
* Join a Community
* Just Connect
* Other

The platform then uses **Google Gemini** to generate a personalized connection message based on:

* Student name
* Other student's name
* Branch
* Shared interests
* Reason for connecting

The generated message can also be regenerated or customized before sending.

---

# 📩 Request Tracking

UNSEEN provides a simple request dashboard where students can track their connections.

### My Requests

Students can see requests they have sent and their current status:

* Pending
* Accepted
* Declined

### Incoming Requests

Students can see requests received from others and:

* Accept
* Decline

This turns student discovery into an actual connection workflow.

---

# 👥 Campus Communities

UNSEEN also provides interest-based communities.

Example communities include:

* 🤖 AI & ML
* 🏆 Hackathon Hunters
* 🎨 Campus Creators
* 🚀 Student Founders

Students can join communities based on their interests and discover other students with similar goals.

---

# 💻 GDG × UNSEEN

UNSEEN can also act as a bridge between students and **Google Developer Groups (GDG)**.

Students can indicate which technology topics they are interested in.

Current topics include:

* AI / ML
* Web Development
* Generative AI
* Cloud
* Android
* Hackathons

UNSEEN then visualizes interest trends through a **campus technology pulse**.

### Why this helps GDG

Instead of guessing what students want to learn, GDG can use aggregated interest data to understand:

* Which technologies students are interested in
* Which workshops could attract students
* Potential community members
* Potential volunteers
* Hackathon interest
* Areas for future events

This can help GDG make its campus activities more **student-driven and data-informed**.

---

# 🤖 Google Gemini Integration

UNSEEN uses **Google Gemini** to generate personalized connection messages.

The AI receives contextual information such as:

```text
Student
Other Student
Branch
Shared Interests
Connection Purpose
```

Gemini then generates a natural and relevant message that the student can edit before sending.

This demonstrates how generative AI can be used to solve a real social problem rather than being added only as a chatbot.

---

# 🔐 Authentication

The current MVP includes a basic authentication flow with:

* Sign Up
* Login
* Password validation
* Remember Me
* Session-based login
* Sign Out

The current authentication system is intended for the MVP/prototype stage.

A production version would use a secure backend authentication system.

---

# 📅 GDG Event Integration

UNSEEN also includes a GDG event section where students can view and register for upcoming events.

### Example Event

**GDG AI Build Night**

```text
20 September 2026
2:00 PM – 5:00 PM
PUSSGRC Campus
```

This creates a direct connection between:

**Student Interests → Community → GDG Activities → Events**

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## AI

* Google Gemini API
* Google AI Studio / Gemini

## Storage

The current MVP uses browser-based storage for prototype data.

A future production version can use:

* Firebase
* Firestore
* Firebase Authentication

---

# 📂 Project Structure

```text
UNSEEN/
│
├── index.htm
├── style.css
├── script.js
├── server.js
├── README.md
├── .gitignore
└── package.json
```

> `.env` is intentionally excluded from the GitHub repository because it contains the Gemini API key.

---

# ▶️ Running the Project Locally

## 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

## 2. Open the project

```bash
cd UNSEEN
```

## 3. Install dependencies

```bash
npm install
```

## 4. Add your Gemini API key

Create a `.env` file:

```text
GEMINI_API_KEY=your_api_key_here
```

**Never commit the `.env` file to GitHub.**

## 5. Start the server

```bash
node server.js
```

The application will run locally at:

```text
http://localhost:3000
```

---

# 🔮 Future Scope

UNSEEN is currently an MVP.

Future versions can introduce:

* 🔐 Firebase Authentication
* ☁️ Firebase / Firestore student database
* 🧠 Semantic AI-based matching
* 🤖 AI-powered profile analysis
* 💬 Real-time student chat
* 👥 Community creation
* 🏆 Automatic project-team formation
* 📅 Personalized event recommendations
* 🔔 Notifications
* 📊 Advanced campus analytics
* 🏫 Multiple-campus support
* 📱 Mobile application
* 🔗 Integration with college communities and clubs

---

# 🎯 Vision

UNSEEN is built around one simple idea:

> **You don't need more people around you. You need to discover the right people.**

A campus can contain hundreds or thousands of students with similar interests, ambitions and skills.

UNSEEN aims to transform those **invisible similarities into visible connections.**

---

# 📌 Current Status

**Version:** MVP / Prototype

The current version demonstrates:

* Student profiles
* Interest-based matching
* Network-style connection visualization
* AI-generated connection messages
* Connection requests
* Incoming request management
* Campus communities
* GDG technology interest tracking
* GDG event registration
* Basic authentication

The project is currently designed as a working prototype and can be extended into a production-ready campus networking platform.

---

# 👩‍💻 Project

**UNSEEN — Discover Connections You Didn't Know Existed**

Built as a student innovation project focused on solving a real campus problem using AI and modern web technologies.

---

# 📄 License

This project is created for educational, experimentation and student innovation purposes.
