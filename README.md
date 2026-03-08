# EWU Cyber Security Club (EWUCSC)

A high-performance, responsive web application for tracking homework, attendance, and learning progress for the EWU Cyber Security Club. Built with the MERN stack and a focus on "Cyber-Tech" aesthetics.

## 🛠️ Navbar Architecture

The navigation system is built for scalability and high-end visual appeal, utilizing **daisyUI v5** and **Tailwind CSS v4**.

### 1. Reusable Logo Component (`Logo.jsx`)
The logo is abstracted into a standalone component to ensure branding consistency across the platform (Navbar, Footer, Login).
*   **Dynamic Sizing:** Uses ES6 destructuring (`{ className = "h-12 w-12" }`) to allow custom sizing while providing a sensible default.
*   **Branding:** Combines the `ewucscLogo` image with a "Brand Lockup" that hides the subtitle on mobile (`hidden sm:inline-block`) to maintain a clean UI.
*   **Cyber Glow:** Implements `shadow-primary/30` to give the brand a neon-tech aesthetic.

### 2. Responsive Navbar (`Navbar.jsx`)
*   **Glassmorphism:** Uses `backdrop-blur-md` and `bg-base-100/80` to create a modern, semi-transparent frosted glass effect that sticks to the top of the page.
*   **Single-Source Links:** Navigation links are stored in a constant to ensure the **Desktop Menu** and **Mobile Dropdown** stay perfectly in sync.
*   **Active States:** Integrated with `react-router`'s `NavLink`, which automatically applies active classes based on the current URL.
*   **Auth Ready:** Includes placeholders for Role-Based Access Control (RBAC) and user profile dropdowns.

### 3. Custom Theme Integration (`index.css`)
The site uses a custom-engineered daisyUI theme named `ewucsc`.
*   **Color Palette:** Uses a deep midnight background (`#020617`) with vibrant Blue (`primary`) and Cyan (`secondary`) accents.
*   **Gradient Buttons:** The Login button features a dual-tone linear gradient that reverses on hover with a smooth `500ms` transition.
*   **Radial Background:** The global CSS includes a subtle radial gradient to create depth, mimicking a "cyber-grid" environment.

## Problems


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
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Logo.jsx
│  │  ├─ Navbar.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ AuthProvider.jsx
│  ├─ firebase
│  │  └─ firebase.config.js
│  ├─ hooks
│  │  └─ useAuth.js
│  ├─ index.css
│  ├─ layouts
│  │  └─ MainLayout.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CTF.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Home.jsx
│  │  ├─ Homeworks.jsx
│  │  ├─ Learning.jsx
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  └─ router
│     └─ router.jsx
└─ vite.config.js

```


## 🚀 Future Roadmap
- [X] Implement Light/Dark mode toggle.
- [ ] Build Role-Based Dashboards (Admin vs. Member).
- [ ] Integrate Firebase/JWT Authentication.
- [ ] Develop the Homework Tracking logic.
- [ ] More Advanced Features & logic.
