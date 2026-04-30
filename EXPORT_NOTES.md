# FixaPE Public Export Notes

This folder is intended to become a new clean public GitHub repository for the FixaPE static website.

Do not copy or preserve the old private repository `.git` history. Start with a fresh public repository and make a new first commit from these files.

Do not commit local or generated files such as:

- `node_modules/`
- `.next/`
- `out/`
- `coverage/`
- `.env` or `.env*`
- `*.sqlite`, `*.db`
- `*.log`
- local editor or OS files

Recommended first public commit sequence:

```bash
git init
git branch -M main
git add .
git commit -m "Initial static FixaPE website"
git remote add origin <PUBLIC_REPOSITORY_URL>
git push -u origin main
```
