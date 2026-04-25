/**
 * electionLogic.test.js
 * Vitest unit tests for core election data and utility logic.
 * Tests: SecurityUtility, MODULES structure, QUIZ_QUESTIONS integrity.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { SecurityUtility } from '../utils/SecurityUtility';
import { MODULES, QUIZ_QUESTIONS, TIMELINE_EVENTS, STATS } from '../data/electionData';

// ===== SecurityUtility Tests =====
describe('SecurityUtility', () => {
  describe('sanitize()', () => {
    it('removes HTML tags from input', () => {
      const result = SecurityUtility.sanitize('<script>alert("xss")</script>Hello');
      expect(result).not.toContain('<script>');
      expect(result).toContain('Hello');
    });

    it('encodes special characters', () => {
      const result = SecurityUtility.sanitize('<div class="test">');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('returns empty string for null input', () => {
      expect(SecurityUtility.sanitize(null)).toBe('');
      expect(SecurityUtility.sanitize(undefined)).toBe('');
    });

    it('handles non-string inputs gracefully', () => {
      expect(SecurityUtility.sanitize(42)).toBe('42');
      expect(SecurityUtility.sanitize(true)).toBe('true');
    });

    it('strips javascript: protocol attempts', () => {
      const result = SecurityUtility.sanitize('javascript:alert(1)');
      expect(result).not.toContain('javascript:');
    });
  });

  describe('sanitizeArray()', () => {
    it('sanitizes all elements in an array', () => {
      const arr = ['<b>Bold</b>', 'Normal', '<script>xss</script>'];
      const result = SecurityUtility.sanitizeArray(arr);
      expect(result.every((r) => !r.includes('<'))).toBe(true);
    });

    it('returns empty array for non-array input', () => {
      expect(SecurityUtility.sanitizeArray(null)).toEqual([]);
      expect(SecurityUtility.sanitizeArray('string')).toEqual([]);
    });
  });

  describe('truncate()', () => {
    it('truncates strings longer than maxLen', () => {
      const long = 'a'.repeat(300);
      const result = SecurityUtility.truncate(long, 200);
      expect(result.length).toBeLessThanOrEqual(201); // 200 + ellipsis
      expect(result.endsWith('…')).toBe(true);
    });

    it('does not truncate strings within maxLen', () => {
      const short = 'Hello World';
      expect(SecurityUtility.truncate(short, 200)).toBe('Hello World');
    });
  });

  describe('isValidEmail()', () => {
    it('validates correct email addresses', () => {
      expect(SecurityUtility.isValidEmail('user@example.com')).toBe(true);
      expect(SecurityUtility.isValidEmail('test.name+tag@domain.co')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(SecurityUtility.isValidEmail('notanemail')).toBe(false);
      expect(SecurityUtility.isValidEmail('@missing.com')).toBe(false);
      expect(SecurityUtility.isValidEmail('')).toBe(false);
    });
  });
});

// ===== MODULES Data Tests =====
describe('MODULES data structure', () => {
  it('contains exactly 4 modules', () => {
    expect(MODULES).toHaveLength(4);
  });

  it('each module has required fields', () => {
    MODULES.forEach((m) => {
      expect(m).toHaveProperty('id');
      expect(m).toHaveProperty('title');
      expect(m).toHaveProperty('description');
      expect(m).toHaveProperty('keyPoints');
      expect(m).toHaveProperty('order');
      expect(m).toHaveProperty('electionDate');
      expect(Array.isArray(m.keyPoints)).toBe(true);
    });
  });

  it('module orders are sequential starting from 1', () => {
    const orders = MODULES.map((m) => m.order);
    expect(orders).toEqual([1, 2, 3, 4]);
  });

  it('all module IDs are unique', () => {
    const ids = MODULES.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('electionDate has title, date, and description', () => {
    MODULES.forEach((m) => {
      expect(m.electionDate).toHaveProperty('title');
      expect(m.electionDate).toHaveProperty('date');
      expect(m.electionDate).toHaveProperty('description');
    });
  });
});

// ===== QUIZ_QUESTIONS Tests =====
describe('QUIZ_QUESTIONS data integrity', () => {
  it('contains 6 questions', () => {
    expect(QUIZ_QUESTIONS).toHaveLength(6);
  });

  it('each question has the correct shape', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correct');
      expect(q).toHaveProperty('explanation');
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
    });
  });

  it('correct answer index is within valid range', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
    });
  });

  it('all question IDs are unique', () => {
    const ids = QUIZ_QUESTIONS.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// ===== TIMELINE_EVENTS Tests =====
describe('TIMELINE_EVENTS', () => {
  it('has at least 8 events', () => {
    expect(TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(8);
  });

  it('each event has year, label, icon, and detail', () => {
    TIMELINE_EVENTS.forEach((e) => {
      expect(e).toHaveProperty('year');
      expect(e).toHaveProperty('label');
      expect(e).toHaveProperty('icon');
      expect(e).toHaveProperty('detail');
    });
  });
});

// ===== STATS Tests =====
describe('STATS', () => {
  it('contains 4 stat entries', () => {
    expect(STATS).toHaveLength(4);
  });

  it('each stat has value and label', () => {
    STATS.forEach((s) => {
      expect(s).toHaveProperty('value');
      expect(s).toHaveProperty('label');
    });
  });
});
