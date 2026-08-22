---
title: 'Maximize Vercel''s FREE Plan: Enable Auto Deployment for All Members'
subtitle: >-
  Unlock seamless collaboration by creating automated deployments for your team
  without any extra costs!
slug: maximize-vercels-free-plan-enable-auto-deployment-for-all-members
brief: >-
  Earlier, Vercel's free pricing plan allowed multiple members to commit changes
  that would automatically deploy. However, this feature has recently changed,
  and now only the project creator can trigger deployments.


  To enable this feature for each add...
publishedAt: '2024-09-29T14:26:27.134Z'
updatedAt: null
readTimeInMinutes: 2
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1727619883294/187c0fef-b500-434a-b502-39028115819b.png
  attribution: null
seo:
  title: Enable Auto Deployment on Vercel's Free Plan
  description: >-
    Maximize Vercel's free plan by enabling auto deployment for all members
    using a simple GitHub Action
series: null
tags:
  - name: Vercel
    slug: vercel
  - name: ci-cd
    slug: ci-cd
  - name: Devops
    slug: devops
  - name: deployment
    slug: deployment
  - name: GitHub
    slug: github
  - name: github-actions
    slug: github-actions-1
  - name: Script
    slug: script
  - name: tips
    slug: tips
  - name: hacking
    slug: hacking
tableOfContents:
  enabled: true
  items:
    - id: toc-0
      level: 3
      slug: bypass-the-charge-with-a-github-action
      title: Bypass the Charge with a GitHub Action
      parentId: null
    - id: toc-1
      level: 3
      slug: step-1-create-the-workflow-file
      title: 'Step 1: Create the Workflow File'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-add-the-script
      title: 'Step 2: Add the Script'
      parentId: null
    - id: toc-3
      level: 3
      slug: customization
      title: Customization
      parentId: null
    - id: toc-4
      level: 3
      slug: final-steps
      title: Final Steps
      parentId: null
    - id: toc-5
      level: 2
      slug: conclusion
      title: Conclusion
      parentId: null
---
Earlier, Vercel's free pricing plan allowed multiple members to commit changes that would automatically deploy. However, this feature has recently changed, and now only the project creator can trigger deployments.

![Vercel Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1727618106942/e6d0e4e0-474f-48d2-927e-8cf39a4a01d6.png align="left")

To enable this feature for each additional member, a fee of $20 will be charged.

### Bypass the Charge with a GitHub Action

You can create a GitHub Action that performs an empty commit, triggering Vercel to deploy automatically. Here’s how:

### Step 1: Create the Workflow File

1. Inside your repository, navigate to the `.github/workflows` directory. If the `workflows` folder doesn't exist, create it.
    
2. Add a file named `auto-empty-commit.yml`.
    

### Step 2: Add the Script

Paste the following code into `auto-empty-commit.yml`:

```yaml
name: Auto Empty Commit

on:
  push:
    branches:
      - 'master' # Trigger on pushes to the master branch
      # - '**' # Uncomment to trigger on pushes to any branch

permissions:
  contents: write # Allow write access to repository contents

jobs:
  empty_commit:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Get the Latest Commit Branch
        id: get_branch
        run: echo "branch=$(git rev-parse --abbrev-ref HEAD)" >> $GITHUB_ENV

      - name: Create Empty Commit
        run: |
          git config --local user.name "example" # Replace with your name
          git config --local user.email "example@example.com" # Replace with your email
          git commit --allow-empty -m "Auto commit after push"
          git push origin ${{ env.branch }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Customization

1. **Branch Configuration:** Modify the `on.push.branches` section to specify which branch will trigger this action.
    
2. **Git User Configuration:** Update the Git user name and email in the `Create Empty Commit` step with the credentials of the member who created the project on Vercel.
    

### Final Steps

1. Commit your changes and push them to your repository.
    
2. Now, when a commit is made, the action will create an empty commit, triggering Vercel to deploy automatically.
    

You’ll know the deployment status by the commit icons: a cross ❌ indicates the deployment failed, while a check ✅ shows successful deployment.

![Deployment Status](https://cdn.hashnode.com/res/hashnode/image/upload/v1727619023813/afe4ee36-3e88-4a8d-95c5-e114389e4ccf.png align="left")

## Conclusion

That’s it! I hope you found this guide helpful. 🚀

Feel free to follow me on GitHub and LinkedIn for more JavaScript tips and tricks!

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)

---

Stay awesome and happy coding! ✨
