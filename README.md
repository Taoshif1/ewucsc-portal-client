# EWU Cyber Security Club (EWUCSC)

A high-performance, responsive web application for tracking homework, attendance, and learning progress for the EWU Cyber Security Club. Built with the MERN stack and a focus on "Cyber-Tech" aesthetics.

## 🛠️ Navbar Architecture

The navigation system is built for scalability and high-end visual appeal, utilizing **daisyUI v5** and **Tailwind CSS v4**.

### 1. Reusable Logo Component (`Logo.jsx`)

The logo is abstracted into a standalone component to ensure branding consistency across the platform.

* **Dynamic Sizing:** Uses ES6 destructuring for custom sizing with sensible defaults.
* **Cyber Glow:** Implements `shadow-primary/30` to give the brand a neon-tech aesthetic.
*   **Branding:** Combines the `ewucscLogo` image with a "Brand Lockup" that hides the subtitle on mobile (`hidden sm:inline-block`) to maintain a clean UI.

### 2. Responsive Navbar (`Navbar.jsx`)

*   **Glassmorphism:** Uses `backdrop-blur-md` and `bg-base-100/80` for a modern frosted glass effect.
*   **Single-Source Links:** Navigation links are stored in a constant to ensure the **Desktop Menu** and **Mobile Dropdown** stay perfectly in sync.
*   **Active States:** Integrated with `react-router`'s `NavLink`, which automatically applies active classes based on the current URL.
*   **Auth Ready:** Includes placeholders for Role-Based Access Control (RBAC) and user profile dropdowns.
---

## 🛠️ UI Architecture

## 🏠 Landing Page Architecture

The landing page has been upgraded from a simple placeholder into a **brand-first cyber platform experience** designed to feel like a modern university-level cybersecurity ecosystem.

### Core Objective
The homepage is built to:
- Establish trust and professionalism for club members and executives.
- Create a strong **"mini cyber platform"** first impression.
- Support future growth into a **picoCTF-inspired training ecosystem**.

### Key Landing Page Sections

#### 1. Hero System (`HeroSection.jsx`)
The Hero section acts as the visual and strategic entry point of the platform.

- **Matrix / Cyber Aesthetic:** Combines glowing gradients, futuristic layout spacing, and cyber-themed motion.
- **Conversion Focused:** Includes strong call-to-action buttons such as joining the platform or starting the learning journey.
- **Trust Positioning:** Designed to make the club feel like a serious technical organization, not just a static student page.

#### 2. Terminal Simulation (`HeroTerminal.jsx`)
A fake terminal UI is used to reinforce the hacking / security atmosphere.

- **Typewriter Effect:** Simulates live command-line boot-up text for immersion.
- **Cyber Identity:** Helps instantly communicate that the platform is focused on cybersecurity, CTFs, and ethical hacking.
- **Brand Personality:** Gives the homepage a more memorable “hacker-lab” feel.

#### 3. Cyber Badge Strip (`CyberBadgeStrip.jsx`)
A horizontally animated badge section showcasing the core themes of the club.

- **Animated Skill Branding:** Highlights areas like Ethical Hacking, CTF, Linux, Web Security, and Problem Solving.
- **Fast Information Delivery:** Helps visitors understand the club’s technical focus at a glance.
- **Visual Momentum:** Keeps the landing page feeling active and alive.

#### 4. Stats Section (`StatsSection.jsx`)
A quick high-level metric section designed to provide credibility.

- **Trust Signals:** Displays club activity metrics such as learners, challenges, sessions, and learning tracks.
- **Scalable Structure:** Can later be connected to real backend data instead of placeholder values.
- **Professional Framing:** Gives the platform a more institution-ready presentation.

#### 5. Activities & Learning Sections
The landing page introduces the club’s learning and engagement model.

- **Activities Section:** Highlights practical events, workshops, and cybersecurity participation.
- **Learning Tracks Section:** Communicates structured learning progression for members.
- **Live Ranking Preview:** Prepares users for the future competitive CTF ecosystem.
- **Why Join Section:** Helps explain the value proposition of joining the club.

#### 6. CTA / Conversion Layer (`CTASection.jsx`)
The page ends with a clear call-to-action to move users deeper into the platform.

- **Conversion Driven:** Encourages sign-up, engagement, and exploration.
- **Scalable Placement:** Positioned to support future campaigns, onboarding, or recruitment pushes.

### 7. Footer Architecture (`Footer.jsx`)
- **Consistent Glass:** Mirrored design with the Navbar to "sandwich" content in a unified theme.
- **Gradient Accents:** Uses a top-border linear gradient (`primary` to `secondary`) to match the brand's glow.
- **Social Integration:** Features `react-icons` for Discord, GitHub, and LinkedIn connectivity.

