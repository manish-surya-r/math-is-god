import { useEffect, useState, useRef } from 'react';
import { Article } from '../types';
import { getAllArticles } from '../lib/content';
import { ArrowLeft, Clock, Calendar, User, ChevronRight, Copy, Check, Menu, Play, BookOpen, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onNavigateArticle: (slug: string) => void;
}

interface HeaderItem {
  text: string;
  id: string;
  level: number;
}

export default function ArticleReader({ article, onBack, onNavigateArticle }: ArticleReaderProps) {
  const { title, description, date, tags, category, difficulty, author, youtubeId } = article.frontMatter;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Auto scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.slug]);

  // Generate Table of Contents dynamically
  useEffect(() => {
    const lines = article.content.split('\n');
    const items: HeaderItem[] = [];
    lines.forEach(line => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*|_/g, ''); // strip markdown markup
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ text, id, level });
      }
    });
    setHeaders(items);
  }, [article.content]);

  // Calculate reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate Reading Time
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200)); // ~200 words per minute

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find next/prev lessons if part of a course or category
  const siblings = getAllArticles().filter(art => art.category === article.category);
  // Sort siblings by date or chapterOrder ascending
  const sortedSiblings = siblings.sort((a, b) => {
    if (a.frontMatter.chapterOrder && b.frontMatter.chapterOrder) {
      return a.frontMatter.chapterOrder.localeCompare(b.frontMatter.chapterOrder);
    }
    return new Date(a.frontMatter.date).getTime() - new Date(b.frontMatter.date).getTime();
  });
  
  const currentIndex = sortedSiblings.findIndex(sibling => sibling.slug === article.slug);
  const prevArticle = currentIndex > 0 ? sortedSiblings[currentIndex - 1] : null;
  const nextArticle = currentIndex < sortedSiblings.length - 1 ? sortedSiblings[currentIndex + 1] : null;

  // Custom preprocess to render beautiful inline formulas and equations
  const processedContent = article.content
    // Block equations: $$ equation $$ -> custom container
    .replace(/\$\$\r?\n?([\s\S]*?)\r?\n?\$\$/g, (_, formula) => {
      return `\n\n<div class="formula-block my-6 p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-300 font-mono text-center scrollbar-none"><span class="block text-[8px] uppercase tracking-widest text-blue-400 mb-2 font-mono">Theoretical Mathematical System</span><span class="text-sm md:text-base leading-relaxed tracking-wider font-semibold block">${formula.trim()}</span></div>\n\n`;
    })
    // Inline equations: $ equation $ -> tag
    .replace(/\$([^\$\n]+)\$/g, (_, equation) => {
      return ` <code class="font-mono text-blue-300 bg-blue-500/10 px-1 py-0.5 rounded border border-blue-500/10">${equation.trim()}</code> `;
    })
    // Youtube block syntax: ```youtube ... ``` to custom div
    .replace(/```youtube\r?\n([\s\S]*?)\r?\n```/g, (_, id) => {
      return `<div class="youtube-player-mount">${id.trim()}</div>`;
    });

  return (
    <div className="min-h-screen bg-[#050506] pb-20 relative w-full" ref={articleRef}>
      
      {/* Floating Reading Progress Bar */}
      <div 
        id="reading-progress-bar"
        className="fixed top-16 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero section inside Article reader */}
      <div className="border-b border-white/5 bg-gray-900/10 relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-x-0 bottom-0 top-0 math-grid opacity-30 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
            <button
              onClick={onBack}
              id="reader-back-btn"
              className="group flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Library</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                id="reader-copy-link-btn"
                className="flex items-center space-x-1.5 rounded-md border border-white/5 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-blue-400" />
                    <span className="text-blue-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Reference URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Article Header Metadata */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#93c5fd] border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 rounded">
                {category}
              </span>
              <span className="font-mono text-[9px] text-white/40 border border-white/5 bg-white/5 px-2 py-1 rounded flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </span>
              {difficulty && (
                <span className="font-mono text-[9px] text-indigo-400 border border-indigo-500/20 bg-white/5 px-2 py-1 rounded">
                  {difficulty} Level
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 md:mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6 font-sans font-light">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-white/40 font-mono border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-bold text-[10px] text-blue-400 scale-95 uppercase">
                  {author ? author[0] : 'G'}
                </div>
                <span>Analyzed by <span className="text-white font-medium">{author || 'George Pólya'}</span></span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Published on {date}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area split with TOC */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Floating TOC and Course Details on desktop */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              
              {/* Table of Contents section */}
              {headers.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-4">
                    <Menu className="h-3.5 w-3.5" /> Table of Contents
                  </h4>
                  <ul className="space-y-2.5 text-xs font-mono text-white/40 border-l border-white/5 pl-2.5">
                    {headers.map((hdr, idx) => (
                      <li 
                        key={idx}
                        className={`transition-colors hover:text-white ${
                          hdr.level === 3 ? 'pl-4 text-white/30 text-[11px]' : ''
                        }`}
                      >
                        <a href={`#${hdr.id}`} className="hover:underline flex items-start truncate max-w-full">
                          <span className="truncate">{hdr.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cognitive Prompt Banner */}
              <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5 text-xs font-mono">
                <h5 className="flex items-center gap-1.5 text-blue-400 font-bold uppercase text-[9px] tracking-wider mb-2">
                  <AlertCircle className="h-3.5 w-3.5" /> Pólya Checklist
                </h5>
                <p className="text-white/40 leading-relaxed mb-3">
                  As you read, try to define:
                </p>
                <div className="text-white/30 space-y-1">
                  <p>1. The Unknown elements</p>
                  <p>2. Explicit state constraints</p>
                  <p>3. Dynamic invariants</p>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Actual Markdown body */}
          <main className="lg:col-span-9">
            {/* Embedded YouTube Player if it's a Course Lesson */}
            {youtubeId ? (
              <div className="mb-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-black text-center max-w-4xl">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-[10px] font-mono text-white/40">
                  <span className="flex items-center gap-1"><Play className="h-3 w-3 text-blue-400 fill-blue-400/20" /> YouTube Lecture Embed</span>
                  <span>Duration: {article.frontMatter.duration || '15 mins'}</span>
                </div>
              </div>
            ) : (
              category === 'courses' && (
                <div className="mb-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-neutral-950 text-center max-w-4xl">
                  <div className="relative aspect-video flex flex-col items-center justify-center p-6 border-b border-white/5">
                    <div className="h-16 w-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-500 mb-4 animate-pulse">
                      <Play className="h-7 w-7 text-blue-400/60 fill-blue-400/10" />
                    </div>
                    <h3 className="text-white text-sm font-semibold tracking-wide font-display">Video lecture is blank</h3>
                    <p className="text-xs text-white/40 max-w-md mt-2 font-sans font-light leading-relaxed">
                      This video is intentionally left blank because no custom video was uploaded for this chapter.
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 text-[10px] font-mono text-white/40">
                    <span className="flex items-center gap-2"><Play className="h-3.5 w-3.5 text-blue-400" /> Blank Video Lesson Placeholder</span>
                    <span>Duration: {article.frontMatter.duration || '15 mins'}</span>
                  </div>
                </div>
              )
            )}

            {/* Markdown rendered nodes */}
            <div className="markdown-body">
              {/* Since Custom CSS is imported and ReactMarkdown is verified, let's output raw text with math preprocess */}
              <Markdown 
                components={{
                  // Overriding default headers with custom anchor IDs for Table of Contents navigation
                  h2: ({ node, children, ...props }) => {
                    const text = children ? children.toString() : '';
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <h2 id={id} {...props}>
                        <a href={`#${id}`} className="mr-2 hover:text-blue-300 text-blue-400 select-none">§</a>
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, children, ...props }) => {
                    const text = children ? children.toString() : '';
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    );
                  },
                  // Bypass custom element tags created in preprocess
                  div: ({ node, className, children, ...props }) => {
                    if (className === 'formula-block') {
                      return (
                        <div className={className} {...props}>
                          {children}
                        </div>
                      );
                    }
                    if (className === 'youtube-player-mount') {
                      // Grab children which contains the id
                      const idStr = children ? children.toString().trim() : '';
                      return (
                        <div className="my-8 aspect-video rounded-2xl border border-white/10 overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${idStr}`}
                            title="Embedded Geometry Video"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      );
                    }
                    return <div className={className} {...props}>{children}</div>;
                  }
                }}
              >
                {processedContent}
              </Markdown>
            </div>

            {/* Tags row */}
            {tags && tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 block mb-3">Topic Markers:</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-xs text-gray-300 bg-gray-900 border border-white/5 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Next / Previous Chapters navigation Row */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-stretch justify-between font-mono">
              {prevArticle ? (
                <button
                  onClick={() => onNavigateArticle(prevArticle.slug)}
                  className="flex-1 flex flex-col items-start p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/5 hover:border-white/20 transition-all text-left group cursor-pointer"
                >
                  <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform text-blue-400" /> Previous Concepts
                  </span>
                  <span className="text-xs text-white group-hover:text-blue-400 font-display font-semibold line-clamp-1">
                    {prevArticle.frontMatter.title}
                  </span>
                </button>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextArticle ? (
                <button
                  onClick={() => onNavigateArticle(nextArticle.slug)}
                  className="flex-1 flex flex-col items-end p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/5 hover:border-white/20 transition-all text-right group cursor-pointer"
                >
                  <span className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                    Next Concept <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform text-blue-400" />
                  </span>
                  <span className="text-xs text-white group-hover:text-blue-400 font-display font-semibold line-clamp-1">
                    {nextArticle.frontMatter.title}
                  </span>
                </button>
              ) : (
                <div className="flex-1 flex flex-col items-end p-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 text-right">
                  <span className="text-[9px] text-blue-400 uppercase tracking-wider mb-1">
                    ✓ Course Milestone
                  </span>
                  <span className="text-xs text-white font-display font-semibold">
                    You have finished this sequence!
                  </span>
                </div>
              )}
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}
