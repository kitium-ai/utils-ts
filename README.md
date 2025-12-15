# @kitiumai/utils-ts

**The Complete TypeScript Utility Library for Production-Ready Applications**

`@kitiumai/utils-ts` is a comprehensive, battle-tested TypeScript utility library that combines advanced type-level programming with a rich set of runtime functions. Designed for enterprise-scale applications, it provides everything from sophisticated type utilities to functional programming helpers, all while maintaining strict type safety and optimal performance.

## What is this package?

This package serves as the foundational utility layer for all KitiumAI projects, offering:

- **74+ Advanced Type Utilities**: Type-level programming tools inspired by `type-fest` but optimized for real-world TypeScript applications
- **133+ Runtime Functions**: Functional programming utilities covering arrays, objects, strings, async operations, validation, and more
- **Framework Agnostic**: Works seamlessly with React, Node.js, Deno, Bun, and any TypeScript environment
- **Zero Dependencies**: Standalone mode available with no external dependencies
- **Tree-Shakeable**: Granular imports ensure only what you use gets bundled

## Why we need this package

In modern TypeScript development, utility functions and types are essential but often scattered across multiple libraries or reimplemented inconsistently. This package addresses several critical needs:

### 🎯 **Unified Development Experience**

- **Single Source of Truth**: All utility functions and types in one place, ensuring consistency across your entire codebase
- **Version Consistency**: No more managing multiple utility library versions or dealing with breaking changes
- **Integrated Ecosystem**: Seamless integration with other KitiumAI packages (`@kitiumai/logger`, `@kitiumai/error`, `@kitiumai/types`)

### 🏗️ **Type-Safe Development**

- **Advanced Type Utilities**: Beyond basic TypeScript types, get sophisticated type-level programming tools for complex data transformations
- **Runtime-Type Alignment**: Functions that mirror their type counterparts, ensuring compile-time and runtime consistency
- **Branded Types**: Create distinct types from primitives (e.g., `UserId` vs `ProductId`) preventing accidental misuse

### 🚀 **Performance & Bundle Optimization**

- **Tree-Shaking**: Import only what you need with granular subpaths
- **Zero Dependencies**: Standalone mode for applications that want complete control
- **Optimized Builds**: ESM-first design with CommonJS compatibility

### 🧪 **Enterprise-Grade Quality**

- **104 Tests**: Comprehensive test coverage with property-based testing using fast-check
- **100% JSDoc Coverage**: Every function and type is fully documented
- **Strict TypeScript**: Built with the strictest TypeScript settings
- **Battle-Tested**: Used across multiple KitiumAI production applications

## Competitor Comparison

| Feature                    | @kitiumai/utils-ts            | Lodash         | Ramda             | type-fest    | utility-types |
| -------------------------- | ----------------------------- | -------------- | ----------------- | ------------ | ------------- |
| **Type Utilities**         | 74+ types                     | ❌             | ❌                | 100+ types   | 50+ types     |
| **Runtime Functions**      | 133+ functions                | 300+ functions | 200+ functions    | ❌           | ❌            |
| **TypeScript First**       | ✅ Native                     | ⚠️ Partial     | ⚠️ Partial        | ✅ Native    | ✅ Native     |
| **Tree-Shakeable**         | ✅ Full                       | ⚠️ Partial     | ⚠️ Partial        | ✅ Full      | ✅ Full       |
| **Zero Dependencies**      | ✅ Standalone mode            | ❌             | ❌                | ✅           | ✅            |
| **Functional Programming** | ✅ Data-first/last            | ❌             | ✅ Data-last only | ❌           | ❌            |
| **Advanced Types**         | ✅ Branded, Template literals | ❌             | ❌                | ✅           | ✅            |
| **Error Handling**         | ✅ Structured errors          | ❌             | ❌                | ❌           | ❌            |
| **KitiumAI Integration**   | ✅ Native                     | ❌             | ❌                | ❌           | ❌            |
| **Bundle Size**            | 🟢 Small                      | 🟡 Large       | 🟡 Large          | 🟢 Small     | 🟢 Small      |
| **Performance**            | 🟢 Optimized                  | 🟡 Good        | 🟡 Good           | 🟢 Excellent | 🟢 Excellent  |

### Key Differentiators

