/**
 * Navbar.jsx
 * Accessible top navigation with keyboard support and skip link.
 * WCAG: role="navigation", aria-label, keyboard-navigable links.
 * Optimized with React.memo: re-renders only when progress changes.
 */
import React, { memo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useElection } from '@context/ElectionContext';

const NAV_LINKS = [
  { to: '/',          label: 'Home'     },
  { to: '/learn',     label: 'Learn'    },
  { to: '/timeline',  label: 'Timeline' },
  { to: '/quiz',      label: 'Quiz'     },
  { to: '/about',     label: 'About'    },
];

const Navbar = memo(function Navbar() {
  const { progressPercent, completedCount, totalModules } = useElection();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Optimized with useCallback: prevents recreation on every render
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  return (
    <header className="sticky top-0 z-50">
      {/* WCAG: Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <nav
        role="navigation"
        aria-label="Primary navigation"
        className="glass-card rounded-none border-x-0 border-t-0 px-4 md:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-white hover:opacity-80 transition-opacity"
            aria-label="CivicPath Home"
          >
            <span className="text-2xl">🗳️</span>
            <span className="gradient-text">CivicPath</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  aria-current={pathname === to ? 'page' : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === to
                      ? 'bg-civic-600 text-white shadow-lg shadow-civic-600/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Progress pill */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-civic-900/50 border border-civic-700/40"
            aria-label={`Progress: ${completedCount} of ${totalModules} modules completed`}
            role="status"
          >
            <div className="w-20 progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
                aria-hidden="true"
              />
            </div>
            <span className="text-xs text-civic-300 font-semibold">
              {completedCount}/{totalModules}
            </span>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            type="button"
            role="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 pb-2 border-t border-white/10">
            <ul className="flex flex-col gap-1 mt-2 px-2" role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    aria-current={pathname === to ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === to
                        ? 'bg-civic-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
});

export default Navbar;
