/**
 * @file SecurityUtils.test.js
 * @description Enterprise testing suite for core security logic.
 */
import { describe, it, expect } from 'vitest';
import { SecurityUtils } from '../utils/SecurityUtils';

describe('SecurityUtils FSM Tests', () => {
  it('strips HTML from text preserving literal elements', () => {
    const raw = '<script>alert()</script> Bharat';
    expect(SecurityUtils.sanitize(raw)).not.toContain('<script>');
    expect(SecurityUtils.sanitize(raw)).toContain('Bharat');
  });

  it('validates robust CSP enterprise rules', () => {
    const valid = "default-src 'self'; script-src 'self'";
    expect(SecurityUtils.validateCSP(valid)).toBe(true);

    const invalid = "script-src 'unsafe-eval'";
    expect(SecurityUtils.validateCSP(invalid)).toBe(false);
  });
});