- **Unified Type + Runtime**: Unlike separate libraries, provides both compile-time types and runtime functions that work together
- **KitiumAI Ecosystem**: Deep integration with other KitiumAI packages for consistent error handling, logging, and types
- **Flexible API Design**: Supports both data-first (`chunk(items, size)`) and data-last (`chunk(size)(items)`) calling styles
- **Result Types**: Structured error handling with `{ ok: true, value } | { ok: false, error }` patterns
- **Enterprise Focus**: Designed for large-scale applications with strict typing, performance, and maintainability requirements

## Unique Selling Proposition (USP)

### 🔄 **Type-Runtime Consistency**

Every runtime function has a corresponding type utility, ensuring compile-time guarantees match runtime behavior.

```typescript
import type { CamelCase } from '@kitiumai/utils-ts/types/template';
import { camelCase } from '@kitiumai/utils-ts/runtime/string/case';

// Type-level transformation
type ApiResponse = CamelCase<'user_profile_data'>; // 'userProfileData'

// Runtime transformation (identical behavior)
const response = camelCase('user_profile_data'); // 'userProfileData'
```

### 🎭 **Flexible API Design**

Choose your preferred calling style - data-first or data-last - both fully type-safe.

```typescript
import { chunk, groupBy } from '@kitiumai/utils-ts';

// Data-first (traditional)
const chunks = chunk([1, 2, 3, 4], { size: 2 });

// Data-last (functional composition friendly)
const chunkBy2 = chunk({ size: 2 });
const chunks = chunkBy2([1, 2, 3, 4]);

// Perfect for function composition
const processData = pipe(filter(isActive), groupBy('category'), mapValues(sortBy('priority')));
```

### 🛡️ **Structured Error Handling**

Instead of throwing exceptions, functions can return structured results with `onError: 'return'`.

```typescript
import { chunk } from '@kitiumai/utils-ts';

const result = chunk([1, 2], { size: 0, onError: 'return' });
if (!result.ok) {
  console.error('Chunking failed:', result.error);
  // Error includes context, stack trace, and metadata
} else {
  console.log('Chunks:', result.value);
}
```

### 🏷️ **Branded Types for Domain Safety**

Create distinct types from primitives to prevent accidental misuse.

```typescript
import type { Brand } from '@kitiumai/utils-ts';

type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;

function getUser(id: UserId) {
  /* ... */
}
function getProduct(id: ProductId) {
  /* ... */
}

// ✅ Type-safe - prevents mixing IDs
const user = getUser(123 as UserId);
const product = getProduct(456 as ProductId);

// ❌ Compile error - wrong ID type
// getUser(456 as ProductId); // Type error!
```

### 🔗 **KitiumAI Ecosystem Integration**

Native integration with `@kitiumai/error`, `@kitiumai/logger`, and `@kitiumai/types` for consistent error handling, logging, and type definitions across your entire application.

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

## Complete API Reference

### 📝 Type Utilities (74+ types)

#### Array Types

- `ArrayElement<T>` - Extract element type from array
- `ArrayLength<T>` - Get array length as type
- `Head<T>`, `Tail<T>`, `Last<T>`, `Initial<T>` - Array boundary types
- `Concat<A, B>`, `Push<T, U>`, `Pop<T>`, `Shift<T>`, `Unshift<T, U>` - Array manipulation types
- `Slice<T>` - Array slicing type

#### Branded Types

- `Brand<T, B>` - Create branded type from base type
- `Opaque<T, B>` - Create opaque type alias
- `Unbrand<T>` - Remove brand/opaque wrapper

#### Conditional Types

- `If<Condition, Then, Else>` - TypeScript's if-then-else
- `IsEqual<A, B>`, `IsAny<T>`, `IsNever<T>`, `IsUnknown<T>` - Type equality checks
- `IsArray<T>`, `IsTuple<T>`, `IsFunction<T>`, `IsPrimitive<T>`, `IsObject<T>` - Type guards
- `Extends<A, B>`, `HasProperty<T, K>` - Type relationship checks
- `IsUnion<T>`, `OptionalKeys<T>`, `RequiredKeys<T>` - Union and key utilities

#### Template Literal Types

- `CamelCase<S>`, `PascalCase<S>`, `KebabCase<S>`, `SnakeCase<S>` - Case conversions
- `Split<S, D>`, `Join<T, D>`, `Trim<S>` - String manipulation
- `Replace<S, From, To>`, `ReplaceAll<S, From, To>` - String replacement
- `StringLength<S>`, `StartsWith<S, Prefix>`, `EndsWith<S, Suffix>`, `Includes<S, Sub>` - String queries

