---
title: "George Pólya's Invention: Counting under Symmetry"
description: "How to count necklaces, chemical isomers, and colored regular solids without double-counting symmetric permutations."
date: "2026-05-16"
tags: ["Math", "Combinatorics", "Groups", "Pólya"]
category: "math"
difficulty: "Master"
author: "George Pólya"
---

Imagine you want to paint the faces of a cube with 2 colors: red and blue. How many distinct cubes can you paint?
Two cubes are considered *the same* if we can rotate one to match the other. This simple restriction makes counting surprisingly complicated, because the symmetry group of a cube has 24 rotations.

To solve problems of this type, George Pólya created **Pólya's Enumeration Theorem (PET)** in 1937, generalizing **Burnside's Lemma**. Let us understand how to count under group actions cleanly.

---

### Step 1: Understand Burnside's Lemma

First, we need to understand the relationship between our rotational symmetry group $G$ and our configurations.
Let $X$ be the set of all possible ways to choose colors (coloring without rotating). If we color the 6 faces of a cube with 2 colors, there are $2^6 = 64$ raw colorings.

We define a group of symmetries $G$. Two configurations $x, y \in X$ are equivalent if there is some symmetry $g \in G$ such that $g \cdot x = y$.
The goal of Pólya counting is to find the number of **orbits** (equivalence classes) of $X$ under the action of $G$.

**Burnside's Lemma** states that the number of orbits, denoted $|X / G|$, is the average number of configurations left unchanged by the symmetries:
$$|X / G| = \frac{1}{|G|} \sum_{g \in G} |X^g|$$
where $X^g = \{ x \in X \mid g \cdot x = x \}$ is the set of configurations fixed by $g$.

---

### Step 2: The Symmetries of the Cube

The symmetry group $G$ of a 3D cube contains 24 proper rotations. Let’s list them and compute how many face configurations they leave fixed!

1.  **Identity Rotation (1 translation):**
    *   Leaves all faces where they are.
    *   Cycle structure on faces: $(x_1)^6$ (6 cycles of length 1).
    *   Fixed colorings: $2^6 = 64$.
2.  **Rotations about Face Centers:**
    *   **$90^\circ$ and $270^\circ$ Rotations (6 rotations):**
        *   The axis passes through 2 opposite faces. These 2 faces are cycles of length 1. The other 4 faces rotate in a 4-cycle.
        *   Cycle structure: $(x_1)^2 (x_4)^1$.
        *   Fixed colorings: We must paint the 4-cycle faces the same color, and the two 1-cycle faces can be anything. Total $2^3 = 8$.
    *   **$180^\circ$ Rotations (3 rotations):**
        *   The axis passes through 2 opposite faces. These 2 faces stay still. The other 4 faces swap in pairs (two 2-cycles).
        *   Cycle structure: $(x_1)^2 (x_2)^2$.
        *   Fixed colorings: $2^4 = 16$.
3.  **Rotations about Diagonal Corners ($120^\circ$ and $240^\circ$) (8 rotations):**
        *   The axis connects opposite corners. The faces surrounding the corners swap in two 3-cycles.
        *   Cycle structure: $(x_3)^2$.
        *   Fixed colorings: $2^2 = 4$.
4.  **Rotations about Midpoints of Opposite Edges ($180^\circ$) (6 rotations):**
        *   Symmetry swaps 3 pairs of opposite/adjacent faces.
        *   Cycle structure: $(x_2)^3$.
        *   Fixed colorings: $2^3 = 8$.

---

### Step 3: Carry Out the Plan (Summing the Symmetries)

Now, let's plug these values into Burnside's Lemma!

$$|X / G| = \frac{1}{24} \sum_{g \in G} |X^g|$$

$$|X / G| = \frac{1}{24} \left( 1 \cdot 64 + 6 \cdot 8 + 3 \cdot 16 + 8 \cdot 4 + 6 \cdot 8 \right)$$
$$|X / G| = \frac{1}{24} \left( 64 + 48 + 48 + 32 + 48 \right)$$
$$|X / G| = \frac{1}{24} \left( 240 \right) = 10$$

There are exactly **10 mathematically distinct colored cubes** possible using 2 colors!

Let's list them to verify:
1.  All 6 faces Blue (1)
2.  5 Blue, 1 Red (1)
3.  4 Blue, 2 Red - adjacent (1)
4.  4 Blue, 2 Red - opposite (1)
5.  3 Blue, 3 Red - three sharing a corner (1)
6.  3 Blue, 3 Red - three in a band (1)
7.  2 Blue, 4 Red - adjacent (1)
8.  2 Blue, 4 Red - opposite (1)
9.  1 Blue, 5 Red (1)
10. All 6 faces Red (1)

Total = $1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 10$. The theory is flawless!

---

### Step 4: Look Back and Reflect

Pólya generalized this by introducing the **Cycle Index Polynomial**:
$$Z_G(x_1, x_2, \dots, x_k) = \frac{1}{|G|} \sum_{g \in G} x_1^{c_1} x_2^{c_2} \dots$$

Where $c_i$ is the number of cycles of length $i$. 
By substituting variables, PET can count asymmetric chemical structures (isomers), graphs, necklace designs, and infinite regular permutations. It remains a crowning achievement of enumerative combinatorics!