## 👥 Members Page Architecture

The platform now includes a dedicated **Members Page** to showcase the official leadership and operational structure of the EWU Cyber Security Club.

This page is designed to present the club as a **professional, organized, and technically serious institution**, rather than just a simple student list.

---

### 🎯 Core Objective

The Members page is built to:

- Showcase the club’s **leadership hierarchy**
- Improve **trust and legitimacy** for visitors and future members
- Create a more **institution ready public presence**
- Prepare the frontend for future **dynamic member management**

---

## 🧠 Members System Design

The page follows a **role-grouped component architecture**.

Instead of rendering all members in one flat list, members are separated into structured leadership tiers:

- **President**
- **Vice Presidents**
- **Executives**
- **Sub Executives**

This improves:

- visual hierarchy
- readability
- professionalism
- scalability for future backend integration

---

### 1. Data Layer (`membersData.js`)

Member information is currently stored in a static data file:

```js
export const membersData = [ ... ]
```

Each member object contains:

- `id`
- `name`
- `role`
- `team`
- `image`
- `bio`
- `linkedin`
- `github`

#### Why Static for Now?
The current version uses static frontend data to speed up UI development and validate the page structure before introducing backend complexity.

This allows the team to:

- finalize the design system first
- test role grouping logic
- avoid premature database engineering

#### Backend-Ready Structure
Even though the current system is static, the data shape is intentionally designed to be **MongoDB/API-ready** for future migration.

---

### 2. Members Page Controller (`Members.jsx`)

The `Members.jsx` file acts as the **page-level controller** for the feature.

It handles:

- importing member data
- grouping members by role
- rendering each role-based section in order

#### Current Grouping Logic

```js
const president = membersData.filter((member) => member.role === "President");
const vicePresidents = membersData.filter(
  (member) => member.role === "Vice President"
);
const executives = membersData.filter((member) => member.role === "Executive");
const subExecutives = membersData.filter(
  (member) => member.role === "Sub Executive"
);
```

This ensures that the layout automatically stays in sync with the data source.

If a new member is added with a matching role, they will appear in the correct section automatically.

---

### 3. Members Hero Section (`MembersHero.jsx`)

The Members page begins with a dedicated **hero section** to establish identity and authority.

#### Responsibilities:
- Introduces the leadership page visually
- Reinforces the cyber / matrix design language
- Provides context for visitors

#### Design Features:
- glassmorphism container
- radial cyber gradients
- animated motion entry
- gradient-highlighted heading

This helps position the page as part of a larger **cyber platform ecosystem**.

---

### 4. Reusable Role Section System (`MembersSection.jsx`)

Each leadership category is rendered using a reusable `MembersSection` component.

#### Props Used:
- `title`
- `subtitle`
- `members`
- `spotlight`
- `gridCols`

This prevents repetitive layout code and keeps the page architecture modular and scalable.

#### Benefits:
- cleaner codebase
- easier future maintenance
- faster expansion for new roles or departments

---

### 5. Spotlight Layout for President

The **President** is intentionally displayed in a featured “spotlight” layout instead of the standard grid.

#### Why?
This creates a stronger **visual hierarchy**, helping users immediately identify the top leadership node.

#### Spotlight Benefits:
- larger card emphasis
- centered placement
- stronger executive presence
- better organizational storytelling

This mirrors how many professional clubs, organizations, and leadership pages are structured.

---

### 6. Reusable Member Card System (`MemberCard.jsx`)

Every member is rendered through a single reusable `MemberCard` component.

#### Card Responsibilities:
- display identity and role
- show team / department
- present a short leadership bio
- provide external profile links

#### Visual Features:
- glass-style cyber card design
- hover elevation animation
- radial glow background
- scanline hover effect
- responsive role badges

This ensures all members follow a **consistent design language**.

---

### 7. Role Badge Styling System

Role labels are dynamically styled using a centralized role-style object:

```js
const roleStyles = {
  President: "badge-accent",
  "Vice President": "badge-secondary",
  Executive: "badge-primary",
  "Sub Executive": "badge-outline",
};
```

#### Why This Matters
This creates a **data-driven UI system** where visual identity is tied directly to the role value.

Benefits:
- easier scaling
- cleaner JSX
- easier future extension for roles like Advisor, Mentor, or Alumni

---

### 8. Conversion CTA Layer (`MembersCTA.jsx`)

The Members page ends with a **Call-To-Action section** that encourages visitors to take the next step.

#### CTA Goals:
- invite users to join the club
- drive traffic to the learning path
- convert interest into platform engagement

