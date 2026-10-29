# Git Rules

## Safety first

- This application belongs to the existing `NewSchool` Git repository. Run Git commands from `NewSchool` unless a command specifies a path. Do not create a second `.git` directory inside the application.
- Preserve existing commits. Do not overwrite history, force-push, discard uncommitted work, or delete branches without explicit approval.
- Inspect `git status` and the diff before staging. Stage named paths, not unrelated workspace changes.
- Never commit local `.env` files, secrets, credentials, private keys, real school data, `node_modules`, `.next`, coverage, or generated build artifacts.
- Commit `.env.example` with safe public defaults and commit `package-lock.json` with `package.json`. A `NEXT_PUBLIC_` variable is public, never a place for secrets.
- Do not use force-add to bypass ignore rules. If a secret is accidentally committed, rotate it immediately and arrange a deliberate cleanup; ignoring the file later does not remove it from history.
- Keep changes small and commit after successful verification. Use descriptive conventional commit messages.
- A local commit is not a GitHub backup. Push completed work, verify the remote branch, and check that GitHub shows the expected commit and files.
- Store sensitive environment values separately in an approved password manager or secret store; they cannot be recovered from this repository.

## Existing repository

- Git root: `C:\Users\masou\NewSchool`
- Application: `C:\Users\masou\NewSchool\school-management-system`
- Branch at Phase 1: `master`
- Remote: `origin`
- GitHub URL: `https://github.com/masoud180mohd-lab/NewSchool.git`
- Foundation commit message: `chore: initial project setup`

Git was already initialized. The setup commit is the first application-foundation commit, not a rewrite of the original workspace commit. No identity, remote, or branch configuration is changed by this setup.

## Verify and save a future change

From the Git root in PowerShell, run each check and stop if it fails:

```powershell
git status --short
git diff -- school-management-system
npm.cmd --prefix school-management-system run check
npm.cmd --prefix school-management-system run build
```

After successful checks, stage only the intended files (the following stages the application directory), inspect them for secrets and unrelated work, then commit:

```powershell
git add -- school-management-system
git diff --cached --stat
git diff --cached
git commit -m "chore: describe the verified change"
git status --short
```

For later features, create a short-lived branch before editing, for example `git switch -c feature/application-shell`. Do not make extra commits or publish changes on the user's behalf without authorization.

## Push Phase 1 to GitHub

The existing remote needs no `git remote add` command. Authenticate with GitHub if prompted, then run:

```powershell
git -C C:\Users\masou\NewSchool push -u origin master
```

Do not force-push if Git rejects this command. Inspect the error and remote history first; fetching is safe, but integrating diverged histories requires a deliberate decision. Later feature branches should be pushed by their own names, not by repeating the Phase 1 `master` command.

## Verify the backup

```powershell
git -C C:\Users\masou\NewSchool rev-parse HEAD
git -C C:\Users\masou\NewSchool ls-remote origin refs/heads/master
git -C C:\Users\masou\NewSchool status -sb
```

After a successful Phase 1 push, the local `HEAD` hash and the remote `master` hash should match. Confirm the commit and the `school-management-system` directory on GitHub. A clean working tree by itself proves neither that files are pushed nor that remote backup exists.

## Recovery on another machine

Clone into a new, unused directory:

```powershell
git clone https://github.com/masoud180mohd-lab/NewSchool.git NewSchool-restored
Set-Location NewSchool-restored\school-management-system
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run check
npm.cmd run build
npm.cmd run dev
```

Only commits successfully pushed to GitHub can be recovered this way. Recreate ignored local configuration from your secure backup, not from Git history. For an accidental deletion while local history is still available, first inspect `git status` and `git log`; restore the specific files from a known-good commit only after confirming that no newer local work will be overwritten.
