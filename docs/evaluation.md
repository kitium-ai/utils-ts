# utils-ts Evaluation and Recommendations

This document reviews the current package against conventions commonly used by large-scale TypeScript utility libraries (e.g., lodash, ts-toolbelt, and internal big-tech shared utility stacks) and outlines improvements to strengthen consistency, reusability, and API ergonomics.

## Current strengths
- **Clear feature surface**: README describes 74+ type utilities and 133 runtime helpers across arrays, objects, strings, async, validation, numbers, and dates, mirroring the breadth expected of mature utility kits.【F:README.md†L13-L122】
- **Tree-shaking ready exports**: Package uses ESM with subpath exports for `types`, `runtime`, and `integrations`, and marks `sideEffects: false` for bundler friendliness.【F:package.json†L6-L31】
- **Testing and tooling hooks**: Scripts cover build, lint, formatting, coverage, benches, and type tests—matching the automation discipline of large internal libraries.【F:package.json†L46-L74】

## Gaps compared to big-tech utility stacks
- **API shape consistency**: Data-first functions coexist with options objects only sporadically (e.g., `chunk` throws an error for bad size rather than returning a Result-like object).【F:src/runtime/array.ts†L5-L190】 Teams at scale favor uniform signatures (data-first *and* data-last variants, options bags, predictable error channels) to reduce cognitive load.
- **Subpath discoverability**: While exports exist for `types`, `runtime`, and `integrations`, there are no fine-grained subpaths (e.g., `@kitiumai/utils-ts/runtime/array`) to support smallest-possible bundles and clearer ownership boundaries—common in Google/Meta-style utility layers.【F:package.json†L10-L31】
- **Runtime/type parity**: Type utilities and runtime helpers are documented separately, but there is no guidance or enforcement ensuring a runtime helper has a matching type-level helper (e.g., typed predicates returning type guards). Big-tech libraries often pair the two to enable exhaustiveness and safer refactors.
- **Error semantics and observability**: Functions typically throw generic `Error` objects (e.g., `chunk` uses `new Error(...)`).【F:src/runtime/array.ts†L19-L29】 Larger platforms standardize error classes, logging hooks, and optional telemetry metadata to keep behavior predictable in production services.
- **Versioned stability surface**: There is no documented stability policy (LTS vs. experimental) for specific helpers. Companies with broad dependency graphs label stability and provide migration notes per release train.
- **Documentation depth**: README lists functions but lacks per-module API references, performance notes, and examples comparing data-first vs. data-last usage. Mature stacks expose a structured docs site and playground examples for common workflows.

## Recommendations
1. **Codify API conventions**
   - Introduce guidelines for parameter order (data-first + curried data-last), mandatory options objects for configurable behavior, and consistent return shapes (e.g., `Result` or tagged unions for recoverable errors). Begin by refactoring high-usage helpers like `chunk`, `groupBy`, and `intersection` to follow the pattern, keeping existing signatures as wrappers for backward compatibility.【F:src/runtime/array.ts†L5-L190】

2. **Expand subpath exports**
   - Add granular subpaths in `package.json` such as `./runtime/array`, `./runtime/object`, and `./types/array` to enable targeted imports and smaller bundles. Provide a migration note in the README showing both high-level and fine-grained imports.【F:package.json†L10-L31】【F:README.md†L88-L96】

3. **Pair runtime helpers with type-safe counterparts**
   - For predicates (e.g., `isString`, `isNumber`), ensure return types are type guards and add complementary type utilities (e.g., `Truthy<T>`). Document the pairing policy and add tests that verify runtime/type alignment using `tsd` and runtime assertions.

4. **Standardize error handling and telemetry hooks**
   - Replace ad-hoc `Error` throws with a small hierarchy (e.g., `UtilsError` with `code`, `details`, and optional `cause`). Provide optional logger/metrics callbacks (leveraging `@kitiumai/logger`) that can be injected globally or per-call, matching instrumentation expectations in production stacks.【F:package.json†L110-L113】

5. **Adopt stability channels and deprecation workflow**
   - Classify APIs as `stable`, `beta`, or `experimental` in documentation and release notes. Use a lint rule or metadata map to prevent accidental promotion/removal without a Changeset entry. Add a migration section to releases to mirror big-tech reliability guarantees.【F:README.md†L114-L121】

6. **Invest in documentation and discoverability**
   - Generate module-level docs (e.g., via TypeDoc) grouped by domain with live code samples. Add a “recipes” section for common patterns (debounced fetch, safe deep merge, retry with timeouts) and highlight tree-shakable import paths. Link docs from README and consider a Storybook-style playground for runtime helpers.【F:README.md†L13-L96】

7. **Performance and compatibility baselines**
   - Add micro-benchmarks for core helpers (clone/merge, groupBy, debounce) with budgets and regression alerts. Document compatibility matrices for Node/browser targets and bundlers, mirroring internal SLO-style tracking seen in big-tech toolchains.【F:package.json†L46-L74】

Implementing these steps will align the package with the consistency, safety, and observability standards typically required in large engineering organizations while keeping the existing breadth of utilities.