This ensures the page is not only informational, but also supports **member acquisition and user flow progression**.

---

## ✨ Members Page UX & Visual Philosophy

The Members page follows the same broader product direction as the homepage:

- **Cyber-Tech branding**
- **Matrix-inspired visuals**
- **Motion-rich interactions**
- **Professional institutional presentation**

### UX Principles
- leadership should feel structured
- information should feel easy to scan
- visuals should feel premium but not distracting
- the system should remain backend-scalable

---

## 🧱 Current Technical Status

| Members Feature                     | Status        |
| :---------------------------------- | :------------ |
| Members Route                       | ✅ Complete   |
| Members Hero Section                | ✅ Complete   |
| Role-Based Leadership Separation    | ✅ Complete   |
| President Spotlight Layout          | ✅ Complete   |
| Reusable Member Card Component      | ✅ Complete   |
| CTA Section                         | ✅ Complete   |
| Static Frontend Data Layer          | ✅ Complete   |
| Backend / MongoDB Integration       | ⏳ Planned    |
| Real Member Images                  | ⏳ Planned    |
| Admin Member Management Panel       | ⏳ Planned    |

---

## 🚀 Future Upgrade Path for Members System

The current implementation is intentionally structured so it can later evolve into a fully dynamic member management system.

### Planned Future Enhancements
- move member data from static file to MongoDB
- create backend `/members` API endpoint
- allow admin-side member creation and updates
- upload real executive/member profile images
- add search / filter / department view
- add public member profile pages
- add alumni / advisor / mentor categories

---

## 🧠 Architectural Advantage

This feature was intentionally built using a **frontend-first, backend-ready approach**.

That means the UI can later evolve from:

```js
membersData
```

to:

```js
fetchedMembers
```

without requiring a major redesign.

This keeps development fast in the short term while protecting long-term scalability.

---

## 🔐 Authentication & Security Layer

The core security infrastructure combines **Firebase Identity** with **Backend Authorization (JWT)** to provide a production-grade authentication flow.

### 1. ⚡ Frontend Authentication Architecture

The application uses the **React Context Provider Pattern** to maintain global authentication state via an `AuthProvider`.

**Flow:** `AuthProvider` → `AuthContext` → `useAuth()` hook → **Components**

This provides global access to:

- `user` & `loading` states.
- `loginUser()`, `registerUser()`, and `logout()` methods.

### 2. 🔑 Hybrid Token System

Two different tokens exist in the application to ensure secure communication:

- **Firebase ID Token:** Generated after login/registration. Used to verify identity with the backend during the initial handshake.
- **Backend JWT Token:** Generated by our server after verifying the Firebase token. Stored in `localStorage` as `access-token` for all subsequent protected API requests (Profile, Dashboard, etc.).

### 3. 🌐 API Communication & Fortified Client

All communication is centralized using a custom **Axios instance** located in `src/services/api.js`.

- **Responsibilities:** Sets backend `baseURL` and attaches JWT tokens to headers.
- **Scalability:** Prepared for interceptors to handle `401 Unauthorized` or `403 Forbidden` responses globally.

### 4. 🔔 UI Feedback System

We use **react-hot-toast** to provide instant visual feedback during auth flows.

- **Loading States:** Toasts track the "Authenticating..." status.
- **Success/Error:** Instant feedback for "Login successful" or "Registration failed."

---

##  🎨 Custom Theme Integration (`index.css`)
The site uses a custom-engineered daisyUI theme named `ewucsc`.
*   **Color Palette:** Uses a deep midnight background (`#020617`) with vibrant Blue (`primary`) and Cyan (`secondary`) accents.
*   **Gradient Buttons:** The Login button features a dual-tone linear gradient that reverses on hover with a smooth `500ms` transition.
*   **Radial Background:** The global CSS includes a subtle radial gradient to create depth, mimicking a "cyber-grid" environment.
*   **Animations:** Smooth `500ms` transitions for gradient buttons and `hover:scale-105` effects for interactivity.

## ✨ Visual Effects & Interaction Layer

To create a modern “cyber-lab” atmosphere, the homepage includes a dedicated visual effects system.

### Included Effects
- **Floating Particles (`FloatingParticles.jsx`)**
  - Adds subtle ambient motion across the hero area.
  - Enhances depth without overwhelming readability.

- **Matrix Background (`MatrixBackground.jsx`)**
  - Reinforces the cybersecurity / terminal-inspired visual identity.
  - Supports the “digital operations center” feel.

- **Code Rain (`CodeRain.jsx`)**
  - Simulates a hacker-style motion layer for atmosphere.
  - Used carefully to maintain readability and performance.

