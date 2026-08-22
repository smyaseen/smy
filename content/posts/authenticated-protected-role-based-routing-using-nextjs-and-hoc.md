---
title: Authenticated Protected Role-based Routing using Next.js and HOC
subtitle: Implementing Authenticated Protected Role-based Routing using Next.js and HOC
slug: authenticated-protected-role-based-routing-using-nextjs-and-hoc
brief: "Hellllooooooo!\nHope you're doing great! This is SMY! 👋\nIn this article, we are going to learn about Implementing Authenticated Protected Role-based Routing using Next.js and HOC.\nPart 2: https://smy.hashnode.dev/validate-user-path-access-on-edge-wit..."
publishedAt: '2022-12-08T11:48:41.042Z'
updatedAt: '2024-06-24T07:20:48.714Z'
readTimeInMinutes: 3
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1670497739278/0moN-BV0y.png
  attribution: null
seo:
  title: Authenticated Protected Role-based Routing using Next.js and HOC
  description: >-
    Implementing Authenticated Protected Role-based Routing using Next.js and
    HOC
series: null
tags:
  - name: Next.js
    slug: nextjs
  - name: React
    slug: reactjs
  - name: Software Engineering
    slug: software-engineering
  - name: JavaScript
    slug: javascript
  - name: TypeScript
    slug: typescript
tableOfContents:
  enabled: false
  items: []
---
**Hellllooooooo!**

Hope you're doing great! This is SMY! 👋

In this article, we are going to learn about **Implementing Authenticated Protected Role-based Routing using Next.js and HOC**.

Part 2: [https://smy.hashnode.dev/validate-user-path-access-on-edge-with-nextauth-nextjs-middleware](https://smy.hashnode.dev/validate-user-path-access-on-edge-with-nextauth-nextjs-middleware)

### Contents:

* ⚡ `My Story and Explanation`
    
* ⚡ `Implementation of Role-based Routing using HOC`
    

\*\*Let's start \*\*🚀

`Routing` is one of the most used parts of Web Development today. `Routing` allows us to effectively switch between different pages.

In my experience, routing through the `React Router Dom` library in a `React` application is way more powerful than in `Next.js` since developers have the upper hand in implementing `Routing` in their own, and custom way. `Next.js` on one hand gives developers the feasibility of not having to configure routing is great for a simple application but becomes difficult once you have multiple roles and conditions.

I've found 3 ways of implementing Role-based protected Routing using Next.js, and the first one is using HOC.

### Implementation of Routing using HOC:

#### Constant Roles

`roles.ts`

```bash
const Roles = {
  customer: 'customer',
  admin: 'admin'
};

export default Roles;
```

Created a constant Roles file to stay consistent

#### Constant RouteNames

`RouteNames.ts`

```bash
export const RouteNames = {
  login: '/auth/login',
  signup: '/auth/signup',
  dashboard: '/dashboard',
  admin: '/admin',
};

export default RouteNames;
```

Created a constant RouteNames file to stay consistent

#### RouteConfig

`RouteConfig.ts`

```bash
import Roles from '../utility/roles';
import { RouteNames } from './RouteNames';

const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  [Roles.customer]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
  },
  [Roles.admin]: {
    default: RouteNames.admin,
    [RouteNames.admin]: RouteNames.admin,
  },

};

export default routeConfig;
```

Created a constant Route Configs which contains configuration as to which role has access to which page, and its default page.

#### withAuth HOC

`withAuth.ts`

```bash
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthState } from '../store/slices/authSlice';
import { useSelector } from '../store/store';
import routeConfig from './RouteConfig';

const withAuth =
  (Component: React.FC) =>
  (allowedRole: string) =>
  (props: any) => {
    // getting the auth state from redux store
    const { isLoggedIn, role } = useSelector(getAuthState);
    const router = useRouter();

    // using a state to keep track if user is in correct state or path
    const [isValidRoute, setIsValidRoute] = useState(false);

    useEffect(() => {
      // first condition is to check if logged in and if on wrong path
      // then route to default route of the particular role user is of

      if (
        isLoggedIn &&
        (!(role === allowedRole) ||
        !routeConfig[role][router.pathname])
      ) {
        setIsValidRoute(false);
        router.push(routeConfig[role].default);
      }

      // second condition is to check if not logged in and if on wrong path
      // then route to default not authenticated path
      else if (!isLoggedIn && !routeConfig.auth[router.pathname]) {
        setIsValidRoute(false);
        router.push(routeConfig.auth.default);
      }

      // if upper two conditions are not met then the route user is in correct and return the component
      else setIsValidRoute(true);
    }, []);

    return isValidRoute ? <Component {...props} /> : null;
  };

export default withAuth;
```

#### using withAuth HOC on pages

`dashboard.ts`

```bash
import React from 'react';
import { NextPage } from 'next';
import withAuth from '../../routes/withAuth';
import Roles from '../../utility/roles';

const Dashboard: NextPage = () => {
  return <h1>Dashboard</h1>;
};

// See how we are passing the valid Role through the second currying
export default withAuth(Dashboard)(Roles.customer);
```

### Wrapping Up:

That's the HOC way of implementing Authenticated Protected Role-based Routing using Next.js.

Stay tuned, where I will cover two more ways

* ⚡ `using AuthGuard component at most Parent Level`
    
* ⚡ `using Next.js middleware` - [https://smy.hashnode.dev/validate-user-path-access-on-edge-with-nextauth-nextjs-middleware](https://smy.hashnode.dev/validate-user-path-access-on-edge-with-nextauth-nextjs-middleware)
    

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me:

[GitHub](https://github.com/smyaseen)

[LinkedIn](https://www.linkedin.com/in/sm-y)
