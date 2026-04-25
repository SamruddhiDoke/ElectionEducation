/**
 * TimelinePage.jsx
 * Full-page wrapper for the interactive Timeline component.
 * WCAG: <main>, <h1>, descriptive aria-label.
 */
import React, { memo } from 'react';
import Timeline from '@components/Timeline';

const TimelinePage = memo(function TimelinePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <header className="text-center mb-4">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Election <span className="gradient-text">Timeline</span>
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
            Scroll through every key date in the U.S. presidential election cycle.
          </p>
        </header>
      </div>
      <Timeline />
    </main>
  );
});

export default TimelinePage;
