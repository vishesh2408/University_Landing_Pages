# Push Project to GitHub (Quick Instructions)

Follow these PowerShell steps from the project root to create a GitHub repo using the GitHub CLI and push your local code.

1) Open PowerShell and go to the repo root:

```powershell
cd "C:\Users\hp\Desktop\API and Landing Pages\university-landing"
```

2) Initialize git (if not already) and commit:

```powershell
# Initialize (skip if already a git repo)
git init

# Create .gitignore if you haven't already (this repo already contains one)
# Stage everything and commit
git add .
git commit -m "Initial commit"
```

3) Login to GitHub via `gh` (one-time interactive):

```powershell
gh auth login
```

4) Create the GitHub repo and push (replace YOUR_GH_USERNAME):

```powershell
# Public repo
gh repo create YOUR_GH_USERNAME/university-landing --public --source=. --remote=origin --push

# Or private repo
# gh repo create YOUR_GH_USERNAME/university-landing --private --source=. --remote=origin --push
```

Notes and checks:
- Replace `YOUR_GH_USERNAME` with your GitHub username or organization.
- If `gh` is not installed, download it from https://cli.github.com/ or use the manual flow (create repo on github.com, then `git remote add origin ...` and `git push`).

Manual flow (no `gh`):

```powershell
# After creating repo on github.com and copying the HTTPS/SSH URL:
git branch -M main
git remote add origin https://github.com/YOUR_GH_USERNAME/university-landing.git
git push -u origin main
```

Optional: Add a CI workflow (example):
- For a simple GitHub Actions build: create `.github/workflows/ci.yml` that builds the frontend with Node 18 and optionally runs backend lint/tests.

If you'd like, I can create the `PUSH_INSTRUCTIONS.md` commit, add a `README.md` replacement, or add a GitHub Actions skeleton file now. Which do you prefer?