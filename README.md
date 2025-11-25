# @kitiumai/utils-ts

Comprehensive TypeScript utilities for KitiumAI projects, providing both advanced type utilities and runtime functions.

## Installation

```bash
npm install @kitiumai/utils-ts
# or
pnpm add @kitiumai/utils-ts
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
```

### Runtime Utilities

```typescript
import { chunk, debounce, deepMerge, retry } from '@kitiumai/utils-ts';

// Array utilities
const chunks = chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

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

## Tree-Shaking

This package is fully tree-shakeable. Import only what you need:

```typescript
// Import specific utilities
import { chunk } from '@kitiumai/utils-ts/runtime';
import type { DeepPartial } from '@kitiumai/utils-ts/types';
```

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
