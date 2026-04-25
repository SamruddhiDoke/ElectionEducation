/**
 * useProgress.js — Custom hook for localStorage-persisted progress tracking.
 * Optimized: single localStorage read on mount; subsequent reads avoided via state.
 */
import { useState, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'civicpath_progress_v1';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    // Corrupted storage — return clean state
    return {};
  }
}

function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage quota exceeded — silently fail to avoid crashing the app
    console.warn('[CivicPath] localStorage write failed.');
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(readStorage);

  // Optimized with useCallback: stable reference prevents child re-renders
  const completeModule = useCallback((moduleId) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [moduleId]: { completed: true, completedAt: new Date().toISOString() },
      };
      writeStorage(updated);
      return updated;
    });
  }, []);

  // Optimized with useCallback: memoized reset avoids recreation each render
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }, []);

  // Optimized with useMemo: computed completedCount only recalculates when progress changes
  const completedCount = useMemo(
    () => Object.values(progress).filter((v) => v?.completed).length,
    [progress]
  );

  const isCompleted = useCallback(
    (moduleId) => Boolean(progress[moduleId]?.completed),
    [progress]
  );

  return { progress, completeModule, resetProgress, completedCount, isCompleted };
}
