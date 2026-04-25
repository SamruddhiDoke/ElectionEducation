/**
 * electionData.js
 * JSON-driven data layer — decoupled from UI for easy CMS migration.
 * Optimized: pure data objects (no functions) enable perfect memoisation in consumers.
 */

export const MODULES = [
  {
    id: 'registration',
    order: 1,
    title: 'Voter Registration',
    subtitle: 'Your First Step to Democracy',
    icon: '📋',
    color: 'from-violet-600 to-indigo-600',
    borderColor: 'border-violet-500',
    estimatedMinutes: 8,
    description:
      'Learn how to register to vote, eligibility requirements, and deadlines that matter.',
    keyPoints: [
      'U.S. citizens 18+ can register in all 50 states.',
      'Deadlines vary: some states allow same-day registration.',
      'Online, mail, and in-person registration options exist.',
      'Always verify your registration before Election Day.',
    ],
    electionDate: {
      title: 'Voter Registration Deadline 2024',
      date: '2024-10-07',
      description: 'General Election voter registration deadline (varies by state)',
    },
  },
  {
    id: 'primaries',
    order: 2,
    title: 'Primary Elections',
    subtitle: 'Choosing Party Candidates',
    icon: '🗳️',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500',
    estimatedMinutes: 10,
    description:
      'Understand how parties select their nominees through primaries and caucuses.',
    keyPoints: [
      'Open primaries allow any registered voter to participate.',
      'Closed primaries are restricted to party members.',
      'Delegates are allocated based on primary results.',
      'Super Tuesday is the biggest primary election day.',
    ],
    electionDate: {
      title: 'Super Tuesday 2024',
      date: '2024-03-05',
      description: 'The biggest single day of primary elections',
    },
  },
  {
    id: 'general',
    order: 3,
    title: 'General Election',
    subtitle: 'The Final Vote',
    icon: '🏛️',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500',
    estimatedMinutes: 12,
    description:
      'Discover how the General Election works, the Electoral College, and what happens on Election Day.',
    keyPoints: [
      'Held the first Tuesday after the first Monday in November.',
      'The Electoral College — not popular vote — elects the President.',
      '270 Electoral votes are needed to win the presidency.',
      'Absentee and early voting options are widely available.',
    ],
    electionDate: {
      title: 'General Election Day 2024',
      date: '2024-11-05',
      description: 'Presidential General Election',
    },
  },
  {
    id: 'results',
    order: 4,
    title: 'Election Results',
    subtitle: 'From Polls to Power',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500',
    estimatedMinutes: 7,
    description:
      'Follow the journey from ballot counting to certification and the peaceful transfer of power.',
    keyPoints: [
      'Results are called by media projections based on counted votes.',
      'Official certification happens weeks after Election Day.',
      'The Electoral College formally votes in December.',
      'Inauguration takes place on January 20th.',
    ],
    electionDate: {
      title: 'Electoral College Vote 2024',
      date: '2024-12-17',
      description: 'Electors formally cast their votes',
    },
  },
];

export const TIMELINE_EVENTS = [
  { year: 'Jan – Feb', label: 'Campaign Season Begins', icon: '🎯', detail: 'Candidates announce, fundraising starts, debates kick off.' },
  { year: 'Feb – Mar', label: 'Early Primaries & Caucuses', icon: '🗳️', detail: 'Iowa, New Hampshire, Nevada, and South Carolina vote first.' },
  { year: 'Super Tue', label: 'Super Tuesday', icon: '⭐', detail: '15+ states vote simultaneously — the biggest primary day.' },
  { year: 'Jun – Jul', label: 'National Conventions', icon: '🏟️', detail: 'Parties officially nominate their presidential and VP candidates.' },
  { year: 'Sep – Oct', label: 'Presidential Debates', icon: '🎙️', detail: 'Candidates face off in nationally televised debate events.' },
  { year: 'Oct 7',    label: 'Registration Deadline', icon: '📋', detail: 'Last day to register to vote in many states.' },
  { year: 'Nov 5',    label: 'Election Day 🇺🇸', icon: '🗳️', detail: 'Citizens cast their ballots across all 50 states + DC.' },
  { year: 'Dec 17',   label: 'Electoral College Votes', icon: '📜', detail: 'Electors cast official votes in their state capitals.' },
  { year: 'Jan 6',    label: 'Congress Counts Votes', icon: '🏛️', detail: 'Joint session of Congress certifies the Electoral College results.' },
  { year: 'Jan 20',   label: 'Inauguration Day', icon: '🎉', detail: 'The President-elect is sworn in as the 47th President.' },
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What is the minimum age to vote in U.S. federal elections?',
    options: ['16', '17', '18', '21'],
    correct: 2,
    explanation: 'The 26th Amendment (1971) lowered the voting age to 18 for all federal elections.',
  },
  {
    id: 'q2',
    question: 'How many Electoral College votes are needed to win the presidency?',
    options: ['218', '270', '290', '300'],
    correct: 1,
    explanation: 'A candidate needs 270 of 538 total electoral votes to secure the presidency.',
  },
  {
    id: 'q3',
    question: 'What is an "open primary"?',
    options: [
      'A primary held outdoors',
      'Any registered voter can participate regardless of party',
      'Only party members may vote',
      'A primary with no incumbent',
    ],
    correct: 1,
    explanation: 'In an open primary, voters can participate regardless of their registered party affiliation.',
  },
  {
    id: 'q4',
    question: 'When is Inauguration Day?',
    options: ['November 5', 'December 17', 'January 6', 'January 20'],
    correct: 3,
    explanation: 'The 20th Amendment sets Inauguration Day on January 20th following the election.',
  },
  {
    id: 'q5',
    question: 'Which amendment gave 18-year-olds the right to vote?',
    options: ['15th', '19th', '24th', '26th'],
    correct: 3,
    explanation: 'The 26th Amendment, ratified in 1971, lowered the voting age from 21 to 18.',
  },
  {
    id: 'q6',
    question: 'Super Tuesday is significant because:',
    options: [
      'It is always held on the first Tuesday of the year',
      'The largest number of states hold primaries simultaneously',
      'It is when Electoral College votes are counted',
      'It is the final day of voter registration',
    ],
    correct: 1,
    explanation: 'Super Tuesday sees 15+ states all holding primaries on the same day, making it decisive.',
  },
];

export const STATS = [
  { value: '244M+', label: 'Eligible Voters in the U.S.' },
  { value: '50',    label: 'States + DC Participating' },
  { value: '538',   label: 'Total Electoral Votes' },
  { value: '270',   label: 'Votes Needed to Win' },
];
