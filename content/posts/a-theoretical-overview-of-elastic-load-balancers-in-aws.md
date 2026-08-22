---
title: A Theoretical Overview Of Elastic Load Balancers in AWS
subtitle: What are Elastic Load Balancers and their types? Let's find out
slug: a-theoretical-overview-of-elastic-load-balancers-in-aws
brief: "Hellllooooooo!\nHope you're doing great! This is SMY! 👋\nIn this article, we are going to learn about A Theoretical Overview of Elastic Load Balancers in AWS.\nContents:\n\n⚡ What is Load Balancer\n\n⚡ Elastic Load Balancers (ELB)\n\n⚡ Classic Load Balancer ..."
publishedAt: '2022-02-21T09:12:41.814Z'
updatedAt: '2022-02-21T12:29:47.860Z'
readTimeInMinutes: 4
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1645434244621/tW6dEOJvI.png
  attribution: null
seo:
  title: A Theoretical Overview Of Elastic Load Balancers in AWS
  description: >-
    A Theoretical Overview Of Elastic Load Balancers in Amazon Web Services (
    AWS) and their types
series: null
tags:
  - name: AWS
    slug: aws
  - name: Cloud
    slug: cloud
  - name: Amazon Web Services
    slug: amazon-web-services
  - name: ec2
    slug: ec2
tableOfContents:
  enabled: false
  items: []
---
**Hellllooooooo!**

Hope you're doing great! This is SMY! 👋

In this article, we are going to learn about **A Theoretical Overview of Elastic Load Balancers in AWS**.

### Contents:

- ⚡ `What is Load Balancer`

- ⚡ `Elastic Load Balancers (ELB)`

- ⚡ `Classic Load Balancer (CLB)`

- ⚡ `Application Load Balancer (ALB)`

- ⚡ `Network Load Balancer (NLB)`


**Let's start **🚀

`Load Balancer` is one of the most used services in Cloud Computing. `Load Balancers` allows us to intelligently and effectively distribute the load across multiple instances of our application.

#### Example:

Let's say we have three instances i.e. A, B, and C.

Now suppose we have high traffic over instance A. A `Load Balancer` will automatically and effectively distribute the load over other free instances, in this case, B. Same case here with B, if there is high traffic on B too, then it will distribute the load even further over to C. By this way, the user of our application will continue to have rich experience without the need of compromising on load time or maybe application crashing on heavy load. It is up to us how many instances we want of our application based on metrics.


![Load Balancer example.drawio.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645430512405/wo1yEr1bR.png)

###  Elastic Load Balancers


`Elastic Load Balancer` is the term that is used by AWS for its services of load balancers. In AWS, an `Elastic Load Balancer` is a fully managed load balancer by AWS themselves and they do everything for us, and we get out of the box completely managed service. We just have to configure it according to our application needs. As per Amazon

"Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets and virtual appliances in one or more Availability Zones (AZs)."

Developing our own load balancer may cost less, but only financially. There are other things that costs which are crucial such as manpower, maintenance, and time. So, an `ELB` pros here outweigh the cons.

`ELB` is integrated with many AWS services like EC2, CloudWatch, AWS WAF, Route 53, and so on...

To keep check of `EC2` instances running fine, `ELB` performs a health check on all managed `EC2` instances. The health check is performed on a specific configured port and route and runs at some interval configured by the user. The health check pings the instances on the route and port defined, and if it does not receive the `200` status code, it marks it as unhealthy and will not route traffic to that instance.

There are 4 types of `ELB` in AWS:

- `Classic Load Balancer (CLB)`

- `Application Load Balancer (ALB)`

- `Network Load Balancer (NLB)`

- `Gateway Load Balancer (GLB)`


### Classic Load Balancer (CLB)

`Classic Load Balancer (CLB)` is the legacy load balancer in AWS. It is deprecated and will no longer be available to create new after the expected date `August 15, 2022`.

- It supports TCP, HTTP, and HTTPs
- It performs health checks on TCP or HTTP
- It has a fixed hostname `ABC.region.elb.amazonaws.com` where `ABC` is the user-specified domain.


### Application Load Balancer (ALB)

`Application Load Balancer (ALB)` is the new standard load balancer in AWS.

- It has support for HTTP/2, HTTPS, and WebSocket
- It supports redirects like HTTP to HTTPS
- Load Balances to multiple applications over HTTP across multiple instances
- Load Balances to multiple applications over HTTP across the same instances
- Port mapping feature to redirect to dynamic port in `Elastic Container Service (ECS)`
- Health checks are done at the target group level
- We would need multiple CLBs per application for multi routing instead of one ALB
- Has a Fixed hostname
- Application servers will not see the IP address of the client directly, and the actual client IP is inserted in the Header X-Forwarded-for
- Routes to different `EC2 instances` based on different target groups, hostname, query strings, and headers

#### Example:

Routing based on target group: 

example.com/posts <br />
example.com/users

Routing based on hostname:

one.example.com <br />
other.example.com

Routing based on Query String:

example.com/posts?id=1 <br />
example.com/user?cart=false


AlBs are good to use for microservices and containerized-based applications.


### Network Load Balancer (NLB)

`Network Load Balancer (NLB)` is the mission-critical load balancer. This load balancer is used for applications with high network usage and requests.

- Forwards TCP and UDP traffic to the instances
- Handles millions of requests per second
- Significantly less latency ~ 100 ms vs ~ 400 ms in ALB
- NLB is used for extreme traffic use cases and performance i.e. TCP or UDP traffic
- NLB has one static IP per Availability Zone in AWS and it supports assigning Elastic IPs which is helpful for whitelisting specific IP
- It is not included in AWS Free Tier

For applications with millions of traffic like `Amazon.com`, `NLB` is the way to go.


<hr /> 

I haven't covered the Gateway Load Balancer, as it is a little advanced, and haven't studied much about it.

That's the basic theoretical overview `Elastic Load Balancers in AWS`.

That's it, folks! hope it was a good read for you. Thank you! ✨

👉 Follow me: <a href="https://github.com/smyaseen">GitHub</a> <a href="https://www.linkedin.com/in/sm-y">LinkedIn</a>
