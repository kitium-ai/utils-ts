# @kitiumai/utils-ts

Comprehensive TypeScript utilities for KitiumAI projects, providing both advanced type utilities and runtime functions.

## Installation

```bash
npm install @kitiumai/utils-ts
# or
pnpm add @kitiumai/utils-ts
```

## Standalone Mode

By default, this package integrates with other KitiumAI packages (`@kitiumai/logger`, `@kitiumai/error`). For a standalone version with zero external dependencies:

```typescript
import { setUtilsConfig } from '@kitiumai/utils-ts';

// Disable integrations for standalone usage
setUtilsConfig({ standalone: true });
```

Or build a standalone version:

```bash
pnpm run build:standalone
```

## Features

### Type Utilities (74+ types)

Advanced TypeScript types inspired by [type-fest](https://github.com/sindresorhus/type-fest):

- **Utility Types**: `DeepPartial`, `DeepReadonly`, `DeepRequired`, `Merge`, `MergeDeep`, `Simplify`, and more
- **Conditional Types**: `If`, `IsEqual`, `IsAny`, `IsArray`, `IsTuple`, and more
- **Template Literal Types**: `CamelCase`, `PascalCase`, `KebabCase`, `SnakeCase`, string manipulation types
- **Branded Types**: `Brand`, `Opaque`, `Unbrand` - Create distinct types from primitives
- **Array Types**: `ArrayElement`, `Head`, `Tail`, `Last`, `Concat`, `Push`, `Pop`, and more

### Runtime Utilities (133 functions)

Functional utilities inspired by Lodash and Ramda:

- **Array** (27 functions): `chunk`, `groupBy`, `unique`, `partition`, `intersection`, `difference`, `compact`, `take`, `drop`, `zip`, `flatMap`, `countBy`, `keyBy`, and more
- **Object** (20 functions): `deepMerge`, `deepClone`, `pick`, `omit`, `get`, `set`, `isEqual`, `defaults`, `keys`, `values`, `entries`, and more
- **String** (20 functions): Case conversions, validation, truncation, escaping, padding, and more
- **Function** (13 functions): `compose`, `pipe`, `debounce`, `throttle`, `memoize`, `curry`, and more
- **Async** (11 functions): `sleep`, `retry`, `timeout`, `parallel`, `series`, `concurrency`, and more
- **Validation** (13 functions): `isString`, `isNumber`, `isArray`, `isObject`, `isEmpty`, `isNil`, and more
- **Number** (10 functions): `clamp`, `random`, `sum`, `mean`, `min`, `max`, `minBy`, `maxBy`, and more
- **Date** (19 functions): `formatDate`, `parseDate`, `addDays`, `addMonths`, `isBefore`, `isAfter`, `differenceInDays`, and more

## Usage

### Type Utilities

```typescript
import type { DeepPartial, Merge, CamelCase } from '@kitiumai/utils-ts';

// Make all properties optional recursively
type User = {
  id: string;
  profile: {
    name: string;
    age: number;
  };
};
type PartialUser = DeepPartial<User>;

// Merge types
type A = { x: number };
type B = { y: string };
type AB = Merge<A, B>; // { x: number; y: string }

// Template literal types
type Result = CamelCase<'hello_world'>; // 'helloWorld'

// Result type pairing with runtime helpers
import type { Result as UtilsResult } from '@kitiumai/utils-ts/types/result';
type SafeValue = UtilsResult<string>;
```

### Runtime Utilities

```typescript
import { chunk, debounce, deepMerge, groupBy, retry } from '@kitiumai/utils-ts';

// Array utilities
const chunks = chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Data-last usage and structured errors
const safeChunks = chunk([1, 2, 3], { size: 0, onError: 'return', label: 'payload' });
if (!safeChunks.ok) console.error(safeChunks.error);

const byType = groupBy<{ type: string; value: number }>('type');
const grouped = byType([
  { type: 'a', value: 1 },
  { type: 'b', value: 2 },
]);

// Function utilities
const debouncedFn = debounce(() => console.log('Called!'), 300);

// Object utilities
const merged = deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }

// Async utilities
await retry(
  async () => {
    const response = await fetch('/api/data');
    return response.json();
  },
  { retries: 3, delay: 1000 }
);
```

## API conventions and structured errors

- **Data-first and data-last**: Most helpers provide both call styles via overloads (e.g., `chunk(items, opts)` and `chunk(opts)(items)`).
- **Options bags**: Configurable helpers use options objects for clarity, keeping positional arguments minimal.
- **Result channels**: Set `onError: 'return'` to receive `{ ok: false; error }` without throwing; defaults stay backward compatible.
- **Optional @kitiumai/error integration**: Use `setErrorFactory` to wire the `createError` helper from `@kitiumai/error` for standardized error metadata.

```ts
import { chunk, groupBy, setErrorFactory } from '@kitiumai/utils-ts/runtime';
import { createError } from '@kitiumai/error';

setErrorFactory((init) => createError({ name: 'UtilsError', ...init }));

const result = chunk([1, 2], { size: 0, onError: 'return' });
if (!result.ok) {
  console.warn(result.error);
}
```

## Tree-Shaking and granular imports

This package is fully tree-shakeable. Import only what you need:

```typescript
// Import specific utilities
import { chunk } from '@kitiumai/utils-ts/runtime';
import type { DeepPartial } from '@kitiumai/utils-ts/types';

// Granular subpaths for tighter bundles
import { chunk as chunkArray } from '@kitiumai/utils-ts/runtime/array';
import { Result } from '@kitiumai/utils-ts/runtime/result';
import type { Result as ResultType } from '@kitiumai/utils-ts/types/result';
```

### Array API quick reference

| Helper    | Data-first                          | Data-last                           | Error channel                                         |
| --------- | ----------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| `chunk`   | `chunk(items, sizeOrOptions)`       | `chunk(sizeOrOptions)(items)`       | `onError: 'return'` yields `{ ok: false, error }`     |
| `groupBy` | `groupBy(items, selectorOrOptions)` | `groupBy(selectorOrOptions)(items)` | `onError: 'return'` when selector returns `undefined` |

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run performance benchmarks
pnpm bench

# Run type tests
pnpm test:types
```

## Statistics

- **Runtime Functions**: 133
- **Type Utilities**: 74+
- **Test Coverage**: 104 tests (90%+ threshold)
- **Documentation**: 100% JSDoc coverage
- **Build Status**: ✅ Passing
- **Type Safety**: Strict TypeScript

## License

MIT © KitiumAI
