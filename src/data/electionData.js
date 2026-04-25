/**
 * @file electionData.js
 * @description JSON-driven data layer specific to Indian General Elections (Lok Sabha).
 * Enforces pure strict JS objects to enable perfect React memoization.
 * 
 * @typedef {Object} ElectionDate
 * @property {string} title
 * @property {string} date
 * @property {string} description
 * 
 * @typedef {Object} Module
 * @property {string} id
 * @property {number} order
 * @property {string} title
 * @property {string} subtitle
 * @property {string} icon
 * @property {string} color
 * @property {string} borderColor
 * @property {number} estimatedMinutes
 * @property {string} description
 * @property {string[]} keyPoints
 * @property {ElectionDate} electionDate
 * 
 * @typedef {Object} TimelineEvent
 * @property {string} year
 * @property {string} label
 * @property {string} icon
 * @property {string} detail
 * 
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correct
 * @property {string} explanation
 */

/** @type {Module[]} */
export const MODULES = [
  {
    id: 'registration',
    order: 1,
    title: 'Voter Registration (EPIC)',
    subtitle: 'Securing Your Electoral Photo Identity Card',
    icon: '📋',
    color: 'from-violet-600 to-indigo-600',
    borderColor: 'border-violet-500',
    estimatedMinutes: 8,
    description:
      'Learn how to register with the Election Commission of India (ECI), eligibility requirements under Article 326, and Form 6 filing.',
    keyPoints: [
      'Indian citizens aged 18+ as of the qualifying date are eligible.',
      'Form 6 is required for first-time voter enrollment.',
      'The National Voters Service Portal (NVSP) allows full online registration.',
      'Always verify your name in the final Electoral Roll before Polling Day.',
    ],
    electionDate: {
      title: 'Roll Modification Deadline Phase',
      date: '2024-03-15',
      description: 'Last date to process Form 6 registrations before the impending elections are called.',
    },
  },
  {
    id: 'mcc',
    order: 2,
    title: 'Model Code of Conduct',
    subtitle: 'Ensuring Free and Fair Elections',
    icon: '⚖️',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500',
    estimatedMinutes: 10,
    description:
      'Understand the regulatory guidelines issued by the ECI regulating political parties and candidates.',
    keyPoints: [
      'The MCC comes into force immediately when the election schedule is announced.',
      'It restricts incumbent governments from announcing new financial grants or schemes.',
      'It dictates conduct during campaigns to avoid communal or caste-based friction.',
      'Citizens can report violations directly via the cVIGIL application.',
    ],
    electionDate: {
      title: 'MCC Enforcement Date',
      date: '2024-03-16',
      description: 'The Election Commission strictly enacts the MCC nationwide.',
    },
  },
  {
    id: 'polling',
    order: 3,
    title: 'Polling Phases (Lok Sabha)',
    subtitle: 'The Democratic Process in Action',
    icon: '🗳️',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500',
    estimatedMinutes: 12,
    description:
      'Discover how multi-phase polling works across India utilizing Electronic Voting Machines (EVMs) and VVPATs.',
    keyPoints: [
      'India votes in multiple phases to facilitate large-scale security deployments.',
      'The country elects 543 Members of Parliament to the Lok Sabha.',
      'EVMs are matched comprehensively with VVPAT (Voter Verified Paper Audit Trail).',
      'Citizens can use NOTA (None of the Above) to formally register dissatisfaction.',
    ],
    electionDate: {
      title: 'First Phase Polling',
      date: '2024-04-19',
      description: 'Phase 1 of the multi-phase Lok Sabha scheduling kicks off.',
    },
  },
  {
    id: 'results',
    order: 4,
    title: 'Counting Day',
    subtitle: 'Forming the Government',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500',
    estimatedMinutes: 7,
    description:
      'Follow the post-election protocol from EVM unsealing to the official ECI counting guidelines leading up to the absolute majority requirement.',
    keyPoints: [
      'Counting happens simultaneously across all centers under heavy security.',
      'A party or coalition requires 272+ seats to establish a strict majority.',
      'The President invites the majority leader to officially form the Government.',
      'Post-election tribunals manage candidate disputes natively.',
    ],
    electionDate: {
      title: 'National Counting Day',
      date: '2024-06-04',
      description: 'The definitive sealing of political mandates.',
    },
  },
];

