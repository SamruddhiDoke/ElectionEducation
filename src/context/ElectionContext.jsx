/**
 * ElectionContext.jsx
 * Global state management using useContext + useReducer.
 * Optimized: avoids Redux/Zustand — zero external state libraries.
 * WCAG: aria-live updates are triggered via the notification state.
 */
import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { MODULES } from '@data/electionData';
import { useProgress } from '@hooks/useProgress';

// ===== ACTION TYPES =====
const ACTIONS = {
  SET_ACTIVE_MODULE: 'SET_ACTIVE_MODULE',
  SET_NOTIFICATION:  'SET_NOTIFICATION',
  CLEAR_NOTIFICATION:'CLEAR_NOTIFICATION',
  SET_QUIZ_ACTIVE:   'SET_QUIZ_ACTIVE',
};

// ===== INITIAL STATE =====
const initialState = {
  activeModuleId:  null,
  notification:    null,   // { message, type: 'success'|'error'|'info' }
  isQuizActive:    false,
};

// ===== PURE REDUCER =====
// Optimized: pure function — deterministic, no side effects, easy to test
function electionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_MODULE:
      return { ...state, activeModuleId: action.payload };
    case ACTIONS.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case ACTIONS.CLEAR_NOTIFICATION:
      return { ...state, notification: null };
    case ACTIONS.SET_QUIZ_ACTIVE:
      return { ...state, isQuizActive: action.payload };
    default:
      return state;
  }
}

// ===== CONTEXT =====
const ElectionContext = createContext(null);

// ===== PROVIDER =====
export function ElectionProvider({ children }) {
  const [state,    dispatch]  = useReducer(electionReducer, initialState);
  const { progress, completeModule, resetProgress, completedCount, isCompleted } = useProgress();

  // Optimized with useCallback: stable action dispatchers prevent child prop churn
  const setActiveModule = useCallback((id) =>
    dispatch({ type: ACTIONS.SET_ACTIVE_MODULE, payload: id }), []);

  const notify = useCallback((message, type = 'info') => {
    dispatch({ type: ACTIONS.SET_NOTIFICATION, payload: { message, type } });
    setTimeout(() => dispatch({ type: ACTIONS.CLEAR_NOTIFICATION }), 4000);
  }, []);

  const setQuizActive = useCallback((val) =>
    dispatch({ type: ACTIONS.SET_QUIZ_ACTIVE, payload: val }), []);

  // Optimized with useMemo: active module object derived only when IDs change
  const activeModule = useMemo(
    () => MODULES.find((m) => m.id === state.activeModuleId) ?? null,
    [state.activeModuleId]
  );

  // Optimized with useMemo: overall progress percentage recalculated only when count changes
  const progressPercent = useMemo(
    () => Math.round((completedCount / MODULES.length) * 100),
    [completedCount]
  );

  const value = useMemo(() => ({
    ...state,
    activeModule,
    progress,
    progressPercent,
    completedCount,
    totalModules: MODULES.length,
    isCompleted,
    setActiveModule,
    completeModule,
    resetProgress,
    notify,
    setQuizActive,
  }), [
    state, activeModule, progress, progressPercent,
    completedCount, isCompleted, setActiveModule,
    completeModule, resetProgress, notify, setQuizActive,
  ]);

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
}

// ===== CONSUMER HOOK =====
export function useElection() {
  const ctx = useContext(ElectionContext);
  if (!ctx) throw new Error('useElection must be used inside <ElectionProvider>');
  return ctx;
}
