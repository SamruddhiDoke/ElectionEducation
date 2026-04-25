# 🗳️ CivicPath — Election Education Platform

> **Your definitive, interactive guide to the U.S. election process.**  
> Built for learners. Optimized for performance. Accessible for everyone.

[![Deploy Status](https://img.shields.io/badge/Cloud%20Run-Deployed-4f46e5?logo=googlecloud)](https://civicpath.run.app)
[![WCAG 2.1](https://img.shields.io/badge/WCAG-2.1%20AA-10b981)](https://www.w3.org/TR/WCAG21/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18%2B-61dafb?logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-f59e0b)](LICENSE)

---

## 📸 Features

| Feature | Description |
|---|---|
| **Dynamic Learning Path** | 4 modular lessons: Registration → Primaries → General → Results |
| **Voter Eligibility Quiz** | 6-question shuffled JSON-driven quiz engine with scoring & explanations |
| **Interactive Timeline** | Scroll-triggered, alternating SVG timeline covering the full election cycle |
| **Real-Time Progress** | `localStorage`-persisted module completion with visual progress bar |
| **Google Calendar** | Add key election dates directly to your Google Calendar (with URL fallback) |
| **Fully Accessible** | WCAG 2.1 AA — keyboard nav, `aria-live`, skip links, high-contrast tokens |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/civicpath.git
cd civicpath

# 2. Install dependencies
npm install

# 3. (Optional) Configure Google Calendar API
cp .env.example .env
# Edit .env with your Google API Key and OAuth Client ID

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📁 Project Structure

```
civicpath/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable, memoized UI components
│   │   ├── Navbar.jsx           # Sticky nav with mobile hamburger + progress pill
│   │   ├── Notification.jsx     # aria-live toast notification
│   │   ├── Timeline.jsx         # Scroll-triggered alternating timeline
│   │   ├── ModuleCard.jsx       # Learning module card
│   │   └── QuizEngine.jsx       # Full quiz engine with scoring
│   ├── context/
│   │   └── ElectionContext.jsx  # useContext + useReducer global state
│   ├── data/
│   │   └── electionData.js      # JSON-driven data (modules, quiz, timeline, stats)
│   ├── hooks/
│   │   ├── useProgress.js       # localStorage persistence hook
│   │   └── useIntersectionObserver.js  # Scroll-trigger hook
│   ├── pages/                   # Lazy-loaded route pages
│   │   ├── HomePage.jsx
│   │   ├── LearnPage.jsx
│   │   ├── ModuleDetailPage.jsx
│   │   ├── TimelinePage.jsx
│   │   ├── QuizPage.jsx
│   │   └── AboutPage.jsx
│   ├── services/
│   │   └── GoogleCalendarService.js    # Google Calendar API + URL fallback
│   ├── test/
│   │   ├── setup.js
│   │   └── electionLogic.test.js       # Vitest unit tests
│   ├── utils/
│   │   └── SecurityUtility.js          # XSS sanitization class
│   ├── App.jsx                  # Root: lazy routes + ElectionProvider + Suspense
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + custom design tokens
├── Dockerfile                   # Multi-stage: Node builder + nginx:alpine
├── nginx.conf                   # SPA routing + gzip + CSP headers
├── vite.config.js               # Aliases, chunking, Vitest config
├── tailwind.config.js           # Custom civic palette + animations
└── .gitignore                   # Excludes node_modules (keeps repo < 10MB)
```

---

## 🛡️ Security & Performance

### Security

| Measure | Implementation |
|---|---|
| **XSS Prevention** | `SecurityUtility.sanitize()` strips all HTML tags and encodes special chars on every text render |
| **No `eval()`** | Never used anywhere in the codebase |
| **No `dangerouslySetInnerHTML`** | Completely absent — all content is rendered as React text nodes |
| **Content Security Policy** | nginx sends strict `script-src`, `connect-src`, `font-src` CSP headers |
| **Security Headers** | `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy` |
| **Absolute Imports** | Vite aliases (`@components`, `@services`, etc.) prevent path traversal confusion |
| **No Secrets in Bundle** | Google API keys loaded from environment variables, never hardcoded |

### Performance

| Optimization | Details |
|---|---|
| **React.lazy()** | All 6 route pages are lazy-loaded — only the current page's JS is downloaded |
| **React.memo** | Every component is wrapped in `memo()` — prevents re-renders on unrelated state changes |
| **useMemo** | Expensive derivations (module lookup, progress %, stats) are memoized with dependency arrays |
| **useCallback** | All event handlers use `useCallback` with correct deps — stable references for child props |
| **useReducer** | Single pure reducer for global state — predictable, testable, zero side effects |
| **Manual Chunking** | Vite separates `vendor` (React) and `router` chunks for optimal browser caching |
| **IntersectionObserver** | Timeline animations fire once on scroll — observer disconnects after first trigger |
| **Gzip (nginx)** | All text assets compressed — typical React app: 30-70% size reduction |
| **Immutable Cache Headers** | Vite-hashed filenames + `Cache-Control: immutable` = instant repeat visits |
| **Zero heavy libs** | No Redux, Framer Motion, or heavy UI kits — pure React + Tailwind |

---

## 🧪 Testing

```bash
# Run all tests once
npm test

# Watch mode for TDD
npm run test:watch
```

Tests cover:
- `SecurityUtility` — sanitize, truncate, email validation, XSS edge cases
- `MODULES` — structure, uniqueness, sequential ordering, electionDate shape
- `QUIZ_QUESTIONS` — correct answer range, ID uniqueness, option count
- `TIMELINE_EVENTS` — minimum event count, required field presence
- `STATS` — value/label presence

---

## 📅 Google Calendar Integration

CivicPath supports adding election dates to Google Calendar via two modes:

**Mode 1 — API Mode** (with keys): Full OAuth 2.0 flow; event added directly to the user's primary calendar with email + popup reminders.

**Mode 2 — URL Fallback** (no keys needed): Opens a pre-filled `calendar.google.com` URL in a new tab. Works out of the box — no API key required.

To enable Mode 1, create a project at [console.cloud.google.com](https://console.cloud.google.com), enable the Google Calendar API, create OAuth credentials, and add them to your `.env`:

```env
VITE_GOOGLE_API_KEY=AIza...
VITE_GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
```

---

## 🐳 Docker & Cloud Run Deployment

```bash
# Build production Docker image
docker build -t civicpath .

# Test locally
docker run -p 8080:8080 civicpath

# Deploy to Google Cloud Run
gcloud run deploy civicpath \
  --source . \
  --project electioneducation \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Skip Navigation**: `<a href="#main-content">` skip link on every page
- **Semantic HTML**: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`
- **aria-live regions**: Dynamic quiz feedback, notifications, and progress updates
- **Keyboard Nav**: All interactive elements accessible via Tab/Enter/Space; focus-visible ring
- **Heading Hierarchy**: Single `<h1>` per page; proper `h2`, `h3` nesting
- **High Contrast**: CSS custom properties tuned for ≥4.5:1 contrast ratio
- **ARIA Labels**: All buttons, nav, quiz options labeled with descriptive `aria-label`
- **role attributes**: `role="button"`, `role="navigation"`, `role="status"`, `role="radiogroup"`

---

## 📜 License

MIT — free for educational and civic-tech use. Please vote! 🗳️
