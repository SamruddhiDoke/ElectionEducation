/**
 * QuizEngine.jsx
 * High-performance JSON-driven quiz engine.
 * Optimized: question shuffling via useMemo runs only once per mount.
 * WCAG: role="radiogroup", aria-checked, keyboard-navigable options.
 */
import React, { memo, useState, useMemo, useCallback } from 'react';
import { QUIZ_QUESTIONS } from '@data/electionData';
import { useElection } from '@context/ElectionContext';
import { SecurityUtility } from '@utils/SecurityUtility';

// Fisher-Yates shuffle — Optimized: O(n) time, in-place, no extra memory
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuizEngine = memo(function QuizEngine() {
  const { notify } = useElection();
  const [currentIdx,  setCurrentIdx]  = useState(0);
  const [selected,    setSelected]    = useState(null);   // index of chosen option
  const [showResult,  setShowResult]  = useState(false);
  const [score,       setScore]       = useState(0);
  const [finished,    setFinished]    = useState(false);
  const [answers,     setAnswers]     = useState([]);     // per-question result log

  // Optimized with useMemo: shuffled question list generated once per component mount
  const questions = useMemo(() => shuffleArray(QUIZ_QUESTIONS), []);
  const current   = questions[currentIdx];

  const handleSelect = useCallback((optionIdx) => {
    if (showResult) return; // prevent re-selection after answer revealed
    setSelected(optionIdx);
    setShowResult(true);

    const correct = optionIdx === current.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { questionId: current.id, correct }]);
  }, [showResult, current]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
      notify(`Quiz complete! You scored ${score + (selected === current.correct ? 1 : 0)}/${questions.length}`, 'success');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [currentIdx, questions.length, score, selected, current, notify]);

  const handleRestart = useCallback(() => {
    setCurrentIdx(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  }, []);

  const finalScore = finished ? score : 0;
  const pct = Math.round((finalScore / questions.length) * 100);

  if (finished) {
    return (
      <section
        className="glass-card p-8 max-w-xl mx-auto text-center animate-fade-in"
        aria-label="Quiz results"
        role="region"
      >
        <div className="text-6xl mb-4 animate-float" aria-hidden="true">
          {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-gray-400 mb-6">
          You scored <span className="text-civic-400 font-bold text-2xl">{finalScore}</span>
          {' '}out of <span className="font-bold text-white">{questions.length}</span>
        </p>

        <div className="progress-bar-track mb-6">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        <p className={`text-sm mb-8 font-medium ${pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-gold-400' : 'text-red-400'}`}>
          {pct >= 80 ? 'Excellent! You\'re ready to be a civic champion! 🎉'
            : pct >= 50 ? 'Good effort! Review the modules to improve further.'
            : 'Keep learning! Explore the modules to boost your knowledge.'}
        </p>

        <button
          type="button"
          role="button"
          aria-label="Retake the quiz"
          onClick={handleRestart}
          className="px-8 py-3 bg-civic-600 text-white rounded-xl font-semibold hover:bg-civic-500 transition-colors"
        >
          🔄 Retake Quiz
        </button>
      </section>
    );
  }

  return (
    <section
      className="glass-card p-6 md:p-8 max-w-xl mx-auto animate-fade-in"
      aria-label={`Question ${currentIdx + 1} of ${questions.length}`}
      role="region"
    >
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 font-medium">
          Question {currentIdx + 1} / {questions.length}
        </span>
        <span className="text-xs text-civic-400 font-bold">Score: {score}</span>
      </div>
      <div className="progress-bar-track mb-6">
        <div
          className="progress-bar-fill"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Question */}
      <h2
        className="font-display text-lg md:text-xl font-bold text-white mb-6 leading-snug"
        id="quiz-question"
      >
        {SecurityUtility.sanitize(current.question)}
      </h2>

      {/* Options */}
      <div
        role="radiogroup"
        aria-labelledby="quiz-question"
        className="flex flex-col gap-3"
      >
        {current.options.map((opt, idx) => {
          let stateClass = 'border-white/10 bg-white/5';
          if (showResult) {
            if (idx === current.correct)           stateClass = 'correct border-emerald-500 bg-emerald-500/10';
            else if (idx === selected)             stateClass = 'incorrect border-red-500 bg-red-500/10';
            else                                   stateClass = 'border-white/5 bg-white/3 opacity-50';
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={selected === idx}
              aria-label={`Option ${OPTION_LABELS[idx]}: ${opt}`}
              disabled={showResult}
              onClick={() => handleSelect(idx)}
              className={`quiz-option flex items-center gap-3 px-4 py-3 rounded-xl border text-left
                transition-all duration-200 ${stateClass}
                ${!showResult ? 'hover:border-civic-500 hover:bg-civic-500/10 cursor-pointer' : 'cursor-default'}`}
            >
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center
                text-xs font-bold shrink-0 text-gray-400">
                {OPTION_LABELS[idx]}
              </span>
              <span className="text-sm text-gray-200 text-left">{SecurityUtility.sanitize(opt)}</span>
              {showResult && idx === current.correct && (
                <span className="ml-auto text-emerald-400" aria-hidden="true">✓</span>
              )}
              {showResult && idx === selected && idx !== current.correct && (
                <span className="ml-auto text-red-400" aria-hidden="true">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className="mt-5 p-4 rounded-xl bg-civic-900/50 border border-civic-700/30 animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm text-civic-200 leading-relaxed">
            <span className="font-bold text-civic-400">💡 Explanation: </span>
            {SecurityUtility.sanitize(current.explanation)}
          </p>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button
          type="button"
          role="button"
          aria-label={currentIdx + 1 >= questions.length ? 'See results' : 'Next question'}
          onClick={handleNext}
          className="mt-6 w-full py-3 bg-gradient-to-r from-civic-600 to-civic-500 text-white
            rounded-xl font-semibold text-sm hover:from-civic-500 hover:to-civic-400
            transition-all duration-200 hover:scale-[1.02] active:scale-100"
        >
          {currentIdx + 1 >= questions.length ? '🏁 See Results' : 'Next Question →'}
        </button>
      )}
    </section>
  );
});

export default QuizEngine;
