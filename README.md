# 4AM Media Knowledge Base System

Internal knowledge-base web app for Customer Service Representatives (CSRs) — **Phase 1: Design, Navigation & Architecture**.

> One place where a CSR can go when they need an answer.

## What this is

A polished, functional **prototype** of the 4AM Media Knowledge Base. It is built to evaluate
UI/UX, navigation, and page hierarchy **before** real content is imported. All visible content is
**representative placeholder data**; the structure is wired to accept the real files later without a
UI rebuild.

## Sections

- **Dashboard** — welcome banner (with the 4AM Media logo), five area cards, Recent Cascades, Latest Updates, Frequently Used.
- **Cascade & Handling Updates** — search + **status filter** (All / NEW·CURRENT / ACTIVE·EXISTING / SUPERSEDED / RETIRED) + a Status Legend + category filter. Each record shows its full handling and a **Handling History** (newest first).
- **Products** — clean product grid; each product opens a reusable detail template.
- **Resources** — tool/link cards grouped by category (placeholder links).
- **Handbook & Policies** — policy category cards.
- **Our Team** — team directory cards (placeholder, no personal data).
- **Global Search** — header search with a live dropdown + a full results page.

## Branding

The UI takes its identity from the official 4AM Media logo. Dominant logo colors are
**blue `#0060B0`** (primary) and **gold `#F0B000`** (accent), with the logo's magenta/cyan used
sparingly. The logo is used in the top navigation and the dashboard welcome banner.

## Status system (the four official cascade statuses)

Every cascade record uses exactly one of these:

| Status | Meaning |
| --- | --- |
| 🟢 **NEW / CURRENT** | Latest cascade or recently updated handling. |
| 🔵 **ACTIVE / EXISTING** | Older cascade, but the handling is still currently implemented. |
| 🟡 **SUPERSEDED** | An older cascade that has been replaced by a newer handling. |
| 🔴 **RETIRED** | Cascade/handling that is no longer implemented and should not be followed. |

The newest handling is always shown first and is the one to follow; older versions are kept for reference.

## Tech approach

- **Zero build step.** Plain HTML + CSS + vanilla JS (classic scripts, no modules) so the site opens
  by double-clicking `index.html` and also deploys cleanly to GitHub Pages.
- **Hash-based SPA router** (`#/route`) — no server required.
- **Data-driven.** All content lives in `assets/js/data.js`. Replace placeholder values (or have the
  sync populate `assets/js/cascades-data.js`) to publish real content — no page code changes needed.
- **Reusable components** in `assets/js/components.js`; page views in `assets/js/pages.js`.

## Auto-sync (future-ready, secure)

The future authoritative Cascade & Handling source is a **private** 4AM Media Google Sheet. It is
**never** exposed to the browser. A GitHub Actions workflow (`.github/workflows/sync-cascades.yml`)
fetches it **server-side** using credentials stored only in GitHub repo secrets, parses it into
`assets/js/cascades-data.js`, and commits the change. The frontend only ever receives the parsed,
public-facing content — never the sheet URL, API keys, or tokens.

To enable auto-sync (one-time), add repo secrets (`Settings > Secrets and variables > Actions`):

- `CASCADE_SYNC_MODE` = `service` (recommended) or `csv`
- `service` mode → `GOOGLE_SERVICE_ACCOUNT_JSON` (service-account key) + `CASCADE_SHEET_ID`
- `csv` mode → `CASCADE_SHEET_CSV_URL` (an unlisted "Publish to web" CSV link from the sheet)

Until `CASCADE_SYNC_MODE` is set, the workflow is a safe no-op and the app uses the Phase-1 demo
cascades in `data.js`.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8099
# then visit http://localhost:8099/index.html
```