- **Mouse Glow (`MouseGlow.jsx`)**
  - Adds an interactive glowing cursor-follow effect.
  - Creates a more premium and immersive feel.

- **Scroll Progress (`ScrollProgress.jsx`)**
  - Improves navigation awareness across long-form landing sections.
  - Gives users a sense of progress while browsing.

- **Page Loader (`PageLoader.jsx`)**
  - Adds a branded entry animation before content is displayed.
  - Helps the site feel more polished and “product-like”.

### UX Philosophy
All effects are designed with a **"performance-first cinematic UI"** mindset:
- immersive, but not distracting
- animated, but still readable
- aesthetic, but still scalable for real users

---

## 🧩 Key Design Principles

1.  **Separation of Concerns:**
    - **Firebase:** Authentication (Identity).
    - **Backend:** Authorization (Roles & Permissions).
    - **MongoDB:** Persistent Data Storage.
    - **Frontend:** UI & Global State Management.

2.  **Scalable API Structure:** The backend follows a modular **MVC architecture** (`routes` → `controllers` → `models`), ensuring the system can scale to support CTF leaderboards and member management.

3.  **Stateless Authentication:** JWT ensures the server does not store sessions, allowing for horizontal scaling and faster API responses.

## 🧠 Platform Product Direction

This project is no longer just a basic student club website.  
It is being designed as a **scalable cyber learning platform** for EWUCSC.

### Long-Term Vision
The system is intended to evolve into a **picoCTF-inspired university platform** where:

- **Admins / Club Leaders** can create and manage cyber problems.
- **Members** can solve challenges and earn points.
- **Users** can climb a live leaderboard based on performance.
- **The Club** can manage training, homeworks, learning paths, and member engagement from one ecosystem.

### Planned Core Modules
- **Landing / Branding Layer**
- **Authentication & Role System**
- **Role-Based Dashboards**
- **CTF Problem Management**
- **Flag Submission & Scoring**
- **Leaderboard / Ranking Engine**
- **Homework & Learning Management**

### Why This Matters
This architecture allows the platform to become:
- a **learning portal**
- a **competition system**
- a **club management system**
- and a **real technical showcase** for EWUCSC

---

## 🧪 Current Development Status

| Feature                          | Status            |
| :------------------------------- | :---------------- |
| Firebase Authentication          | ✅ Complete       |
| MongoDB User Storage             | ✅ Complete       |
| Backend JWT Generation           | ✅ Complete       |
| Register & Login Page UI         | ✅ Complete       |
| Toast Notifications              | ✅ Complete       |
| Dark Mode & Cyber Theme          | ✅ Complete       |
| Landing Page V1                  | ✅ Complete       |
| Hero + Terminal Experience       | ✅ Complete       |
| Cyber Visual Effects Layer       | ✅ Complete       |
| Role-Based Dashboard Structure   | 🟡 In Progress    |
| Protected Routes                 | ⏳ Planned        |
| Homework System                  | ⏳ Planned        |
| CTF Challenge System             | ⏳ Planned        |
| Leaderboard / Ranking Engine     | ⏳ Planned        |


## 🧭 Next Development Steps

### Immediate Priorities
- [ ] **Protected Routes:** Prevent unauthorized access to dashboard pages.
- [ ] **Role Redirect Logic:** Redirect users to the correct dashboard after login.
- [ ] **Role-Based Dashboard UI:** Complete Admin, Executive, Sub-Executive, and Member dashboard shells.
- [ ] **User Context Sync:** Store authenticated backend user info globally after login.

### Core Product Features
- [ ] **CTF Problem System:** Allow admins to create and manage cyber challenges.
- [ ] **Submission System:** Let members submit flags/answers for problems.
- [ ] **Scoring Engine:** Award points for valid solves.
- [ ] **Leaderboard:** Rank users based on challenge performance.
- [ ] **Homework System:** Create and track club assignments.
- [ ] **Learning Path System:** Structured learning progression for members.

### Future Enhancements
- [ ] Add real-time notifications.
- [ ] Add event / workshop management.
- [ ] Add member profile pages.
- [ ] Add achievement badges and streak system.
- [ ] Connect homepage stats with live backend data.

---

## 📂 Project Structure

