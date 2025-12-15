/**
 * String escaping utilities
 */

/**
 * Escape HTML special characters
 *
 * @param str - The string to escape
 * @returns The escaped string
 *
 * @example
 * ```ts
 * escapeHtml('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeHtml('& "quotes"') // '&amp; &quot;quotes&quot;'
 * ```
 */
export function escapeHtml(string_: string): string {
  const map: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&': '&amp;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '<': '&lt;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '>': '&gt;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '"': '&quot;',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "'": '&#39;',
  };
  return string_.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Unescape HTML entities
 *
 * @param str - The string to unescape
 * @returns The unescaped string
 *
 * @example
 * ```ts
 * unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 * unescapeHtml('&amp; &quot;quotes&quot;') // '& "quotes"'
 * ```
 */
export function unescapeHtml(string_: string): string {
  const map: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&amp;': '&',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&lt;': '<',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&gt;': '>',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&quot;': '"',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&#39;': "'",
  };
  return string_.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => map[entity] || entity);
}
