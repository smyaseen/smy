---
title: Authenticated Protected Routing using NextJS Middleware and NextAuth
subtitle: Enhancing Next.js Security with NextAuth.js and Custom Middleware
slug: authenticated-protected-routing-using-nextjs-middleware-and-nextauth
brief: "....\nCover Photo by Susan Q Yin on Unsplash\nSource Code: https://gist.github.com/smyaseen/eb1ad52e85b7a6665642430bc4b9da31\n....\nHelloooooo!\nHope you're doing great! This is SMY! 👋 Let's Jump right in 🚀\nContents:\n\n⚡ Some Background of NextAuth and M..."
publishedAt: '2024-06-18T08:41:25.089Z'
updatedAt: '2024-06-24T07:31:54.667Z'
readTimeInMinutes: 4
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1718699285051/70e7932e-23ea-418a-96d5-b51cc751d253.jpeg
  attribution: null
seo:
  title: Authenticated Protected Routing using NextJS Middleware and NextAuth
  description: |-
    Enhancing Next.js Security with NextAuth.js and Custom Middleware

    Validate user path access on edge with NextAuth & Next.js Middleware
series: null
tags:
  - name: Next.js
    slug: nextjs
  - name: Middleware
    slug: middleware
  - name: JavaScript
    slug: javascript
  - name: TypeScript
    slug: typescript
  - name: React
    slug: reactjs
  - name: nextauth.js
    slug: nextauthjs
  - name: routing
    slug: routing
  - name: authentication
    slug: authentication
  - name: authorization
    slug: authorization
  - name: Validation
    slug: validation
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
      slug: step-1-install-dependencies
      title: 'Step 1: Install Dependencies'
      parentId: null
    - id: toc-5
      level: 3
      slug: step-2-configure-nextauthjs
      title: 'Step 2: Configure NextAuth.js'
      parentId: null
    - id: toc-6
      level: 3
      slug: step-3-implement-nextjs-middleware
      title: 'Step 3: Implement NextJS Middleware'
      parentId: null
    - id: toc-7
      level: 3
      slug: step-4-understand-the-middleware-logic
      title: 'Step 4: Understand the Middleware Logic'
      parentId: null
    - id: toc-8
      level: 2
      slug: wrapping-up
      title: 'Wrapping Up:'
      parentId: null
---
....

Cover Photo by [Susan Q Yin on Unsplas](https://unsplash.com/@syinq?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)[h](https://unsplash.com/photos/red-and-blue-arrow-sign-surrounded-by-brown-trees-BiWM-utpVVc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Source Code: [https://gist.github.com/smyaseen/eb1ad52e85b7a6665642430bc4b9da31](https://gist.github.com/smyaseen/eb1ad52e85b7a6665642430bc4b9da31)

....

**Helloooooo!**

Hope you're doing great! This is SMY! 👋 Let's Jump right in 🚀

## Contents:

* ⚡ `Some Background of NextAuth and Middleware`
    
* ⚡ `Implementation of NextAuth and Middleware validating user path access on edge`
    

## 1️⃣ What -

* **NextAuth.js**: NextAuth.js is an open-source authentication library specifically designed for Next.js applications. It supports various authentication providers such as Google, Facebook, and custom providers, offering a comprehensive solution for user authentication.
    
* **NextJS Middleware**: NextJS Middleware allows you to intercept and modify requests before your Next.js application handles them. This capability is essential for tasks like authentication, where you may need to redirect users, check authorization, or modify headers dynamically.
    

## 2️⃣ Why -

* **Flexibility**: NextAuth.js supports multiple authentication providers and allows for customization to fit diverse application needs.
    
* **Edge Validation**: NextJS Middleware enables validation and customization of requests at the edge, similar to an API gateway, ensuring robust security and tailored user experiences.
    
* **Streamlined Authorization**: By combining NextAuth.js and NextJS Middleware, you can efficiently manage user authorization and control page access without complex conditional rendering.
    

## 3️⃣ How -

### Step 1: Install Dependencies

First, ensure you have NextAuth.js installed in your Next.js project. Head over to NextAuth's documentation to learn more about integration:

[https://next-auth.js.org/getting-started/introduction](https://next-auth.js.org/getting-started/introduction)

### Step 2: Configure NextAuth.js

Set up NextAuth.js with your preferred authentication providers and configuration options. Below is a basic example using JWT strategy:

```javascript
// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Providers.JWT({
      secret: process.env.JWT_SECRET,
      // Additional JWT options if needed
    }),
    // Add other providers like Google, Facebook, etc.
  ],
  // Optional NextAuth.js configurations
});
```

### Step 3: Implement NextJS Middleware

Create a middleware function to handle authentication and authorization logic:

```javascript
// middleware.ts

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
const pathsToExclude = /^(?!\/(api|_next\/static|favicon\.ico|manifest|icon|static)).*$/;

// set of public pages that needed to be excluded from middleware
const publicPagesSet = new Set<string>(['home']);

const rootRegex = /^\/($|\?.+|#.+)?$/;

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!pathsToExclude.test(req.nextUrl.pathname) || publicPagesSet.has(req.nextUrl.pathname))
    return NextResponse.next();

  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // if user goes to root path '/' then redirect
  // /dashboard if authenticated
  // /login if unauthenticated
  if (rootRegex.test(req.nextUrl.pathname)) {
    if (isAuthenticated) return NextResponse.redirect(new URL('/dashboard', req.url)) as NextResponse;
    return NextResponse.redirect(new URL('/login', req.url)) as NextResponse;
  }

  // redirects user from '/login' if authenticated
  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url)) as NextResponse;
  }

  // This has to be same page option as in AuthOptions
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  return authMiddleware(req, event);
}
```

### Step 4: Understand the Middleware Logic

* **Paths to Exclude**: `pathsToExclude` regex ensures that certain paths like API routes (`/api/*`), static files (`/_next/static/*`), and others are excluded from middleware processing.
    
* **Public Pages Set**: `publicPagesSet` contains paths that are considered public and shouldn't be protected by middleware.
    
* **JWT Token**: `getToken({ req })` retrieves the JWT token from the request headers or cookies.
    
* **Authentication Checks**: The middleware checks if the user is authenticated (`isAuthenticated`). If not, it redirects to the login page (`/login`). If authenticated and accessing the root path (`/`), it redirects to `/dashboard`.
    
* **NextAuth Middleware**: For other protected routes, it utilizes `withAuth` from `next-auth/middleware` to enforce authentication requirements.
    

## Wrapping Up:

Implementing NextJS Middleware involves creating a middleware function (`middleware.ts`) that intercepts requests, performs authentication checks, and handles redirection based on the user's authentication status. This approach ensures secure and streamlined authentication within your Next.js application, enhancing both security and user experience.

By following these steps, you can effectively integrate NextAuth.js with NextJS Middleware to manage authentication and authorization in your Next.js projects. Adjust the middleware logic and configuration based on your specific application requirements and security policies.

.....

Now you're equipped to enhance your Next.js applications with robust authentication capabilities using NextAuth.js and NextJS Middleware. Happy coding! 🚀

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
