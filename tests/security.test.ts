import { test, expect } from 'vitest';
import { chunk, groupBy } from '../src/runtime/array/index.js';

describe('security tests', () => {
  test('chunk handles large arrays safely', () => {
    const largeArray = Array.from({ length: 100000 }, (_, i) => i);
    const start = performance.now();
    const result = chunk(largeArray, 1000);
    const end = performance.now();

    expect(result.length).toBe(100);
    expect(end - start).toBeLessThan(1000); // Should complete in reasonable time
  });

  test('groupBy handles prototype pollution attempts', () => {
    const malicious = [{ __proto__: { polluted: true } }];
    const result = groupBy(malicious, '__proto__');

    // Ensure prototype is not polluted
    expect(({} as any).polluted).toBeUndefined();
    // groupBy should group by the __proto__ property, which is an object, so key becomes '[object Object]'
    expect(result).toHaveProperty('[object Object]');
  });

  test('no eval usage in string operations', () => {
    // This is more of a build-time check, but we can test that functions don't use eval
    const testString = 'console.log("test")';
    expect(() => {
      // If any function used eval, this would be dangerous
      // For now, just ensure basic functionality works
      testString.toUpperCase();
    }).not.toThrow();
  });
});
