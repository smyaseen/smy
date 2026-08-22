---
title: 'Elevate Your Next.js Security: Middleware Authorization with Userfront'
subtitle: 'Maximizing Security with Middleware: A Guide to Userfront Integration'
slug: elevate-your-nextjs-security-middleware-authorization-with-userfront
brief: >-
  In this guide, I will show you how to secure your Next.js application with
  Userfront by implementing middleware-level authorization and leaving component
  authorization practices.

  Implementing robust security measures like IAM is essential for protect...
publishedAt: '2024-10-06T10:13:14.378Z'
updatedAt: '2025-03-12T11:54:12.216Z'
readTimeInMinutes: 5
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1728209330254/6f2a2a2b-3ba5-4850-b2a0-57da2c0a1c1d.png
  attribution: null
seo:
  title: 'Secure Next.js Apps: Userfront Middleware Guide'
  description: >-
    Secure your Next.js app with Userfront middleware authorization for robust
    IAM solutions. Protect user data and streamline authentication practices
series: null
tags:
  - name: 'userfront '
    slug: userfront
  - name: Vercel
    slug: vercel
  - name: Middleware
    slug: middleware
  - name: Next.js
    slug: nextjs
  - name: Security
    slug: security
  - name: IAM
    slug: iam
  - name: SSO
    slug: sso
  - name: Multi tenancy
    slug: multi-tenancy
tableOfContents:
  enabled: true
  items:
    - id: toc-0
      level: 3
      slug: key-takeaways
      title: Key Takeaways
      parentId: null
    - id: toc-1
      level: 2
      slug: understanding-userfront-in-the-iam-landscape
      title: Understanding Userfront in the IAM Landscape
      parentId: null
    - id: toc-2
      level: 2
      slug: getting-started-with-userfront
      title: Getting Started with Userfront
      parentId: null
    - id: toc-3
      level: 2
      slug: setting-up-userfront-in-your-nextjs-application
      title: Setting Up Userfront in Your Next.js Application
      parentId: null
    - id: toc-4
      level: 3
      slug: environment-variables
      title: Environment Variables
      parentId: null
    - id: toc-5
      level: 3
      slug: project-structure
      title: Project Structure
      parentId: null
    - id: toc-6
      level: 3
      slug: directory-breakdown
      title: Directory Breakdown
      parentId: null
    - id: toc-7
      level: 2
      slug: why-component-level-authorization-is-problematic
      title: Why Component-Level Authorization is Problematic
      parentId: null
    - id: toc-8
      level: 3
      slug: drawbacks
      title: Drawbacks
      parentId: null
    - id: toc-9
      level: 2
      slug: implementing-middleware-for-authentication
      title: Implementing Middleware for Authentication
      parentId: null
    - id: toc-10
      level: 3
      slug: middleware-explained
      title: Middleware Explained
      parentId: null
    - id: toc-11
      level: 2
      slug: conclusion
      title: Conclusion
      parentId: null
---
In this guide, I will show you how to secure your Next.js application with Userfront by implementing middleware-level authorization and leaving component authorization practices.

Implementing robust security measures like IAM is essential for protecting user data and maintaining compliance. This builds trust with your users and safeguards your application from potential vulnerabilities.

Many developers overlook comprehensive IAM solutions, opting for basic authentication methods that can expose their applications to significant security risks.

### Key Takeaways

* Explore Userfront’s features like SSO, multi-tenancy, two-factor authentication, and custom JWTs, all available with a generous free tier.
    
* Understand the drawbacks of component-level user authorization.
    
* Ensure middleware-level JWT verification for robust authorization.
    

---

As applications grow in complexity, robust security becomes increasingly crucial. Userfront provides a modern IAM solution that integrates seamlessly with Next.js. This guide walks you through integrating Userfront authentication, emphasizing best practices for a secure setup.

## Understanding Userfront in the IAM Landscape

Userfront simplifies the authentication process for developers with its easy-to-use SDK. Key features include:

* **Single Sign-On (SSO)**: Users can log in once and access multiple applications without re-authenticating.
    
* **Multi-Tenancy**: Supports multiple clients with a single Userfront account, ideal for SaaS applications.
    
* **Two-Factor Authentication (2FA)**: Adds an extra layer of security by requiring a second form of verification.
    
* **SOC 2 Compliance**: Adheres to strict data privacy and security standards.
    

