/**
 * Types and structures for "Math Is God" Educational Platform
 */

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: 'programming' | 'math' | 'thinking' | 'courses';
  difficulty?: 'Beginner' | 'Intermediate' | 'Deep' | 'Olympiad' | 'Master';
  author?: string;
  
  // Courses specific frontmatter
  courseId?: string;
  chapterOrder?: string; // e.g. "01", "02" etc
  youtubeId?: string;
  duration?: string;
}

export interface Article {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  category: string;
}

export interface CourseChapter {
  slug: string;
  title: string;
  chapterOrder: string;
  duration?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: CourseChapter[];
  tags: string[];
}
