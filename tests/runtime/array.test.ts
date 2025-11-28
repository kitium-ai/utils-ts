import { describe, it, expect } from 'vitest';
import {
  chunk,
  groupBy,
  unique,
  uniqueBy,
  partition,
  intersection,
  difference,
  flatten,
  flattenDeep,
  range,
  shuffle,
  sample,
  arraysEqual,
  compact,
  take,
  takeRight,
  drop,
  dropRight,
  zip,
  unzip,
  head,
  tail,
  last,
  initial,
  union,
  without,
  flatMap,
  countBy,
  keyBy,
} from '../../src/runtime/array.js';

describe('array', () => {
  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should throw for invalid size', () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow();
    });

    it('should support data-last usage', () => {
      const byThree = chunk<number>({ size: 3 });
      expect(byThree([1, 2, 3, 4])).toEqual([[1, 2, 3], [4]]);
    });

    it('should return structured error when onError is set to return', () => {
      const result = chunk([1, 2], { size: 0, onError: 'return', label: 'test' });
      expect(result).toEqual({
        ok: false,
        error: expect.any(Error),
      });
    });
  });

  describe('groupBy', () => {
    it('should group items by key', () => {
      const items = [
        { type: 'a', value: 1 },
        { type: 'b', value: 2 },
      ];
      expect(groupBy(items, 'type')).toEqual({
        a: [{ type: 'a', value: 1 }],
        b: [{ type: 'b', value: 2 }],
      });
    });

    it('should support curried usage with selector', () => {
      const byType = groupBy<{ type: string; value: number }>('type');
      expect(
        byType([
          { type: 'a', value: 1 },
          { type: 'a', value: 2 },
        ])
      ).toEqual({
        a: [
          { type: 'a', value: 1 },
          { type: 'a', value: 2 },
        ],
      });
    });

    it('should surface error through Result channel when selector returns undefined', () => {
      const result = groupBy(
        [
          { type: undefined, value: 1 },
          { type: 'ok', value: 2 },
        ],
        { selector: (item) => item.type, onError: 'return' }
      );

      expect(result).toEqual({ ok: false, error: expect.any(Error) });
    });
  });

  describe('compact', () => {
    it('should remove falsy values', () => {
      expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
    });
  });

  describe('take', () => {
    it('should take first n elements', () => {
      expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
    });
  });

  describe('takeRight', () => {
    it('should take last n elements', () => {
      expect(takeRight([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
    });
  });

  describe('drop', () => {
    it('should drop first n elements', () => {
      expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
    });
  });

  describe('dropRight', () => {
    it('should drop last n elements', () => {
      expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
    });
  });

  describe('zip', () => {
    it('should combine arrays into pairs', () => {
      expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]);
    });

    it('should handle mismatched lengths', () => {
      expect(zip([1, 2], ['a', 'b', 'c'])).toEqual([
        [1, 'a'],
        [2, 'b'],
      ]);
    });
  });

  describe('unzip', () => {
    it('should separate pairs into arrays', () => {
      expect(
        unzip([
          [1, 'a'],
          [2, 'b'],
        ])
      ).toEqual([
        [1, 2],
        ['a', 'b'],
      ]);
    });
  });

  describe('head', () => {
    it('should get first element', () => {
      expect(head([1, 2, 3])).toBe(1);
    });

    it('should return undefined for empty array', () => {
      expect(head([])).toBeUndefined();
    });
  });

  describe('tail', () => {
    it('should get all but first element', () => {
      expect(tail([1, 2, 3, 4])).toEqual([2, 3, 4]);
    });
  });

  describe('last', () => {
    it('should get last element', () => {
      expect(last([1, 2, 3])).toBe(3);
    });

    it('should return undefined for empty array', () => {
      expect(last([])).toBeUndefined();
    });
  });

  describe('initial', () => {
    it('should get all but last element', () => {
      expect(initial([1, 2, 3, 4])).toEqual([1, 2, 3]);
    });
  });

  describe('union', () => {
    it('should combine arrays and remove duplicates', () => {
      expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('without', () => {
    it('should remove specified values', () => {
      expect(without([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 3, 5]);
    });
  });

  describe('flatMap', () => {
    it('should map and flatten', () => {
      expect(flatMap([1, 2, 3], (x) => [x, x * 2])).toEqual([1, 2, 2, 4, 3, 6]);
    });
  });

  describe('countBy', () => {
    it('should count occurrences by key', () => {
      const items = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
      expect(countBy(items, 'type')).toEqual({ a: 2, b: 1 });
    });
  });

  describe('keyBy', () => {
    it('should create object from array by key', () => {
      const items = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ];
      expect(keyBy(items, 'id')).toEqual({
        1: { id: 1, name: 'a' },
        2: { id: 2, name: 'b' },
      });
    });
  });
});
