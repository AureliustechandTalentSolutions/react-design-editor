# Technical Debt Tracker

## Current Debt Items

### High Priority

| Item | File | Description | Effort | Impact |
| ---- | ---- | ----------- | ------ | ------ |
| Console.log statements | src/serviceWorker.ts | 4 console.log statements for logging | Small | Low |
| Console.log statements | src/canvas/handlers/FiberHandler.ts:13 | Debug console.log | Small | Low |
| Console.log statements | src/canvas/handlers/EventHandler.ts:124 | Debug console.log | Small | Low |
| Console.log statements | src/canvas/objects/Link.ts:167 | Debug console.log | Small | Low |

### Medium Priority

| Item | File | Description | Effort | Impact |
| ---- | ---- | ----------- | ------ | ------ |
| TODO comment | src/canvas/handlers/DrawingHandler.ts:151 | polygon resize | Medium | Medium |
| TODO comment | src/canvas/handlers/Handler.ts:1383 | Incomplete implementation | Medium | Medium |
| TODO comment | src/canvas/handlers/GuidelineHandler.ts:374 | object scaling guideline | Medium | Medium |
| TODO comment | src/canvas/handlers/EventHandler.ts:182 | Element object incorrect position | Medium | High |
| TODO comment | src/canvas/handlers/EventHandler.ts:226 | scaling guidelines | Medium | Medium |
| TODO comment | src/canvas/handlers/LinkHandler.ts:115 | Incomplete implementation | Medium | Medium |
| Security vulnerabilities | package.json | 35 vulnerabilities (16 moderate, 16 high, 3 critical) | Large | High |

### Low Priority

| Item | File | Description | Effort | Impact |
| ---- | ---- | ----------- | ------ | ------ |
| -    | -    | -           | -      | -      |
| -    | -    | -           | -      | -      |

## Resolved Debt

| Item | Resolution Date | PR  |
| ---- | --------------- | --- |
| -    | -               | -   |

## Debt Prevention Guidelines

1. No TODO comments without linked issues
2. No @ts-ignore without explanation
3. No any types without justification
4. All functions must have JSDoc
5. Test coverage must not decrease

## Notes

This document tracks technical debt in the codebase. Use it to:

- Document known issues that need to be addressed
- Track progress on debt reduction
- Prevent new debt from accumulating

When adding new debt items, include:

- Clear description of the problem
- File location and line numbers
- Estimated effort (Small/Medium/Large)
- Impact on codebase (Low/Medium/High)
