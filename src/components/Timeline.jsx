/**
 * Timeline.jsx
 * Scroll-triggered SVG-based interactive election timeline.
 * Optimized: useIntersectionObserver fires only once per element (disconnect after visible).
 * WCAG: role="list", aria-label on timeline region, keyboard-focusable items.
 */
import React, { memo } from 'react';
import { TIMELINE_EVENTS } from '@data/electionData';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

// Sub-component: individual timeline entry — memoized to prevent list re-renders
const TimelineItem = memo(function TimelineItem({ event, index, isRight }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <li
      ref={ref}
      className={`relative flex items-start gap-4 md:gap-8 transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isRight ? 'md:flex-row-reverse' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Date badge */}
      <div className={`hidden md:flex w-24 shrink-0 justify-${isRight ? 'start' : 'end'}`}>
        <span className="text-xs font-bold text-civic-400 bg-civic-900/60 px-2 py-1 rounded-full border border-civic-700/40 whitespace-nowrap">
          {event.year}
        </span>
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl
            bg-gradient-to-br from-civic-700 to-civic-900 border-2 border-civic-500
            shadow-lg shadow-civic-600/30 hover:scale-110 transition-transform duration-200 z-10"
          aria-hidden="true"
        >
          {event.icon}
        </div>
      </div>

      {/* Content card */}
      <div
        tabIndex={0}
        className="glass-card p-4 flex-1 max-w-md group hover:border-civic-500/50 transition-all duration-300 cursor-pointer focus-visible:ring-2"
        aria-label={`${event.year}: ${event.label}`}
      >
        {/* Mobile date */}
        <span className="md:hidden text-xs font-bold text-civic-400">{event.year}</span>
        <h3 className="font-display font-semibold text-white text-sm md:text-base mt-0.5">{event.label}</h3>
        <p className="text-gray-400 text-xs md:text-sm mt-1 leading-relaxed">{event.detail}</p>
      </div>
    </li>
  );
});

const Timeline = memo(function Timeline() {
  return (
    <section aria-label="Election Year Timeline" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-3">
            Election Year Timeline
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A complete journey from campaign launch to Inauguration Day.
          </p>
        </header>

        {/* SVG vertical line (decorative) */}
        <div className="relative">
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-civic-500 via-civic-400 to-gold-500 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ul className="flex flex-col gap-8 pl-16 md:pl-0" role="list" aria-label="Timeline events">
            {TIMELINE_EVENTS.map((event, i) => (
              <TimelineItem
                key={event.label}
                event={event}
                index={i}
                isRight={i % 2 === 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Timeline;
