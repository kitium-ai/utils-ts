import { describe, it, expect } from 'vitest';
import {
  clamp,
  random,
  randomInt,
  inRange,
  sum,
  mean,
  min,
  max,
  minBy,
  maxBy,
} from '../../src/runtime/number.js';

describe('number', () => {
  describe('clamp', () => {
    it('should clamp values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should clamp values below minimum', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should clamp values above maximum', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('random', () => {
    it('should generate random numbers in range', () => {
      const value = random(0, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(10);
    });
  });

  describe('randomInt', () => {
    it('should generate random integers in range', () => {
      const value = randomInt(0, 10);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(10);
    });
  });

  describe('inRange', () => {
    it('should return true for values in range', () => {
      expect(inRange(5, 0, 10)).toBe(true);
      expect(inRange(0, 0, 10)).toBe(true);
    });

    it('should return false for values outside range', () => {
      expect(inRange(15, 0, 10)).toBe(false);
      expect(inRange(-1, 0, 10)).toBe(false);
    });

    it('should work with single argument', () => {
      expect(inRange(3, 5)).toBe(true);
      expect(inRange(6, 5)).toBe(false);
    });
  });

  describe('sum', () => {
    it('should sum numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
      expect(sum([-1, 1])).toBe(0);
    });

    it('should return 0 for empty array', () => {
      expect(sum([])).toBe(0);
    });
  });

  describe('mean', () => {
    it('should calculate mean', () => {
      expect(mean([1, 2, 3, 4])).toBe(2.5);
      expect(mean([10, 20])).toBe(15);
    });

    it('should return NaN for empty array', () => {
      expect(mean([])).toBeNaN();
    });
  });

  describe('min', () => {
    it('should find minimum value', () => {
      expect(min([1, 5, 3, 2])).toBe(1);
      expect(min([-1, -5, -3])).toBe(-5);
    });

    it('should return undefined for empty array', () => {
      expect(min([])).toBeUndefined();
    });
  });

  describe('max', () => {
    it('should find maximum value', () => {
      expect(max([1, 5, 3, 2])).toBe(5);
      expect(max([-1, -5, -3])).toBe(-1);
    });

    it('should return undefined for empty array', () => {
      expect(max([])).toBeUndefined();
    });
  });

  describe('minBy', () => {
    it('should find item with minimum value', () => {
      const items = [{ age: 20 }, { age: 30 }, { age: 10 }];
      expect(minBy(items, (x) => x.age)).toEqual({ age: 10 });
    });

    it('should return undefined for empty array', () => {
      expect(minBy([], (x) => x)).toBeUndefined();
    });
  });

  describe('maxBy', () => {
    it('should find item with maximum value', () => {
      const items = [{ age: 20 }, { age: 30 }, { age: 10 }];
      expect(maxBy(items, (x) => x.age)).toEqual({ age: 30 });
    });

    it('should return undefined for empty array', () => {
      expect(maxBy([], (x) => x)).toBeUndefined();
    });
  });
});

