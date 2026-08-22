---
title: >-
  Streamline Git Workflows: Automate with Hooks - Branch Name & Commit 
  Convention Example
subtitle: Enforce Commit Convention for Consistent Code Management
slug: streamline-git-workflows-automate-with-hooks-commit-convention-example
brief: |-
  ....
  I've settled up an example commit-msg hook that on every commit
  ↳ checks for branch name convention i.e [type]/ABC-[ticketnumber]-[objective]
  ↳ checks for commit-msg convention i.e [ABC-ticketnumber] [type]: objective
  ↳ checks for lints, prettie...
publishedAt: '2024-06-20T05:47:57.840Z'
updatedAt: '2024-06-20T06:01:46.973Z'
readTimeInMinutes: 5
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1718861863353/af0286b5-a2b7-4d7b-b204-e8bc4c39f134.jpeg
  attribution: null
seo:
  title: Automate Git Workflows with Hooks & Commit Convention Example
  description: Enforce Commit Convention for Consistent Code Management
series: null
tags:
  - name: GitHub
    slug: github
  - name: github-actions
    slug: github-actions-1
  - name: GitLab
    slug: gitlab
  - name: Git
    slug: git
  - name: Gitcommands
    slug: gitcommands
  - name: workflow
    slug: workflow
  - name: automation
    slug: automation
  - name: efficiency
    slug: efficiency
  - name: developer experience
    slug: developer-experience
tableOfContents:
  enabled: true
  items:
    - id: toc-0
      level: 2
      slug: contents
      title: 'Contents:'
      parentId: null
    - id: toc-1
      level: 2
      slug: 1️⃣-what--
      title: 1️⃣ What -
      parentId: null
    - id: toc-2
      level: 3
      slug: local-hooks
      title: 'Local Hooks:'
      parentId: null
    - id: toc-3
      level: 3
      slug: server-side-hooks
      title: 'Server-Side Hooks:'
      parentId: null
    - id: toc-4
      level: 2
      slug: 2️⃣-why--
      title: 2️⃣ Why -
      parentId: null
    - id: toc-5
      level: 2
      slug: 3️⃣-how--
      title: 3️⃣ How -
      parentId: null
    - id: toc-6
      level: 3
      slug: step-1-set-up-husky-with-official-documentation
      title: 'Step 1: Set Up Husky with Official Documentation'
      parentId: null
    - id: toc-7
      level: 3
      slug: step-2-create-a-commit-msg-for-auto-commit-check
      title: 'Step 2: Create a commit-msg for Auto Commit Check'
      parentId: null
    - id: toc-8
      level: 3
      slug: step-3-copy-code-to-commit-msg-hook
      title: 'Step 3: Copy code to commit-msg hook:'
      parentId: null
    - id: toc-9
      level: 2
      slug: 4️⃣-result--
      title: 4️⃣ Result -
      parentId: null
    - id: toc-10
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
....

I've settled up an example commit-msg hook that on every commit

↳ checks for branch name convention i.e \[type\]/ABC-\[ticketnumber\]-\[objective\]

↳ checks for commit-msg convention i.e \[ABC-ticketnumber\] \[type\]: objective

↳ checks for lints, prettier, and run unit tests

