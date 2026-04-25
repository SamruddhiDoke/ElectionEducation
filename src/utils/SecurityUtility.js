/**
 * SecurityUtility.js
 * Centralized security layer.
 * SECURITY: All text rendered to the DOM must pass through this class.
 * Prevents XSS by stripping HTML tags and dangerous characters.
 * No eval(), no dangerouslySetInnerHTML — ever.
 */

export class SecurityUtility {
  // Regex patterns compiled once as static — Optimized: avoids recompilation per call
  static #HTML_TAG_PATTERN    = /<[^>]*>/g;
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
   * Strips HTML tags and encodes dangerous characters.
   * Safe to render as React text nodes.
   * @param {any} input
   * @returns {string}
   */
  static sanitize(input) {
    if (input === null || input === undefined) return '';
    const str = String(input);
    return str
      .replace(SecurityUtility.#HTML_TAG_PATTERN, '')
      .replace(SecurityUtility.#SCRIPT_WORD_PATTERN, '')
      .replace(/[&<>"'/]/g, (ch) => SecurityUtility.#AMPERSAND_MAP[ch] ?? ch)
      .trim();
  }

  /**
   * sanitizeArray(arr)
   * Batch-sanitizes an array of strings.
   * @param {string[]} arr
   * @returns {string[]}
   */
  static sanitizeArray(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(SecurityUtility.sanitize);
  }

  /**
   * isValidEmail(email)
   * Validates email format without regex injection risk.
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const clean = SecurityUtility.sanitize(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
  }

  /**
   * truncate(str, maxLen)
   * Safely truncates a string to prevent UI overflow attacks.
   * @param {string} str
   * @param {number} maxLen
   * @returns {string}
   */
  static truncate(str, maxLen = 200) {
    const clean = SecurityUtility.sanitize(str);
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen) + '…';
  }
}
