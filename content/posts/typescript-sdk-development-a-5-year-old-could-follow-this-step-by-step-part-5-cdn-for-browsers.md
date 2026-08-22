---
title: >-
  TypeScript SDK Development: A 5-year-old could follow this step-by-step ~ Part
  5, CDN for Browsers
subtitle: Get a CDN for Integrating SDK on Browsers
slug: >-
  typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nPart 1: https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp\nPart 2: https://smy.hashnode.dev/typescript-sdk..."
publishedAt: '2024-06-25T20:07:21.283Z'
updatedAt: '2024-11-04T05:19:22.092Z'
readTimeInMinutes: 2
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1719349067053/8f16c58a-9b45-47d5-a61e-316e260db2fa.png
  attribution: null
seo:
  title: TypeScript SDK development
  description: Develop Your First TypeScript Library
series:
  name: TypeScript SDK Development
  slug: typescript-sdk-tutorial
tags:
  - name: sdk
    slug: sdk
  - name: library
    slug: library
  - name: TypeScript
    slug: typescript
  - name: Web Development
    slug: web-development
  - name: webdev
    slug: webdev
  - name: React
    slug: reactjs
tableOfContents:
  enabled: true
  items:
    - id: toc-0
      level: 2
      slug: contents
      title: 'Contents:'
      parentId: null
    - id: toc-1
      level: 3
      slug: step-1-get-a-cdn
      title: 'Step 1: Get a CDN'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-getting-the-latest-cdn-version-always
      title: 'Step 2: Getting the latest CDN version always'
      parentId: null
    - id: toc-3
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

Part 1: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp)

Part 2: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api)

Part 3: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps)

Part 4: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm)

This is Part 5 of our SDK development series where we get a CDN of our SDK

## Contents:

* ⚡ `Getting CDN`
    
* ⚡ `Integrating CDN and testing SDK`
    

### Step 1: Get a CDN

Head over to [`https://www.jsdelivr.com/`](https://www.jsdelivr.com/) and search for your NPM package.

Choose the default version, and copy the link.

Head over to the Test Browser app, and integrate the CDN:

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/ts-lib-template-starter@1.0.0/dist/index.global.min.js"></script>
  </head>
  <body>
    This is a Test HTML

    <script>
      sdk.fetchUsers().then((users) => console.log(users));
    </script>
  </body>
</html>
```

Open the file, and see the result:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719339509833/05f4c77c-bb5a-4ad0-b081-76d99edb816d.png align="left")

### Step 2: Getting the latest CDN version always

Put `@latest` instead of the version to always fetch the latest CDN version

`https://cdn.jsdelivr.net/npm/ts-lib-template-starter@latest/dist/index.global.min.js`

Sometimes, when a new version of SDK is published, `jsDeliver` few minutes to a few days to point `@latest` version to the updated version.

To fix this, when you publish a new version, head over to [`https://www.jsdelivr.com/tools/purge`](https://www.jsdelivr.com/tools/purge) and enter the link of the CDN like:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719343862760/fbe78aaf-4ecd-4377-9cc4-cefd2d20b547.png align="center")

This will purge the cache and point `@latest` version to the updated version.

## Wrapping Up:

We Just completed the steps to get a CDN of our SDK.

Stay tuned for further parts to dive deep into SDK development and explore features like Web Push Notifications, Service Workers etc. 🚀

.....

Now you're equipped with the knowledge to publish your own SDK. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
