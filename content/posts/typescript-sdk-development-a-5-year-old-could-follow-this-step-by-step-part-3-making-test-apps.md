---
title: >-
  TypeScript SDK Development: A 5-year-old could follow this step-by-step ~ Part
  3, Making Test Apps
subtitle: 'Make Test Apps for React, Common JS Node, ESM Node, and Browser'
slug: >-
  typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nPart 1: https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp\nPart 2: https://smy.hashnode.dev/typescript-sdk..."
publishedAt: '2024-06-25T20:10:39.406Z'
updatedAt: '2024-11-04T05:19:04.432Z'
readTimeInMinutes: 4
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1719349148128/731d4c85-c462-43b1-bb46-6bc0cc0a5ec9.png
  attribution: null
seo:
  title: TypeScript SDK Development
  description: 'Make Test Apps for React, Common JS Node, ESM Node, and Browser'
series:
  name: TypeScript SDK Development
  slug: typescript-sdk-tutorial
tags:
  - name: TypeScript
    slug: typescript
  - name: library
    slug: library
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
      slug: step-1-setting-up-tsup-for-different-environments
      title: 'Step 1: Setting up tsup for different environments'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-create-a-node-app
      title: 'Step 2: Create a Node App'
      parentId: null
    - id: toc-3
      level: 3
      slug: step-3-create-a-legacy-node-app
      title: 'Step 3: Create a Legacy Node App'
      parentId: null
    - id: toc-4
      level: 3
      slug: step-4-create-a-browser-app
      title: 'Step 4: Create a Browser App'
      parentId: null
    - id: toc-5
      level: 3
      slug: step-5-create-a-react-app
      title: 'Step 5: Create a React App'
      parentId: null
    - id: toc-6
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

Part 1: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp)

Part 2: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api)

Part 4: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm)

Part 5: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers)

This is Part 3 of our SDK development series where we will dive into creating test apps for react, browser, node, and legacy node.

## Contents:

* ⚡ `Setting up tsup for different execution environments`
    
* ⚡ `Creating our apps`
    

### Step 1: Setting up `tsup` for different environments

At the root of the project create `tsup.config.ts` file, and paste the following content:

```javascript
import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"],
  minify: true,
});
```

`clean` - Clean the output directory before each build

`dts` - type definitions for TypeScript

`entry` - specifying the entry point

`format` - `cjs` for legacy, `esm` for newer node projects and `iife` for browsers

`minify` - minifies our code and reduces bundle size

No extra configuration is needed, as `tsup` will automatically look for this file and handle everything for us :)

Now exit and re-rerun `build` command

```bash
npm run build
```

You will see the following output in our `dist` folder

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719339146967/6f396625-8329-4773-8d0a-a19e7f5b3b98.png align="center")

`index.cjs` - for CJS output

`index.js` - for ESM

`index.global.js` - for browsers

### Step 2: Create a Node App

In `example-apps/Node` create a `index.js` file and paste the following content:

```javascript
import sdk from "../../dist/index.js";

console.log(await sdk.fetchUsers());
```

Now run the file with a node in a separate terminal and head over to the folder:

```bash
node index.js
```

You will see the output in the terminal.

### Step 3: Create a Legacy Node App

In `example-apps/Legacy-Node` create a `index.cjs` file and paste the following content:

```javascript
const sdk = require("../../dist/index.cjs");

sdk.default.fetchUsers().then((users) => console.log(users));
```

Now run the file with a node in a separate terminal and head over to the folder:

```bash
node index.cjs
```

You will see the output in the terminal.

### Step 4: Create a Browser App

In `example-apps/Browser` create a `index.html` file and paste the following content:

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../../dist/index.global.js"></script>
  </head>
  <body>
    This is a Test HTML

    <script>
      sdk.fetchUsers().then((users) => console.log(users));
    </script>
  </body>
</html>
```

Open the file in the browser, you should see the following response in the inspect element's console tab:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719339509833/05f4c77c-bb5a-4ad0-b081-76d99edb816d.png align="center")

### Step 5: Create a React App

Create a Link to our SDK, to behave as a library for projects without publishing.

```bash
npm link
```

In `example-apps` create a react app, for example with vite:

```bash
npm create vite@latest
```

and following steps. After successfully creating a react app, run the following command in the React root folder to link our SDK.

```bash
npm link ts-lib
```

In place of `ts-lib`, it should be your SDK / Library name in the package.json

After creating the React app, open a component file like `App.jsx` and integrate SDK like the following:

```javascript
import sdk from "ts-lib";

console.log(await sdk.fetchUsers());
```

Full view:

```javascript
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import sdk from "ts-lib";

console.log(await sdk.fetchUsers());

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```

Run the react App, and head over to the console, it should look like the following:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719339972721/990fda53-b01e-4e52-aa53-d3ed73313b6f.png align="center")

## Wrapping Up:

We Just completed the steps to build and run our SDK in different environments.

Head over to Part 4 to publish our SDK.

.....

Now you're equipped with knowledge to build your own SDK. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
