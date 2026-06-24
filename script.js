/* GitHub Actions CI/CD Tutorial — script.js */

// ─── Table of Contents ───────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'prerequisites',   label: '01 · Prerequisites' },
  { id: 'cicd',            label: '02 · What Is CI/CD?' },
  { id: 'overview',        label: '03 · GitHub Actions Overview' },
  { id: 'anatomy',         label: '04 · Workflow Anatomy' },
  { id: 'first-workflow',  label: '05 · Your First Workflow' },
  { id: 'jobs',            label: '06 · Jobs, Steps & Runners' },
  { id: 'secrets',         label: '07 · Secrets & Variables' },
  { id: 'monitoring',      label: '08 · Monitoring & Metrics' },
  { id: 'practices',       label: '09 · Best Practices' },
  { id: 'examples',        label: '10 · Examples & Troubleshooting' },
];

const LETTERS = ['A', 'B', 'C', 'D'];

// ─── 100 MCQs — 10 per section, correctIndex cycles 0→1→2→3 evenly ─────────
const QUIZ_DATA = {

  prerequisites: [
    {
      q: "What is the minimum account requirement to use GitHub Actions?",
      options: ["A GitHub account (free tier works)","A paid GitHub Enterprise account","An AWS account","A Docker Hub account"],
      correct: 0,
      explain: "GitHub Actions is available on free GitHub accounts for public repositories, with a generous monthly minutes allowance. You do not need a paid plan to get started."
    },
    {
      q: "Which version control skill is essential before learning GitHub Actions?",
      options: ["Basic Git operations like clone, commit, and push","Advanced merge conflict resolution only","Git bisect and cherry-pick","Subversion (SVN) experience"],
      correct: 0,
      explain: "GitHub Actions triggers on Git events (push, PR, etc.), so you need to understand how to commit and push code to a GitHub repository."
    },
    {
      q: "Where are GitHub Actions workflow files stored in a repository?",
      options: ["In the root directory as workflow.yml","In the docs/ folder","In the .github/workflows/ directory","In the .actions/ directory"],
      correct: 2,
      explain: "GitHub automatically detects YAML workflow files placed in .github/workflows/. This is a convention, not optional."
    },
    {
      q: "What file format are GitHub Actions workflows written in?",
      options: ["JSON","TOML","XML","YAML"],
      correct: 3,
      explain: "Workflows use YAML (.yml or .yaml). YAML relies on indentation (spaces, not tabs) to define structure."
    },
    {
      q: "Which tool is recommended for editing workflow files locally?",
      options: ["A code editor like VS Code","Microsoft Word","A web browser only","Photoshop"],
      correct: 0,
      explain: "A code editor provides syntax highlighting, YAML linting, and Git integration — all helpful when writing workflows."
    },
    {
      q: "What does \"repo\" short for in the GitHub context?",
      options: ["Report","Repository","Repost","Replication"],
      correct: 1,
      explain: "A repository (repo) is a project folder on GitHub containing your code, history, and configuration files including workflows."
    },
    {
      q: "Why is understanding branches helpful before using CI/CD?",
      options: ["Branches are only for documentation","Workflows often trigger on specific branches like main","Branches disable GitHub Actions","Branches replace the need for workflows"],
      correct: 1,
      explain: "Most CI workflows use on: push: branches: [main] to run only on certain branches. Understanding branches helps you configure triggers correctly."
    },
    {
      q: "What command-line knowledge might you need in a workflow step?",
      options: ["GUI design tools","3D modeling software","Photo editing","Running tests like npm test or pytest"],
      correct: 3,
      explain: "Workflow steps often execute shell commands such as npm test, pip install, or docker build. Basic CLI familiarity is useful."
    },
    {
      q: "Is prior CI/CD experience required for this tutorial?",
      options: ["No — this tutorial starts from absolute basics","Yes — at least 5 years required","Only if using self-hosted runners","Only for private repositories"],
      correct: 0,
      explain: "This tutorial is designed for absolute beginners. CI/CD concepts are explained using simple factory analogies."
    },
    {
      q: "What is a Pull Request (PR) in simple terms?",
      options: ["A request to delete the repository","A proposal to merge your code changes for review","A billing invoice from GitHub","A type of GitHub Action"],
      correct: 1,
      explain: "A Pull Request is how you propose changes on a branch and ask teammates to review before merging. Workflows commonly trigger on pull_request events."
    }
  ],

  cicd: [
    {
      q: "What does CI stand for in CI/CD?",
      options: ["Centralized Infrastructure","Code Inspection","Continuous Integration","Cloud Installation"],
      correct: 2,
      explain: "CI = Continuous Integration — automatically building and testing code every time it changes, catching bugs early."
    },
    {
      q: "What is the main goal of Continuous Integration?",
      options: ["Deploy directly to production without tests","Replace all developers with robots","Archive old code permanently","Automatically build and test code on every change"],
      correct: 3,
      explain: "CI ensures every code change is built and tested immediately, so defects are found before they reach production."
    },
    {
      q: "In the factory analogy, what role does CI play?",
      options: ["Quality inspection on the assembly line","Shipping finished products to customers","Designing the factory building","Hiring factory workers"],
      correct: 0,
      explain: "CI is like a quality inspector checking every part on the line — bad code is rejected before moving forward."
    },
    {
      q: "What does CD typically refer to in CI/CD pipelines?",
      options: ["Code Deletion","Compiled Documentation","Continuous Delivery or Continuous Deployment","Central Database"],
      correct: 1,
      explain: "CD means automatically preparing (Delivery) or releasing (Deployment) verified code to staging or production environments."
    },
    {
      q: "What is the difference between Continuous Delivery and Continuous Deployment?",
      options: ["They are identical terms","Deployment is slower than Delivery","Delivery requires a manual approval step; Deployment is fully automatic","Delivery only works for mobile apps"],
      correct: 2,
      explain: "Continuous Delivery means code is always deploy-ready but may need a human click. Continuous Deployment pushes to production automatically after tests pass."
    },
    {
      q: "Why is CI/CD important for team projects?",
      options: ["It eliminates the need for code reviews","It prevents all security vulnerabilities","It replaces Git entirely","It catches integration bugs early and speeds up releases"],
      correct: 3,
      explain: "CI/CD automates repetitive checks, ensures everyone's code integrates cleanly, and reduces the risk of \"it worked on my machine\" problems."
    },
    {
      q: "Which activity happens FIRST in a typical CI/CD pipeline?",
      options: ["Developer pushes code / opens PR","Deploy to production","Send Slack notification","Archive the repository"],
      correct: 0,
      explain: "The pipeline starts when a developer pushes code or opens a pull request — that event triggers the workflow."
    },
    {
      q: "What happens if automated tests fail during CI?",
      options: ["The code is automatically merged anyway","The pipeline typically marks the run as failed, blocking merge","Tests are silently ignored","Nothing — CI has no effect on merges"],
      correct: 1,
      explain: "A failed CI run signals broken code. Teams often configure branch protection rules requiring CI to pass before merging."
    },
    {
      q: "Which zone of the CI/CD assembly line includes \"Build\" and \"Test\"?",
      options: ["The HR zone","The marketing zone","The CI zone","The legal zone"],
      correct: 2,
      explain: "Build and Test are core Continuous Integration steps — they verify code quality before delivery/deployment."
    },
    {
      q: "What is \"monitoring\" in a CI/CD context?",
      options: ["Watching employee computer screens","Counting lines of code manually","Disabling failed workflows","Tracking pipeline success rates, logs, and build health"],
      correct: 3,
      explain: "Monitoring means observing workflow runs, reading logs, tracking pass/fail rates, and alerting on failures — covered in Section 08."
    }
  ],

  overview: [
    {
      q: "What is GitHub Actions?",
      options: ["GitHub's built-in automation and CI/CD platform","A GitHub mobile app","A code editor plugin only","A replacement for Git"],
      correct: 0,
      explain: "GitHub Actions is GitHub's native automation platform for running workflows triggered by repository events."
    },
    {
      q: "What triggers a GitHub Actions workflow to run?",
      options: ["Only manual email to GitHub support","Events like push, pull_request, or schedule","Renaming your laptop","Changing your GitHub profile picture"],
      correct: 1,
      explain: "The on: key in a workflow defines events (triggers). Common ones include push, pull_request, workflow_dispatch, and schedule."
    },
    {
      q: "In the factory analogy, what is a \"workflow\"?",
      options: ["A single shell command","A Git commit message","The entire assembly line blueprint","A GitHub issue template"],
      correct: 2,
      explain: "A workflow is the complete YAML blueprint describing what automation runs and when — the full factory plan."
    },
    {
      q: "What is a GitHub Action (lowercase \"action\") in the Marketplace sense?",
      options: ["A button in the UI that deletes repos","A Git commit type","A legal term for GitHub policies","A reusable, pre-built automation unit you can use in steps"],
      correct: 3,
      explain: "Actions (like actions/checkout@v4) are reusable packages published to the GitHub Marketplace that perform specific tasks in a step."
    },
    {
      q: "Where do you view the history of workflow runs?",
      options: ["The Actions tab in your repository","The Issues tab","The Wiki tab","Your email inbox only"],
      correct: 0,
      explain: "The Actions tab lists every workflow run with status indicators, logs, and re-run options."
    },
    {
      q: "What is a \"runner\" in GitHub Actions?",
      options: ["A marathon training app","A type of Git branch","The server/machine that executes workflow jobs","A GitHub Copilot feature"],
      correct: 2,
      explain: "A runner is the compute environment (GitHub-hosted VM or your own machine) where job steps actually execute."
    },
    {
      q: "Can GitHub Actions workflows be stored in any folder?",
      options: ["Yes, anywhere in the repo","Only in the src/ folder","No — they must be in .github/workflows/","Only on the default branch's root"],
      correct: 2,
      explain: "GitHub only recognizes workflow files in .github/workflows/. Files elsewhere are ignored."
    },
    {
      q: "What is the relationship between a job and a step?",
      options: ["They are the same thing","A step contains multiple jobs","Steps are unrelated to jobs","A job contains one or more steps that run sequentially"],
      correct: 3,
      explain: "Jobs are work stations; steps are individual tasks within a job, executed in order on the same runner."
    },
    {
      q: "Which of these is a valid workflow trigger event?",
      options: ["workflow_dispatch (manual button)","birthday_celebration","coffee_break","screensaver_activate"],
      correct: 0,
      explain: "workflow_dispatch lets you manually trigger a workflow from the Actions tab — useful for on-demand deployments."
    },
    {
      q: "What file extension do workflow files use?",
      options: [".workflow",".yml or .yaml",".json",".md"],
      correct: 1,
      explain: "Workflow files are YAML with .yml or .yaml extensions, e.g., ci.yml."
    }
  ],

  anatomy: [
    {
      q: "What does the \"name:\" field at the top of a workflow do?",
      options: ["Names the GitHub repository","Defines the runner OS","Sets the display name shown in the Actions tab","Encrypts the workflow file"],
      correct: 2,
      explain: "The name field is cosmetic — it appears in the Actions tab UI to identify the workflow."
    },
    {
      q: "What is the purpose of the \"on:\" key in a workflow?",
      options: ["Turn the workflow on/off permanently","Set the timezone","Enable OAuth authentication","Define when the workflow triggers"],
      correct: 3,
      explain: "on: specifies events that trigger the workflow — push, pull_request, schedule, etc."
    },
    {
      q: "What does \"runs-on:\" specify for a job?",
      options: ["The number of retries","Which Git branch to deploy","The runner operating system/environment","The workflow file name"],
      correct: 2,
      explain: "runs-on: ubuntu-latest tells GitHub to execute the job on an Ubuntu Linux virtual machine."
    },
    {
      q: "What is the difference between \"uses:\" and \"run:\" in a step?",
      options: ["They are identical","uses: runs a pre-built Action; run: executes a shell command","run: is deprecated","uses: only works on Windows"],
      correct: 1,
      explain: "uses: references a Marketplace action (e.g., actions/checkout@v4). run: executes arbitrary shell commands like npm test."
    },
    {
      q: "Why must YAML workflow files use spaces instead of tabs?",
      options: ["Tabs are faster","GitHub randomly chooses","YAML parsers treat tabs as invalid indentation","Tabs are required by Git"],
      correct: 2,
      explain: "YAML specification forbids tabs for indentation. Using tabs causes syntax errors and failed workflow parsing."
    },
    {
      q: "What does \"jobs:\" contain in a workflow file?",
      options: ["Job listings for hiring","One or more job definitions, each with steps","GitHub issue assignments","Git commit history"],
      correct: 1,
      explain: "The jobs: key holds named job blocks (e.g., build-and-test:) each containing runs-on and steps."
    },
    {
      q: "Which step should typically come FIRST in a CI job?",
      options: ["actions/checkout to copy the repository code","Deploy to production","Delete the repository","Send email notification"],
      correct: 0,
      explain: "Runners start with an empty workspace. checkout copies your repo code so subsequent steps can access it."
    },
    {
      q: "What happens if one step in a job fails?",
      options: ["All steps continue regardless","The job stops and is marked as failed","GitHub deletes the repo","The workflow file is auto-deleted"],
      correct: 1,
      explain: "By default, a failing step halts the job immediately and marks the run as failed (unless continue-on-error is set)."
    },
    {
      q: "What is the \"with:\" key used for in a step?",
      options: ["Withdraw money from GitHub","Define the workflow author","Pass input parameters to an Action","Set Git user.name"],
      correct: 2,
      explain: "with: passes configuration inputs to an Action, e.g., node-version: '20' for actions/setup-node."
    },
    {
      q: "Can a workflow file contain multiple jobs?",
      options: ["No — only one job per file","Only on Enterprise plans","Only if using self-hosted runners","Yes — jobs run in parallel by default"],
      correct: 3,
      explain: "A single workflow can define many jobs. They run in parallel unless connected with needs: dependencies."
    }
  ],

  'first-workflow': [
    {
      q: "What is the first file you create when setting up GitHub Actions?",
      options: [".github/workflows/your-workflow.yml","README.md","package.json","Dockerfile"],
      correct: 0,
      explain: "Create a YAML file inside .github/workflows/ — GitHub detects it automatically on push."
    },
    {
      q: "After pushing a workflow file, where do you check if it ran?",
      options: ["GitHub Settings → Billing","The Actions tab","The Pull Requests tab only","GitHub Marketplace"],
      correct: 1,
      explain: "The Actions tab shows all workflow runs with live status: yellow (running), green (success), red (failure)."
    },
    {
      q: "What does actions/checkout@v4 do?",
      options: ["Checks out of GitHub permanently","Checks your code out of a hotel","Clones your repository code onto the runner","Validates YAML syntax only"],
      correct: 2,
      explain: "actions/checkout fetches your repository source code into the runner's workspace so build/test steps can access it."
    },
    {
      q: "Why use actions/setup-node@v4 before running npm commands?",
      options: ["It deletes node_modules","It creates a GitHub issue","It deploys to AWS automatically","It installs Node.js on the runner"],
      correct: 3,
      explain: "GitHub-hosted runners don't come with every language pre-installed for every version. setup-node installs the specified Node.js version."
    },
    {
      q: "What does \"npm ci\" do in a CI workflow?",
      options: ["Clean-installs dependencies from package-lock.json","Runs continuous integration software","Creates a new npm account","Compiles TypeScript only"],
      correct: 0,
      explain: "npm ci (clean install) installs exact dependency versions from the lock file — faster and more reliable than npm install in CI."
    },
    {
      q: "Which trigger runs a workflow when someone opens a Pull Request?",
      options: ["on: push","on: pull_request","on: issues","on: release"],
      correct: 1,
      explain: "on: pull_request fires when a PR is opened, synchronized, or reopened — ideal for running tests before merge."
    },
    {
      q: "What color indicator means a workflow is currently running?",
      options: ["Red","Green","Yellow (in progress)","Purple"],
      correct: 2,
      explain: "GitHub uses a yellow circle for in-progress runs, green checkmark for success, and red X for failure."
    },
    {
      q: "Should you commit workflow files to the same repo they automate?",
      options: ["No — store them in a separate secret repo only","Only on Fridays","Only for public repos","Yes — workflows live in the repo they operate on"],
      correct: 3,
      explain: "Workflow files are part of your project configuration and are committed to the same repository, typically on the default branch."
    },
    {
      q: "What is the purpose of adding cache: 'npm' to setup-node?",
      options: ["Speeds up installs by caching node_modules between runs","Deletes the npm cache","Disables npm entirely","Forces a fresh install every time"],
      correct: 0,
      explain: "Caching dependencies between runs dramatically reduces CI time — like keeping parts pre-staged on the factory floor."
    },
    {
      q: "If npm test fails in your workflow, what status does the run get?",
      options: ["Success","Failure","Skipped","Cancelled"],
      correct: 1,
      explain: "A non-zero exit code from any run: command fails the step, which fails the job and marks the entire workflow run as failed."
    }
  ],

  jobs: [
    {
      q: "By default, how do multiple jobs in one workflow run?",
      options: ["One at a time, always sequential","Only on weekends","In parallel","Randomly"],
      correct: 2,
      explain: "Jobs without needs: dependencies start simultaneously on separate runners, maximizing speed."
    },
    {
      q: "How do you make job B wait until job A finishes?",
      options: ["Put them in the same step","Use runs-after: jobA","Rename job B to jobA-2","Add needs: jobA to job B"],
      correct: 3,
      explain: "needs: creates a dependency graph. Job B won't start until all listed jobs complete successfully."
    },
    {
      q: "What is a matrix strategy used for?",
      options: ["Encrypting secrets","Linear algebra computations","Running the same job across multiple OS/language version combinations","Generating random passwords"],
      correct: 0,
      explain: "strategy.matrix expands one job definition into many parallel runs — e.g., testing on Node 18, 20, and 22 simultaneously."
    },
    {
      q: "What does runs-on: ubuntu-latest mean?",
      options: ["Run on your local Ubuntu laptop automatically","Run on a GitHub-hosted Ubuntu Linux virtual machine","Run on the oldest Ubuntu version","Run on a Windows server"],
      correct: 1,
      explain: "ubuntu-latest is a GitHub-hosted runner label pointing to the latest Ubuntu VM image available on GitHub's infrastructure."
    },
    {
      q: "What is a self-hosted runner?",
      options: ["A runner that only works offline","A deprecated GitHub feature","A runner you manage on your own infrastructure","A runner hosted exclusively by Microsoft Azure"],
      correct: 2,
      explain: "Self-hosted runners are machines you register with GitHub — useful for private networks, special hardware, or cost control at scale."
    },
    {
      q: "Can steps within the same job run on different runners?",
      options: ["No — all steps in a job share the same runner","Only on macOS","Only with Enterprise plan","Yes — each step gets its own runner"],
      correct: 0,
      explain: "All steps in a job execute sequentially on the same runner instance, sharing the filesystem and environment."
    },
    {
      q: "What happens if a needed job fails?",
      options: ["Dependent jobs are skipped","Dependent jobs still run","GitHub retries automatically 10 times","The repo is archived"],
      correct: 0,
      explain: "If a job in the needs: chain fails, all downstream dependent jobs are skipped automatically."
    },
    {
      q: "Which expression accesses the Node version from a matrix?",
      options: ["${{ env.node-version }}","${{ matrix.node-version }}","${{ secrets.node-version }}","${{ github.node-version }}"],
      correct: 1,
      explain: "The matrix context ${{ matrix.node-version }} injects the current matrix combination value into steps at runtime."
    },
    {
      q: "What is the benefit of parallel jobs?",
      options: ["Higher failure rate","More YAML syntax errors","Faster overall pipeline completion","Increased secret exposure"],
      correct: 2,
      explain: "Running lint, test, and security-scan jobs in parallel reduces total wall-clock time compared to running them sequentially."
    },
    {
      q: "Which runs-on value would you use for a Windows CI job?",
      options: ["linux-latest","macos-only","docker-internal","windows-latest"],
      correct: 3,
      explain: "windows-latest selects a GitHub-hosted Windows Server VM — useful for testing Windows-specific code paths."
    }
  ],

  secrets: [
    {
      q: "Where should you NEVER store API keys or passwords?",
      options: ["Directly in workflow YAML files committed to Git","GitHub Encrypted Secrets","Environment-scoped secrets","Organization secrets"],
      correct: 0,
      explain: "Committing secrets to Git exposes them in history forever. Always use GitHub's encrypted secrets store."
    },
    {
      q: "How do you reference a secret named DEPLOY_KEY in a workflow step?",
      options: ["$DEPLOY_KEY","${{ secrets.DEPLOY_KEY }}","{{ secret.DEPLOY_KEY }}","secrets[DEPLOY_KEY]"],
      correct: 1,
      explain: "The secrets context ${{ secrets.DEPLOY_KEY }} injects the decrypted value at runtime without logging it."
    },
    {
      q: "Are secret values shown in workflow logs?",
      options: ["Yes, always in plain text","Only on private repos","No — GitHub masks secret values in logs","Only if you add --verbose"],
      correct: 2,
      explain: "GitHub automatically redacts secrets from log output. However, avoid echoing secrets or encoding them in URLs."
    },
    {
      q: "What is the difference between secrets and variables in GitHub Actions?",
      options: ["Variables are encrypted; secrets are plain text","There is no difference","Secrets are for code; variables are for docs","Secrets are encrypted sensitive values; variables are plain-text configuration"],
      correct: 3,
      explain: "Secrets are encrypted and masked. Variables (vars) store non-sensitive config like region names or feature flags."
    },
    {
      q: "What does the \"environment:\" key on a job enable?",
      options: ["Protection rules like required reviewers and environment-specific secrets","Automatic code formatting","Free unlimited runner minutes","Deletion of the production server"],
      correct: 0,
      explain: "Environments (e.g., production) can require manual approval, restrict branches, and hold their own secrets/variables."
    },
    {
      q: "How do you pass a secret to a shell script as an environment variable?",
      options: ["Print it with echo in the workflow","Use the env: block with ${{ secrets.NAME }}","Hardcode it in the script file","Send it via a public GitHub issue"],
      correct: 1,
      explain: "The env: key at the step or job level sets environment variables available to run: commands without exposing values in the YAML."
    },
    {
      q: "Can organization-level secrets be shared across multiple repos?",
      options: ["No — secrets are repo-only always","Only on GitHub Free","Yes — org secrets can be scoped to selected repositories","Only with self-hosted runners"],
      correct: 2,
      explain: "Organization secrets allow centralized credential management shared across repos in the org — with granular access control."
    },
    {
      q: "What syntax accesses a repository variable named APP_ENV?",
      options: ["${{ secrets.APP_ENV }}","${{ env.APP_ENV }}","${{ github.APP_ENV }}","${{ vars.APP_ENV }}"],
      correct: 3,
      explain: "Repository and organization variables use the vars context: ${{ vars.APP_ENV }}."
    },
    {
      q: "Why use environment protection rules for production deployments?",
      options: ["To add human approval gates before deploying to critical systems","To speed up deployments","To disable all tests","To make secrets public"],
      correct: 0,
      explain: "Production environments can require designated reviewers to approve deployment — a safety valve on the factory line."
    },
    {
      q: "If a secret is misspelled in a workflow, what typically happens?",
      options: ["GitHub auto-corrects the name","The expression resolves to an empty string, often causing auth failures","The workflow is deleted","GitHub sends an email with the correct name"],
      correct: 1,
      explain: "A typo in ${{ secrets.MY_SECREt }} silently resolves to empty, causing authentication or connection errors that can be hard to debug."
    }
  ],

  monitoring: [
    {
      q: "Where in GitHub do you view detailed logs for a failed workflow step?",
      options: ["Settings → Billing","The Releases page","Click the failed run in the Actions tab, then expand the step","GitHub Discussions"],
      correct: 2,
      explain: "Each workflow run page shows jobs and steps. Click any step to see its stdout/stderr log output."
    },
    {
      q: "What does the \"conclusion\" field in the GitHub Actions API indicate?",
      options: ["The workflow author's name","The number of steps","The runner's IP address","The final outcome: success, failure, cancelled, or skipped"],
      correct: 3,
      explain: "When status is \"completed\", conclusion tells you the outcome — success, failure, cancelled, skipped, etc."
    },
    {
      q: "What is a workflow status badge?",
      options: ["A type of GitHub secret","A physical pin shipped by GitHub","An embedded image in README showing latest run status","A branch protection rule"],
      correct: 0,
      explain: "Badges (shields) in README.md show live CI status: passing or failing. Example: ![CI](https://github.com/user/repo/actions/workflows/ci.yml/badge.svg)"
    },
    {
      q: "What GitHub API endpoint lists all workflow runs for a repository?",
      options: ["GET /repos/{owner}/{repo}/issues","GET /repos/{owner}/{repo}/actions/runs","GET /repos/{owner}/{repo}/pulls","GET /repos/{owner}/{repo}/commits"],
      correct: 1,
      explain: "The Actions REST API at /actions/runs returns paginated workflow run data including status, conclusion, and timestamps."
    },
    {
      q: "What does ::error file=app.js,line=10::Message do in a workflow?",
      options: ["Deletes app.js","Sends an SMS alert","Creates an annotation linking the error to a specific file and line","Formats the code automatically"],
      correct: 2,
      explain: "Workflow commands like ::error create annotations visible in the PR diff and Actions UI, pinpointing exact failure locations."
    },
    {
      q: "What is $GITHUB_STEP_SUMMARY used for?",
      options: ["Deleting step logs","Summarizing Git history","Calculating runner costs","Writing Markdown content to the run's summary page"],
      correct: 3,
      explain: "Appending Markdown to $GITHUB_STEP_SUMMARY creates a rich report on the workflow run summary tab — great for test results tables."
    },
    {
      q: "Which metric helps identify unreliable tests that sometimes pass and sometimes fail?",
      options: ["Flaky test rate","Lines of code count","Repository star count","Number of open issues"],
      correct: 0,
      explain: "Flaky tests fail intermittently without code changes. Tracking flaky rate helps prioritize test stabilization work."
    },
    {
      q: "What does MTTR stand for in CI/CD observability?",
      options: ["Maximum Test Time Required","Minimum Threshold Test Result","Manual Test Trigger Rate","Mean Time To Repair/Recovery"],
      correct: 3,
      explain: "MTTR measures how quickly your team restores a passing pipeline after a failure — a key DevOps health metric."
    },
    {
      q: "How can you notify Slack when a workflow fails?",
      options: ["Slack monitors GitHub automatically without configuration","Email GitHub support","Use a Slack notification Action or webhook in the workflow","Post in a GitHub Wiki"],
      correct: 2,
      explain: "Actions like slackapi/slack-github-action or custom webhook steps send alerts to channels on failure events."
    },
    {
      q: "What information does the Actions tab show at a glance for each run?",
      options: ["Only the workflow file name","Employee salaries","Docker image sizes only","Status, branch, commit, duration, and trigger event"],
      correct: 3,
      explain: "The Actions tab list view shows run status icons, who triggered it, which branch/commit, how long it took, and when it ran."
    }
  ],

  practices: [
    {
      q: "Why should you pin Action versions (e.g., @v4) instead of using @main?",
      options: ["@main can introduce breaking changes without warning","@main is faster","Pinning is required by law","@v4 is always the latest version"],
      correct: 0,
      explain: "Floating tags like @main point to the latest commit and can break your pipeline unexpectedly. Pin to major versions or SHAs."
    },
    {
      q: "What is the purpose of dependency caching in CI?",
      options: ["To hide dependencies from security scans","To reduce build time by reusing downloaded packages","To increase storage costs","To disable npm"],
      correct: 1,
      explain: "Caching node_modules or pip packages between runs avoids re-downloading on every push — significantly faster pipelines."
    },
    {
      q: "What do path filters in workflow triggers do?",
      options: ["Filter log output by file type","Run workflows only when specific files/folders change","Delete unused files","Encrypt file paths"],
      correct: 1,
      explain: "paths: or paths-ignore: under on: push: limit runs to relevant changes — e.g., skip CI when only README.md changes."
    },
    {
      q: "What does a concurrency group prevent?",
      options: ["All workflow runs forever","Multiple simultaneous runs for the same PR/branch, wasting resources","Caching from working","Secrets from being used"],
      correct: 3,
      explain: "concurrency: cancels in-progress runs when a newer commit arrives on the same PR — saving minutes and reducing noise."
    },
    {
      q: "What is a reusable workflow (workflow_call)?",
      options: ["A workflow that can be called from other workflows or repos","A workflow that runs only once ever","A deprecated feature","A workflow stored outside GitHub"],
      correct: 0,
      explain: "Reusable workflows with on: workflow_call: let you DRY up common pipelines — one test blueprint shared across many repositories."
    },
    {
      q: "Which tool validates GitHub Actions workflow syntax locally?",
      options: ["Microsoft Excel","actionlint or similar YAML validators","Git GUI only","A physical lint roller"],
      correct: 1,
      explain: "actionlint checks workflow YAML for syntax errors, invalid expressions, and common mistakes before you push."
    },
    {
      q: "Why use \"if:\" conditions on jobs or steps?",
      options: ["To make YAML colorful","To skip steps unconditionally","To conditionally run steps based on branch, event, or previous outcomes","To disable GitHub Actions entirely"],
      correct: 2,
      explain: "if: expressions like if: github.ref == 'refs/heads/main' ensure deploy steps only run on the main branch."
    },
    {
      q: "What is the recommended approach for third-party Actions from the Marketplace?",
      options: ["Use any action without review","Always write your own actions from scratch","Fork all actions to your account","Review the action source, pin versions, and prefer well-maintained popular actions"],
      correct: 3,
      explain: "Third-party actions run with your repo's permissions. Audit trusted sources, pin SHAs for critical pipelines, and review updates."
    },
    {
      q: "How does fail-fast work in a matrix strategy?",
      options: ["When one matrix job fails, remaining matrix jobs are cancelled","All jobs must fail before stopping","It disables error reporting","It only applies to Windows runners"],
      correct: 0,
      explain: "fail-fast: true (default) cancels other matrix combinations when one fails — saving CI minutes when you already know something is broken."
    },
    {
      q: "What is the benefit of using GITHUB_OUTPUT to set step outputs?",
      options: ["It prints secrets to logs","It lets later steps consume values produced by earlier steps","It deletes previous step results","It replaces the need for jobs"],
      correct: 1,
      explain: "Writing key=value to $GITHUB_OUTPUT defines outputs accessible via steps.<step_id>.outputs.<name> in subsequent steps."
    }
  ],

  examples: [
    {
      q: "In the Python CI/CD example, which job must pass before the Docker job runs?",
      options: ["Neither — they are unrelated","The Docker job runs first","The test job (via needs: test)","Both run only manually"],
      correct: 2,
      explain: "needs: test creates a dependency — the docker job waits for the test job to succeed before building and pushing the image."
    },
    {
      q: "What does \"if: github.ref == 'refs/heads/main'\" ensure?",
      options: ["The step runs on every branch","The main branch is deleted","All branches are merged automatically","The step/job only runs when the ref is the main branch"],
      correct: 3,
      explain: "This condition guards deployment steps so they only execute on main, not on feature branches or PRs."
    },
    {
      q: "A workflow never triggers after pushing. What should you check FIRST?",
      options: ["GitHub's stock price","Your internet speed","Whether the on: trigger matches your branch and event","Your monitor brightness"],
      correct: 2,
      explain: "The most common cause is a mismatch between on: push: branches: and the branch you actually pushed to."
    },
    {
      q: "What causes \"Permission denied\" when a workflow tries to push a tag?",
      options: ["Wrong Node.js version","YAML uses tabs","Insufficient GITHUB_TOKEN permissions — need contents: write","Missing Docker installed"],
      correct: 2,
      explain: "The default GITHUB_TOKEN has read-only permissions. Add permissions: contents: write to the workflow or job to allow pushing."
    },
    {
      q: "What tool helps catch YAML indentation errors before pushing?",
      options: ["Running the workflow 50 times","Deleting and recreating the repo","actionlint or a YAML linter in your editor","Changing the repo name"],
      correct: 2,
      explain: "Local linting with actionlint or VS Code YAML extensions catches indentation and syntax errors before they reach GitHub."
    },
    {
      q: "If you run out of GitHub Actions minutes on the free plan, what can you do?",
      options: ["GitHub Actions stops working forever","Delete all workflows permanently","Switch to Subversion","Optimize with caching and path filters, or upgrade your plan"],
      correct: 3,
      explain: "Free accounts have monthly minute limits. Reduce usage via caching, concurrency, path filters, or upgrade to a paid plan for more minutes."
    },
    {
      q: "What does docker/login-action do in the example workflow?",
      options: ["Installs Docker on your laptop","Logs into your GitHub account","Authenticates with a Docker registry using secrets","Deletes Docker images"],
      correct: 2,
      explain: "docker/login-action authenticates the runner with Docker Hub (or other registries) using username/password secrets before push."
    },
    {
      q: "When a step shows \"Error: Process completed with exit code 1\", what does that mean?",
      options: ["The step succeeded","The command returned a non-zero exit code indicating failure","GitHub is updating servers","The runner ran out of disk intentionally"],
      correct: 1,
      explain: "Exit code 0 means success in Unix shells. Any non-zero code (like 1) signals failure, causing the step and job to fail."
    },
    {
      q: "What is the recommended first step when debugging ANY failed workflow?",
      options: ["Delete the workflow file immediately","Create a new GitHub account","Read the failed step's log output in the Actions tab","Disable all branch protection"],
      correct: 2,
      explain: "Logs contain the exact error message and stack trace. Always start debugging by reading the output of the first failing step."
    },
    {
      q: "Can GitHub Actions deploy to cloud providers like AWS, Azure, or GCP?",
      options: ["No — GitHub Actions only runs tests","Only AWS, not others","Only with GitHub Enterprise","Yes — using official and community deploy Actions with cloud credentials in secrets"],
      correct: 3,
      explain: "Marketplace actions exist for all major clouds. Store cloud credentials as secrets and use deploy actions in your workflow steps."
    }
  ],
};

