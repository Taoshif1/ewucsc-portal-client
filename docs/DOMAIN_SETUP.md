# EWUCSC Domain Split

The club portal and a future public CTF event should be treated as separate surfaces.

## Recommended structure

- Main club site: club-facing pages such as Home, About/Mission, Members, Announcements, Blogs, Partners, and Contact.
- Technical hub: a separate subdomain for Resources, Learning Path / Roadmap, Cheatsheets, and other technical references.
- CTF event platform: a separate subdomain/application for public or inter-university contests. Do not reuse the club-member portal as the public contest platform.

Example only:

- `www.example.com`
- `resources.example.com`
- `ctf.example.com`

Do not configure production DNS until the final domain name is confirmed.

## Environment variables

The client uses:

```env
VITE_TECHNICAL_HUB_URL=https://resources.example.com
VITE_CTF_EVENT_URL=https://ctf.example.com
```

When these values are empty, local development falls back to the current internal learning/resources routes and hides the external contest shortcut.

## Vercel handover checklist

1. Add the purchased domain to the main club Vercel project.
2. Create or select the technical-hub deployment/project and add the resources subdomain.
3. Create a separate contest deployment/project and add the CTF subdomain.
4. Add the two public URLs above as environment variables in the club portal.
5. Add each production origin to the API server CORS allowlist when that origin needs authenticated API access.
6. Verify HTTPS, redirects, login, logout, and deep links after DNS propagation.

The public CTF event platform should have its own participant/team model and load-testing plan. The EWUCSC member portal remains restricted to approved EWU members/staff.
