/**
 * useIntersectionObserver.js
 * Reusable hook that detects when an element enters the viewport.
 * Used by the Timeline for scroll-triggered animations.
 * Optimized: single IntersectionObserver instance per element, cleaned up on unmount.
 */
import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Optimized: disconnect once visible — no need to keep observing after first trigger
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
