---
title: "Searching Algorithms"
description: "An analysis of divide-and-conquer search, state invariants, and pruning large search spaces efficiently."
date: "2026-05-18"
tags: ["Algorithms", "Pólya", "Searching", "Invariants"]
category: "courses"
courseId: "heuristics-101"
chapterOrder: "03"
youtubeId: ""
duration: "18 mins"
---

Welcome to **Chapter 3 of Pólya's Art of Heuristics: Searching Algorithms**.

In this chapter, we extend our first-principles thinking to searching in structured and unstructured datasets. Finding an element is not merely about traversing sequentially; it is about verifying properties that allow you to prune search paths.

---

### video Lesson

(This video represents a blank placeholder for Searching Algorithms, ready for your custom stream feed.)

---

### Step-by-Step Logic of Binary Search

Let’s formulate the **divide-and-conquer** approach as a heuristic:

1.  **What is the unknown?** The index of the target value.
2.  **What are the data?** A sorted array of elements and a target to look for.
3.  **What is the condition?** The array must be sorted in non-decreasing order ($A[i] \le A[i+1]$).

#### Defining the Invariant

To devise a proof, we outline two boundary variables: `low` and `high`.

Our invariant throughout execution is:
$$\text{If the target exists in the array, it must lie within the range } [low, high]$$

$$mid = \lfloor \frac{low + high}{2} \rfloor$$

If $A[mid] < \text{target}$, we establish a new plan:
$$low = mid + 1$$

If $A[mid] > \text{target}$, our plan becomes:
$$high = mid - 1$$

With every step, the search domain bounds cut in half:
$$T(n) = T(n/2) + O(1) \implies O(\log n)$$

---

### Key Takeaways

*   **Structure Guides Search:** When an array has an ordered pattern, we do not need to look at every element.
*   **Decoupled Boundaries:** Boundary invariants keep our algorithm correct under any edge condition.
