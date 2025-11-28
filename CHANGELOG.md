# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Standardized error handling for `chunk` and `groupBy` with optional Result return values and data-first/data-last overloads.
- New runtime helpers exported for `result` and `error` plus matching `Result` type utilities.
- Granular subpath exports for runtime and type modules to improve bundle sizing.
- Documentation updates covering API conventions, error integration, and array helper references.

## [1.0.0] - 2024

### Added

#### Runtime Utilities

**Array Utilities (27 functions)**

- `chunk` - Split array into chunks of specified size
- `groupBy` - Group array items by a key or function
- `unique` - Remove duplicate values from array
- `uniqueBy` - Remove duplicate values by a specific key
- `partition` - Split array into two arrays based on predicate
- `intersection` - Find common elements across all arrays
- `difference` - Find elements in first array that are not in second array
- `flatten` - Flatten nested array one level
- `flattenDeep` - Flatten nested array recursively
- `range` - Create array of numbers from start to end
- `shuffle` - Shuffle array randomly using Fisher-Yates algorithm
- `sample` - Get random sample from array
- `arraysEqual` - Check if arrays are equal (shallow comparison)
- `compact` - Remove falsy values from array
- `take` - Get the first n elements of an array
- `takeRight` - Get the last n elements of an array
- `drop` - Remove the first n elements from an array
- `dropRight` - Remove the last n elements from an array
- `zip` - Combine two arrays into pairs
- `unzip` - Separate pairs into two arrays
- `head` - Get the first element of an array
- `tail` - Get all elements except the first
- `last` - Get the last element of an array
- `initial` - Get all elements except the last
- `union` - Combine multiple arrays and remove duplicates
- `without` - Remove specified values from an array
- `flatMap` - Map and flatten in one operation
- `countBy` - Count occurrences of items by a key or function
- `keyBy` - Create an object from an array using a key

**Object Utilities (20 functions)**

- `deepMerge` - Deep merge objects
- `deepClone` - Deep clone an object
- `pick` - Pick specific properties from object
- `omit` - Omit specific properties from object
- `get` - Safe deep property access with default value
- `set` - Safe deep property set
- `isEqual` - Deep strict equality check
- `mapKeys` - Transform object keys
- `mapValues` - Transform object values
- `isPlainObject` - Check if value is a plain object
- `has` - Check if object has property
- `invert` - Invert object keys and values
- `defaults` - Fill missing properties with defaults
- `defaultsDeep` - Fill missing properties with defaults (deep merge)
- `keys` - Get all keys of an object (type-safe)
- `values` - Get all values of an object (type-safe)
- `entries` - Get all entries of an object (type-safe)
- `fromPairs` - Create an object from an array of [key, value] pairs
- `toPairs` - Convert an object to an array of [key, value] pairs
- `size` - Get the size of a collection (array, string, or object)

**String Utilities (20 functions)**

- `camelCase` - Convert string to camelCase
- `pascalCase` - Convert string to PascalCase
- `kebabCase` - Convert string to kebab-case
- `snakeCase` - Convert string to snake_case
- `capitalize` - Capitalize first letter
- `titleCase` - Capitalize first letter of each word
- `truncate` - Truncate string to length with suffix
- `isEmptyString` - Check if string is empty or only whitespace
- `pad` - Pad string to length with character (centered)
- `padStart` - Pad start of string
- `padEnd` - Pad end of string
- `removePrefix` - Remove prefix from string
- `removeSuffix` - Remove suffix from string
- `reverse` - Reverse string
- `countOccurrences` - Count occurrences of substring
- `isAlphanumeric` - Check if string contains only alphanumeric characters
- `isEmail` - Check if string is a valid email
- `isUrl` - Check if string is a valid URL
- `randomString` - Generate random string
- `escapeHtml` - Escape HTML special characters
- `unescapeHtml` - Unescape HTML entities

**Function Utilities (13 functions)**