#### Utility Types

- `DeepPartial<T>`, `DeepReadonly<T>`, `DeepRequired<T>` - Recursive utilities
- `Mutable<T>`, `Writable<T>`, `WritableDeep<T>` - Mutability control
- `Merge<A, B>`, `MergeDeep<A, B>` - Type merging
- `Simplify<T>`, `ValueOf<T>` - Type simplification
- `PartialBy<T, K>`, `RequiredBy<T, K>` - Selective modification
- `Nullable<T>`, `NonNullableProperties<T>` - Null handling
- `KeysOfType<T, U>`, `StrictOmit<T, K>`, `StrictPick<T, K>` - Advanced key operations
- `LiteralUnion<T, U>`, `DiffKeys<A, B>`, `Intersection<A, B>` - Complex type operations

#### Result Types

- `Result<T>` - Standard result type: `{ ok: true, value: T } | { ok: false, error: Error }`
- `AsyncResult<T>` - Promise-wrapped result type

### ⚙️ Runtime Functions (133+ functions)

#### Array Functions (27 functions)

- **Chunking**: `chunk(items, options)`, `chunk(options)(items)`
- **Grouping**: `groupBy(items, selector)`, `countBy(items, selector)`, `keyBy(items, keyFn)`
- **Set Operations**: `union(arrays)`, `intersection(arrays)`, `difference(arrays)`, `without(array, values)`
- **Partitioning**: `partition(items, predicate)`
- **Uniqueness**: `unique(items)`, `uniqueBy(items, keyFn)`
- **Selection**: `take(items, count)`, `drop(items, count)`, `head(items)`, `last(items)`, `tail(items)`, `initial(items)`
- **Transformation**: `compact(items)`, `flatMap(items, fn)`, `flatten(items)`, `flattenDeep(items)`
- **Query**: `arraysEqual(a, b)`, `zip(arrays)`, `unzip(zipped)`

#### Object Functions (20 functions)

- **Deep Operations**: `deepMerge(objects)`, `deepClone(value)`, `isEqual(a, b)`
- **Property Access**: `get(obj, path)`, `set(obj, path, value)`, `has(obj, path)`
- **Selection**: `pick(obj, keys)`, `omit(obj, keys)`
- **Utilities**: `keys(obj)`, `values(obj)`, `entries(obj)`, `defaults(target, sources)`, `defaultsDeep(target, sources)`
- **Transformation**: `invert(obj)`, `mapKeys(obj, fn)`, `mapValues(obj, fn)`
- **Queries**: `isPlainObject(value)`, `size(obj)`

#### String Functions (20 functions)

- **Case Conversion**: `camelCase(str)`, `pascalCase(str)`, `kebabCase(str)`, `snakeCase(str)`, `capitalize(str)`, `titleCase(str)`
- **Transformation**: `reverse(str)`, `truncate(str, options)`, `pad(str, options)`, `padEnd(str, options)`, `padStart(str, options)`
- **Manipulation**: `removePrefix(str, prefix)`, `removeSuffix(str, suffix)`
- **Query**: `countOccurrences(str, substring)`, `isAlphanumeric(str)`, `isEmail(str)`, `isEmptyString(str)`, `isUrl(str)`
- **Escape**: `escapeHtml(str)`, `unescapeHtml(str)`
- **Utils**: `randomString(length)`

#### Function Functions (13 functions)

- **Composition**: `compose(...fns)`, `pipe(...fns)`
- **Control Flow**: `debounce(fn, delay)`, `throttle(fn, interval)`, `delay(fn, ms)`
- **Memoization**: `memoize(fn, resolver)`, `once(fn)`
- **Transformation**: `curry(fn, arity)`, `negate(predicate)`
- **Execution**: `attempt(fn)`, `constant(value)`, `identity(value)`, `noop()`

#### Async Functions (11 functions)

- **Timing**: `sleep(ms)`, `timeout(promise, ms, message)`
- **Retry**: `retry(fn, options)`
- **Concurrency**: `parallel(fns)`, `series(fns)`, `concurrency(items, fn, limit)`
- **Promises**: `promisify(fn)`, `settled(promise)`, `race(promises)`, `allSettled(promises)`
- **Deferred**: `deferred<T>()` - Returns `{ promise, resolve, reject }`

#### Validation Functions (13 functions)