// ─── Render Table of Contents ───────────────────────────────────────────────
function buildTocLink(section, isMobile) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${section.id}`;
  a.dataset.section = section.id;
  a.textContent = section.label;
  a.className = isMobile
    ? 'toc-link block px-3 py-2 rounded-lg text-slate-600 hover:text-factory-600 hover:bg-slate-100 transition-colors'
    : 'toc-link block px-3 py-2 rounded-r-lg border-l-2 border-transparent text-slate-600 hover:text-factory-600 transition-colors';
  li.appendChild(a);
  return li;
}

function initToc() {
  const desktopToc = document.getElementById('desktop-toc');
  const mobileToc = document.getElementById('mobile-toc');
  SECTIONS.forEach((s) => {
    desktopToc.appendChild(buildTocLink(s, false));
    mobileToc.appendChild(buildTocLink(s, true));
  });
}

// ─── Render MCQ Cards ─────────────────────────────────────────────────────────
function renderQuizzes() {
  let globalIndex = 0;

  SECTIONS.forEach((section) => {
    const container = document.getElementById(`quiz-${section.id}`);
    if (!container) return;

    const questions = QUIZ_DATA[section.id] || [];
    const heading = document.createElement('div');
    heading.className = 'flex items-center gap-2 mb-4 pt-6 border-t border-slate-200';
    heading.innerHTML = `
      <svg class="w-5 h-5 text-factory-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
      <h3 class="font-semibold text-slate-900">Section Quiz — 10 Questions</h3>`;
    container.appendChild(heading);

    questions.forEach((item, qi) => {
      globalIndex++;
      const card = document.createElement('div');
      card.className = 'rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden';

      const optionsHtml = item.options
        .map((opt, oi) => {
          const letter = LETTERS[oi];
          const text = opt.replace(/^[A-D]\.\s*/, '');
          return `<li class="flex gap-2 text-sm text-slate-600"><span class="font-semibold text-factory-600 shrink-0">${letter}.</span><span>${text}</span></li>`;
        })
        .join('');

      const correctLetter = LETTERS[item.correct];

      card.innerHTML = `
        <div class="p-4">
          <p class="text-xs text-slate-600 mb-1">Question ${globalIndex}</p>
          <p class="text-sm font-medium text-slate-800 mb-3">${item.q}</p>
          <ul class="space-y-1.5 mb-1">${optionsHtml}</ul>
        </div>
        <details class="group border-t border-slate-200">
          <summary class="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-factory-600 hover:bg-slate-50 transition-colors select-none">
            <span>Reveal Answer & Explanation</span>
            <svg class="chevron w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div class="px-4 pb-4 pt-1">
            <p class="text-sm mb-2"><span class="text-emerald-600 font-semibold">Correct Answer: ${correctLetter}</span></p>
            <p class="text-xs text-slate-600 leading-relaxed">${item.explain}</p>
          </div>
        </details>`;

      container.appendChild(card);
    });
  });
}

// ─── Mobile Navigation ────────────────────────────────────────────────────────
function initMobileNav() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('menu-close');

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('#mobile-toc a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });
}

// ─── Scroll Spy for Active TOC Link ──────────────────────────────────────────
function initScrollSpy() {
  const links = document.querySelectorAll('.toc-link');
  const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

// ─── Verify answer distribution (dev sanity check) ─────────────────────────
function verifyAnswerDistribution() {
  const counts = [0, 0, 0, 0];
  let total = 0;
  Object.values(QUIZ_DATA).forEach((questions) => {
    questions.forEach((q) => {
      counts[q.correct]++;
      total++;
    });
  });
  console.info(`[Quiz] Total questions: ${total}`);
  console.info(`[Quiz] Correct answer distribution — A:${counts[0]} B:${counts[1]} C:${counts[2]} D:${counts[3]}`);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initToc();
  renderQuizzes();
  initMobileNav();
  initScrollSpy();
  verifyAnswerDistribution();
});