```
client
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ assets
│  │  ├─ ewucscLogo.jpg
│  │  ├─ members
│  │  │  ├─ EP2425
│  │  │  │  ├─ image1.jpg
│  │  │  │  ├─ image10.jpg
│  │  │  │  ├─ image11.jpg
│  │  │  │  ├─ image12.jpg
│  │  │  │  ├─ image2.jpg
│  │  │  │  ├─ image3.jpg
│  │  │  │  ├─ image4.jpg
│  │  │  │  ├─ image5.jpg
│  │  │  │  ├─ image6.jpg
│  │  │  │  ├─ image7.jpg
│  │  │  │  ├─ image8.jpg
│  │  │  │  ├─ image9.jpg
│  │  │  │  └─ thumbnail.jpg
│  │  │  └─ EP2526
│  │  │     ├─ image1.jpg
│  │  │     ├─ image10.jpg
│  │  │     ├─ image11.jpg
│  │  │     ├─ image12.jpg
│  │  │     ├─ image13.jpg
│  │  │     ├─ image14.jpg
│  │  │     ├─ image15.jpg
│  │  │     ├─ image16.jpg
│  │  │     ├─ image2.jpg
│  │  │     ├─ image3.jpg
│  │  │     ├─ image4.jpg
│  │  │     ├─ image5.jpg
│  │  │     ├─ image6.jpg
│  │  │     ├─ image7.jpg
│  │  │     ├─ image8.jpg
│  │  │     ├─ image9.jpg
│  │  │     └─ thumbnail.jpg
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Footer.jsx
│  │  ├─ home
│  │  │  ├─ ActivitiesSection.jsx
│  │  │  ├─ CodeRain.jsx
│  │  │  ├─ CTASection.jsx
│  │  │  ├─ CyberBadgeStrip.jsx
│  │  │  ├─ FAQSection.jsx
│  │  │  ├─ FloatingParticles.jsx
│  │  │  ├─ HeroSection.jsx
│  │  │  ├─ HeroTerminal.jsx
│  │  │  ├─ LearningTracksSection.jsx
│  │  │  ├─ LiveRankingPreview.jsx
│  │  │  ├─ MatrixBackground.jsx
│  │  │  ├─ MouseGlow.jsx
│  │  │  ├─ PageLoader.jsx
│  │  │  ├─ ScrollProgress.jsx
│  │  │  ├─ SectionHeading.jsx
│  │  │  ├─ StatsSection.jsx
│  │  │  └─ WhyJoinSection.jsx
│  │  ├─ Logo.jsx
│  │  ├─ members
│  │  │  ├─ MemberCard.jsx
│  │  │  ├─ MembersCTA.jsx
│  │  │  ├─ MembersFilterTabs.jsx
│  │  │  ├─ MembersGrid.jsx
│  │  │  ├─ MembersHero.jsx
│  │  │  └─ MembersSection.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Sidebar.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ AuthProvider.jsx
│  ├─ data
│  │  └─ membersData.js
│  ├─ firebase
│  │  └─ firebase.config.js
│  ├─ hooks
│  │  └─ useAuth.js
│  ├─ index.css
│  ├─ layouts
│  │  ├─ DashboardLayout.jsx
│  │  └─ MainLayout.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CTF.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ dashboards
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ ExecutiveDashboard.jsx
│  │  │  ├─ MemberDashboard.jsx
│  │  │  └─ SubExecutiveDashboard.jsx
│  │  ├─ Home.jsx
│  │  ├─ Homeworks.jsx
│  │  ├─ Learning.jsx
│  │  ├─ Login.jsx
│  │  ├─ Members.jsx
│  │  └─ Register.jsx
│  ├─ router
│  │  └─ router.jsx
│  └─ services
│     └─ api.js
└─ vite.config.js

```

## 🚀 Future Roadmap

### Phase 1 — Foundation
- [x] Implement Light/Dark mode toggle
- [x] Integrate Firebase/JWT Authentication
- [x] Build branded cyber-themed Landing Page V1
- [x] Create reusable homepage architecture
- [x] Prepare role-based dashboard structure

### Phase 2 — Access & Member System
- [ ] Protected Routes
- [ ] Role Redirect after Login
- [ ] Global Auth/User Sync
- [ ] Role-Based Dashboards (Admin / Executive / Sub-Executive / Member)

### Phase 3 — Core Cyber Platform
- [ ] Problem Creation Panel for Admin
- [ ] Challenge Listing System
- [ ] Flag Submission Logic
- [ ] Point & Score System
- [ ] Dynamic Leaderboard / Ranking

### Phase 4 — Club Learning Ecosystem
- [ ] Homework Management
- [ ] Learning Tracks
- [ ] Member Progress Tracking
- [ ] Event / Workshop Integration
- [ ] Achievement / Badge System

---

> ⚡ **Current Focus:** Building EWUCSC into a modern cyber learning and competition platform with authentication, role-based dashboards, CTF-style challenges, rankings, and structured member growth.
