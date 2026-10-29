# Architecture

## Phase 1 boundary

`school-management-system` is a frontend foundation for a School Management System MVP. This phase contains only project tooling, shared UI primitives, public configuration, and a static setup page. It has no school modules, authentication, API routes, database, student records, or working mock-data service.

## Repository layout

```text
NewSchool/                       # Existing Git repository; preserve its history
├── .git/                        # The only Git repository
├── .agents/                     # Existing workspace tooling, unchanged
├── .cursor/                     # Existing workspace tooling, unchanged
└── school-management-system/    # npm application root
    ├── docs/
    │   ├── architecture.md
    │   ├── rebuild-plan.md
    │   └── git-rules.md
    ├── src/
    │   ├── app/                 # App Router layout, global CSS, placeholder page
    │   ├── components/ui/       # Locally owned shadcn/ui-style primitives
    │   └── lib/                 # Public application config and class utility
    ├── .env.example             # Safe, committed configuration template
    ├── .gitignore
    ├── components.json          # shadcn-compatible aliases and styling settings
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json        # Committed reproducible dependency graph
    ├── .prettierrc.json
    ├── .prettierignore
    └── tsconfig.json
```

Generated dependencies and build output do not belong in Git. Empty future module folders are intentionally omitted; introduce them only with an approved feature.

## Technology and boundaries

- Next.js 16 App Router with React 19 and strict TypeScript. Pages and layouts remain Server Components by default; interactive primitives use a client boundary only where needed.
- Tailwind CSS 4 through the scaffold's Turbopack integration. Semantic CSS variables are defined in `src/app/globals.css`.
- Locally owned shadcn/ui-style Button and Card components, with Radix Slot for composition, class-variance-authority for variants, and clsx/tailwind-merge for class names. There is no full component library or dashboard.
- `@/*` resolves to `src/*`. Routes compose UI; `components/ui` stays domain-independent; `lib` holds small shared utilities.
- ESLint uses the Next.js Core Web Vitals and TypeScript rules. Prettier owns formatting; eslint-config-prettier disables conflicting style rules.
- npm is the only package manager. Commit both dependency manifests, and use `npm ci` when restoring a clone.

## Public configuration

`src/lib/config.ts` reads explicitly named `NEXT_PUBLIC_` variables with the same defaults as `.env.example`. The boolean setting is compared to the string `"true"`, not coerced with `Boolean()`.

Every `NEXT_PUBLIC_` value can be exposed to the browser and is embedded at build time. Never put secrets, credentials, or student information there. Restart development or rebuild production after changing these values. Mock mode is a future integration setting; Phase 1 has no mock records or network calls. Currency defaults to TZS; financial logic is not implemented.

## Foundation decisions

- Preserve the existing `NewSchool` repository and `master` branch instead of introducing nested Git history. Its configured `origin` already points to GitHub.
- Keep the application in its requested named directory without changing the workspace's skills package.
- Use a restrained, accessible setup screen with local font fallbacks and semantic tokens. Product branding, navigation, theme switching, and module layouts are deferred.
- Do not choose a backend, authentication provider, database, state-management framework, or deployment platform in this phase.

## Verification

From the application root, run `npm run check` and `npm run build`. The check script verifies formatting, lint, and generated Next.js route types plus TypeScript. No business logic exists yet, so no module test suite is claimed. Add behavior tests alongside future features.
