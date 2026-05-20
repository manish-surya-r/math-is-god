---
title: "Devising a Plan: Geometric Proof of Squares"
description: "How to find mathematical proofs by drawing constructs. We prove the Sum of Odd Integers formula geometrically."
date: "2026-05-12"
tags: ["Courses", "Heuristics", "Pólya", "Geometry"]
category: "courses"
courseId: "heuristics-101"
chapterOrder: "02"
youtubeId: "vKIsm_9n6zY"
duration: "18 mins"
---

In **Lesson 1**, we calculated small cases and guessed that the sum of the first $N$ odd positive integers is $N^2$. 

Now, we move on to **Pólya's Second Step: Devising a Plan**. We need a plan to prove that our guess holds true for all integers $N \ge 1$. How can we find such a proof? Let's use the power of geometry and visual reasoning.

### Video Lesson

Please watch the class session:

```youtube
vKIsm_9n6zY
```

---

### The Plan: A Visual Proof (Analogy & Abstraction)

Can we represent the sum of numbers as an area?
Let's represent each number as a collection of unit squares. 

Let's start with a single unit square representing **1** (or $1^2$):
```
■  (1)
```

Now, how do we add **3** to this square to build a larger square? We can wrap it around the top and right sides. This wrap-around shape is called a **gnomon** in ancient Greek geometry, and it is shaped like an "L":
```
■ ■
■
```
Notice how we have added exactly **3** unit squares. The total shape is now a $2 \times 2$ grid containing **4** unit squares!

Now, how do we add **5**? We wrap another "L"-shaped gnomon of size 5 around our $2 \times 2$ square:
```
■ ■ ■
■     
■     
```
(Together, the $2 \times 2$ square plus the 5-gnomon makes a $3 \times 3$ grid containing **9** unit squares!)

---

### Step 3: Carrying Out the Plan

Let's generalize this pattern:
*   In step $N$, we already have an $(N-1) \times (N-1)$ square, which has an area of $(N-1)^2$.
*   To expand it to an $N \times N$ square, we must add a gnomon.
*   The gnomon consists of:
    - $(N - 1)$ squares on the right side
    - $(N - 1)$ squares on the top side
    - $1$ square in the top-right corner
*   The total number of squares added is:
    $$(N - 1) + (N - 1) + 1 = 2N - 1$$

This is exactly the $N$-th odd integer!

Therefore, adding the $N$-th odd integer always completes the $N \times N$ square, which has an area of $N^2$.

Mathematically, our geometric plan carries out the proof perfectly:
$$S_N = S_{N-1} + (2N - 1) = N^2$$

---

### Step 4: Looking Back and Reflecting

Can you use this result or method for another problem?

*   This "gnomon wrapping" method explains why $(N+1)^2 - N^2 = 2N + 1$ (the difference between successive squares is always an odd number!).
*   It demonstrates how arithmetic properties can be mapped to continuous geometric spaces.
*   Can you design a similar geometric wrapping method to prove the sum of the first $N$ even numbers? (Hint: Use rectangles instead of squares!)
