# Math Is God 🏛️

> *“Learn the art of problem solving.”*

An elegant, minimal, and fast educational website inspired by **George Pólya’s** cognitive heuristics of discovery and the first-principles philosophy of problem-solving. It covers mathematical proofs, systemic computer science layouts, and cognitive abstractions.

## 🚀 Key Architectural Highlights

*   **Pristine Mathematical Design**: Default dark mode utilizing a dotted coordination-grid backdrop, responsive vector mathematical canvas visuals, glassmorphism card effects, and subtle micro-animating layout headers.
*   **Compile-Time Markdown Engine**: Automatically resolves local Markdown articles in `/src/content/` recursively via Vite’s raw `glob` module bundler. Zero database delay, zero client network fetch congestion. Supports seamless **daily uploads** directly via Git push!
*   **Pólya Heuristics Layout**: Features dual layouts for reading complex documentation containing progress tracking bars, deep linking anchors, dynamic Table of Contents scrolling, and automatic navigation for chapter lessons.
*   **Mathematics Preprocessor**: Converts standard LaTeX formatting equations (`$$ eq $$` and `$eq$`) into beautiful typeset blocks styled natively with Tailwind CSS.

---

## 📂 Project Structure

A clean, modular, and professional directory hierarchy:

```text
├── .env.example          # Sample environment secrets setup
├── index.html            # Main HTML frame entry
├── metadata.json         # Platform capabilities config
├── package.json          # Dependency packages and script configurations
├── tsconfig.json         # TypeScript configurations
├── vite.config.ts        # Vite compiler bundler rules
└── src/
    ├── App.tsx           # Primary routing state machine
    ├── main.tsx          # React application bootstrapping
    ├── index.css         # Tailwind directives + custom math fonts & animations
    ├── types.ts          # Strongly-typed interfaces for Articles, Courses, and Syllabi
    ├── components/
    │   ├── Navbar.tsx         # Responsive header with live search & deep transitions
    │   ├── Footer.tsx         # Minimalist quote-focused footer
    │   ├── Hero.tsx           # Grid hero containing vector golden spiral & equations list
    │   ├── PolyaPrinciples.tsx# The four problem-solving rules card checklist
    │   ├── ArticleCard.tsx    # Compact card showcasing difficulty, author, tags, and category
    │   └── ArticleReader.tsx  # Dual-column reading frame with Table of Contents & YouTube embeds
    ├── content/               # Storage directory for all markdown files (highly extensible)
    │   ├── programming/       # Codified programming patterns & invariants (e.g. two-sum.md)
    │   ├── math/              # Axiomatic proofs, Taylor groups, & geometry (e.g. euler-identity.md)
    │   ├── thinking/          # Heuristic logic & Socratic inquiries (e.g. first-principles.md)
    │   └── courses/           # Syllabus video-lectures mapped as chapters (e.g. heuristics-course-ch1.md)
    └── lib/
        └── content.ts         # Fast frontmatter parser + glob loader module
```

---

## 🛠️ Local Development Guide

### 1. Prerequisite Installations
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your workstation.

### 2. Install Dependencies
Restore the platform's required UI libraries and TypeScript dependencies:
```bash
npm install
```

### 3. Initiate the Dev Server
Fire up the local hot-rebuilding server on the standard port:
```bash
npm run dev
```
Open your web browser and navigate to: `http://localhost:3000`

### 4. Code Compilation & Linter Verification
Validate the strict type-safety matches:
```bash
npm run lint
```
Build the production-ready distribution package:
```bash
npm run build
```

---

## ✍️ Adding New Articles Daily

Extending the system's database of knowledge is as simple as creating a plain text file. Absolutely no CMS config or authentication database required.

Simply create a file inside your chosen category directory, e.g., `/src/content/math/my-new-proof.md`:

```markdown
---
title: "The Prime Number Theorem"
description: "How Gauss modeled the density of prime factors on a logarithmic curve."
date: "2026-05-20"
tags: ["Primes", "Number Theory", "Analysis"]
category: "math"
difficulty: "Deep"
author: "Carl Friedrich Gauss"
---

Write your markdown explanations here!
You can write LaTeX blocks using standard notation:
$$ \pi(x) \approx \frac{x}{\ln x} $$

This formula is beautiful!
```

Once checked in and pushed, the Vite engine compiles the Markdown and lists it instantly under the appropriate categories at runtime!

---

## ⛵ Deploying to Vercel

1. **Push to GitHub**: Push your customized directory structure to a standard GitHub repository.
2. **Import to Vercel**: Connect your Vercel account to the GitHub repository.
3. **Configure Settings**:
   * **Framework Preset**: Vite (detected automatically).
   * **Build Command**: `vite build` (or `npm run build`).
   * **Output Directory**: `dist`.
4. **Launch**: Click **Deploy**. Vercel will build and serve your static asset pipeline globally using their ultra-fast Edge network!
