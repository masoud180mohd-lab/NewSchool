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

```bash
npm install
```

## Structure

```
NewSchool/
├── .agents/skills/     # Project agent skills (development, design, security)
├── .cursor/skills/     # Extended Cursor skills library
├── skills-lock.json    # Installed skills lockfile
└── README.md
```

## License

Private — all rights reserved.