Learn more about Userfront [here](https://userfront.com/).

## Getting Started with Userfront

The Project is already settled up with Userfront. Clone the repository from [this link](https://github.com/smyaseen/userfront-nextjs-middleware). To learn about the fundamentals of setting up Userfront with Next.js, refer to the official documentation [https://userfront.com/docs/examples/next](https://userfront.com/docs/examples/next)

## Setting Up Userfront in Your Next.js Application

### Environment Variables

Create an `.env` file in your project root:

```typescript
# WorkspaceId can be found at https://userfront.com/dashboard
NEXT_PUBLIC_USERFRONT_WORKSPACE_ID="..."

# Public JWT key can be found at https://userfront.com/test/dashboard/jwt?tab=public
# Make sure to get Base64 encoded public key
JWT_PUBLIC_KEY_BASE64="..."
```

### Project Structure

```typescript
app
├── (auth)
│   ├── layout.tsx
│   ├── login
│   │   └── page.tsx
│   ├── reset
│   │   └── page.tsx
│   └── signup
│       └── page.tsx
├── (public)
│   └── home
│       └── page.tsx
├── (secure)
│   └── dashboard
│       └── page.tsx
├── _components
│   └── Header.tsx
├── globals.css
└── layout.tsx
```

### Directory Breakdown

* **(auth)**: Contains authentication-related pages (login, signup, reset).
    
* **(public)**: Public-facing pages (like home) accessible without authentication.
    
* **(secure)**: Pages requiring authentication (like the dashboard).
    

## Why Component-Level Authorization is Problematic

Consider this approach:

```typescript
// app/(secure)/layout.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUserfront } from "@userfront/next/client";

export default function SecureLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserfront();

  React.useEffect(() => {
    if (isAuthenticated || isLoading || !router) return;
    router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated || isLoading) {
    return null;
  }

  return children;
}
```

**added a console log to see how it’s going into the secure component everytime and redirects in split second:**

![](https://s1.gifyu.com/images/SB37q.gif align="center")

### Drawbacks

1. **Redirects**: Unnecessary redirects and allowing component access for a split second leaving security flaws and bad UX.
    
2. **Insecure Logic**: Client-side checks can be manipulated, exposing sensitive data.
    
3. **Race Conditions**: Delays in loading may expose restricted content.
    
4. **Performance Issues**: Unnecessary rendering can slow down your application.
    
5. **Complexity**: Mixing authentication logic with UI rendering complicates maintenance.
    
6. **Scalability**: Harder to manage as the application grows.
    

## Implementing Middleware for Authentication

Create a `middleware.ts` file for JWT verification:

```typescript
// middleware.ts
"use server";

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, importSPKI, JWTPayload } from "jose";

const JWT_PUBLIC_KEY_BASE64 = process.env.JWT_PUBLIC_KEY_BASE64!;
const WORKSPACE_ID = process.env.NEXT_PUBLIC_USERFRONT_WORKSPACE_ID

interface UserFrontJwtPayload extends JWTPayload {
  userId?: string;
}

async function verifyToken(token: string, publicKeyBase64: string) {
  try {
    const publicKey = await importSPKI(
      Buffer.from(publicKeyBase64, "base64").toString("utf-8"),
      "RS256"
    );
    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    });
    return payload as UserFrontJwtPayload;
  } catch (error) {
    console.log("JWT verification failed:", error);
    return null;
  }
}

const pathsToExclude = /^(?!\/(api|_next\/static|favicon\.ico|manifest|icon|static|mergn)).*$/;
const publicPagesSet = new Set<string>(["/home"]);
const privatePagesSet = new Set<string>(["/dashboard"]);
const rootRegex = /^\/($|\?.+|#.+)?$/;

export default async function middleware(req: NextRequest) {
  if (!pathsToExclude.test(req.nextUrl.pathname) || publicPagesSet.has(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get(`access.${WORKSPACE_ID}`)?.value;
  const decoded = accessToken ? await verifyToken(accessToken, JWT_PUBLIC_KEY_BASE64) : null;
  const isAuthenticated = decoded && decoded.userId;

  if (rootRegex.test(req.nextUrl.pathname)) {
    return isAuthenticated ? NextResponse.redirect(new URL("/dashboard", req.url)) : NextResponse.redirect(new URL("/login", req.url));
  }

  if (privatePagesSet.has(req.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
```

**see the instant redirect in action:**

![](https://s11.gifyu.com/images/SB3kQ.gif align="center")

### Middleware Explained

Middleware processes requests before they reach routes, centralizing authentication logic. Key functions include:

* **JWT Verification**: Ensures only authenticated users can access protected routes.
    
* **Path Exclusions**: Optimizes performance by excluding public routes from authentication checks.
    
* **Redirect Logic**: Manages user redirection based on authentication status.
    

## Conclusion

By following these steps, you can effectively secure your Next.js application with Userfront's IAM capabilities. Middleware enhances security, ensuring only authorized users access sensitive routes while providing a seamless user experience.

For more details on the Userfront and its features, visit the Userfront documentation. With Userfront’s generous free tier, you can explore advanced features like SSO, multi-tenancy, and more without any initial investment.

That’s it! I hope you found this guide helpful. 🚀

Feel free to follow me on GitHub and LinkedIn for more guides.

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)

---

Stay awesome and happy coding! ✨
