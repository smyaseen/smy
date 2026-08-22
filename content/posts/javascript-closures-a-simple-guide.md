---
title: 'JavaScript Closures: A Simple Guide'
subtitle: Lets tackle and get familiar with JavaScript Closures
slug: javascript-closures-a-simple-guide
brief: "Hellllooooooo!\nHope you're doing great! This is SMY! Welcome to my second article 👋\nIn this article, we are going to learn about Closures in JavaScript.\nContents:\n\n⚡ Closures simple definiton\n\n⚡ Closure Example\n\n\nLet's start 🚀\nClosures are one of t..."
publishedAt: '2021-12-12T15:16:07.852Z'
updatedAt: '2021-12-26T12:39:20.695Z'
readTimeInMinutes: 2
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1639321560269/XDt0jMoC0.png
  attribution: null
seo:
  title: 'JavaScript Closures: A Simple Guide'
  description: |-
    JavaScript Closures: A Simple Guide:

    Lets tackle and get familiar with JavaScript Closures
series: null
tags:
  - name: JavaScript
    slug: javascript
  - name: closure
    slug: closure
  - name: Programming Blogs
    slug: programming-blogs
  - name: code
    slug: code
  - name: Programming Tips
    slug: programming-tips
tableOfContents:
  enabled: false
  items: []
---
**Hellllooooooo!**

Hope you're doing great! This is SMY! Welcome to my second article 👋

In this article, we are going to learn about **Closures in JavaScript**.

### Contents:

- ⚡ `Closures simple definiton`

- ⚡ `Closure Example`

**Let's start **🚀

`Closures` are one of the most fundamental topics of JavaScript nowadays. If you happen to give an interview or will, you must know your `Closures` well!

### Closures Simple Definiton

`Closures` are simply functions bundled together. Each function inside a `closure` has access to its parents and its parents and so on.. `lexical environment` or in other words has access to the variables and functions defined, created or initialised in its own `scope` and its ancestors.

Let's take a look at simple example, in which adding up two numbers.

## Example:

```
const add = (num1) => {   // outer function
  return (num2) => {   // inner function
    return num1 + num2;
  };
};

console.log(add(1)(2));    // logs 3

```

Let's break down what's happening on inside.

Whenever a function is created in JavaScript, it makes its own `execution context` and `lexical environment`. The inner function(s) have access to its parent or any of its ancestors `lexical environment`, that is because its own `execution context` and `lexical environment` is created inside those.

Lets visualise this with JavaScript.

```

{ // add execution context and or outer func

    const memory = { // outer lexical environment
        num1: 1,
    };
    
    { // inner func execution context

        const memory = { // inner lexical environment
            parentMemory: super.memory
            num2: 2,
        }; 
    }

}

```

We can see here how the inner memory has access or reference to all of its parents memory, which contains variables and functions if any.

One thing may be curious to you, is that how can the inner function has access to the `num1` if outer function finished executing before inner function?

The reason is, the inner function as visualised above in example code has the reference to parents memory or `lexical environment`.
<hr />

That's the basics of how we can use `Closures` in JavaScript.

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me: <a href="https://github.com/smyaseen">GitHub</a>  <a href="https://www.linkedin.com/in/sm-y">LinkedIn</a>
