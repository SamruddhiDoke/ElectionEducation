/**
 * HomePage.jsx
 * Hero landing page with animated stats and module preview.
 * Optimized: uses useMemo for derived stats data, memo prevents extra renders.
 * WCAG: semantic <main>, <section>, <h1>, high-contrast text.
 */
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useElection } from '@context/ElectionContext';
import { STATS, MODULES } from '@data/electionData';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

const StatCard = memo(function StatCard({ stat, index }) {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`stat-card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="font-display text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</div>
      <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
    </div>
  );
});

const HomePage = memo(function HomePage() {
  const { progressPercent, completedCount, totalModules } = useElection();

  // Optimized with useMemo: module preview list sliced only when MODULES changes
  const previewModules = useMemo(() => MODULES.slice(0, 4), []);

  return (
    <main id="main-content" className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-bg relative overflow-hidden px-4 pt-20 pb-28 text-center"
        aria-labelledby="hero-headline"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-civic-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-civic-900/60 border border-civic-700/40 text-civic-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" aria-hidden="true" />
            Free Civic Education Platform
          </div>

          <h1
            id="hero-headline"
            className="font-display text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-slide-up"
          >
            Your Path to{' '}
            <span className="gradient-text">Informed Voting</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Master every step of the U.S. election process — from registration to Inauguration Day —
            through interactive modules, quizzes, and a real-time timeline.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
            <Link
              to="/learn"
              role="button"
              aria-label="Start your civic learning journey"
              className="px-8 py-4 bg-gradient-to-r from-civic-600 to-civic-500 text-white rounded-xl
                font-semibold text-lg shadow-xl shadow-civic-600/30 hover:scale-105 hover:shadow-2xl
                hover:shadow-civic-600/40 transition-all duration-200 active:scale-100"
            >
              🚀 Start Learning
            </Link>
            <Link
              to="/quiz"
              role="button"
              aria-label="Test your civic knowledge with a quiz"
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg
                border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200"
            >
              🧠 Take the Quiz
            </Link>
          </div>

          {/* Progress bar (if user has started) */}
          {completedCount > 0 && (
            <div
              className="mt-10 max-w-md mx-auto glass-card px-6 py-4 animate-fade-in"
              role="status"
              aria-label={`You have completed ${completedCount} of ${totalModules} modules`}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Your Progress</span>
                <span className="text-civic-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">{completedCount} of {totalModules} modules completed</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section aria-label="Key election statistics" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
          </div>
        </div>
      </section>

      {/* ===== MODULES PREVIEW ===== */}
      <section aria-labelledby="modules-heading" className="py-16 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="modules-heading" className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Your Learning Path
            </h2>
            <p className="text-gray-400 text-lg">Four essential modules. One complete civic education.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewModules.map((m) => (
              <div
                key={m.id}
                className={`glass-card p-5 border-t-2 ${m.borderColor} group hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-3" aria-hidden="true">{m.icon}</div>
                <h3 className="font-display font-bold text-white text-base mb-1">{m.title}</h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">{m.subtitle}</p>
                <span className="text-xs text-gray-500">⏱ {m.estimatedMinutes} min</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/learn"
              role="button"
              aria-label="View all learning modules"
              className="inline-flex items-center gap-2 px-6 py-3 bg-civic-700/40 hover:bg-civic-600/50
                text-civic-300 rounded-xl font-semibold transition-all duration-200 border border-civic-600/30"
            >
              View All Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-4 border-t border-white/5 text-center" role="contentinfo">
        <p className="text-gray-600 text-sm">
          © 2024 CivicPath. Built to empower voters and strengthen democracy.
        </p>
      </footer>
    </main>
  );
});

export default HomePage;
