/**
 * Date utility functions
 */

/**
 * Format a date to a string
 *
 * @param date - The date to format
 * @param format - Format string or Intl options (default: ISO string)
 * @param locale - Locale for Intl formatting (default: 'en-US')
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date(2024, 0, 1), 'YYYY-MM-DD') // '2024-01-01'
 * formatDate(new Date(2024, 0, 1), { dateStyle: 'full' }, 'en-US') // 'Monday, January 1, 2024'
 * formatDate(new Date(2024, 0, 1), { dateStyle: 'full' }, 'de-DE') // 'Montag, 1. Januar 2024'
 * ```
 */
export function formatDate(
  date: Date,
  format: string | Intl.DateTimeFormatOptions = 'ISO',
  locale = 'en-US'
): string {
  if (typeof format === 'string') {
    if (format === 'ISO') {
      return date.toISOString();
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  // Use Intl.DateTimeFormat for i18n support
  return new Intl.DateTimeFormat(locale, format).format(date);
}

/**
 * Parse a date string
 *
 * @param dateString - The date string to parse
 * @returns Parsed Date object, or null if invalid
 *
 * @example
 * ```ts
 * parseDate('2024-01-01') // Date object
 * ```
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Add days to a date
 *
 * @param date - The date to add to
 * @param days - Number of days to add (can be negative)
 * @returns A new Date object
 *
 * @example
 * ```ts
 * addDays(new Date(2024, 0, 1), 5) // Date 5 days later
 * ```
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 *
 * @param date - The date to add to
 * @param months - Number of months to add (can be negative)
 * @returns A new Date object
 *
 * @example
 * ```ts
 * addMonths(new Date(2024, 0, 1), 2) // Date 2 months later
 * ```
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 *
 * @param date - The date to add to
 * @param years - Number of years to add (can be negative)
 * @returns A new Date object
 *
 * @example
 * ```ts
 * addYears(new Date(2024, 0, 1), 1) // Date 1 year later
 * ```
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Get the start of day (00:00:00)
 *
 * @param date - The date
 * @returns A new Date object at start of day
 *
 * @example
 * ```ts
 * startOfDay(new Date(2024, 0, 1, 15, 30)) // Date at 00:00:00
 * ```
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of day (23:59:59.999)
 *
 * @param date - The date
 * @returns A new Date object at end of day
 *
 * @example
 * ```ts
 * endOfDay(new Date(2024, 0, 1, 15, 30)) // Date at 23:59:59.999
 * ```
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if date1 is before date2
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if date1 is before date2
 *
 * @example
 * ```ts
 * isBefore(new Date(2024, 0, 1), new Date(2024, 0, 2)) // true
 * ```
 */
export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Check if date1 is after date2
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if date1 is after date2
 *
 * @example
 * ```ts
 * isAfter(new Date(2024, 0, 2), new Date(2024, 0, 1)) // true
 * ```
 */
export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Check if two dates are the same (same day)
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are the same day
 *
 * @example
 * ```ts
 * isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 1, 15, 30)) // true
 * ```
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Calculate difference in days between two dates
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days difference (can be negative)
 *
 * @example
 * ```ts
 * differenceInDays(new Date(2024, 0, 5), new Date(2024, 0, 1)) // 4
 * ```
 */
export function differenceInDays(date1: Date, date2: Date): number {
  const diffTime = date1.getTime() - date2.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate difference in hours between two dates
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of hours difference (can be negative)
 *
 * @example
 * ```ts
 * differenceInHours(new Date(2024, 0, 1, 5), new Date(2024, 0, 1, 1)) // 4
 * ```
 */
export function differenceInHours(date1: Date, date2: Date): number {
  const diffTime = date1.getTime() - date2.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60));
}

/**
 * Calculate difference in minutes between two dates
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of minutes difference (can be negative)
 *
 * @example
 * ```ts
 * differenceInMinutes(new Date(2024, 0, 1, 0, 5), new Date(2024, 0, 1, 0, 1)) // 4
 * ```
 */
export function differenceInMinutes(date1: Date, date2: Date): number {
  const diffTime = date1.getTime() - date2.getTime();
  return Math.floor(diffTime / (1000 * 60));
}

/**
 * Get the start of month
 *
 * @param date - The date
 * @returns A new Date object at start of month
 *
 * @example
 * ```ts
 * startOfMonth(new Date(2024, 0, 15)) // Date at 2024-01-01 00:00:00
 * ```
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of month
 *
 * @param date - The date
 * @returns A new Date object at end of month
 *
 * @example
 * ```ts
 * endOfMonth(new Date(2024, 0, 15)) // Date at 2024-01-31 23:59:59.999
 * ```
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get the start of year
 *
 * @param date - The date
 * @returns A new Date object at start of year
 *
 * @example
 * ```ts
 * startOfYear(new Date(2024, 5, 15)) // Date at 2024-01-01 00:00:00
 * ```
 */
export function startOfYear(date: Date): Date {
  const result = new Date(date);
  result.setMonth(0, 1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of year
 *
 * @param date - The date
 * @returns A new Date object at end of year
 *
 * @example
 * ```ts
 * endOfYear(new Date(2024, 5, 15)) // Date at 2024-12-31 23:59:59.999
 * ```
 */
export function endOfYear(date: Date): Date {
  const result = new Date(date);
  result.setMonth(11, 31);
  result.setHours(23, 59, 59, 999);
  return result;
}
