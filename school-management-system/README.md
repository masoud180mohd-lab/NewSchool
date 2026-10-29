# School Management System

`school-management-system` is the MVP frontend foundation for a School Management System, rebuilt with Git safety first after local code loss. **Phase 1 is setup only:** a minimal foundation page and reusable UI primitives, with no school modules, backend, authentication, or real student data.

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript with strict checking
- Tailwind CSS 4
- shadcn/ui-style, locally owned Button and Card components
- Radix Slot, class-variance-authority, clsx, and tailwind-merge
- ESLint with Next.js rules, plus Prettier
- npm with a committed `package-lock.json`

## Setup

Requirements: Node.js 22.13 or newer in the 22.x LTS line (Node.js 24 LTS also supported), npm, and Git. This application is a subdirectory of the existing `NewSchool` repository; run npm commands from this directory, not the workspace root.

For a fresh clone:

```powershell
git clone https://github.com/masoud180mohd-lab/NewSchool.git
Set-Location NewSchool\school-management-system
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

For the current workspace, start at `C:\Users\masou\NewSchool\school-management-system` and run the last three commands. Copy the environment template only on first setup; do not overwrite an existing local configuration. Open <http://localhost:3000> after the development server starts.

PowerShell commands use `npm.cmd` because some Windows execution policies block `npm.ps1`. This does not require changing execution policy. In Command Prompt or other shells, ordinary `npm` works; on macOS/Linux use `cp .env.example .env.local` instead of `Copy-Item`.

## Environment

The committed `.env.example` contains only public defaults:

```dotenv
NEXT_PUBLIC_APP_NAME=School Management System
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_DEFAULT_CURRENCY=TZS
```

All `NEXT_PUBLIC_` values may be exposed to the browser. Never store secrets or school records in them. `.env.local` and other local environment files are ignored by Git. Restart development or rebuild production after changing public values. The mock setting is reserved for future work; no mock-data module exists yet.

## Commands

Run these from the application directory. Use `npm.cmd` instead of `npm` in restricted PowerShell environments.

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm ci`               | Install the exact locked dependencies     |
| `npm run dev`          | Start local development                   |
| `npm run lint`         | Check Next.js and TypeScript lint rules   |
| `npm run typecheck`    | Generate route types and check TypeScript |
| `npm run format`       | Format source, configuration, and docs    |
| `npm run format:check` | Check formatting without changes          |
| `npm run check`        | Run formatting, lint, and type checks     |
| `npm run build`        | Verify a production build                 |
| `npm start`            | Serve the production build locally        |

No business modules or automated module tests are included in Phase 1. Add behavior tests with later approved features.

## Project structure

```text
src/
├── app/                 # App Router entry points and theme tokens
├── components/ui/       # shadcn/ui-style Button and Card primitives
└── lib/                 # Shared class utility and public configuration
docs/
├── architecture.md      # Boundaries and foundation decisions
├── rebuild-plan.md      # Phase 1 scope and future gates
└── git-rules.md          # Save, push, verify, and recover safely
```

`components.json` establishes shadcn-compatible paths and CSS-variable conventions. Components are owned locally; add more only when an approved feature needs them.

## Git backup instructions

Git is already initialized at `C:\Users\masou\NewSchool`, with the application tracked inside it. Keep the existing history and `master` branch; do not initialize a nested repository. The foundation commit message is `chore: initial project setup`.

After reviewing the changes and passing checks, commit small increments. Track source, documentation, `.env.example`, `package.json`, and `package-lock.json`. Never track `.env.local`, `node_modules`, or `.next`. See [Git rules](docs/git-rules.md) for the safe staging workflow.

The repository already has `origin` set to `https://github.com/masoud180mohd-lab/NewSchool.git`. Push Phase 1 using this exact command:

```powershell
git -C C:\Users\masou\NewSchool push -u origin master
```

**A local commit is not an off-device backup.** The setup process does not push automatically. After your push succeeds, verify that the commit appears on GitHub and compare these hashes:

```powershell
git -C C:\Users\masou\NewSchool rev-parse HEAD
git -C C:\Users\masou\NewSchool ls-remote origin refs/heads/master
```

They should match immediately after the Phase 1 push. If a push is rejected, investigate before changing history; never force-push as a shortcut. Keep secrets in a separate secure backup. To recover after local loss, clone the repository into a new directory and repeat setup; only pushed commits will be recoverable from GitHub.

## Documentation

- [Architecture](docs/architecture.md)
- [Rebuild plan](docs/rebuild-plan.md)
- [Git rules and recovery](docs/git-rules.md)
