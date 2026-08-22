---
title: "Automate Your Git Workflows with Git Hooks 🚀"
subtitle: "Streamline Your Development Process with Git Hooks Automation 🚀"
slug: automate-your-git-workflows-with-git-hooks
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\n....\nI've settled up an example commit-msg hook that on every commit\n↳ checks for branch name convention i.e [type]/ABC-[ticketnumber]-[objective]\n↳ checks for commit-msg c..."
publishedAt: '2024-07-28T10:29:21.947Z'
updatedAt: '2024-07-28T10:31:21.129Z'
readTimeInMinutes: 4
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1722162386172/c9824134-a1d0-45bf-b0ba-a20471a9098a.jpeg
  attribution: null
seo:
  title: Automate Your Git Workflows with Git Hooks
  description: >-
    Git hooks are scripts that run automatically whenever a particular event
    occurs in a Git repository.
series: null
tags:
  - name: Open Source
    slug: opensource
  - name: Git
    slug: git
  - name: GitHub
    slug: github
  - name: automation
    slug: automation
  - name: Web Development
    slug: web-development
  - name: Testing
    slug: testing
  - name: Devops
    slug: devops
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
      level: 2
      slug: 2️⃣-why--
      title: 2️⃣ Why -
      parentId: null
    - id: toc-3
      level: 2
      slug: 3️⃣-how--
      title: 3️⃣ How -
      parentId: null
    - id: toc-4
      level: 2
      slug: 4️⃣-result--
      title: 4️⃣ Result -
      parentId: null
    - id: toc-5
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

....

I've settled up an example commit-msg hook that on every commit

↳ checks for branch name convention i.e \[type\]/ABC-\[ticketnumber\]-\[objective\]

↳ checks for commit-msg convention i.e \[ABC-ticketnumber\] \[type\]: objective

↳ checks for lints, prettier, and run unit tests

Gist Link: [https://gist.github.com/smyaseen/17083d60d02a07b2a3122410e2d39b6f](https://gist.github.com/smyaseen/17083d60d02a07b2a3122410e2d39b6f)

.....

## Contents:

* ⚡ `Wait What?`
    
* ⚡ `But Why?`
    
* ⚡ `But How?`
    

## 1️⃣ What -

↳ Git hooks are scripts that run automatically whenever a particular event occurs in a Git repository.

↳ They let you customize Git’s internal behaviour and trigger customizable actions at key points in the development life cycle.

↳ There are local hooks and server-side hooks.

↳ Local hooks run on your machine and server-side on the remote repository.

local hooks:

↳ pre-commit ↳ prepare-commit-msg ↳ commit-msg ↳ post-commit ↳ post-checkout ↳ pre-rebase

server hooks:

↳ pre-receive ↳ update ↳ post-receive

## 2️⃣ Why -

↳ For example, you want to run Lint checks before files are committed, so we use the pre-commit hook.

↳ another example you want to enforce the standard branch name and commit-msg convention, so we use the commit-msg hook.

↳ and lots more...

## 3️⃣ How -

↳ For easy setup, in a JavaScript project, install a library called Husky and follow the documentation

[https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky)

↳ An example is that I want to enforce branch names, commit message convention, and run lint, prettier, and tests.

↳ We can use multiple hooks. In my case, I will add a commit-msg hook. The reason I haven't chosen pre-commit was that it doesn't check for commit-msg as it runs before commit. I don't want a developer to run checks and fail at commit message, fix, and run all again. I want to check for the commit message first.

↳ Create a commit-msg hook, following Husky's documentation, and paste the following example:

```markdown
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

↳ Now, whenever you commit, it will check for branch and commit naming convention along with running lint checks. Finally, it will run tests in the end, after everything else is good to go.

## 4️⃣ Result -

✨ Consistency.

✨ Standardization.

✨ Mind Off the Trivial.

✨ Automate & Focus on Impactful.

## Wrapping Up:

We just Elevated Your Development Workflow with a Git Hooks. 🚀

.....

Now you can supercharge your development workflow 🚀

That's it, folks! I hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
