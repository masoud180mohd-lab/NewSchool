# NewSchool

School Management System — greenfield project workspace.

This repository is a fresh start for building a new school management platform, with the same agent skills and development tooling baseline as [EduCore](https://github.com/masoud180mohd-lab/EduCore).

## Skills

Project skills live in `.agents/skills/` and are tracked in `skills-lock.json`. Additional Cursor skills are in `.cursor/skills/`.

To install or update skills from the registry:

```bash
npx skills add addyosmani/agent-skills@api-and-interface-design -y
npx skills check
npx skills update
```

Browse available skills at [skills.sh](https://skills.sh/).

## Getting started

The Phase 1 Next.js application lives in [`school-management-system/`](school-management-system/README.md). It includes TypeScript, Tailwind CSS, shadcn/ui-style primitives, ESLint, Prettier, and Git safety documentation. School modules are not built yet.

From this workspace root in PowerShell, run each command separately:

```powershell
npm.cmd --prefix school-management-system ci
Copy-Item school-management-system/.env.example school-management-system/.env.local
npm.cmd --prefix school-management-system run dev
```

Copy the environment template only on first setup; preserve existing local values. See the [application README](school-management-system/README.md) for all checks and setup instructions.

## Git backup

The application uses this existing Git repository, not a nested repository. A local commit is not an off-device backup. After creating a verified commit, push Phase 1 with:

```powershell
git -C C:\Users\masou\NewSchool push -u origin master
```

Confirm the commit appears on GitHub. See [Git rules and recovery](school-management-system/docs/git-rules.md).

## Structure

```
NewSchool/
├── .agents/skills/     # Project agent skills (development, design, security)
├── .cursor/skills/     # Extended Cursor skills library
├── skills-lock.json    # Installed skills lockfile
├── school-management-system/  # Phase 1 Next.js application and docs
└── README.md
```

## License

Private — all rights reserved.
