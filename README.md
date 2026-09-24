# EWUCSC Portal — Client

React frontend for the East West University Cyber Security Club public website and approved-member portal.

## Stack

- React 19 + Vite
- React Router 7
- Tailwind CSS 4 + DaisyUI 5
- Firebase Authentication
- Axios
- Framer Motion
- react-hot-toast

## Information architecture

### Public website

The public layer is for club identity, recruitment and open technical learning:

- `/` — club homepage
- `/about`
- `/members`
- `/members/current` — current 2025–26 executive panel
- `/members/executive-panel-24-25`
- `/members/executive-panel-25-26`
- `/members/moderators`
- `/learning`
- `/resources`
- `/announcements`
- `/blogs`
- `/blogs/:slug`
- `/partners`
- `/contact`

CTF challenges, homework and the internal leaderboard are intentionally **not public**.

### Member portal

Approved members enter through `/dashboard`. The portal uses a homepage/card-based experience rather than a permanent left sidebar.

Protected modules:

- `/dashboard/ctf`
- `/dashboard/homeworks`
- `/dashboard/leaderboard`

All four approved roles receive the member-home experience first, then role tools are layered below it.

## Roles

| Role | Member portal | CTF/Homework | Review submissions | Publish announcements/blogs | Approve users / roles |
| --- | --- | --- | --- | --- | --- |
| Member | Yes | Participate | No | No | No |
| Sub-Executive | Yes | Participate | Yes | No | No |
| Executive | Yes | Participate + manage | Yes | Yes | No |
| Admin | Yes | Participate + manage | Yes | Yes | Yes |

## Registration and login

New-member flow:

```text
EWU Student ID
→ derived @std.ewubd.edu email
→ Firebase account
→ EWU email verification
→ pending membership
→ Admin approval
→ Student ID + password login
→ member portal
```

Rules:

- New registrations require an EWU Student ID.
- The institutional email is derived from the Student ID.
- Password minimum is 8 characters.
- Registering does **not** create portal access.
- Email verification and Admin approval are both required.
- Existing staff accounts can temporarily log in using their legacy email during migration.

## Portal capabilities

### Members

- CTF challenge listing
- flag submission
- one-time score awards
- internal leaderboard
- homework listing and submissions
- public Learning Path / Resources shortcuts
- upcoming global CTF feed from CTFtime

### Admin

- approve, reject, suspend and restore memberships
- assign Admin / Executive / Sub-Executive / Member roles
- export member registry as CSV
- create/publish CTF challenges
- create/publish homework
- review homework submissions
- create/publish announcements
- create/publish blogs

### Executive

- member portal
- CTF/homework operations
- content publishing
- submission review

### Sub-Executive

- member portal
- homework submission review

## Public homepage cleanup

The public homepage intentionally does not include:

- internal leaderboard
- private CTF challenge data
- homework
- fake sponsor cards
- unverified hard-coded club statistics

A public activity card may mention CTF participation, but private challenges and flags stay behind approved-member authentication.

## Learning & resources

The public Learning Path provides a structured progression:

1. Cybersecurity foundations
2. Linux & command line
3. Networking
4. Web security
5. CTF problem solving
6. Research & tooling

The existing EWUCSC Arsenal remains linked during migration:

- https://ewucsc-arsenal.vercel.app/
- https://github.com/T1M3-30M3/ewucsc-arsenal

The Resources hub also includes a live upcoming-CTF feed backed by the server's CTFtime proxy.

## Member panels

Panel cards support optional:

- LinkedIn
- Facebook
- GitHub
- personal portfolio

The actual social URLs should only be populated once the club provides verified links.

Route changes reset scroll to the top, fixing the old issue where moving between Moderator / Executive Panel pages retained the previous scroll position.

## Environment

Create a local `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Use the existing Firebase client configuration names if they differ in your deployment.

## Development

```bash
npm ci
npm run dev
```

Verification:

```bash
npm run lint
npm run build
```

GitHub Actions runs lint + production build on the feature branch, PRs and `main`.

## Domain plan

Target production structure:

- `ewucsc.org` — public/non-technical club website
- `resources.ewucsc.org` — technical learning/resources
- `portal.ewucsc.org` — registration, login and member portal
- `api.ewucsc.org` — Express API

The current single React app can serve these surfaces first; the domains can be split/routed during deployment without rebuilding the feature architecture.

## Remaining handover data

The following require real club-provided information rather than invented data:

- verified LinkedIn/Facebook/portfolio URLs for panels
- designated test credentials for each of the four roles
- final production domains/DNS
- full migration of all legacy Arsenal HTML/CSS/JS lessons into React modules