- `compose` - Compose functions from right to left
- `pipe` - Pipe functions from left to right
- `debounce` - Debounce function execution
- `throttle` - Throttle function execution
- `memoize` - Memoize function results
- `once` - Execute function only once
- `curry` - Partial application (curry)
- `delay` - Delay function execution
- `negate` - Negate function result
- `attempt` - Call function with try-catch and return result or error
- `constant` - Create function that always returns same value
- `identity` - Identity function (returns its argument)
- `noop` - No-op function (does nothing)

**Async Utilities (11 functions)**

- `sleep` - Sleep for specified milliseconds
- `retry` - Retry async function with exponential backoff
- `timeout` - Add timeout to promise
- `parallel` - Run promises in parallel
- `series` - Run promises in series (one after another)
- `concurrency` - Run async function with concurrency limit
- `promisify` - Promisify callback-based function
- `settled` - Wrap promise to never reject
- `race` - Race promises, return first to complete
- `allSettled` - Wait for all promises to settle
- `deferred` - Defer promise creation

**Validation Utilities (13 functions)**

- `isString` - Check if value is a string
- `isNumber` - Check if value is a number (and not NaN)
- `isBoolean` - Check if value is a boolean
- `isArray` - Check if value is an array
- `isObject` - Check if value is a plain object
- `isFunction` - Check if value is a function
- `isDate` - Check if value is a Date instance
- `isRegExp` - Check if value is a RegExp instance
- `isError` - Check if value is an Error instance
- `isNil` - Check if value is null or undefined
- `isEmpty` - Check if value is empty
- `isFinite` - Check if value is a finite number
- `isInteger` - Check if value is an integer

**Number Utilities (10 functions)**

- `clamp` - Clamp a number between min and max values
- `random` - Generate a random number between min and max
- `randomInt` - Generate a random integer between min and max
- `inRange` - Check if a number is within a range
- `sum` - Calculate the sum of numbers
- `mean` - Calculate the mean (average) of numbers
- `min` - Find the minimum value in an array
- `max` - Find the maximum value in an array
- `minBy` - Find the item with the minimum value according to a function
- `maxBy` - Find the item with the maximum value according to a function

**Date Utilities (19 functions)**

- `formatDate` - Format a date to a string
- `parseDate` - Parse a date string
- `addDays` - Add days to a date
- `addMonths` - Add months to a date
- `addYears` - Add years to a date
- `startOfDay` - Get the start of day (00:00:00)
- `endOfDay` - Get the end of day (23:59:59.999)
- `startOfMonth` - Get the start of month
- `endOfMonth` - Get the end of month
- `startOfYear` - Get the start of year
- `endOfYear` - Get the end of year
- `isBefore` - Check if date1 is before date2
- `isAfter` - Check if date1 is after date2
- `isSameDay` - Check if two dates are the same (same day)
- `differenceInDays` - Calculate difference in days between two dates
- `differenceInHours` - Calculate difference in hours between two dates
- `differenceInMinutes` - Calculate difference in minutes between two dates

#### Type Utilities

**Utility Types (30+ types)**

- `DeepPartial` - Make all properties in T optional, recursively
- `DeepReadonly` - Make all properties in T readonly, recursively
- `DeepRequired` - Make all properties in T required, recursively
- `Mutable` - Remove readonly modifier from all properties
- `Merge` - Merge two types, with B overriding A
- `MergeDeep` - Deep merge two types
- `Simplify` - Simplify complex types for better IDE hints
- `ValueOf` - Get union of all values in an object type
- `PartialBy` - Make specific keys optional
- `RequiredBy` - Make specific keys required
- `Nullable` - Make type nullable (T | null | undefined)
- `NonNullableProperties` - Remove null and undefined from all properties
- `KeysOfType` - Extract keys of T where value type extends U
- `Writable` - Make the type writable (removes readonly)
- `WritableDeep` - Make the type deeply writable
- `StrictOmit` - Strict version of Omit that errors if keys don't exist
- `StrictPick` - Strict version of Pick that errors if keys don't exist
- `OptionalKeys` - Extract optional keys from type
- `RequiredKeys` - Extract required keys from type
- `LiteralUnion` - Literal union that preserves autocomplete
- `DiffKeys` - Get the keys that are different between two types
- `Intersection` - Extract properties that exist in both types

