# EWUCSC Domain & Subdomain Setup

The application is prepared for three separate browser surfaces. The final domain name is intentionally not hard-coded.

## Recommended structure

Example only, if the club later owns `example.com`:

- `example.com` or `www.example.com` — public club website
- `portal.example.com` — Login, Register, approval flow and member/staff portal
- `resources.example.com` — Learning Path, Arsenal, VP resource drop and technical resources
- `ctf.example.com` — future public/inter-university CTF platform

The public CTF platform is a separate future system and should not be coupled to the EWU-only member portal.

## Important concept: route vs subdomain

A React route:

```text
example.com/about
example.com/blogs
```

A subdomain:

```text
portal.example.com
resources.example.com
```

React Router controls the path after the domain. DNS/Vercel controls which hostname reaches which deployment.

You do **not** add an Express route such as `/portal.example.com`.

## Client environment variables

```env
VITE_AUTH_PORTAL_URL=https://portal.example.com
VITE_TECHNICAL_HUB_URL=https://resources.example.com
VITE_CTF_EVENT_URL=https://ctf.example.com
```

When `VITE_AUTH_PORTAL_URL` is empty, Login/Register stay on local/internal routes for development.

When `VITE_TECHNICAL_HUB_URL` is empty, Learning/Resources stay on local/internal routes.

Once a real URL is configured:

- public Member Portal / Join links use the auth subdomain;
- direct main-site `/login`, `/register`, and `/pending-approval` requests forward to the auth host;
- direct main-site `/learning` and `/resources` requests forward to the technical host.

## Recommended Vercel workflow

The cleanest long-term setup is three Vercel projects/deployments:

1. **Club site project** — main domain.
2. **Member portal project** — auth/member subdomain.
3. **Technical hub project** — resources subdomain.

They can initially come from the same GitHub repository while the code is being separated, then the technical hub can move to its own repository later if desired.

For the member portal, keep Firebase + API configuration available because Login/Register/Dashboard need them.

For the technical hub, the static Arsenal and VP resource pages do not need authenticated API access unless a later feature requires it.

## DNS

You buy/own the base domain once. Subdomains normally do not require separate purchases.

After adding each custom domain inside Vercel, Vercel shows the DNS record that the domain provider must receive. Use the exact values Vercel gives for the project rather than guessing an A/CNAME record from an old tutorial.

## API / CORS

The Express API does not need new routes just because the frontend has a new hostname.

It only needs to permit frontend origins that call the API. Add the final origins to server environment variables, for example:

```env
ALLOWED_ORIGINS=https://example.com,https://portal.example.com,https://resources.example.com
```

The auth/member portal definitely needs API access. The technical hub only needs it if a technical page calls protected or dynamic endpoints.

## Firebase

Keep the same Firebase project unless there is a deliberate migration.

After the real auth hostname exists:

1. add the auth hostname to Firebase Authentication authorized domains;
2. verify registration, verification-email links, password reset, login and logout;
3. verify the backend receives valid Firebase ID tokens from the new host.

## Cutover checklist

1. Confirm the exact base domain with EWUCSC leadership.
2. Purchase it or obtain an official EWU subdomain.
3. Create the Vercel projects/domains.
4. Configure `VITE_AUTH_PORTAL_URL` and `VITE_TECHNICAL_HUB_URL`.
5. Add final frontend origins to server CORS.
6. Add auth hostname to Firebase authorized domains.
7. Redeploy.
8. Smoke-test desktop + mobile, registration, email verification, approval, login, password reset, dashboards, learning/resources and direct/deep URLs.
