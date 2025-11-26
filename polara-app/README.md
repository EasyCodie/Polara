
---

# **Polara — The Intelligent Study Smart Planner**

**Polara** is a web-based study planning system designed to give students a structured, adaptive, and stress-free way to manage academic workload. It removes the guesswork from studying by automatically breaking down tasks, building a realistic schedule, and adjusting dynamically as life changes.

Polara acts as a personal study manager—clearer than a calendar, smarter than a to-do list, and more flexible than traditional study plans.

---

## **What Polara Does**

Polara transforms academic chaos into a clean, predictable plan that guides students day by day. Its purpose is simple: help students study smarter, stay consistent, and prepare effectively for exams without burnout.

It provides structure, clarity, and constant adaptation so students always know exactly what to do next.

---

## **Key Features**

### **1. Smart Task Breakdown**

* Converts large study tasks into smaller, manageable sessions
* Uses difficulty, material size, deadlines, and mastery goals
* Automatically estimates required time
* Ensures workload becomes predictable and easy to execute

### **2. Dynamic Scheduling Engine**

* Adjusts the entire study plan whenever something changes
* Reschedules missed sessions
* Rebalances tasks when new assignments appear
* Keeps workload realistic and avoids overload
* Ensures every deadline stays achievable

### **3. Daily Execution Dashboard**

* Clear list of what to study today
* Estimated time for each session
* Progress indicators and daily streaks
* Built-in focus timer (with optional Pomodoro mode)
* A frictionless, minimalist interface that supports deep focus

### **4. Exam Strategy Mode**

* Structures preparation for each exam
* Balances theory, practice, and revision
* Applies spacing and active recall principles
* Adapts study intensity as exam day approaches
* Provides an evolving “exam readiness” indicator

### **5. Progress & Performance Analytics**

* Tracks time studied vs. time planned
* Shows completion rates and topic mastery
* Weekly consistency score
* Burnout risk alerts during heavy weeks
* Long-term trends to help students stay disciplined

### **6. Focus & Wellness Integration**

* Focus mode with timers
* Automatic rest scheduling during intense periods
* Light wellness reminders (breaks, posture, hydration)
* Prevents unrealistic planning and mental overload
* Encourages healthy, sustainable study habits

---

### **Design Philosophy**

* Clarity – Zero clutter. Only what you need to study effectively.
* Structure – A framework that enforces discipline without feeling rigid.
* Adaptation – Plans evolve automatically with the student.
* Simplicity – Fast to use, easy to understand, built for busy academic lives.
* The UI focuses on clean typography, subtle color coding for courses, and a visually lightweight layout that encourages daily use.

---

## **Who Polara Is For**

Polara is designed for students who need structure, clarity, and an intelligent system to manage their academic life:

* University students preparing for multiple exams
* High school students studying for national tests
* Students balancing study time with jobs or internships
* Learners who procrastinate or struggle with planning
* Anyone overwhelmed by large tasks or unclear workloads
* Students who want a disciplined, consistent approach to learning

Polara brings order to the academic experience, enabling students to perform better with less stress and more confidence.
---

## **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm or yarn
- A Supabase project

### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/polara.git
    cd polara/polara-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Tech Stack Overview**

Polara uses a modern, mainstream, and efficient tech stack that supports fast development, seamless scalability, and clean integration across all components.

### **Front-End**

- **Framework:** Next.js 15 (React + TypeScript)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion

### **Back-End / Business Logic**

- **Execution Layer:** Next.js Server Actions
- **Core Logic:** Task breakdown, dynamic scheduling, and exam strategy implemented in server-side logic

### **Database & Authentication**

- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth (email/password)

### **Hosting & Deployment**

- **Front-end:** Vercel (recommended)
- **Database Hosting:** Supabase platform

---

## **Key Features Implemented**

- **Smart Task Breakdown**: Automatically splits tasks into manageable study sessions.
- **Dynamic Scheduling**: Distributes sessions based on your availability profile.
- **Focus Mode**: Distraction-free timer with "Cosmic Night" theme.
- **Exam Strategy**: Dedicated exam preparation tracking.
- **Analytics**: Visual insights into your study habits.
- **Cosmic Night Theme**: A premium dark mode experience.
