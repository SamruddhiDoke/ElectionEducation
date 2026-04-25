/**
 * AboutPage.jsx
 * Mission, accessibility, and security transparency page.
 * WCAG: proper heading hierarchy, semantic <section> elements.
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🔒', title: 'Security First', desc: 'All text is sanitized via our SecurityUtils class. No eval(), no dangerouslySetInnerHTML. Ever.' },
  { icon: '♿', title: 'WCAG 2.1 Compliant', desc: 'Full keyboard navigation, aria-live regions, skip links, and high-contrast color tokens.' },
  { icon: '⚡', title: 'Performance Optimized', desc: 'React.memo, useMemo, useCallback, and route-based lazy loading ensure near-instant interactions.' },
  { icon: '📦', title: 'Zero Heavy Dependencies', desc: 'No Redux, no heavy UI libraries. Just React, Tailwind, and Vite — keeping bundle size minimal.' },
  { icon: '📅', title: 'Google Calendar Integration', desc: 'Add critical election dates to your personal calendar with a single click via the Google Calendar API.' },
  { icon: '💾', title: 'Local-First Progress', desc: 'Your learning progress is persisted in localStorage — private, no account required.' },
];

const AboutPage = memo(function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            About <span className="gradient-text">CivicPath</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            CivicPath is a free, open-source election education platform built to make democracy
            accessible to every eligible voter in the United States.
          </p>
        </header>

        {/* Mission */}
        <section aria-labelledby="mission-heading" className="glass-card p-8 mb-8">
          <h2 id="mission-heading" className="font-display text-2xl font-bold text-white mb-4">🏛️ Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            An informed electorate is the foundation of a healthy democracy. CivicPath was built
            to remove barriers to civic knowledge — no paywalls, no accounts required, just clear
            and engaging education for every potential voter.
          </p>
          <p className="text-gray-300 leading-relaxed">
            From understanding how to register, to tracking results on Election Night, CivicPath
            walks you through every step of the U.S. election process with interactive modules,
            a scrollable timeline, and a knowledge quiz.
          </p>
        </section>

        {/* Technical features */}
        <section aria-labelledby="features-heading" className="mb-8">
          <h2 id="features-heading" className="font-display text-2xl font-bold text-white mb-6 text-center">
            Security & Performance
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card p-5 flex gap-4 hover:-translate-y-1 transition-transform duration-200">
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-white text-base mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/learn"
            role="button"
            aria-label="Start the CivicPath learning journey"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-civic-600 to-civic-500
              text-white rounded-xl font-bold text-lg shadow-xl shadow-civic-600/30
              hover:scale-105 transition-all duration-200"
          >
            🚀 Start Your Civic Journey
          </Link>
        </div>
      </div>
    </main>
  );
});

export default AboutPage;
