// Mock data layer for WorkRadar.
// Per assignment guidelines, no live backend integrations are wired up —
// this file stands in for what would otherwise be Jira/GitHub/Slack API responses.

export const currentUser = {
  name: 'Yash HC Dagli',
  role: 'Product Manager',
  initials: 'YD',
}

export const meta = {
  date: '16th August 2026',
  syncedAgo: '2m ago',
}

export const stats = [
  { id: 'velocity', label: 'Team Velocity', value: '48 pts/sprint', tone: 'neutral' },
  { id: 'github', label: 'GitHub Status', value: '12 Commits Today', tone: 'positive' },
  { id: 'jira', label: 'Jira Cycle Time', value: '3.2 Days Avg', tone: 'neutral' },
  { id: 'alerts', label: 'Active Alerts', value: '2 Critical Issues', tone: 'critical' },
]

export const briefing = {
  generatedAt: '08:30 AM',
  segments: [
    { text: 'Overall, the team is performing cleanly. ', emphasis: false },
    { text: 'GitHub deployment pipeline', emphasis: true },
    { text: ' succeeded at 04:12 AM. Development focus is concentrated on the ', emphasis: false },
    { text: 'Data Sync Engine (Jira-849)', emphasis: true, tone: 'positive' },
    { text: '. However, ', emphasis: false },
    { text: 'Alex is currently blocked', emphasis: true, tone: 'critical' },
    { text: ' waiting on API credentials from internal security, jeopardizing today\u2019s beta release candidate target.', emphasis: false },
  ],
  highlights: [
    {
      id: 'shipped',
      eyebrow: 'Shipped to Production',
      title: 'v2.4.0 Live Sync Gateway',
      detail: '4 pull requests merged, passing automated tests.',
    },
    {
      id: 'comms',
      eyebrow: 'Communication Peak',
      title: 'Slack traffic focused on security-API',
      detail: '24 messages exchanged across #eng-security channel.',
    },
  ],
}

export const alerts = [
  {
    id: 'alert-1',
    tag: 'Blocked Development',
    ref: 'WR-849',
    title: 'Alex Mercer cannot access API keys',
    description: 'Waiting on InfoSec team approval for Gateway endpoints. Action required to escalate.',
  },
  {
    id: 'alert-2',
    tag: 'Pull Request Idle',
    ref: 'PR #242',
    title: 'Core Stripe patch is missing reviews',
    description: 'Idle for 14 hours. Jeopardizes the 18:00 deployment target.',
  },
]

export const roster = [
  { id: 'marcus', name: 'Marcus Aurelius', initials: 'MA', status: 'active' },
  { id: 'clara', name: 'Clara Oswald', initials: 'CO', status: 'active' },
  { id: 'alex', name: 'Alex Mercer', initials: 'AM', status: 'blocked' },
  { id: 'devin', name: 'Devin Cobbs', initials: 'DC', status: 'active' },
  { id: 'chloe', name: 'Chloe Vance', initials: 'CV', status: 'blocked' },
  { id: 'siddharth', name: 'Siddharth Rao', initials: 'SR', status: 'active' },
  { id: 'fiona', name: 'Fiona Lark', initials: 'FL', status: 'active' },
  { id: 'jared', name: 'Jared Voss', initials: 'JV', status: 'active' },
]

export const blocked = [
  {
    id: 'himanshu',
    name: 'Himanshu',
    initials: 'HI',
    duration: 'Blocked for 3h',
    tag: 'Security Access',
    description: 'Blocked by Infosec ticket #SEC-90. Needs credentials for beta environment.',
  },
  {
    id: 'chloe',
    name: 'Chloe Vance',
    initials: 'CV',
    duration: 'Blocked for 1d',
    tag: 'Design Asset Drafts',
    description: 'Awaiting marketing content confirmation before finalizing checkout layout prototypes.',
  },
]

const now = Date.now()
const hoursAgo = (h) => new Date(now - h * 60 * 60 * 1000).toISOString()

