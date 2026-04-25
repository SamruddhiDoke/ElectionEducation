/**
 * App.jsx — Root application component.
 * Architecture:
 *   - ElectionProvider wraps all routes (global state via Context + Reducer)
 *   - React.lazy() enables route-based code-splitting for optimal bundle size
 *   - Suspense fallback provides accessible loading state
 *   - Notification renders outside routes to persist across navigation
 *
 * Optimized: lazy-loaded routes mean only the current page's JS is downloaded.
 * WCAG: <main> is inside each page, Navbar has skip-link, aria-live in Notification.
 */
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ElectionProvider } from '@context/ElectionContext';
import Navbar from '@components/Navbar';
import Notification from '@components/Notification';

// Optimized with React.lazy(): route-based code splitting — each page is a separate chunk
// Note: Rolldown (Vite 8) requires relative paths inside dynamic import() expressions
const HomePage         = lazy(() => import('./pages/HomePage'));
const LearnPage        = lazy(() => import('./pages/LearnPage'));
const ModuleDetailPage = lazy(() => import('./pages/ModuleDetailPage'));
const TimelinePage     = lazy(() => import('./pages/TimelinePage'));
const QuizPage         = lazy(() => import('./pages/QuizPage'));
const AboutPage        = lazy(() => import('./pages/AboutPage'));

// Accessible loading fallback
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-civic-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        <p className="text-gray-400 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}

function App() {
  return (
    // ElectionProvider at root: all children share global election state
    <ElectionProvider>
      <div className="min-h-screen bg-[var(--color-bg-primary)]">
        <Navbar />

        {/* Suspense wraps all lazy routes with an accessible fallback */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/learn"          element={<LearnPage />} />
            <Route path="/learn/:moduleId"element={<ModuleDetailPage />} />
            <Route path="/timeline"       element={<TimelinePage />} />
            <Route path="/quiz"           element={<QuizPage />} />
            <Route path="/about"          element={<AboutPage />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <main id="main-content" className="min-h-screen flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-6xl mb-4" aria-hidden="true">🗳️</p>
                  <h1 className="font-display text-3xl font-bold text-white mb-2">Page Not Found</h1>
                  <p className="mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="text-civic-400 hover:underline font-medium">← Return Home</a>
                </div>
              </main>
            } />
          </Routes>
        </Suspense>

        {/* aria-live notification region — persists across route changes */}
        <Notification />
      </div>
    </ElectionProvider>
  );
}

export default App;