Gist Link: [https://gist.github.com/smyaseen/17083d60d02a07b2a3122410e2d39b6f](https://gist.github.com/smyaseen/17083d60d02a07b2a3122410e2d39b6f)

....

**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

## Contents:

* ⚡ `Some Background of Git Hooks`
    
* ⚡ `Implementation of Git Hooks to Automate Commit Convention Check on every commit`
    

## 1️⃣ What -

Git hooks are powerful scripts that allow you to automate and customize Git's behaviour at key points in your development workflow. Whether you're looking to enforce coding standards, run tests, or ensure commit message consistency, Git hooks provide a flexible mechanism to streamline your processes.

### Local Hooks:

Local hooks run on your local machine and are not shared with other collaborators. They include:

* **pre-commit:** Executes before a commit is made.
    
* **prepare-commit-msg:** Runs before the commit message editor is opened to populate the commit message.
    
* **commit-msg:** Verifies the commit message format after editing.
    
* **post-commit:** Executes after a commit is made.
    
* **post-checkout:** Runs after a successful checkout.
    
* **pre-rebase:** Executes before a rebase operation.
    

### Server-Side Hooks:

Server-side hooks execute on the remote repository when specific Git actions are performed, such as pushing changes. These include:

* **pre-receive:** Runs before the remote repository accepts a push.
    
* **update:** Executes when a branch is updated with new commits.
    
* **post-receive:** Runs after the entire process is completed on the remote repository.
    

## 2️⃣ Why -

Git hooks allow you to enforce development standards, automate repetitive tasks, and maintain consistency across your team's workflow. Here are a few common scenarios where Git hooks can be beneficial:

* **Enforcing Coding Standards:** Run linters and code formatters (e.g., ESLint, Prettier) before committing changes using the `pre-commit` hook.
    
* **Commit Message Convention:** Ensure commit messages follow a specific format (e.g., `[ABC-123] feat: Implement new feature`) using the `commit-msg` hook.
    
* **Running Tests:** Automatically execute unit tests or integration tests before pushing changes using the `pre-push` hook.
    

## 3️⃣ How -

Implementing Git hooks can vary based on your project's needs and programming language. Here’s a step-by-step guide to setting up Git hooks in a JavaScript project using the popular `Husky` library:

### Step 1: Set Up Husky with Official Documentation

[https://typicode.github.io/husky/get-started.html](https://typicode.github.io/husky/get-started.html)

### Step 2: Create a `commit-msg` for Auto Commit Check

Suppose you want to enforce a specific branch naming and commit message convention (`[type]/ABC-[ticketnumber]-[objective]`). You can create a `commit-msg` hook script to validate this format before allowing the commit:

```javascript
echo "npm test" > .husky/commit-msg
```

### Step 3: Copy code to `commit-msg` hook:

The following code:

1. checks for branch naming convention i.e `[type]/ABC-[ticketnumber]-[objective]`
    
2. checks for commit-msg convention i.e `[ABC-ticketnumber] [type]: objective`
    
3. checks for lints, prettier, and run unit tests
    

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Checks for branch name


currentBranch=$(git rev-parse --abbrev-ref HEAD)
requiredPattern="^(build|chore|feat|docs|refactor|perf|test)/ABC-\d+-.+$"

if ! echo "$currentBranch" | grep -qE $requiredPattern; then
    echo "\nInvalid branch name: $currentBranch"
    echo "-"
    echo "Should follow this pattern: build|chore|feat|docs|refactor|perf|test/ABC-ticketnumber-any-text"
    echo "-"
    echo "example: docs/ABC-123-update-readme.md"
    echo "-"
    echo "Refer to this for convention:"
    echo "-"
    echo "build : Changes related to building the code (e.g. adding npm dependencies or external libraries)."
    echo "-"
    echo "chore: Changes that do not affect the external user (e.g. updating the .gitignore file or .prettierrc file)."
    echo "-"
    echo "feat: A new feature."
    echo "-"
    echo "fix: A bug fix."
    echo "-"
    echo "docs: Documentation a related changes."
    echo "-"
    echo "refactor: A code that neither fix bug nor adds a feature."
    echo "-"
    echo "perf: A code that improves performance style: A code that is related to styling."
    echo "-"
    echo "test: Adding new test or making changes to existing test"
    echo "-\n"

    exit 1  # Branch name doesn't match the pattern, exit with error code
fi

# Checks for commit message

commit_message="$(cat "$1")"

pattern='^\[ABC-[0-9]+\] (build|chore|feat|docs|refactor|perf|test): .+$'

if [[ ! $commit_message =~ $pattern ]]; then
    echo "\nInvalid commit message: $commit_message"
    echo "-"
    echo "Should follow this pattern: [ABC-ticketnumber] build|chore|feat|docs|refactor|perf|test: objective"
    echo "-"
    echo "example: [ABC-15] chore: updated .gitignore"
    echo "-"
    echo "Refer to this for convention:"
    echo "-"
    echo "build : Changes related to building the code (e.g. adding npm dependencies or external libraries)."
    echo "-"
    echo "chore: Changes that do not affect the external user (e.g. updating the .gitignore file or .prettierrc file)."
    echo "-"
    echo "feat: A new feature."
    echo "-"
    echo "fix: A bug fix."
    echo "-"
    echo "docs: Documentation a related changes."
    echo "-"
    echo "refactor: A code that neither fix bug nor adds a feature."
    echo "-"
    echo "perf: A code that improves performance style: A code that is related to styling."
    echo "-"
    echo "test: Adding new test or making changes to existing test"
    echo "-\n"
  exit 1
fi


# npx lint-staged -- uncomment when have lint setted up
# npm run test -- uncomment when have test setted up
```

## 4️⃣ Result -

* **Consistency:** Ensure all team members follow the same standards and practices.
    
* **Standardization:** Enforce coding guidelines and commit message formats automatically.
    
* **Efficiency:** Automate repetitive tasks, allowing developers to focus on impactful work rather than manual checks.
    
* **Mind Off the Trivial:** Reduce cognitive load by automating routine checks and processes.
    

By leveraging Git hooks, you can enhance collaboration, maintain code quality, and streamline your development workflow. Start implementing Git hooks today to see immediate improvements in your team's productivity and codebase consistency.

Remember, while Git hooks are powerful, they should be used judiciously to avoid unnecessary complexity and ensure they complement your team's workflow effectively.

For a practical example and setup of a commit-msg hook enforcing branch name and commit message conventions, you can refer to the [Gist Link](https://lnkd.in/d5_4N_iX).

## Wrapping Up:

With Git hooks, you're not just committing code; you're committing to a more efficient and organized development process. Automate your Git workflows today and let your team focus on what truly matters - building great software! 🚀

.....

Now you're equipped to enhance your Git Workflows and increase development Efficiency. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
