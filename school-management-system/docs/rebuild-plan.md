# Rebuild Plan

## Principle

Recover the frontend in small, verifiable increments. Git safety comes before features. A local commit is a restore point, not an off-device backup; push it to GitHub and verify the remote copy before relying on it.

## Phase 1: Safety and foundation

Deliver only:

1. A named Next.js App Router application with TypeScript, Tailwind CSS, ESLint, Prettier, and npm.
2. A clean `src/app`, `src/components/ui`, and `src/lib` structure with minimal shadcn/ui-style primitives.
3. A Next.js `.gitignore`, committed lockfile, and a safe `.env.example`.
4. A README with setup and Git backup instructions, plus architecture, rebuild-plan, and Git-rules documents.
5. A static foundation page, without full modules or sample student information.
6. Passing formatting, lint, type-check, and production-build checks.
7. A local commit named exactly `chore: initial project setup`.
8. The exact GitHub push command for the existing repository. Pushing is a separate user action, not performed automatically.

Keep the existing repository history, branch, remote, and workspace tooling intact. Do not initialize a nested repository or replace the earlier workspace commit.

## Completion evidence

Verify the requested setup commit with `git log -1 --oneline`. Verify a clean working tree with `git status --short`. Check that `.env.example` and `package-lock.json` are tracked while local environment files, dependencies, and build output are ignored. Follow `git-rules.md` to push and confirm the remote backup.

## Later phases: pending approval

Later work may introduce an application shell, role-aware navigation, typed mock-data contracts, and individual school workflows. Their requirements and order are intentionally not decided here.

Before each later phase:

- Agree on scope and acceptance criteria.
- Confirm the previous work is committed and pushed.
- Use a short-lived branch and implement one small behavior at a time.
- Add relevant tests, run the quality checks, inspect the diff, and save a verified commit.
- Push the branch and confirm the remote contains the new work.

## Explicitly out of scope

Authentication, permissions, dashboards, student/teacher management, attendance, examinations, fees, reports, real integrations, databases, deployment, and production data are not implemented in Phase 1.
