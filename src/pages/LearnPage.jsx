/**
 * LearnPage.jsx
 * Renders the full dynamic learning path grid.
 * Optimized with React.memo and useMemo to avoid re-renders on unrelated state changes.
 * WCAG: <main>, <h1>, role="list", aria-live for status announcements.
 */
import React, { memo, useMemo } from 'react';
import { useElection } from '@context/ElectionContext';
import { MODULES } from '@data/electionData';
import ModuleCard from '@components/ModuleCard';

const LearnPage = memo(function LearnPage() {
  const { completedCount, totalModules, progressPercent } = useElection();

  // Optimized with useMemo: tooltip message only recomputes when completion changes
  const statusMessage = useMemo(() => {
    if (completedCount === 0) return 'Start with Module 1 — Voter Registration!';
    if (completedCount === totalModules) return '🎉 You\'ve completed all modules. Take the quiz!';
    return `${totalModules - completedCount} module${totalModules - completedCount > 1 ? 's' : ''} remaining. Keep going!`;
  }, [completedCount, totalModules]);

  return (
    <main id="main-content" className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            Your <span className="gradient-text">Learning Path</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Complete all four modules to become a fully informed voter.
          </p>
        </header>

        {/* Overall progress */}
        <section
          aria-label="Overall learning progress"
          className="glass-card p-6 mb-12 max-w-2xl mx-auto"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Overall Progress</span>
            <span className="text-civic-400 font-bold text-lg">{progressPercent}%</span>
          </div>
          <div className="progress-bar-track mb-3">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-gray-400">{statusMessage}</p>
        </section>

        {/* Module Grid */}
        <div
          className="grid md:grid-cols-2 xl:grid-cols-2 gap-6"
          role="list"
          aria-label="Learning modules"
        >
          {MODULES.map((mod) => (
            <div key={mod.id} role="listitem">
              <ModuleCard module={mod} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
});

export default LearnPage;
