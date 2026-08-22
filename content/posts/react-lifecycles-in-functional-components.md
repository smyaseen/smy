---
title: React Lifecycles in Functional Components
subtitle: >-
  What is the equivalent of lifecycle methods of Class components in functional?
  Let's find out.
slug: react-lifecycles-in-functional-components
brief: "Hellllooooooo!\nHope you're doing great! This is SMY! Welcome to my first article 👋\nIn this article, we are going to learn about equivalent of lifecycle methods of Class components in functional.\nContents:\nEquivalent of\n\n⚡ componentDidUpdate\n\n⚡ compo..."
publishedAt: '2021-11-22T11:47:38.263Z'
updatedAt: '2021-11-22T14:18:03.269Z'
readTimeInMinutes: 5
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1637336403883/SpXlmK-vwV.png
  attribution: null
seo:
  title: React Lifecycles in Functional Components
  description: >-
    What is the equivalent of lifecycle methods of Class components in
    functional? Let's find out.
series: null
tags:
  - name: React
    slug: reactjs
  - name: JavaScript
    slug: javascript
  - name: ReactHooks
    slug: reacthooks
  - name: Javascript library
    slug: javascript-library
tableOfContents:
  enabled: false
  items: []
---
**Hellllooooooo!**

Hope you're doing great! This is SMY! Welcome to my first article 👋

In this article, we are going to learn about **equivalent of lifecycle methods of Class components in functional**.

### Contents:

Equivalent of

- ⚡ `componentDidUpdate`

- ⚡ `componentDidMount`

- ⚡ `componentDidUpdate` with dependency

- ⚡ `componentWillUnmount`


**Let's start **🚀

Many react developers are using more and more functional components as opposed to class, so how to use the lifecycles in the functional components? Let's look at it.

To make lifecycles functional, we use one of the "hooks", called `useEffect`. The reason for `useEffect` existence, is to do something after the component re-renders. Now, there come different strategies of when to do something after re-render using `useEffect`. By default, it runs after every render, but we can control it. Let's look at those lifecycle strategies one by one.

### Run After Every Render: `componentDidUpdate`

#### Class Based 


```
import React from "react";

class ClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {
    console.log("render update");
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <button onClick={this.incrementCount}>Increment Count</button>
      </div>
    );
  }
}

export default ClassBased;
``` 
`componentDidUpdate` doesn't run on the component mount, but only after if any state changes or component re-renders except the first render.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637320177660/-lA7LFpuC.png)

On the other hand, `useEffect` equivalent to `componentDidUpdate` runs on the mount as well as after every render on default setup.

#### Functional: 

```
import { useEffect, useState } from "react";
import "./App.css";

function Functional() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("render update");
  });

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default Functional;

``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637320362463/nYArJ-Idp.png)

Here, `console.log` ran 3 times instead of two in class-based.

### 2. Run on Mount: `componentDidMount`

#### Class based

```
import React from "react";

class ClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("render update");
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <button onClick={this.incrementCount}>Increment Count</button>
      </div>
    );
  }
}

export default ClassBased;

``` 
It runs only on mount

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637326975137/zy4h5dOF5.png)


#### Functional

In functional, as the second parameter, it receives an array of states on which change we need to listen only. If it remains empty then it runs only on the mount.


```
import { useEffect, useState } from "react";
import "./App.css";

function Functional() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("render update");
  }, []);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default Functional;

``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637327144892/e8Cgpx1BY.png)

It ran only once on the mount.

### 3. Run On Certain State Change: `componentDidUpdate` with dependecy

#### Class based


```
import React from "react";

class ClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      anotherCount: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("render update");

    if (prevState.count !== this.state.count) {
      console.log("re render");
    }
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  incrementAnotherCount = () => {
    this.setState({ anotherCount: this.state.anotherCount + 1 });
  };

  render() {
    return (
      <div className="App">
        <h1>Count: {this.state.count}</h1>
        <h1>Another Count: {this.state.anotherCount}</h1>

        <button onClick={this.incrementCount}>Increment Count</button>
        <button onClick={this.incrementAnotherCount}>
          Increment Another Count
        </button>
      </div>
    );
  }
}

export default ClassBased;

```

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637328840097/1F7xvSonS.png)
 
There is one caveat here, we need to put conditions here. The function runs every time, whether any of our required state changes or any other. It can be seen here,

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637328980179/kgT3fI9EH.png)

#### Functional

In functional, it only runs when our given dependency changes.


```
import { useEffect, useState } from "react";
import "./App.css";

function Functional() {
  const [count, setCount] = useState(0);
  const [anotherCount, setAnotherCount] = useState(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const incrementAnotherCount = () => {
    setAnotherCount((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("render update");
  }, [count]);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <h1>Another Count: {anotherCount}</h1>

      <button onClick={incrementCount}>Increment Count</button>
      <button onClick={incrementAnotherCount}>Increment Another Count</button>
    </div>
  );
}

export default Functional;

``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637329935381/np4j3Ut2t.png)

 
Now, if I increment `anotherCount`, it does not run `useEffect`


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637329988470/IsC7mMovv.png)

We can give as many dependencies as we want.

### Run On Component Unmount: `componentWillUnmount`

#### Classbased

> Classbased.js

```
import React from "react";
import Child from "./Child";

class ClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: true,
    };
  }

  toggleShowComponent = () => {
    this.setState({ showComponent: !this.state.showComponent });
  };

  render() {
    return (
      <div className="App">
        {this.state.showComponent ? <Child /> : <h1>No Child</h1>}
        <button onClick={this.toggleShowComponent}>Toggle Component</button>
      </div>
    );
  }
}

export default ClassBased;

```

> Child.js


```
import React from "react";

class Child extends React.Component {
  componentWillUnmount() {
    alert("unmount called");
  }

  render() {
    return (
      <div className="App">
        <h1>Child Component</h1>
      </div>
    );
  }
}

export default Child;

``` 


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637331152110/Htd1npJ-Q.png)

Upon toggling, the parent component conditionally shows the h1 tag and hence unmounts the Child component, and `componentWillUnmount` runs.

 
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637331172091/263x3YCqj.png)

#### Functional

In functional, `useEffect` returns a callback which acts as `componentWillUnmount`.


```
import { useEffect, useState } from "react";
import "./App.css";
import Child from "./Child";

function Functional() {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    return () => {
      alert("unmount");
    };
  }, []);

  const toggleShowComponent = () => {
    setShowComponent((prev) => !prev);
  };

  return (
    <div className="App">
      {showComponent ? <Child /> : <h1>No Child</h1>}
      <button onClick={toggleShowComponent}>Toggle Component</button>
    </div>
  );
}

export default Functional;

``` 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637331405053/KS592LRrX.png)

Upon toggling,

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1637331422718/NHDghZbmi.png)


That's the basics of how we can replicate the basic class-based lifecycle behavior in functional-based components using `useEffect`.

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me: <a href="https://github.com/smyaseen">GitHub</a>  <a href="https://www.linkedin.com/in/sm-y">LinkedIn</a>
