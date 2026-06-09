---
name: react-doctor
description: Use when finishing a feature, fixing a bug, before committing React code, or when the user wants to improve code quality or clean up a codebase. Checks for score regression. Covers lint, dead code, accessibility, bundle size, architecture diagnostics.
version: "1.0.0"
---

# React Doctor

Scans React codebases for security, performance, correctness, and architecture issues. Outputs a 0–100 health score.

## After making React code changes:

Run `bun run doctor` and keep the project at `100/100`.

If React Doctor reports any warning or score regression, fix it before finishing the task.

## For general cleanup or code improvement:

Run `bun run doctor` to scan the full codebase. Fix issues by severity — errors first, then warnings.

## Command

```bash
bun run doctor
```

| Project command      | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `bun run doctor`     | Full strict scan; fails on warnings; no inline suppressions |
| `bun run doctor:score` | Output only the numeric score                             |
