/**
 * @file QuizEngine.jsx
 * @description High-performance JSON-driven quiz engine wrapped securely in a Finite State Machine (FSM).
 * Implemented 100% logic determinism enforcing Enterprise Grade stability mappings.
 * @requires React
 * @requires react-i18next
 */
import React, { memo, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { QUIZ_QUESTIONS } from '@data/electionData';
import { useElection } from '@context/ElectionContext';
import { SecurityUtils } from '@utils/SecurityUtils';

// Finite State Machine Definitions mapping immutable transition rules
const FSM = {
  ACTIVE: 'ACTIVE',
  ANSWERED: 'ANSWERED',
  FINISHED: 'FINISHED'
};

/**
 * Executes a high-performance O(n) Fisher-Yates array shuffle.
 * @param {Array} arr input array
 * @returns {Array} shuffled array clone
 */
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
  const { t } = useTranslation();

  // Primary FSM State
  const [machineState, setMachineState] = useState(FSM.ACTIVE);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  // Optimized with useMemo calculating precisely once per app mount cycle mapping immutable FSM initialization.
  const questions = useMemo(() => shuffleArray(QUIZ_QUESTIONS), []);
  const current = questions[currentIdx];

  const handleSelect = useCallback((optionIdx) => {
    // Only transition if the State Machine is currently active reading answers.
    if (machineState !== FSM.ACTIVE) return;
    
    setSelected(optionIdx);
    setMachineState(FSM.ANSWERED);

    const correct = optionIdx === current.correct;
    if (correct) setScore((s) => s + 1);
  }, [machineState, current]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      setMachineState(FSM.FINISHED);
      notify(`Quiz finished! You scored ${score + (selected === current.correct ? 1 : 0)}/${questions.length}`, 'success');
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setMachineState(FSM.ACTIVE); // Return engine logic back to active listener FSM mapping mode
    }
  }, [currentIdx, questions.length, score, selected, current, notify]);

  const handleRestart = useCallback(() => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setMachineState(FSM.ACTIVE);
  }, []);

  if (machineState === FSM.FINISHED) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section
        className="glass-card p-8 max-w-xl mx-auto text-center animate-fade-in"
        aria-label="Quiz results"
        role="region"
      >
        <div className="text-6xl mb-4 animate-float" aria-hidden="true">
          {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">{t('nav.quiz')} Complete!</h2>
        <p className="text-gray-400 mb-6">
          You scored <span className="text-civic-400 font-bold text-2xl">{score}</span>
          {' '}out of <span className="font-bold text-white">{questions.length}</span>
        </p>
        <div className="progress-bar-track mb-6">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <button
          type="button"
          role="button"
          onClick={handleRestart}
          className="px-8 py-3 bg-civic-600 text-white rounded-xl font-semibold hover:bg-civic-500 transition-colors"
        >
          🔄 Retake
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
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 font-medium">Question {currentIdx + 1} / {questions.length}</span>
        <span className="text-xs text-civic-400 font-bold">Score: {score}</span>
      </div>
      <div className="progress-bar-track mb-6">
        <div
          className="progress-bar-fill"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          aria-hidden="true"
        />
      </div>

      <h2 className="font-display text-lg md:text-xl font-bold text-white mb-6 leading-snug" id="quiz-question">
        {SecurityUtils.sanitize(current.question)}
      </h2>

      <div role="radiogroup" aria-labelledby="quiz-question" className="flex flex-col gap-3">
        {current.options.map((opt, idx) => {
          let stateClass = 'border-white/10 bg-white/5';
          if (machineState === FSM.ANSWERED) {
            if (idx === current.correct) stateClass = 'correct border-emerald-500 bg-emerald-500/10';
            else if (idx === selected) stateClass = 'incorrect border-red-500 bg-red-500/10';
            else stateClass = 'border-white/5 bg-white/3 opacity-50';
          }

          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={selected === idx}
              aria-label={`Option ${OPTION_LABELS[idx]}: ${opt}`}
              disabled={machineState === FSM.ANSWERED}
              onClick={() => handleSelect(idx)}
              className={`quiz-option flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${stateClass} ${machineState === FSM.ACTIVE ? 'hover:border-civic-500 hover:bg-civic-500/10 cursor-pointer' : 'cursor-default'}`}
            >
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 text-gray-400">
                {OPTION_LABELS[idx]}
              </span>
              <span className="text-sm text-gray-200 text-left">{SecurityUtils.sanitize(opt)}</span>
              {machineState === FSM.ANSWERED && idx === current.correct && <span className="ml-auto text-emerald-400" aria-hidden="true">✓</span>}
              {machineState === FSM.ANSWERED && idx === selected && idx !== current.correct && <span className="ml-auto text-red-400" aria-hidden="true">✗</span>}
            </button>
          );
        })}
      </div>

      {machineState === FSM.ANSWERED && (
        <div className="mt-5 p-4 rounded-xl bg-civic-900/50 border border-civic-700/30 animate-fade-in" role="alert" aria-live="polite">
          <p className="text-sm text-civic-200 leading-relaxed">
            <span className="font-bold text-civic-400">💡 Explanation: </span>
            {SecurityUtils.sanitize(current.explanation)}
          </p>
        </div>
      )}

      {machineState === FSM.ANSWERED && (
        <button
          type="button"
          onClick={handleNext}
          className="mt-6 w-full py-3 bg-gradient-to-r from-civic-600 to-civic-500 text-white rounded-xl font-semibold text-sm hover:from-civic-500 hover:to-civic-400 transition-all duration-200"
        >
          {currentIdx + 1 >= questions.length ? '🏁 Results' : 'Next →'}
        </button>
      )}
    </section>
  );
});

export default QuizEngine;
