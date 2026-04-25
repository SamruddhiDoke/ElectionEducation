/**
 * ModuleCard.jsx
 * Individual learning module card in the dynamic learning path.
 * Optimized with React.memo: re-renders only when its specific module data changes.
 * WCAG: role="article", aria-label with completion state, keyboard accessible.
 */
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useElection } from '@context/ElectionContext';

const ModuleCard = memo(function ModuleCard({ module }) {
  const { isCompleted, setActiveModule } = useElection();
  const navigate = useNavigate();
  const completed = isCompleted(module.id);

  // Optimized with useCallback: stable handler per module instance
  const handleOpen = useCallback(() => {
    setActiveModule(module.id);
    navigate(`/learn/${module.id}`);
  }, [module.id, setActiveModule, navigate]);

  return (
    <article
      className={`module-card glass-card p-6 flex flex-col gap-4 border-l-4 ${module.borderColor}
        ${completed ? 'opacity-100' : 'opacity-95'}`}
      aria-label={`Module ${module.order}: ${module.title}${completed ? ' — Completed' : ''}`}
      role="article"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl shadow-lg`}
            aria-hidden="true"
          >
            {module.icon}
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Module {module.order}
            </p>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{module.title}</h3>
          </div>
        </div>

        {/* Completion badge */}
        {completed && (
          <span
            className="shrink-0 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30"
            aria-label="Completed"
          >
            ✓ Done
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed">{module.description}</p>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>⏱ {module.estimatedMinutes} min</span>
        <span>·</span>
        <span>{module.keyPoints.length} key points</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        role="button"
        aria-label={`${completed ? 'Review' : 'Start'} ${module.title}`}
        onClick={handleOpen}
        className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
          ${completed
            ? 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 border border-emerald-500/30'
            : `bg-gradient-to-r ${module.color} text-white hover:shadow-lg hover:scale-[1.02] active:scale-100`
          }`}
      >
        {completed ? '🔄 Review Module' : '▶ Start Learning'}
      </button>
    </article>
  );
});

export default ModuleCard;
