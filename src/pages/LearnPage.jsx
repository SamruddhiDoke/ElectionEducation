import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useElection } from '@context/ElectionContext';
import { MODULES } from '@data/electionData';
import ModuleCard from '@components/ModuleCard';
import { BoothLocator } from '@components/BoothLocator';
import { useCivicAssistant } from '@hooks/useCivicAssistant';

const LearnPage = memo(function LearnPage() {
  const { completedCount, totalModules, progressPercent } = useElection();
  const { t } = useTranslation();
  const { response: aiResponse, loading: aiLoading, askAssistant } = useCivicAssistant();

  const statusMessage = useMemo(() => {
    if (completedCount === 0) return 'Start with Module 1 — Voter Registration!';
    if (completedCount === totalModules) return '🎉 You\'ve completed all modules. Take the quiz!';
    return `${totalModules - completedCount} module${totalModules - completedCount > 1 ? 's' : ''} remaining. Keep going!`;
  }, [completedCount, totalModules]);

  return (
    <main id="main-content" className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            Your <span className="gradient-text">Learning Path</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Complete all {totalModules} modules to become a fully informed voter in the Indian democratic process.
          </p>
        </header>

        {/* AI Assistant Section */}
        <section aria-label="Vertex AI Civic Assistant" className="glass-card p-6 mb-12 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="font-display font-bold text-white text-xl mb-4">🤖 {t('nav.assistant')}</h2>
            <p className="text-gray-300 text-sm mb-4 text-center">Powered by Google Vertex AI. Ask any question regarding electoral rights.</p>
            <div className="flex w-full gap-2 mb-4">
                <button disabled={aiLoading} onClick={() => askAssistant('What is the minimum voting age under Article 326?')} className="flex-1 bg-civic-700/50 hover:bg-civic-600 border border-civic-500 rounded p-3 text-sm text-white transition-all">
                   Test Query: "Voting Age Rules"
                </button>
            </div>
            {aiLoading && <div className="text-civic-400 animate-pulse text-sm font-bold">Querying GCP Inference Engine...</div>}
            {aiResponse && (
                <div className="w-full bg-black/40 border-l-4 border-emerald-500 p-4 rounded text-emerald-200 text-sm leading-relaxed">
                   {aiResponse}
                </div>
            )}
        </section>

        {/* Overall progress */}
        <section aria-label="Overall learning progress" className="glass-card p-6 mb-12 max-w-2xl mx-auto border border-civic-700/50 relative overflow-hidden" role="status" aria-live="polite">
            <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-500 font-mono">ARIA-LIVE ENABLED</div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">{t('progress')}</span>
            <span className="text-civic-400 font-bold text-lg">{progressPercent}%</span>
          </div>
          <div className="progress-bar-track mb-3">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-gray-400">{statusMessage}</p>
        </section>

        <BoothLocator />

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6 mt-8" role="list" aria-label="Learning modules">
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