/** @type {TimelineEvent[]} */
export const TIMELINE_EVENTS = [
  { year: 'Early Mar', label: 'Summary Revision of Rolls', icon: '📝', detail: 'Voter lists finalized and distributed digitally by the Election Commission.' },
  { year: 'Mid Mar', label: 'Election Announcement', icon: '📢', detail: 'The Chief Election Commissioner sets national polling dates officially triggering the MCC.' },
  { year: 'Late Mar', label: 'Filing of Nominations', icon: '✍️', detail: 'Candidates submit strict legal affidavits outlining criminal records and financial assets.' },
  { year: 'Apr – May', label: 'Campaigning Blitz', icon: '🎙️', detail: 'Mass rallies, manifestos launched, and digital advertising peaks pan-India.' },
  { year: 'Apr 19', label: 'Phase 1 Polling', icon: '🗳️', detail: 'The extensive multi-phase voting procedure formally commences.' },
  { year: 'Jun 1', label: 'Final Phase Polling', icon: '✅', detail: 'The conclusion of voting across the remote sectors.' },
  { year: 'Jun 4', label: 'Counting Day 🇮🇳', icon: '📊', detail: 'Comprehensive EVM/VVPAT counting executing the exact public will.' },
  { year: 'Late Jun', label: 'New Lok Sabha Session', icon: '🏛️', detail: 'The elected Members take constitutional oaths officially inaugurating the new Parliament.' },
];

/** @type {QuizQuestion[]} */
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Under which Article of the Indian Constitution is universal adult suffrage guaranteed?',
    options: ['Article 324', 'Article 326', 'Article 370', 'Article 21'],
    correct: 1,
    explanation: 'Article 326 mandates elections to the House of the People and State Legislative Assemblies rely on universal adult suffrage (age 18+).',
  },
  {
    id: 'q2',
    question: 'What is the full form of VVPAT?',
    options: ['Voter Verified Paper Audit Trail', 'Voting Validation Paper Analysis Tool', 'Visual Verification Polling Audit Trail', 'Validated Voting Paper Analysis Tracker'],
    correct: 0,
    explanation: 'VVPAT stands for Voter Verified Paper Audit Trail, ensuring accountability by letting voters see a paper slip matching their EVM input.',
  },
  {
    id: 'q3',
    question: 'How many elected seats are present in the standard Lok Sabha?',
    options: ['250', '543', '545', '552'],
    correct: 1,
    explanation: 'Currently, the Lok Sabha consists of exactly 543 elected Members representing specific national constituencies.',
  },
  {
    id: 'q4',
    question: 'What happens explicitly when the Election Commission announces polling dates?',
    options: ['Parliament dissolves', 'The President resigns', 'The Model Code of Conduct comes into force immediately', 'Campaigning is legally suspended'],
    correct: 2,
    explanation: 'The Model Code of Conduct (MCC) kicks in the moment elections are officially announced prohibiting ruling parties from announcing new beneficial schemes.',
  },
  {
    id: 'q5',
    question: 'Which official app launched by the ECI allows citizens to secretly report MCC violations?',
    options: ['Voter Helpline', 'cVIGIL', 'Saksham-ECI', 'BoothAssist'],
    correct: 1,
    explanation: 'The cVIGIL application grants citizens the power to actively police campaigns, reporting code conduct violations like bribery instantly.',
  },
  {
    id: 'q6',
    question: 'What is NOTA?',
    options: ['National Organization for Tracking Assets', 'None Of The Above', 'Nominated Operator Tracking Application', 'Non-Official Territorial Agent'],
    correct: 1,
    explanation: 'NOTA (None Of The Above) formally records citizen discontent, serving as a legal alternative if no candidate is deemed worthy without spoiling a ballot check.',
  },
];

export const STATS = [
  { value: '968M+', label: 'Eligible Indian Voters' },
  { value: '1.05M', label: 'Polling Booths Created' },
  { value: '543',   label: 'Lok Sabha Constituencies' },
  { value: '7',     label: 'Voting Phases (2024)' },
];
