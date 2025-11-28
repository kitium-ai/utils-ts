import { describe, it, expect } from 'vitest';
import {
  formatDate,
  parseDate,
  addDays,
  addMonths,
  addYears,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  isSameDay,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from '../../src/runtime/date.js';

describe('date', () => {
  describe('formatDate', () => {
    it('should format date to ISO string by default', () => {
      const date = new Date(2024, 0, 1);
      const formatted = formatDate(date);
      expect(formatted).toContain('2024');
    });

    it('should format date with custom format', () => {
      const date = new Date(2024, 0, 1, 12, 30, 45);
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-01');
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-01 12:30:45');
    });
  });

  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const date = parseDate('2024-01-01');
      expect(date).toBeInstanceOf(Date);
      expect(date?.getFullYear()).toBe(2024);
    });

    it('should return null for invalid date', () => {
      expect(parseDate('invalid')).toBeNull();
    });
  });

  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date(2024, 0, 1);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should subtract days with negative number', () => {
      const date = new Date(2024, 0, 10);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(5);
    });
  });

  describe('addMonths', () => {
    it('should add months to date', () => {
      const date = new Date(2024, 0, 1);
      const result = addMonths(date, 2);
      expect(result.getMonth()).toBe(2);
    });
  });

  describe('addYears', () => {
    it('should add years to date', () => {
      const date = new Date(2024, 0, 1);
      const result = addYears(date, 1);
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe('startOfDay', () => {
    it('should set time to 00:00:00', () => {
      const date = new Date(2024, 0, 1, 15, 30, 45);
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    it('should set time to 23:59:59.999', () => {
      const date = new Date(2024, 0, 1, 15, 30, 45);
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
    });
  });

  describe('isBefore', () => {
    it('should return true if date1 is before date2', () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 2);
      expect(isBefore(date1, date2)).toBe(true);
    });

    it('should return false if date1 is after date2', () => {
      const date1 = new Date(2024, 0, 2);
      const date2 = new Date(2024, 0, 1);
      expect(isBefore(date1, date2)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('should return true if date1 is after date2', () => {
      const date1 = new Date(2024, 0, 2);
      const date2 = new Date(2024, 0, 1);
      expect(isAfter(date1, date2)).toBe(true);
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date1 = new Date(2024, 0, 1, 10, 0);
      const date2 = new Date(2024, 0, 1, 15, 30);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 2);
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('differenceInDays', () => {
    it('should calculate days difference', () => {
      const date1 = new Date(2024, 0, 5);
      const date2 = new Date(2024, 0, 1);
      expect(differenceInDays(date1, date2)).toBe(4);
    });
  });

  describe('differenceInHours', () => {
    it('should calculate hours difference', () => {
      const date1 = new Date(2024, 0, 1, 5);
      const date2 = new Date(2024, 0, 1, 1);
      expect(differenceInHours(date1, date2)).toBe(4);
    });
  });

  describe('differenceInMinutes', () => {
    it('should calculate minutes difference', () => {
      const date1 = new Date(2024, 0, 1, 0, 5);
      const date2 = new Date(2024, 0, 1, 0, 1);
      expect(differenceInMinutes(date1, date2)).toBe(4);
    });
  });

  describe('startOfMonth', () => {
    it('should return first day of month at 00:00:00', () => {
      const date = new Date(2024, 0, 15);
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
    });
  });

  describe('endOfMonth', () => {
    it('should return last day of month at 23:59:59.999', () => {
      const date = new Date(2024, 0, 15);
      const result = endOfMonth(date);
      expect(result.getMonth()).toBe(0);
      expect(result.getHours()).toBe(23);
    });
  });

  describe('startOfYear', () => {
    it('should return first day of year at 00:00:00', () => {
      const date = new Date(2024, 5, 15);
      const result = startOfYear(date);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
    });
  });

  describe('endOfYear', () => {
    it('should return last day of year at 23:59:59.999', () => {
      const date = new Date(2024, 5, 15);
      const result = endOfYear(date);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(31);
      expect(result.getHours()).toBe(23);
    });
  });
});