- **Type Guards**: `isString(v)`, `isNumber(v)`, `isBoolean(v)`, `isArray(v)`, `isObject(v)`, `isFunction(v)`
- **Advanced Guards**: `isDate(v)`, `isRegExp(v)`, `isError(v)`
- **Value Checks**: `isNil(v)`, `isEmpty(v)`, `isFinite(v)`, `isInteger(v)`

#### Number Functions (10 functions)

- **Math**: `clamp(value, min, max)`, `sum(numbers)`, `mean(numbers)`, `min(numbers)`, `max(numbers)`
- **Random**: `random(min, max)`, `randomInt(min, max)`
- **Queries**: `inRange(value, start, end)`
- **Extrema**: `minBy(array, fn)`, `maxBy(array, fn)`

#### Date Functions (19 functions)

- **Formatting**: `formatDate(date, format, locale)`, `parseDate(dateString)`
- **Arithmetic**: `addDays(date, days)`, `addMonths(date, months)`, `addYears(date, years)`
- **Boundaries**: `startOfDay(date)`, `endOfDay(date)`, `startOfMonth(date)`, `endOfMonth(date)`, `startOfYear(date)`, `endOfYear(date)`
- **Comparison**: `isBefore(date1, date2)`, `isAfter(date1, date2)`, `isSameDay(date1, date2)`
- **Difference**: `differenceInDays(date1, date2)`, `differenceInHours(date1, date2)`, `differenceInMinutes(date1, date2)`

### 🔧 Configuration & Integration

#### Configuration Functions

- `setUtilsConfig(config)` - Configure package behavior
- `setErrorFactory(factory)` - Wire custom error factory for `@kitiumai/error` integration

#### Integration Types

- Integration types for `@kitiumai/logger`, `@kitiumai/error`, and `@kitiumai/types`

## Usage Examples

### 🔧 Advanced Type Patterns

#### Domain Modeling with Branded Types

```typescript
import type { Brand, DeepPartial } from '@kitiumai/utils-ts';

// Create distinct types for domain safety
type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;
type Email = Brand<string, 'Email'>;

// API types with deep partials for updates
interface User {
  id: UserId;
  email: Email;
  profile: {
    name: string;
    age: number;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
}

type UserUpdate = DeepPartial<Omit<User, 'id'>>;

// Type-safe functions
function getUser(id: UserId): Promise<User> {
  /* ... */
}
function updateUser(id: UserId, updates: UserUpdate): Promise<User> {
  /* ... */
}

// ✅ Compile-time safety prevents mixing IDs
const user = await getUser(123 as UserId);
// ❌ Type error: Argument of type 'ProductId' is not assignable to parameter of type 'UserId'
// getUser(456 as ProductId);
```

#### API Response Types with Result Pattern

```typescript
import type { Result, CamelCase, Merge } from '@kitiumai/utils-ts';

// Transform API response types
type ApiUser = {
  user_id: number;
  user_name: string;
  created_at: string;
  user_profile: {
    first_name: string;
    last_name: string;
  };
};

// Transform snake_case to camelCase at type level
type User = {
  [K in keyof ApiUser as CamelCase<string & K>]: ApiUser[K];
};

// Result types for safe API calls
type ApiResponse<T> = Result<T>;

interface ApiClient {
  getUser(id: number): Promise<ApiResponse<User>>;
  updateUser(id: number, data: Partial<User>): Promise<ApiResponse<User>>;
}
```

### 🎯 Real-World Runtime Examples

#### Data Processing Pipeline

```typescript
import { pipe, filter, groupBy, mapValues, sortBy } from '@kitiumai/utils-ts';

interface Order {
  id: number;
  customerId: number;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

const orders: Order[] = [
  { id: 1, customerId: 1, amount: 100, status: 'completed', createdAt: new Date() },
  { id: 2, customerId: 1, amount: 50, status: 'pending', createdAt: new Date() },
  { id: 3, customerId: 2, amount: 75, status: 'completed', createdAt: new Date() },
];

// Functional data processing pipeline
const processOrders = pipe(
  // Filter completed orders
  filter((order: Order) => order.status === 'completed'),
  // Group by customer
  groupBy('customerId'),
  // Calculate total per customer
  mapValues((customerOrders: Order[]) =>
    customerOrders.reduce((sum, order) => sum + order.amount, 0)
  ),
  // Sort customers by total descending
  sortBy(([_, total]: [number, number]) => -total)
);

const customerTotals = processOrders(orders);
// Result: [[1, 100], [2, 75]] - sorted by total descending
```

#### Error Handling with Structured Results