**Conditional Types (15+ types)**

- `If` - Conditional type helper: If-Then-Else
- `IsEqual` - Check if two types are equal
- `IsAny` - Check if type is any
- `IsNever` - Check if type is never
- `IsUnknown` - Check if type is unknown
- `IsArray` - Check if type is an array
- `IsTuple` - Check if type is a tuple
- `IsFunction` - Check if type is a function
- `IsPrimitive` - Check if type is a primitive
- `IsObject` - Check if type is an object (not array, not primitive)
- `Extends` - Check if type extends another type
- `HasProperty` - Check if property K exists in type T
- `IsUnion` - Returns true if T is a union type

**Template Literal Types (15+ types)**

- `CamelCase` - Convert string to camelCase
- `PascalCase` - Convert string to PascalCase
- `KebabCase` - Convert string to kebab-case
- `SnakeCase` - Convert string to snake_case
- `Split` - Split string by delimiter
- `Join` - Join array of strings with delimiter
- `Trim` - Trim whitespace from start and end
- `Replace` - Replace first occurrence of From with To
- `ReplaceAll` - Replace all occurrences of From with To
- `StringLength` - Get length of string
- `StartsWith` - Check if string starts with prefix
- `EndsWith` - Check if string ends with suffix
- `Includes` - Check if string includes substring

**Branded Types (3 types)**

- `Brand` - Create a branded type from a base type
- `Opaque` - Create an opaque type alias
- `Unbrand` - Unwrap a branded or opaque type to its base type

**Array Types (11 types)**

- `ArrayElement` - Extract the element type from an array type
- `ArrayLength` - Get the length of an array type
- `Head` - Get the first element of an array type
- `Tail` - Get all elements except the first
- `Last` - Get the last element of an array type
- `Initial` - Get all elements except the last
- `Concat` - Concatenate two array types
- `Push` - Push an element to the end of an array type
- `Pop` - Pop the last element from an array type
- `Shift` - Remove the first element from an array type
- `Unshift` - Add an element to the beginning of an array type
- `Slice` - Extract a slice of an array type

### Documentation

- Added comprehensive JSDoc documentation for all runtime functions
- Each function includes:
  - Parameter descriptions with types
  - Return type descriptions
  - Usage examples
  - Type parameter documentation
- Updated README with complete feature list and statistics
- Added testing and benchmarking instructions

### Testing

- Set up Vitest testing infrastructure
- Created comprehensive test suite with 104 tests
- Test coverage configured for 90%+ threshold
- Test files:
  - `tests/runtime/array.test.ts` - 21 tests
  - `tests/runtime/object.test.ts` - 12 tests
  - `tests/runtime/validation.test.ts` - 29 tests
  - `tests/runtime/number.test.ts` - 20 tests
  - `tests/runtime/date.test.ts` - 22 tests

### Performance

- Added performance benchmarking infrastructure
- Created benchmark files:
  - `benchmarks/array.bench.ts` - Array operation benchmarks
  - `benchmarks/object.bench.ts` - Object operation benchmarks
- Added `pnpm bench` script for running benchmarks

### Infrastructure

- Configured Vitest with coverage reporting
- Set up ESLint with strict TypeScript rules
- Configured Prettier for code formatting
- Added test coverage thresholds (90% lines, functions, statements; 85% branches)
- Tree-shakeable exports for optimal bundle size

### Type Safety

- Strict TypeScript configuration
- Zero `any` types (except where necessary with eslint-disable comments)
- Comprehensive type guards
- Type-safe object utilities
- Branded types for type safety

---

## Summary

This initial release provides:

- **133 runtime utility functions** across 8 categories
- **74+ type utilities** for advanced TypeScript type manipulation
- **100% JSDoc documentation coverage**
- **104 passing tests** with 90%+ coverage threshold
- **Performance benchmarks** for critical operations
- **Production-ready** code quality and type safety

[1.0.0]: https://github.com/kitiumai/utils-ts/releases/tag/v1.0.0
