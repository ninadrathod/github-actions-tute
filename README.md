# GitHub Actions CI/CD Tutorial

A single-page, beginner-friendly tutorial for **GitHub Actions in a CI/CD context**. It includes factory-themed diagrams, real YAML examples, monitoring guidance, and **100 interactive multiple-choice questions** (10 per section).

## What's Included

| File | Purpose |
|------|---------|
| `index.html` | Tutorial content, inline SVG diagrams, Tailwind CSS layout |
| `script.js` | Mobile navigation, scroll-spy TOC, 100 MCQ quiz cards |
| `CNAME` | Custom domain placeholder for GitHub Pages |
| `README.md` | This deployment guide |

## Local Preview

No build step required — open the file directly or serve it locally:

```bash
# Option 1: Open directly in a browser
open index.html

# Option 2: Simple local server (recommended for accurate link behavior)
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## Hosting on GitHub Pages

Because this repository is **private**, there are important visibility and billing rules to understand before enabling Pages.

### Private Repo + GitHub Pages: What You Need to Know

| Account Type | GitHub Pages on Private Repos |
|--------------|-------------------------------|
| **GitHub Free** | ❌ Not available for private repositories |
| **GitHub Pro** (individual) | ✅ Available — site visibility can be public or private |
| **GitHub Team / Enterprise** | ✅ Available for organization private repos |

**Bottom line:** If you are on the **free plan** and want to keep this repo **private**, you must either:

1. **Upgrade to GitHub Pro** (~$4/month) to use Pages on a private repo, **or**
2. **Make the repository public** (free GitHub Pages on public repos), **or**
3. **Deploy elsewhere** (Netlify, Vercel, Cloudflare Pages) while keeping the repo private

> **Security note:** Making a repo public exposes all committed files to the internet, including any secrets accidentally committed to history. Review your repo for `.env` files, API keys, or credentials **before** changing visibility.

---

### Option A: Make the Repository Public, Then Enable Pages (Free)

This is the simplest path if you do not need the repo to stay private.

#### Step 1 — Review for secrets

```bash
# Search for common secret patterns before going public
git log --oneline
git grep -i "password\|secret\|api_key\|token" || true
```

Remove any sensitive files and rotate any exposed credentials.

#### Step 2 — Change repository visibility to Public

1. Go to your repository on GitHub.
2. Click **Settings** (top navigation).
3. Scroll to the **Danger Zone** at the bottom.
4. Click **Change repository visibility** → select **Public**.
5. Confirm by typing the repository name.

#### Step 3 — Push your tutorial files

```bash
git add index.html script.js CNAME README.md
git commit -m "Add GitHub Actions CI/CD tutorial site"
git push origin main
```

> Replace `main` with your default branch name if different (e.g., `master`).

#### Step 4 — Enable GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` → `/ (root)` → **Save**
3. Wait 1–3 minutes. GitHub displays your live URL:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

#### Step 5 — (Optional) Custom domain via CNAME

1. Edit `CNAME` and replace the placeholder:
   ```
   www.yourcustomdomain.com
   ```
2. Commit and push the change.
3. At your domain registrar, add DNS records:
   - **CNAME** record: `www` → `<your-username>.github.io`
   - Or **A records** for apex domain → GitHub Pages IPs (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
4. Back in **Settings → Pages**, enable **Enforce HTTPS** once DNS propagates.

---

### Option B: Keep the Repository Private (Requires GitHub Pro)

If you have **GitHub Pro**, you can host Pages without making the repo public.

#### Step 1 — Verify your plan

1. Go to **github.com/settings/billing**.
2. Confirm you are on **GitHub Pro** or higher.

#### Step 2 — Push files and enable Pages

Follow **Option A, Steps 3–5** above. The workflow is identical.

#### Step 3 — Choose site visibility

In **Settings → Pages**, GitHub Pro lets you set:

- **Public** — anyone with the URL can view the site (repo stays private).
- **Private** — only people with repo access can view the site.

For a public tutorial, choose **Public** site visibility even if the repo is private.

---

### Option C: Deploy to Netlify/Vercel (Repo Stays Private, Free Tier)

If you want a **private repo** without paying for GitHub Pro:

#### Netlify

1. Sign up at [netlify.com](https://www.netlify.com).
2. **Add new site → Import an existing project → GitHub**.
3. Select this private repository.
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `/` (root)
5. Click **Deploy site**.

#### Vercel

1. Sign up at [vercel.com](https://vercel.com).
2. **Add New Project → Import** your GitHub repo.
3. Framework preset: **Other** (static HTML).
4. Deploy — no build command needed.

Both platforms provide a free `*.netlify.app` or `*.vercel.app` URL and support custom domains.

---

## Verifying Your Deployment

After deployment, confirm:

- [ ] Hero section and factory-themed layout render correctly
- [ ] Desktop: sticky sidebar TOC navigates to sections
- [ ] Mobile: hamburger menu opens slide-out navigation
- [ ] All 10 tutorial sections display with SVG diagrams
- [ ] Each section has 10 quiz cards with working accordion reveals
- [ ] Total: 100 questions across all sections

Open the browser console — you should see:
```
[Quiz] Total questions: 100
[Quiz] Correct answer distribution — A:25 B:25 C:25 D:25
```

---

## Project Structure

```
github-actions-tute/
├── index.html      # Main tutorial page
├── script.js       # Navigation + 100 MCQs
├── CNAME           # Custom domain (GitHub Pages)
└── README.md       # This file
```

---

## Customization

- **Theme colors:** Edit the `tailwind.config` block in `index.html`.
- **Quiz questions:** Edit the `QUIZ_DATA` object in `script.js`.
- **New sections:** Add an `<article>` in `index.html`, a entry in `SECTIONS` and `QUIZ_DATA` in `script.js`.

---

## License

Tutorial content is provided for educational purposes. Feel free to fork, adapt, and share.
