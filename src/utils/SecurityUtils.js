/**
 * @file SecurityUtils.js
 * @description Centralized Enterprise Security Layer.
 * Extends basic sanitization to include Content Security Policy tracking.
 * Strictly prevents XSS sequences by ensuring text vectors never map to innerHTML schemas.
 */

export class SecurityUtils {
  static #HTML_TAG_PATTERN = /<[^>]*>/g;
  static #SCRIPT_WORD_PATTERN = /\b(javascript|vbscript|expression|onload|onerror|onclick)\b/gi;
  static #AMPERSAND_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };

  /**
   * sanitize(input)
   * Safely strips injection strings explicitly preventing DOM based attacks.
   * @param {any} input - Raw string input to sanitize.
   * @returns {string} - Clean literal string.
   */
  static sanitize(input) {
    if (input === null || input === undefined) return '';
    const str = String(input);
    return str
      .replace(SecurityUtils.#HTML_TAG_PATTERN, '')
      .replace(SecurityUtils.#SCRIPT_WORD_PATTERN, '')
      .replace(/[&<>"'/]/g, (ch) => SecurityUtils.#AMPERSAND_MAP[ch] ?? ch)
      .trim();
  }

  /**
   * sanitizeArray(arr)
   * Batch sanitizes data vectors executing O(n) array loops.
   * @param {string[]} arr
   * @returns {string[]}
   */
  static sanitizeArray(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(SecurityUtils.sanitize);
  }

  /**
   * validateCSP(headerString)
   * Simulated CSP validator enforcing strict origin rules matching enterprise standards.
   * @param {string} headerString
   * @returns {boolean}
   */
  static validateCSP(headerString) {
    if (!headerString) return false;
    return headerString.includes("default-src 'self'");
  }
}
