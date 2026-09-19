---
layout: post
title:  "understanding superposition"
date:   2026-05-08 18:00:00 -0600
categories: projects update
published : false
---

Hello Everyone, 

Today we will talk about superposition, and how I undeerstand it works in LLMs.

From what we know that essentially LLMs are stacked layers of self attention plus mlp. More naturally, attention blocks are neural networks, and we believe (and know) that neurons tend to develop an _understanding_ of the data that they are trained on.

In toy models of superpositions, the idea is to show that neurons within a neural netwrok find it optimal to superimpose their understanding of linearly separable features into individual neuron and this tendency to superimpose increases as the feature distribution becomes sparse in the training data.


