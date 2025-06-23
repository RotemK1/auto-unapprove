# 🚫 Auto Unapprove Reviews Action

![GitHub Action](https://github.com/RotemK1/auto-unapprove/actions/workflows/create-release.yml/badge.svg?branch=main)
![GitHub repo size](https://img.shields.io/github/repo-size/RotemK1/auto-unapprove)
![Github open issues](https://img.shields.io/github/issues-raw/RotemK1/auto-unapprove)
![GitHub all releases](https://img.shields.io/github/downloads/RotemK1/auto-unapprove/total)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

GitHub Action for **smart dismissal** of pull request reviews when code owners modify files after approval or when reviewers approve their own changes.

## **Problem & My Solution** 
![Dismiss stale pull request approvals option](images/dismiss-approvals.png)

As a DevOps engineer working with large monorepos, I've often encountered a frustrating limitation in GitHub's PR review system.
When new commits are pushed to a PR, GitHub only offers two options:
1. keep all approvals
2. dismiss all approvals.
This binary choice becomes particularly problematic in monorepos where multiple teams own different parts of the codebase

To solve this, I developed a GitHub Action called "Auto Unapprove Reviews" that provides granular control over review dismissals. Here's how it works:

The action follows a simple but effective flow:

1. Get PR information
2. Check changed files
3. Check team ownership
4. Analyze review status
5. Take appropriate action

![Dismiss in PR](images/dismiss-in-pr.png)


## 📁 **File Structure**

```
dismiss-reviews/
├── 🎯 **Core Files**
│   ├── src/index.js          # GitHub Action entry point
│   ├── action.yml            # Action definition
│   └── package.json          # Dependencies
│
├── 🚀 **Main Script**
│   └── auto-unapprove.js    # ⭐ Smart dismissal with stale detection
│
├── 📝 **Examples & Documentation**
│   ├── examples/basic-usage.md     # Usage examples and setup
│   └── examples/workflow-example.yml  # Sample GitHub Actions workflow
│
├── 🧪 **Demo & Testing**
│   └── test-team-info.js     # Demo of team information features
│
└── 📦 **Build Artifacts**
    └── dist/                 # Compiled action bundle
```

## 🚀 **Main Script Features**

**`auto-unapprove.js`** - Smart dismissal with advanced features:
- ✅ **Stale approval detection** - Dismisses approvals when files are modified after approval
- ✅ **Team membership validation** - Supports GitHub team-based code ownership
- ✅ **Precise file matching** - Only dismisses when owned files are actually modified
- ✅ **Performance optimized** - Parallel API calls and efficient caching
- ✅ **Comprehensive logging** - Detailed analysis and reasoning for each decision

## 🚀 **Quick Start**

### **Option 1: GitHub Action** (Recommended)
```yaml
- name: Smart dismiss reviews
  uses: ./
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    pr-number: ${{ github.event.number }}
    dry-run: 'false'
    code-owners-file: 'CODEOWNERS'  # Optional: custom path
    target-branch: ${{ github.event.pull_request.base.ref }}  # Optional: target branch
    team-start-with: '@'  # Optional: team prefix
```

### **Option 2: Direct Script**
```bash
# Set environment variables
export GITHUB_TOKEN="your_token"
export PR_NUMBER="123"
export GITHUB_REPOSITORY="myorg/myrepo"

# Run smart dismissal
node auto-unapprove.js
```

## 🧠 **How It Works**
![Action Flow](images/action-flow.png)

1. **Get all changed files** from the entire PR (not just latest commit)
2. **Parse CODEOWNERS** from the PR target branch (not default branch) using hierarchical path matching (most specific wins)
3. **Check team memberships** via GitHub API for relevant teams only
4. **Analyze approval timeline** - detect commits made after approval
5. **Smart dismissal logic**:
   - Dismiss code owners who authored commits
   - Dismiss stale approvals (post-approval commits to owned files)
   - Preserve legitimate approvals from non-owners

## 📝 **Example Workflow**

```yaml
name: Auto Unapprove

on:
  pull_request:
    types: [synchronize]

jobs:
  auto-unapprove:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/create-github-app-token@v1
        id: app-token
        with:
          app-id: ${{ vars.REVIEWS_APP_ID }}
          private-key: ${{ secrets.REVIEWS_APP_PRIVATE_KEY }}

      - name: Dismiss Stale Reviews
        uses: RotemK1/auto-unapprove@main
        with:
          github-token: ${{ steps.app-token.outputs.token }}
          pr-number: ${{ github.event.number }}
          dry-run: 'false'
          target-branch: ${{ github.event.pull_request.base.ref }}
          team-start-with: '@your-org/'
```

_For more workflow examples, see [`example-workflow.yml`](./example-workflow.yml)_

---

**Required Permissions:**
   for more info on how to use GitHub App token check https://github.com/actions/create-github-app-token

- **Repository permissions:**
  - Administration: Repository creation, deletion, settings, teams, and collaborators. (**READ ONLY**)
  - Contents: Repository contents, commits, branches, downloads, releases, and merges. (**READ ONLY**)
  - Pull requests: Pull requests and related comments, assignees, labels, milestones, and merges. (**READ AND WRITE**)

- **Organization permissions:**
  - Members: Organization members and teams

## ⚙️ **Key Features**

- ✅ **Target branch CODEOWNERS**: Reads ownership rules from PR target branch, not default branch
- ✅ **Stale approval detection**: Automatically detects and dismisses approvals made stale by subsequent commits
- ✅ **Surgical precision**: Only dismisses when owned files are actually modified 
- ✅ **Team support**: Full GitHub team membership validation via API
- ✅ **Timeline analysis**: Compares approval timestamps with commit timestamps
- ✅ **Hierarchical CODEOWNERS**: Proper path matching with most-specific-wins logic
- ✅ **Performance optimized**: Parallel API calls and efficient team checking
- ✅ **Comprehensive logging**: Detailed reasoning for every dismissal decision
- ✅ **Dry-run mode**: Safe testing without actual dismissals

## 📊 **Example Output**

```bash
🚀 Smart Review Dismissal
   Repository: myorg/myrepo
   PR: #123
   Mode: 🧪 DRY RUN

📁 All changed files in PR (3):
   📝 src/gui/components/Button.tsx
   📝 src/gui/styles/theme.css  
   📝 src/gui/utils/helpers.ts

🎯 Target branch: main
👑 Parsed 15 CODEOWNERS rules

🎯 DISMISSAL ANALYSIS:
   🕐 Checking commits after jane-smith's approval (2025-06-04T12:49:59.000Z)...
     📅 Commit 55a4fc5 at 2025-06-04T12:53:44Z
       🎯 Modified owned files: src/gui/components/Button.tsx
   
   🚫 DISMISS @jane-smith
      📁 Files: src/gui/components/Button.tsx, src/gui/styles/theme.css, src/gui/utils/helpers.ts
      👑 Owner Via: @myorg/frontend-team
      💡 Reason: Approval became stale - commits modified owned files
   
   ✅ KEEP @bob-jones
      📄 Not owner of changed files

📊 EXECUTION PLAN:
   • Changed files: 3
   • Total approvals: 2
   • Dismissals needed: 1
   • Approvals preserved: 1
```

## 🔧 **Inputs & Environment Variables**

### **GitHub Action Inputs**
| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `github-token` | ✅ | - | GitHub API token with repo access |
| `pr-number` | ✅ | - | Pull request number to analyze |
| `dry-run` | - | `true` | Set to 'false' for actual dismissals |
| `code-owners-file` | - | `CODEOWNERS` | Path to CODEOWNERS file |
| `target-branch` | - | `main` | Target branch to read CODEOWNERS from |
| `team-start-with` | - | `@` | Team prefix for organization |

### **Environment Variables** (Direct Script Usage)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_TOKEN` | ✅ | - | GitHub API token with repo access |
| `PR_NUMBER` | ✅ | - | Pull request number to analyze |
| `GITHUB_REPOSITORY` | ✅ | - | Repository in owner/repo format |
| `TEAM_START_WITH` | - | `@` | Team prefix for organization |
| `DRY_RUN` | - | `true` | Set to 'false' for actual dismissals |
| `CODEOWNERS_FILE` | - | `CODEOWNERS` | Path to CODEOWNERS file |
| `TARGET_BRANCH` | - | `main` | Target branch to read CODEOWNERS from |
| `CHANGED_FILES` | - | - | Newline-separated files (webhook optimization) | 

## 💁🏻 Contributing

This is an open source project. Any contribution would be greatly appreciated!

## 🚩 Issues

If you have found an issue, please report it on the [issue tracker](https://github.com/RotemK1/auto-unapprove/issues)
