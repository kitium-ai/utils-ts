import { describe, it, expect } from 'vitest';
import {
  defaults,
  defaultsDeep,
  keys,
  values,
  entries,
  fromPairs,
  toPairs,
  size,
} from '../../src/runtime/object/index.js';

describe('object', () => {
  describe('defaults', () => {
    it('should fill missing properties', () => {
      expect(defaults({ a: 1 }, { b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should not override existing properties', () => {
      expect(defaults({ a: 1 }, { a: 2, b: 3 })).toEqual({ a: 1, b: 3 });
    });
  });

  describe('defaultsDeep', () => {
    it('should fill missing properties deeply', () => {
      expect(defaultsDeep({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({
        a: { b: 1, c: 2 },
      });
    });
  });

  describe('keys', () => {
    it('should get all keys', () => {
      expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
    });
  });

  describe('values', () => {
    it('should get all values', () => {
      expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
    });
  });

  describe('entries', () => {
    it('should get all entries', () => {
      expect(entries({ a: 1, b: 2 })).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });
  });

  describe('fromPairs', () => {
    it('should create object from pairs', () => {
      expect(
        fromPairs([
          ['a', 1],
          ['b', 2],
        ])
      ).toEqual({ a: 1, b: 2 });
    });
  });

  describe('toPairs', () => {
    it('should convert object to pairs', () => {
      expect(toPairs({ a: 1, b: 2 })).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });
  });

  describe('size', () => {
    it('should get size of array', () => {
      expect(size([1, 2, 3])).toBe(3);
    });

    it('should get size of string', () => {
      expect(size('hello')).toBe(5);
    });

    it('should get size of object', () => {
      expect(size({ a: 1, b: 2 })).toBe(2);
    });

    it('should return 0 for null/undefined', () => {
      expect(size(null)).toBe(0);
      expect(size(undefined)).toBe(0);
    });
  });
});
