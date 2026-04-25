/**
 * Notification.jsx
 * WCAG: aria-live="polite" region announces dynamic updates to screen readers.
 * Optimized with React.memo: only re-renders when notification state changes.
 */
import React, { memo } from 'react';
import { useElection } from '@context/ElectionContext';

const TYPE_STYLES = {
  success: 'border-emerald-500 bg-emerald-500/15 text-emerald-300',
  error:   'border-red-500 bg-red-500/15 text-red-300',
  info:    'border-civic-500 bg-civic-500/15 text-civic-300',
};

const TYPE_ICONS = {
  success: '✅',
  error:   '❌',
  info:    'ℹ️',
};

const Notification = memo(function Notification() {
  const { notification } = useElection();

  return (
    /* WCAG: aria-live="polite" ensures screen readers announce this without interrupting */
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      className="fixed bottom-6 right-6 z-50 max-w-sm"
    >
      {notification && (
        <div
          className={`flex items-start gap-3 px-4 py-3 rounded-xl border glass-card shadow-xl
            animate-slide-up ${TYPE_STYLES[notification.type] ?? TYPE_STYLES.info}`}
        >
          <span aria-hidden="true" className="text-lg leading-none mt-0.5">
            {TYPE_ICONS[notification.type] ?? TYPE_ICONS.info}
          </span>
          <p className="text-sm font-medium leading-snug">{notification.message}</p>
        </div>
      )}
    </div>
  );
});

export default Notification;
