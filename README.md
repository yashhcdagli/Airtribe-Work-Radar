# WorkRadar — AI-Powered Work Prioritization Dashboard

Airtribe PM-Core · "Vibe Coding for PMs" project · WorkRadar assignment, Step 3 (Working MVP)

WorkRadar gives a team lead one screen that answers: what's the top work today,
what happened, what needs attention, and who's blocked — without checking
Slack, Jira, GitHub, and email separately. This build follows the PRD and
high-fidelity UX design submitted in Steps 1–2.

## Running it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To produce a production build (e.g. for deploying to Vercel/Netlify):

```bash
npm run build
npm run preview   # serves the built output locally to sanity-check it
```

## What's implemented

| Brief requirement | Where |
|---|---|
| Dashboard | `src/pages/Dashboard.jsx` |
| AI-generated summary | `src/components/AISummary.jsx` ("Today's Briefing") |
| Priority feed | `src/components/PriorityFeed.jsx` |
| Search | Header search bar (`src/components/Header.jsx`) filters the priority feed live |
| Detail page | `src/pages/ItemDetail.jsx` — full description, AI rank rationale, activity timeline |
| Basic actions: Assign / Mark Done / Snooze | Implemented on the Item Detail page, backed by shared state in `src/context/WorkRadarContext.jsx` |
| Empty state | Priority feed shows one when a search returns no matches |
| Error state | Header has a **"Simulate sync error"** toggle (a deliberate demo affordance, not a real integration) that swaps the AI Summary and Priority Feed into a retry-able error view |

All data is mocked in `src/data/mockData.js` — there are no live Jira/GitHub/Slack
integrations, per the assignment's "mock data is acceptable" note. Actions
(assign/mark done/snooze) update in-memory React state only; nothing persists
across a page refresh.

## Stack

- React 18 + React Router (client-side routing for the dashboard / item detail
  split, matching the "Dashboard" and "Item Details" screens from the UX design)
- Vite (dev server + build)
- lucide-react for icons
- Plain CSS with a design-token system in `src/index.css` (no UI framework),
  matching the dark, data-dense visual language from the Step 2 UX design

## AI usage notes (fill in before submitting)

Per the submission guidelines, document what AI generated vs. what you
changed. Starting point, since this MVP was built end-to-end with Claude:

- AI-generated: full scaffold — project structure, all components, mock data,
  styling, routing, and the assign/mark-done/snooze state logic.
- Manually reviewed/changed by you: _list anything you edited after this —
  copy tweaks, data changes, bugs you fixed, features you added or cut._

