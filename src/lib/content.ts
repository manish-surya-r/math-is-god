/// <reference types="vite/client" />
/**
 * Content provider for Math Is God
 * Loads markdown files at compile-time using Vite's glob import.
 */

import { Article, FrontMatter, Course } from '../types';

// Use Vite's modern glob import to pull all markdown files as raw text
const rawContentModules = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Parses frontmatter from raw markdown string
 */
export function parseMarkdown(filepath: string, rawText: string): Article {
  // Extract category and slug from the filepath (e.g. /src/content/programming/two-sum.md -> programming, two-sum)
  const normalizedPath = filepath.replace(/\\/g, '/'); // Windows support
  const pathParts = normalizedPath.split('/');
  const filename = pathParts[pathParts.length - 1];
  const slug = filename.replace(/\.md$/, '');
  
  // Default category guess from folder structure
  let folderCategory = 'thinking';
  if (normalizedPath.includes('/programming/')) folderCategory = 'programming';
  else if (normalizedPath.includes('/math/')) folderCategory = 'math';
  else if (normalizedPath.includes('/courses/')) folderCategory = 'courses';
  else if (normalizedPath.includes('/thinking/')) folderCategory = 'thinking';

  const match = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return {
      slug,
      category: folderCategory,
      frontMatter: {
        title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        category: folderCategory as any,
      },
      content: rawText,
    };
  }

  const yamlSection = match[1];
  const content = match[2];
  
  const frontMatter: Partial<FrontMatter> = {};
  const fmAny = frontMatter as any;
  
  // Quick custom YAML parser
  yamlSection.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let val = line.substring(colonIndex + 1).trim();
      
      // Clean up string quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      
      // Parse array
      if (val.startsWith('[') && val.endsWith(']')) {
        try {
          fmAny[key] = val
            .slice(1, -1)
            .split(',')
            .map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        } catch {
          fmAny[key] = [];
        }
      } else {
        fmAny[key] = val;
      }
    }
  });

  // Enforce types
  const finalCategory = (frontMatter.category || folderCategory) as FrontMatter['category'];

  const compiledFrontMatter: FrontMatter = {
    title: frontMatter.title || slug.replace(/-/g, ' '),
    description: frontMatter.description || '',
    date: frontMatter.date || '2026-05-20',
    tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
    category: finalCategory,
    difficulty: frontMatter.difficulty || 'Intermediate',
    author: frontMatter.author || 'Anonymous',
    courseId: frontMatter.courseId,
    chapterOrder: frontMatter.chapterOrder,
    youtubeId: frontMatter.youtubeId,
    duration: frontMatter.duration,
  };

  return {
    slug,
    category: finalCategory,
    frontMatter: compiledFrontMatter,
    content: content.trim(),
  };
}

// Instantiate the parsed articles list once
const ALL_ARTICLES: Article[] = Object.keys(rawContentModules).map(path => {
  return parseMarkdown(path, rawContentModules[path]);
});

/**
 * Gets all parsed articles
 */
export function getAllArticles(): Article[] {
  return [...ALL_ARTICLES].sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });
}

/**
 * Gets articles filtered by category
 */
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(article => article.category === category);
}

/**
 * Finds a specific article by its slug and category
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find(article => article.slug === slug);
}

/**
 * Retrieves all unique tags across all articles
 */
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  ALL_ARTICLES.forEach(article => {
    article.frontMatter.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

/**
 * Reconstruct courses from chapter lessons
 */
export function getCourses(): Course[] {
  const courseArticles = getArticlesByCategory('courses');
  
  // Group by courseId
  const coursesMap: Record<string, { title: string; desc: string; chapters: any[]; tags: Set<string> }> = {};
  
  courseArticles.forEach(art => {
    const courseId = art.frontMatter.courseId || 'general';
    const chapOrder = art.frontMatter.chapterOrder || '01';
    
    if (!coursesMap[courseId]) {
      coursesMap[courseId] = {
        title: courseId === 'heuristics-101' ? 'Pólya Heuristics: The Art of Discovery' : 'Mathematical Reasoning',
        desc: courseId === 'heuristics-101' 
          ? 'Learn to decompose, visualize, and conquer challenging math and programming problems from scratch.' 
          : 'A course on first principles thinking.',
        chapters: [],
        tags: new Set<string>(['Pólya', 'Heuristics', 'Problem Solving']),
      };
    }
    
    coursesMap[courseId].chapters.push({
      slug: art.slug,
      title: art.frontMatter.title,
      chapterOrder: chapOrder,
      duration: art.frontMatter.duration || '10 mins',
    });
    
    art.frontMatter.tags.forEach(t => coursesMap[courseId].tags.add(t));
  });

  // Sort chapters inside each course and build final Course objects
  return Object.keys(coursesMap).map(id => {
    const data = coursesMap[id];
    const sortedChapters = [...data.chapters].sort((a, b) => a.chapterOrder.localeCompare(b.chapterOrder));
    return {
      id,
      title: data.title,
      description: data.desc,
      chapters: sortedChapters,
      tags: Array.from(data.tags),
    };
  });
}
