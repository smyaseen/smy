---
title: >-
  TypeScript SDK Development: A 5-year-old could follow this step-by-step ~ Part
  2, folder structure - integrating API
subtitle: Dive into creating a proper SDK
slug: >-
  typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-2-folder-structure-integrating-api
brief: "Helloooooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nPart 1: https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp\nPart 3: https://smy.hashnode.dev/typescript-sdk..."
publishedAt: '2024-06-25T20:09:47.405Z'
updatedAt: '2024-11-04T05:18:55.518Z'
readTimeInMinutes: 3
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1719349118757/8d918d53-219a-4b43-ad9d-6fc9aa690c4b.png
  attribution: null
seo:
  title: TypeScript SDK Development
  description: Develop Your first TypeScript Library
series:
  name: TypeScript SDK Development
  slug: typescript-sdk-tutorial
tags:
  - name: TypeScript
    slug: typescript
  - name: Web Development
    slug: web-development
  - name: webdev
    slug: webdev
  - name: library
    slug: library
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
      slug: step-1-creating-a-folder-structure
      title: 'Step 1: Creating a folder structure'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-create-a-http-client
      title: 'Step 2: Create a HTTP Client'
      parentId: null
    - id: toc-3
      level: 3
      slug: step-3-creating-a-user-model
      title: 'Step 3: Creating a User Model'
      parentId: null
    - id: toc-4
      level: 3
      slug: step-4-create-an-api-to-fetch-users
      title: 'Step 4: Create an API to fetch Users'
      parentId: null
    - id: toc-5
      level: 3
      slug: step-5-create-an-entry-point
      title: 'Step 5: Create an Entry Point'
      parentId: null
    - id: toc-6
      level: 3
      slug: step-6-build-the-sdk
      title: 'Step 6: Build the SDK'
      parentId: null
    - id: toc-7
      level: 3
      slug: step-7-create-a-test-node-app
      title: 'Step 7: Create a test Node App'
      parentId: null
    - id: toc-8
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
**Helloooooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

Part 1: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-1-our-first-mvp)

Part 3: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-3-making-test-apps)

Part 4: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-4-publishing-to-npm)

Part 5: [https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers](https://smy.hashnode.dev/typescript-sdk-development-a-5-year-old-could-follow-this-step-by-step-part-5-cdn-for-browsers)

This is Part 2 of our SDK development series where we will dive into creating a folder structure and integrating an API

Heads up: any attribute or method starting from `#` is a private field. Private fields are truly private and are not emitted on the console log, `d.ts`, or elsewhere.

## Contents:

* ⚡ `Creating a folder strucutre`
    
* ⚡ `Coding an example for fetching users from API`
    

### Step 1: Creating a folder structure

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719337001763/ddfb539a-4b43-4044-b147-bdc1add43ba2.png align="center")

`apis` - for all external APIs

`models` - for all our interfaces

`services` - for business logic code

`index.ts` - our entry point

`example-apps` - contains our test apps for React, Browser, Node

### Step 2: Create a HTTP Client

In `src/services` create a `HttpClient.service.ts` file and paste the following content:

```javascript
export class HttpClient {
  static #baseUrl: string = "https://jsonplaceholder.typicode.com";

  constructor() {}

  async get(endpoint: string) {
    try {
      const response = await fetch(`${HttpClient.#baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
```

We have created a basic HTTP Client and using `jsonplaceholder` as our testing API endpoint.

### Step 3: Creating a User Model

In `src/models` create a `User.model.ts` file and paste the following content:

```javascript
export interface User {
  id: number;
  username: string;
  email: string;
}
```

### Step 4: Create an API to fetch Users

In `src/apis` create a `Users.api.ts` file and paste the following content:

```javascript
import type { User } from "../models/User.model.ts";
import { HttpClient } from "../services/HttpClient.service.ts";

export class UsersAPI {
  #httpClient: HttpClient;

  constructor() {
    this.#httpClient = new HttpClient();
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.#httpClient.get("/users");
      return users as User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}
```

Created a basic example of fetching users from an external endpoint.

### Step 5: Create an Entry Point

Inside `src/index.ts` paste the following content:

```javascript
import { UsersAPI } from "./apis/Users.api.ts";

class SDK {
  static #instance: SDK;
  #usersAPI: UsersAPI;

  constructor() {
    this.#usersAPI = new UsersAPI();
  }

  public static getInstance(): SDK {
    if (!SDK.#instance) {
      SDK.#instance = new SDK();
    }
    return SDK.#instance;
  }

  public fetchUsers() {
    return this.#usersAPI.getUsers();
  }
}

export default SDK.getInstance();
```

A basic entry point of SDK.

This is a Singleton Class to have 1 existence throughout our application. Later useful when initializing with properties like API key once in application.

### Step 6: Build the SDK

Add the following script to your `package.json`

```bash
 "build": "tsup ./src/index.ts --watch"
```

`--watch` the command will watch for any changes to the directory and automatically build your SDK.

Now run:

```bash
npm run build
```

### Step 7: Create a test Node App

In `example-apps` create a `index.js` file and paste the following content:

```javascript
import sdk from "../../dist/index.js";

console.log(await sdk.fetchUsers());
```

Now run the file with node:

```bash
node index.js
```

Your output should be looking like the following:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719338444168/2095f970-4739-4c5e-a4a9-48109df06d1d.png align="center")

Congrats 🎉🥳 🚀🚀🚀 We Just Built and Ran our first proper SDK!

## Wrapping Up:

We Just completed the basic steps to build and run our proper SDK. Head over to Part 3, where we will integrate our first test React app, Browser app, Node app, and Legacy Node app 🚀

.....

Now you're equipped with knowledge to build your own SDK. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
