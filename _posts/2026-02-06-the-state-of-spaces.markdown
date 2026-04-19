---
layout: post
title:  "The State of Spaces.."
date:   2026-02-06 18:00:00 -0600
categories: project update
published : false
---


Hi Everyone.

Today I'll try to walk through another addition to my projects. As I've been reading about probabilistic state space models it became necessary for me to actually model some states. State space models are motivated by the attempt to model the state of a system using some set of parameters say _x<sub>1</sub>, x<sub>2</sub>, .. x<sub>n</sub>_ in an _n_ dimensional space. Probabilistic state space models, translate the idea of a state to a Markov process, meaning the future state is only dependant on the current, i.e all historical information is encoded in this state. This is also called _memorylessness_.

Hidden Markov Models are a special type of SSMs, where we partially observe some Markov process, through _emmissions_ say __y<sub>1</sub>, y<sub>2</sub>, .. y<sub>n</sub>. These emmisions encode some information about the latent state which geenrates them. We can look at this through an example which will be detailed through this article. Suppose we have scheduled some task on a machine, and are receiving continuous logs, from a monitoring service about the cpu and memory usages of this job.