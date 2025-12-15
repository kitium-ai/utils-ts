# Contributing to @kitiumai/utils-ts

Thank you for your interest in contributing to @kitiumai/utils-ts! This document provides guidelines and information for contributors.

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Build the project: `pnpm build`

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass: `pnpm test:coverage`
5. Run benchmarks: `pnpm bench`
6. Update documentation if needed
7. Create a pull request

## Testing

- Write unit tests for all new functions
- Include property-based tests for complex logic
- Maintain >90% code coverage
- Test edge cases and error conditions

## Performance

- Add benchmarks for performance-critical functions
- Ensure no performance regressions
- Consider memory usage for large data sets

## Documentation

- Add JSDoc comments to all public APIs
- Update README with examples for new features
- Keep API documentation up to date

## Commit Messages

Use conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `perf:` for performance improvements

## Pull Request Process

1. Ensure CI passes
2. Get at least one approval
3. Squash commits if needed
4. Merge using "Squash and merge"

## Issues

- Use issue templates when creating new issues
- Provide clear reproduction steps for bugs
- Include expected vs actual behavior

## Security

- Report security issues via email to security@kitiumai.com
- Do not commit secrets or sensitive information
- Run security checks before releases