```typescript
import { chunk, retry, timeout, Result } from '@kitiumai/utils-ts';

async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: { batchSize: number; retries: number }
): Promise<Result<R[]>[]> {
  const batches = chunk(items, { size: options.batchSize, onError: 'return' });

  if (!batches.ok) {
    return [{ ok: false, error: batches.error }];
  }

  const results: Result<R[]>[] = [];

  for (const batch of batches.value) {
    const result = await retry(
      () => timeout(Promise.all(batch.map(processor)), 5000, 'Batch processing timeout'),
      { retries: options.retries, delay: 1000 }
    );

    if (result instanceof Error) {
      results.push({ ok: false, error: result });
    } else {
      results.push({ ok: true, value: result });
    }
  }

  return results;
}

// Usage with proper error handling
const batchResults = await processBatch(
  [
    /* large array of items */
  ],
  async (item) => processItem(item),
  { batchSize: 10, retries: 3 }
);

const successful = batchResults.filter((r): r is Result<any> & { ok: true } => r.ok);
const failed = batchResults.filter((r): r is Result<any> & { ok: false } => !r.ok);
```

#### Advanced Object Manipulation

```typescript
import { deepMerge, pick, omit, get, set, isEqual } from '@kitiumai/utils-ts';

const defaultConfig = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  },
  features: {
    darkMode: false,
    notifications: true,
    analytics: true,
  },
  user: {
    preferences: {
      language: 'en',
      timezone: 'UTC',
    },
  },
};

const userOverrides = {
  api: {
    timeout: 10000,
  },
  features: {
    darkMode: true,
  },
  user: {
    preferences: {
      language: 'es',
    },
  },
};

// Deep merge configurations
const finalConfig = deepMerge(defaultConfig, userOverrides);

// Extract specific sections
const apiConfig = pick(finalConfig, ['api']);
const userPrefs = get(finalConfig, 'user.preferences');

// Update nested properties immutably
const updatedConfig = set(finalConfig, 'features.analytics', false);

// Validate configuration changes
const hasChanged = !isEqual(defaultConfig.features, finalConfig.features);
```

#### String Processing & Validation

```typescript
import { camelCase, kebabCase, isEmail, truncate, randomString } from '@kitiumai/utils-ts';

// API data transformation
const apiFields = ['user_name', 'email_address', 'phone_number', 'created_at'];
const frontendFields = apiFields.map(camelCase);
// Result: ['userName', 'emailAddress', 'phoneNumber', 'createdAt']

// Form validation with branded types
function validateEmail(input: string): Result<Brand<string, 'Email'>> {
  const trimmed = input.trim();

  if (!isEmail(trimmed)) {
    return {
      ok: false,
      error: new Error('Invalid email format'),
    };
  }

  return {
    ok: true,
    value: trimmed as Brand<string, 'Email'>,
  };
}

// Content formatting
const description =
  'This is a very long description that needs to be truncated for display purposes.';
const truncated = truncate(description, { length: 50, separator: ' ' });
// Result: "This is a very long description that needs to be..."

// Generate secure tokens
const sessionToken = randomString(32);
const csrfToken = randomString(16);
```

#### Date & Time Utilities

```typescript
import {
  formatDate,
  addDays,
  differenceInDays,
  isBefore,
  startOfMonth,
  endOfMonth,
} from '@kitiumai/utils-ts';

// Subscription management
class SubscriptionManager {
  private readonly trialDays = 14;

  calculateTrialEnd(startDate: Date): Date {
    return addDays(startDate, this.trialDays);
  }

  isTrialExpired(startDate: Date): boolean {
    const trialEnd = this.calculateTrialEnd(startDate);
    return isBefore(trialEnd, new Date());
  }

  getDaysRemaining(startDate: Date): number {
    const trialEnd = this.calculateTrialEnd(startDate);
    const now = new Date();
    return Math.max(0, differenceInDays(trialEnd, now));
  }

  formatBillingDate(date: Date): string {
    return formatDate(date, 'YYYY-MM-DD');
  }

  getCurrentBillingPeriod(): { start: Date; end: Date } {
    const now = new Date();
    return {
      start: startOfMonth(now),
      end: endOfMonth(now),
    };
  }
}

// Usage
const manager = new SubscriptionManager();
const trialStart = new Date('2024-01-01');
const daysLeft = manager.getDaysRemaining(trialStart);
const billingPeriod = manager.getCurrentBillingPeriod();
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
