---
title: "Unraveling Two-Sum through Pólya's Lens"
description: "Why standard LeetCode patterns are heuristics in disguise. We dissect Two-Sum using Pólya’s 4 principles of problem solving."
date: "2026-05-18"
tags: ["Algorithms", "Heuristics", "Pólya", "Data Structures"]
category: "programming"
difficulty: "Beginner"
author: "George Pólya Jr."
---

When programmers look at a problem like **Two-Sum**, they often jump straight into writing code or memorizing hash maps. This approach completely misses the *art of problem-solving*. Let us slow down and apply George Pólya's four-step methodology to unpack Two-Sum systematically.

---

### Step 1: Understand the Problem

First, we must ask: **What is the unknown? What are the data? What is the condition?**

*   **The Data**: An array of integers `nums` and a target integer `target`.
*   **The Unknown**: Indices of two numbers in `nums` that add up to `target`.
*   **The Condition**:
    1. Each input has *exactly* one mathematical solution.
    2. You cannot use the *same* element twice (no self-pairing).
    3. The return can be in any order.

Let us test a small example:
`nums = [2, 7, 11, 15]`, `target = 9`.
Our visual check shows that `2 + 7 = 9`. Thus, we should return indices `[0, 1]`.

---

### Step 2: Devise a Plan

Can we find a connection between the data and the unknown? Can we invent an auxiliary problem?
Let's look at three distinct approaches, evaluating how our "plan" evolves:

#### Approach A: The Brute-Force Instinct (Analogy with Exhaustive Inspection)
We can compare every single element with every other element. 
If we inspect element $x$, we look for another element $y$ such that $x + y = \text{target}$.
*   **Heuristic**: "If you cannot solve the proposed problem, try to solve first some related problem." What if the array only had 2 items? We just add them. If more, we check all pairs.

#### Approach B: Sorted Search (Divide and Conquer Heuristic)
What if the array were sorted? 
If `nums` is sorted: we could point one index $L$ at the start, and one index $R$ at the end.
If $nums[L] + nums[R] < \text{target}$, we advance $L$. If $nums[L] + nums[R] > \text{target}$, we decrement $R$.
*   **Trade-off**: Sorting takes $O(N \log N)$ time, and we would lose the original indices, meaning we would need to store original indices first.

#### Approach C: The Complement Search (Auxiliary State)
Reframe the algebra:
$$y = \text{target} - x$$
For each element $x$ we visit, we ask: *"Has $y$ (its complement) already been seen in our past traversal?"*
To answer this instantly ($O(1)$ lookup), we need a memory store (a Hash Map) of previously seen numbers and their indices.

---

### Step 3: Carry Out the Plan

Let us write the code for the optimal **Complement Search** approach.

```typescript
function twoSum(nums: number[], target: number): number[] {
    // Key: number, Value: index
    const seenMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const complement = target - current;

        // Have we seen this complement before?
        if (seenMap.has(complement)) {
            return [seenMap.get(complement)!, i];
        }

        // Record the current number with its index for future lookups
        seenMap.set(current, i);
    }

    return []; // Satisfies return structure, though problem guarantees a solution
}
```

#### Complexity Analysis

*   **Time Complexity**: $O(N)$. We make exactly one pass through the array. Each lookup in the `seenMap` takes average $O(1)$ time.
*   **Space Complexity**: $O(N)$. In the worst case, we will store $N-1$ elements in the map.

---

### Step 4: Look Back and Reflect

Can we derive the result differently? Can we use the result, or the method, for some other problem?

*   **Duality of Traversal**: Notice how we populate the hash map *as we go* rather than in advance. This prevents a number from pairing with itself (e.g. if `target = 6` and `nums = [3, 4]`, we won't match index `0` with index `0`).
*   **Generality**: The core method—storing a history of complements and looking up matching relations—extends directly to **3-Sum**, **Subarray Sum Equals K**, and sequence-matching problem structures.
