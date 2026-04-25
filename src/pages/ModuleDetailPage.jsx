/**
 * ModuleDetailPage.jsx
 * Deep-dive learning page for a single election module.
 * Features: key points, Google Calendar integration, completion tracking.
 * WCAG: aria-label, role="article", focus management on load.
 * Optimized: module looked up via useMemo only when URL param changes.
 */
import React, { memo, useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MODULES } from '@data/electionData';
import { useElection } from '@context/ElectionContext';
import { addEventToCalendar } from '@services/GoogleCalendarService';
import { SecurityUtils } from '@utils/SecurityUtils';

const ModuleDetailPage = memo(function ModuleDetailPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, completeModule, notify } = useElection();
  const [calLoading, setCalLoading] = useState(false);

  // Optimized with useMemo: find operation runs only when moduleId changes
  const module = useMemo(() => MODULES.find((m) => m.id === moduleId), [moduleId]);
  const completed = module ? isCompleted(module.id) : false;
  const moduleIdx = module ? MODULES.findIndex((m) => m.id === moduleId) : -1;
  const nextModule = MODULES[moduleIdx + 1] ?? null;

  const handleComplete = useCallback(() => {
    if (!module) return;
    completeModule(module.id);
    notify(`✅ "${module.title}" marked as complete!`, 'success');
    if (nextModule) {
      setTimeout(() => navigate(`/learn/${nextModule.id}`), 800);
    } else {
      setTimeout(() => navigate('/quiz'), 800);
    }
  }, [module, completeModule, notify, nextModule, navigate]);

  const handleAddToCalendar = useCallback(async () => {
    if (!module?.electionDate) return;
    setCalLoading(true);
    const result = await addEventToCalendar(module.electionDate);
    notify(result.message, result.success ? 'success' : 'error');
    setCalLoading(false);
  }, [module, notify]);

  if (!module) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Module not found.</p>
          <Link to="/learn" className="text-civic-400 hover:underline">← Back to Learning Path</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link to="/learn" className="hover:text-civic-400 transition-colors">Learning Path</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-gray-300 font-medium">{module.title}</li>
          </ol>
        </nav>

        {/* Module header */}
        <article aria-label={`Module: ${module.title}`}>
          <header className="glass-card p-8 mb-8">
            <div className="flex items-start gap-5">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl shadow-xl shrink-0`}
                aria-hidden="true"
              >
                {module.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1">
                  Module {module.order} of {MODULES.length}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {SecurityUtils.sanitize(module.title)}
                </h1>
                <p className="text-civic-300 font-medium mt-1">{SecurityUtils.sanitize(module.subtitle)}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  <span>⏱ ~{module.estimatedMinutes} minutes</span>
                  {completed && (
                    <span className="text-emerald-400 font-semibold">✓ Completed</span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Description */}
          <section aria-label="Module overview" className="glass-card p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-base">
              {SecurityUtils.sanitize(module.description)}
            </p>
          </section>

          {/* Key Points */}
          <section aria-label="Key points" className="glass-card p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-white mb-4">
              📌 Key Points
            </h2>
            <ul className="flex flex-col gap-3" role="list">
              {module.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center text-white text-xs font-bold`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {SecurityUtils.sanitize(point)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Google Calendar CTA */}
          {module.electionDate && (
            <section aria-label="Add election date to calendar" className="glass-card p-6 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl" aria-hidden="true">📅</span>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-white text-base mb-1">
                    {SecurityUtils.sanitize(module.electionDate.title)}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {SecurityUtils.sanitize(module.electionDate.description)}
                  </p>
                  <button
                    type="button"
                    role="button"
                    aria-label={`Add ${module.electionDate.title} to Google Calendar`}
                    onClick={handleAddToCalendar}
                    disabled={calLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20
                      text-white rounded-lg font-medium text-sm border border-white/20
                      transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {calLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        Adding…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Add to Google Calendar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {!completed ? (
              <button
                type="button"
                role="button"
                aria-label={`Mark ${module.title} as complete`}
                onClick={handleComplete}
                className={`flex-1 py-4 bg-gradient-to-r ${module.color} text-white rounded-xl
                  font-bold text-base shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200`}
              >
                ✅ Mark as Complete {nextModule ? `& Continue →` : '— Take the Quiz!'}
              </button>
            ) : (
              <div className="flex-1 py-4 bg-emerald-600/20 text-emerald-400 rounded-xl
                font-bold text-base text-center border border-emerald-500/30">
                ✓ Module Complete!
              </div>
            )}
            <Link
              to="/learn"
              className="px-6 py-4 glass-card text-gray-300 rounded-xl font-semibold text-sm
                hover:text-white hover:border-civic-500/50 transition-all duration-200 flex items-center"
              aria-label="Return to all modules"
            >
              ← Back
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
});

export default ModuleDetailPage;