export const initialPriorities = [
  {
    id: 'wr-902',
    source: 'task',
    sourceLabel: 'WR-902',
    title: 'Refactor multi-tenant indexing loop',
    assignee: 'marcus',
    status: 'In Progress',
    impact: 'High',
    description:
      'The current indexing loop re-scans the full tenant table on every write, which is the main contributor to the 3.2-day average cycle time on data-layer tickets. Refactor to an incremental, tenant-scoped index update.',
    aiRationale:
      'Ranked #1 because it blocks two downstream tickets (WR-905, WR-911) and directly affects the Data Sync Engine beta target called out in this morning\u2019s briefing.',
    activity: [
      { time: hoursAgo(20), text: 'Ticket moved to In Progress by Marcus Aurelius.' },
      { time: hoursAgo(6), text: 'Branch feature/indexing-loop-refactor pushed, 3 commits.' },
      { time: hoursAgo(1), text: 'AI re-ranked: impact score increased after WR-905 marked as dependent.' },
    ],
  },
  {
    id: 'pr-244',
    source: 'github',
    sourceLabel: 'PR #244',
    title: 'Review critical memory leak patch on stream parser',
    assignee: 'clara',
    status: 'Pending Review',
    impact: 'High',
    description:
      'Patch fixes an unbounded buffer growth in the stream parser under sustained load. Verified locally against the load-test harness; needs a second reviewer before merge.',
    aiRationale:
      'Ranked #2 because it has been open for 14 hours against an 18:00 deployment target and no reviewer has been assigned.',
    activity: [
      { time: hoursAgo(14), text: 'PR opened by Clara Oswald.' },
      { time: hoursAgo(14), text: 'Automated tests passed (CI run #1182).' },
    ],
  },
  {
    id: 'client-stripe',
    source: 'email',
    sourceLabel: 'Client Escalation',
    title: 'Address performance degradation report from Stripe integration',
    assignee: 'devin',
    status: 'Investigating',
    impact: 'High',
    description:
      'Enterprise customer reported checkout latency spikes correlated with Stripe webhook retries. Devin is reproducing against a staging sandbox with production-shaped traffic.',
    aiRationale:
      'Ranked #3 for external customer impact — flagged directly from an inbound email thread rather than an internal ticket, so it carries an escalation weight bump.',
    activity: [
      { time: hoursAgo(9), text: 'Escalation email logged from Client Success.' },
      { time: hoursAgo(3), text: 'Devin Cobbs began reproducing in staging.' },
    ],
  },
  {
    id: 'wr-872',
    source: 'task',
    sourceLabel: 'WR-872',
    title: 'Implement dark mode schema tokens globally',
    assignee: 'chloe',
    status: 'Backlog',
    impact: 'Medium',
    description:
      'Extend the design token set with a dark palette and wire it through the component library. Blocked on final palette sign-off from marketing.',
    aiRationale:
      'Ranked #4 — medium impact, and currently blocked on an external dependency (see Chloe Vance in Who\u2019s Blocked), so it can\u2019t move today regardless of priority.',
    activity: [
      { time: hoursAgo(30), text: 'Ticket created and scoped by Chloe Vance.' },
    ],
  },
  {
    id: 'wr-910',
    source: 'task',
    sourceLabel: 'WR-910',
    title: 'Migrate onboarding checklist to new schema',
    assignee: 'fiona',
    status: 'Blocked',
    impact: 'Medium',
    description:
      'Requires the multi-tenant indexing refactor (WR-902) to land first, since the checklist schema references tenant-scoped indexes.',
    aiRationale:
      'Ranked below WR-902 because it is a direct downstream dependent — the AI engine holds it just under its blocker rather than surfacing it independently.',
    activity: [
      { time: hoursAgo(40), text: 'Marked Blocked, dependent on WR-902.' },
    ],
  },
  {
    id: 'pr-251',
    source: 'github',
    sourceLabel: 'PR #251',
    title: 'Add rate limiting middleware to public API',
    assignee: 'siddharth',
    status: 'Pending Review',
    impact: 'Medium',
    description:
      'Introduces a token-bucket limiter ahead of the public API beta. No incidents driving this — proactive hardening work.',
    aiRationale:
      'Ranked below the incident-driven items today since there is no active deadline or customer impact attached.',
    activity: [
      { time: hoursAgo(18), text: 'PR opened by Siddharth Rao.' },
    ],
  },
  {
    id: 'client-billing',
    source: 'email',
    sourceLabel: 'Client Escalation',
    title: 'Investigate duplicate billing charges reported by Acme Corp',
    assignee: 'jared',
    status: 'Investigating',
    impact: 'High',
    description:
      'Acme Corp reports two charges for the same invoice period. Jared is cross-checking the billing webhook log against Stripe\u2019s event history.',
    aiRationale:
      'High customer-impact escalation, ranked just under the Stripe latency issue because it affects a single account rather than the integration broadly.',
    activity: [
      { time: hoursAgo(5), text: 'Escalation email logged from Client Success.' },
    ],
  },
  {
    id: 'wr-865',
    source: 'task',
    sourceLabel: 'WR-865',
    title: 'Write integration tests for Data Sync Engine v2',
    assignee: 'marcus',
    status: 'Done',
    impact: 'Medium',
    description:
      'Coverage for the new sync gateway shipped in v2.4.0. All test suites green against staging.',
    aiRationale:
      'Completed — kept in the feed for today\u2019s context since it shipped as part of the same release the briefing references.',
    activity: [
      { time: hoursAgo(28), text: 'Work started by Marcus Aurelius.' },
      { time: hoursAgo(2), text: 'Marked Done — all suites passing.' },
    ],
  },
]
