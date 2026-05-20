---
title: "The Binary Search Invariant Theorem"
description: "Pólya's principle of 'devising a plan' requires finding a stable invariant. Let's study binary search boundaries once and for all."
date: "2026-05-19"
tags: ["Algorithms", "Binary Search", "Invariants", "Proofs"]
category: "programming"
difficulty: "Intermediate"
author: "George Pólya Jr."
---

Many students suffer from "infinite loop" syndrome when implementing **Binary Search**. They guess at `L <= R`, `L < R`, `mid - 1`, or `mid`. This is because they do not have a robust mathematical **invariant** guiding their plan.

Let’s apply Pólya’s process of deep analysis to conquer binary search forever.

---

### Step 1: Understand the Problem

We are searching for a value or a boundary in a monotonically sorted domain.
The fundamental unknown is the transition point where a predicate $P(x)$ changes from `false` to `true`.

Let our domain be $D = [0, N-1]$ integers.
We have a condition $P(i)$ which is static, and monotonic:
$$P(i) = \text{true} \implies P(j) = \text{true} \quad \forall j > i$$

We wish to find the first index $i$ such that $P(i)$ is true.

---

### Step 2: Devise a Plan (The Binary Search Invariant)

Let us define two index pointers: $L$ and $R$.
We establish the following **Loop Invariants**:
1. $P(L)$ is always `false`. (Implicitly, for all indices $\le L$, the condition is false).
2. $P(R)$ is always `true`. (Implicitly, for all indices $\ge R$, the condition is true).

We start with two virtual values representing bounds outside our indices:
$$L = -1 \quad (\text{Since we know nothing before index 0, we assume it is false})$$
$$R = N \quad (\text{Since we assume a boundary is reached or we want to return N})$$

While $L + 1 < R$ (which means there is at least one unchecked element between them):
1. Compute the midpoint:
   $$mid = L + \lfloor \frac{R - L}{2} \rfloor$$
2. Evaluate $P(mid)$:
   - If $P(mid)$ is `true`, we can safely assign $R = mid$. This maintains the invariant that $P(R) = \text{true}$.
   - If $P(mid)$ is `false`, we can safely assign $L = mid$. This maintains the invariant that $P(L) = \text{false}$.

---

### Step 3: Carry Out the Plan (Implementation)

Here is the clean, invariant-compliant code in TypeScript. Notice that this will never cause an infinite loop, because the search interval $R - L$ strictly decreases containing the answer.

```typescript
function firstTrue(n: number, predicate: (idx: number) => boolean): number {
    let L = -1;
    let R = n;

    while (L + 1 < R) {
        const mid = Math.floor(L + (R - L) / 2);
        
        if (predicate(mid)) {
            R = mid; // Invariant maintained: R is always True
        } else {
            L = mid; // Invariant maintained: L is always False
        }
    }

    // At the exit, L + 1 === R.
    // R is the very first index where the predicate evaluates to true.
    return R;
}
```

#### Why does this loop always terminate?
In each cycle, $mid$ is strictly greater than $L$ and strictly less than $R$ (since $L + 1 < R$). Thus, either $L$ increases or $R$ decreases, meaning the distance $R - L$ decreases by at least 1 in every step. It cannot run indefinitely.

---

### Step 4: Look Back and Reflect

Let us verify our general solution against standard problems:

*   **Standard Binary Search** (looking for exact match $x$ in sorted array `arr`):
    - Predicate $P(i)$: `arr[i] >= x`
    - Let $R = \text{firstTrue}(N, i \Rightarrow \text{arr}[i] \ge x)$.
    - If $R < N$ and $\text{arr}[R] === x$, we have found our index. Otherwise, $x$ does NOT exist in the array.
*   **Search Insertion Position** (where to insert $x$):
    - Just return $R$ directly!
*   **Capacity Optimization** (e.g., shipping packages within $D$ days):
    - Predicate $P(\text{capacity})$: `canShipWithinDays(capacity, D) === true`
    - Binary search on the capacity range $[1, \text{sum}(\text{weights})]$!
