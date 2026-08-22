---
title: >-
  TypeScript SDK Development: A 5-year-old could follow this step-by-step ~ Part
  4, Publishing to NPM
subtitle: Publish your first SDK to NPM
slug: >-
  typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nPart 1: https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp\nPart 2: https://smy.hashnode.dev/typescript-sdk..."
publishedAt: '2024-06-25T20:11:29.498Z'
updatedAt: '2024-11-04T05:19:11.193Z'
readTimeInMinutes: 3
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1719379108414/e766b564-ff2a-474c-a0e0-93adc30fe167.png
  attribution: null
seo:
  title: TypeScript SDK Development
  description: Publish your first SDK to NPM
series:
  name: TypeScript SDK Development
  slug: typescript-sdk-tutorial
tags:
  - name: TypeScript
    slug: typescript
  - name: library
    slug: library
  - name: React
    slug: reactjs
  - name: Web Development
    slug: web-development
  - name: webdev
    slug: webdev
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
      slug: step-1-creating-an-npm-account
      title: 'Step 1: Creating an NPM account'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-publish
      title: 'Step 2: Publish'
      parentId: null
    - id: toc-3
      level: 3
      slug: step-3-semantic-versioning
      title: 'Step 3: Semantic versioning'
      parentId: null
    - id: toc-4
      level: 3
      slug: step-4-license
      title: 'Step 4: LICENSE'
      parentId: null
    - id: toc-5
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

Part 5: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers)

This is Part 4 of our SDK development series where we will publish our SDK

## Contents:

* ⚡ `Creating an NPM account`
    
* ⚡ `Publishing to NPM, semantic versioning, and LICENSE`
    

### Step 1: Creating an NPM account

Head over to [https://www.npmjs.com](https://www.npmjs.com) and create an account.

### Step 2: Publish

In the terminal write:

```bash
npm login
```

After following the login steps, write

```bash
npm publish
```

This can fail due to duplicate package names or wrong configuration in `package.json`

Your `package.json` should look like the following:

```json
{
  "name": "ts-lib-template-starter",
  "version": "1.0.0",
  "description": "SDK development tutorial",
  "main": "./src/index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsup ./src/index.ts --watch"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.14.8",
    "tsup": "^8.1.0",
    "typescript": "^5.5.2"
  }
}
```

Congrats you just published your first SDK to NPM 🎉🥳 🚀🚀🚀

### Step 3: Semantic versioning

When publishing a library it is good to keep versioning in check. Versioning helps the developer integrate the code to get an idea of what update happened to the SDK. Furthermore, the right versioning will help package managers to update to the level as it is mentioned in their `package.json`.

To help developers who rely on your code, we recommend starting your package version at `1.0.0` and incrementing as follows:

| **Code status** | **Stage** | **Rule** | **Example version** |
| --- | --- | --- | --- |
| First release | New product | Start with 1.0.0 | 1.0.0 |
| Backward compatible bug fixes | Patch release | Increment the third digit | 1.0.1 |
| Backward compatible new features | Minor release | Increment the middle digit and reset last digit to zero | 1.1.0 |
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0 |

Learn more about semantic versioning here: [https://docs.npmjs.com/about-semantic-versioning](https://docs.npmjs.com/about-semantic-versioning)

### Step 4: LICENSE

Specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.

![Open source licenses comparison: popular copyleft licenses and permissive open source licenses.](https://snyk.io/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fsnyk%2Fimage%2Fupload%2Fv1613516948%2Fwordpress-sync%2FLicenses-image.png&w=2560&q=75 align="left")

source: [https://snyk.io/learn/open-source-licenses/](https://snyk.io/learn/open-source-licenses/)

For example, this SDK is open for distribution and modifying the code so I would use MIT as LICENSE.

In `package.json`

```json
  "license": "MIT"
```

Learn more about various types of LICENCES here: [https://snyk.io/learn/open-source-licenses/](https://snyk.io/learn/open-source-licenses/)

## Wrapping Up:

We Just completed the steps to publish our SDK. Head over to Part 5, where we will make a CDN for browsers 🚀

.....

Now you're equipped with the knowledge to publish your own SDK. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
