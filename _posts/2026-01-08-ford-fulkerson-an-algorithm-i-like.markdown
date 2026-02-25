---
layout: post
title:  "Flomaxxing"
date:   2026-01-08 17:55:34 -0600
categories: algos i like
published : false
---

Hi Everyone.

Networks are an extremely intuitive mental model, and I honestly feel that almost everyone has a very perfect picture of anything flowing throuhgh a netwrok in their heads. The intuitive flow might not be physically accurate, but it does 'feel' right in a sense, which is all that matters. I've often found that identifying some trivial subset of a complex problem helps the most in understanding the problem well.

Maximizing flow in a network is an inetersting and valuable problem. Let's break the problem down a bit more. Flow could be anything, information, water, current any thing that flows well in your head. When we say network - we often imagine a collection of nodes, connected to each other in a somewhat mesh-y manner. When we speak of something flowing through a path, we are compelled to define the measures of that path a bit more carefully. Keeping things simple, it might be a good idea to associate a capacity to every edge that connects any two nodes. Let this capacity be a non negative integer, for example if the capacity of an edge is 3, we mean the edge can take atmost 3 units of whatever we want to send through.

It's also a good point to talk about these nodes now. Again, something intuitive would be to establish that the net stuff flowing inside the node is equal to the net stuff flowing outside of that node. We assume no nodes leak. This is also called _Conservation of Flow_. Along with this, we'll also define two special nodes, all material originates at the source, '_s_', and ends up in the sink, '_t_'. Now, we have a slightly more detailed mental model and here's what the picture of it looks like in my head.
