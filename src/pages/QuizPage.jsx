/**
 * QuizPage.jsx
 * Full-page quiz wrapper.
 * WCAG: <main>, <h1>, aria-label region.
 */
import React, { memo } from 'react';
import QuizEngine from '@components/QuizEngine';

const QuizPage = memo(function QuizPage() {
  return (
    <main id="main-content" className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-3">
            Civic <span className="gradient-text">Knowledge Quiz</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Test what you've learned. 6 questions. Can you ace it?
          </p>
        </header>
        <QuizEngine />
      </div>
    </main>
  );
});

export default QuizPage;
