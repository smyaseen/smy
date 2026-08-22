---
title: >-
  TypeScript SDK Development: A 5-year-old could follow this step-by-step ~ Part
  1, our first MVP
subtitle: Develop Your first TypeScript Library
slug: >-
  typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nPart 2: https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api\nPart 3: https://smy.hashnode..."
publishedAt: '2024-06-25T20:05:15.473Z'
updatedAt: '2024-11-04T05:15:09.062Z'
readTimeInMinutes: 4
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1719349048208/644eda00-201c-4d63-9c4e-b79ad5819fe1.png
  attribution: null
seo:
  title: TypeScript SDK Development
  description: Develop Your first TypeScript Library
series:
  name: TypeScript SDK Development
  slug: typescript-sdk-tutorial
tags:
  - name: sdk
    slug: sdk
  - name: TypeScript
    slug: typescript
  - name: Node.js
    slug: nodejs
  - name: React
    slug: reactjs
  - name: commonjs
    slug: commonjs
  - name: ecmascript
    slug: ecmascript
  - name: library
    slug: library
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
      level: 3
      slug: step-1-initialize-project
      title: 'Step 1: Initialize Project'
      parentId: null
    - id: toc-5
      level: 3
      slug: step-2-install-fundamental-dev-libraries
      title: 'Step 2: Install fundamental dev libraries'
      parentId: null
    - id: toc-6
      level: 3
      slug: step-3-setup-tsconfig-for-typescript-settings
      title: 'Step 3: Setup tsconfig for TypeScript settings'
      parentId: null
    - id: toc-7
      level: 3
      slug: step-4-write-our-first-code
      title: 'Step 4: Write our first code'
      parentId: null
    - id: toc-8
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

Part 2: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api)

Part 3: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps)

Part 4: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm)

Part 5: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers)

Source Code: [https://github.com/smyaseen/typescript-sdk-template](https://github.com/smyaseen/typescript-sdk-template)

## Contents:

* ⚡ `Some Background of SDK Development`
    
* ⚡ `Developing and running our first version`
    

## 1️⃣ What -

SDK (sometimes also known as library) serves as a plug-in in applications to derive additional features from the technology.

## 2️⃣ Why -

SDK development with TypeScript offers reliability over a long time due to type safety, and maintenance in the long run.

## 3️⃣ How -

The fundamental steps required to build the SDK are the following:

1. Initializing the project with the right workflow settings.
    
2. Choosing Bundler, and understanding its purpose.
    
3. Understanding ESM, CJS, IIFE UMD to run SDK on different environments.
    
4. Publishing as a library on NPM, semantic versioning and License.
    
5. NPM for SPAs and CDN for Browsers.
    

In Part 1, we are going to build our first basic SDK to get a basic understanding.

### Step 1: Initialize Project

Run the following command to set the project in a new folder:

```bash
npm init -y
```

`"-y"` defaults to yes to all the follow-up prompts. You can change it later in the Package.json like author, license, version etc.

Head over to `package.json` and add `type: module` to work with the latest EcmaScript Module system (ESM).

Your `package.json` should look like the following:

```json
 {
  "name": "ts-lib",
  "version": "1.0.0",
  "description": "SDK development tutorial",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Step 2: Install fundamental dev libraries

1. TypeScript
    
2. `@types/node` - to work TypeScript with NodeJS
    
3. `tsup` - The simplest and fastest way to bundle your TypeScript libraries
    

```bash
npm i typescript @types/node tsup -D
```

### Step 3: Setup `tsconfig` for TypeScript settings

Create a `tsconfig.json` file at the root of the project

```bash
touch tsconfig.json
```

Head over to the file and paste the following configuration:

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "emitDeclarationOnly": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    /* If transpiling with TypeScript: */
    "module": "NodeNext",
    "sourceMap": true,
    "outDir": "dist",

    /* AND if you're building for a library: */
    "declaration": true,

    /* If your code runs in the DOM: */
    "lib": ["es2022", "dom", "dom.iterable"]
  },
  "exclude": ["node_modules", "dist"]
}
```

You can hover over each property to learn more in-depth about it.

The fundamental thing to understand here is:

```json
    "module": "NodeNext",
    "sourceMap": true,
    "outDir": "dist",
```

1. " `NodeNext` is the right option for authoring libraries, because it prevents you from emitting ESM with module specifiers that *only* work in bundlers but will crash in Node.js. When writing conventional code, using common sense, and relying on high-quality dependencies, its output is usually highly compatible with bundlers and other runtimes". You can learn more about it here [https://blog.andrewbran.ch/is-nodenext-right-for-libraries-that-dont-target-node-js/](https://blog.andrewbran.ch/is-nodenext-right-for-libraries-that-dont-target-node-js/)
    
2. `sourceMap` - Enables the generation of source files. These files allow debuggers and other tools to display the original TypeScript source code when working with the emitted JavaScript files. You can disable it for production.
    
3. `outDir` - Specify an output folder for all emitted files.
    

```json
  /* AND if you're building for a library: */
    "declaration": true,

    /* If your code runs in the DOM: */
    "lib": ["es2022", "dom", "dom.iterable"]
```

1. `declaration` - Generate .d.ts files from TypeScript and JavaScript files in your project.
    
2. `lib` - Specify a set of bundled library declaration files that describe the target runtime environment. `es2022` is for node applications like React, and `dom` & `dom.iterable` for running the library in the browser.
    

### Step 4: Write our first code

Create a `index.ts` file, and write the following basic code

```javascript
const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;

export { add, subtract };
```

Build our first code:

```bash
tsup ./index.ts
```

You may now see we have a `dist` folder with an output file `index.cjs`

Let's integrate and run our first SDK!

Create a `app.js` file, and paste the following code:

```bash
import { add, subtract } from "./dist/index.cjs";

console.log(add(1, 2));
console.log(subtract(2, 1));
```

Since we haven't published our SDK, we are directly linking with local build.

Now run our first app

```bash
node app.js
```

You should see the following output

```bash
3
1
```

Congrats 🎉🥳 🚀🚀🚀 We Just Built and Ran our first SDK!

## Wrapping Up:

We Just completed the basic steps to build and run our first SDK. Head over to Part 2, where we will build a basic folder structure, and integrate an External API endpoint 🚀

.....

Now you're equipped with knowledge to build your own SDK. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
