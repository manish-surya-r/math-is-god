import { useState, useMemo } from 'react';
import { getAllArticles, getArticleBySlug, getAllTags, getCourses } from './lib/content';
import { Article } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PolyaPrinciples from './components/PolyaPrinciples';
import ArticleCard from './components/ArticleCard';
import ArticleReader from './components/ArticleReader';
import { Compass, BookOpen, Terminal, Brain, HelpCircle, Sparkles, SlidersHorizontal, Eye, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Load static entities
  const allArticles = useMemo(() => getAllArticles(), []);
  const allTags = useMemo(() => getAllTags(), []);
  const allCourses = useMemo(() => getCourses(), []);

  // Filtered articles list for tabs
  const filteredArticles = useMemo(() => {
    let list = allArticles;

    // Filter by tab if not home or courses
    if (currentTab !== 'home' && currentTab !== 'courses') {
      list = list.filter(art => art.category === currentTab);
    }

    // Filter by Tag
    if (selectedTag) {
      list = list.filter(art => art.frontMatter.tags.includes(selectedTag));
    }

    // Filter by Difficulty
    if (selectedDifficulty) {
      list = list.filter(art => art.frontMatter.difficulty === selectedDifficulty);
    }

    // Filter by Search text (checks title, tags, description, and raw content)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        art =>
          art.frontMatter.title.toLowerCase().includes(q) ||
          art.frontMatter.description.toLowerCase().includes(q) ||
          art.content.toLowerCase().includes(q) ||
          art.frontMatter.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allArticles, currentTab, selectedTag, selectedDifficulty, searchQuery]);

  // Featured articles for Homepage (latest 3)
  const featuredArticles = useMemo(() => {
    return allArticles.slice(0, 3);
  }, [allArticles]);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setSelectedArticleSlug(null); // Clear reader
    setSelectedTag(null); // Clear filters
    setSelectedDifficulty(null);
  };

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleClearFilters = () => {
    setSelectedTag(null);
    setSelectedDifficulty(null);
    setSearchQuery('');
  };

  // Find exact reading article if active
  const activeArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return getArticleBySlug(selectedArticleSlug) || null;
  }, [selectedArticleSlug]);

  return (
    <div className="min-h-screen bg-[#050506] flex flex-col justify-between selection:bg-blue-500/30 selection:text-blue-300 atmospheric-ambient relative overflow-hidden">
      
      {/* Dynamic Header / Navigation */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (selectedArticleSlug) setSelectedArticleSlug(null); // Exit reader to show search results
        }}
      />

      {/* Main Content View routing */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {activeArticle ? (
            // 📖 ARTICLE READER VIEW
            <motion.div
              key="reader"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ArticleReader 
                article={activeArticle} 
                onBack={() => setSelectedArticleSlug(null)}
                onNavigateArticle={handleArticleClick}
              />
            </motion.div>
          ) : (
            // 💻 DESKTOP TAB ROUTING
            <motion.div
              key={currentTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              
              {/* --- 🏠 HOME VIEW --- */}
              {currentTab === 'home' && (
                <div>
                  <Hero onExploreClick={handleTabChange} />
                  
                  {/* George Pólya's 4 Principles Cards Component */}
                  <PolyaPrinciples />

                  {/* Featured Articles Section */}
                  <section className="py-16 md:py-20 relative bg-[#050506]/50 border-b border-white/5 w-full">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-2">
                            <Sparkles className="h-3.5 w-3.5" /> High-Concept Analysis
                          </span>
                          <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-white">
                            Featured Explanations
                          </h2>
                        </div>
                        <button
                          onClick={() => handleTabChange('programming')}
                          className="font-mono text-xs text-blue-400 hover:text-white transition-colors flex items-center gap-1 hover:underline"
                        >
                          Browse Library →
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredArticles.map((article) => (
                          <ArticleCard 
                            key={article.slug} 
                            article={article} 
                            onClick={() => handleArticleClick(article.slug)}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Featured Course Banner */}
                  <section className="py-16 md:py-24 bg-[#050506] relative w-full">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Interactive glow pattern */}
                        <div className="absolute top-0 right-0 h-48 w-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="max-w-xl relative">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#93c5fd] border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 roundedinline-block mb-4">
                            Master Apprentice Course
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight leading-tight">
                            P&oacute;lya Heuristics: The Art of Discovery
                          </h3>
                          <p className="mt-4 text-sm text-white/50 leading-relaxed font-sans font-light">
                            A structured, video-assisted walkthrough course studying the mental techniques 
                            to decompose and solve complex olympiad geometry, sequence proofs, and algorithmic limits.
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2.5">
                            <span className="font-mono text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/40">2 Complete Chapters</span>
                            <span className="font-mono text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/40">YouTube Embeds</span>
                            <span className="font-mono text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-blue-400 font-semibold">Beginner to Intermediate</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto text-center font-mono relative">
                          <button
                            onClick={() => handleArticleClick('heuristics-course-ch1')}
                            className="bg-white hover:bg-blue-50 text-black text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-lg shadow active:scale-98 transition-all"
                          >
                            Chapter 1: Understanding
                          </button>
                          <button
                            onClick={() => handleArticleClick('heuristics-course-ch2')}
                            className="border border-white/10 hover:border-white/20 hover:bg-white/5 text-white text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-lg transition-all"
                          >
                            Chapter 2: Proof of Squares
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* --- 📖 CATEGORY LIST VIEWS (Programming, Math, Thinking) --- */}
              {currentTab !== 'home' && currentTab !== 'courses' && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                  
                  {/* Category Header */}
                  <div className="mb-12 border-b border-white/5 pb-8 relative">
                    <div className="absolute right-0 top-0 h-40 w-40 bg-blue-500/5 rounded-full blur-2xl" />
                    
                    <span className="font-mono text-xs uppercase tracking-widest text-blue-400">
                      Cognitive Library / {currentTab}
                    </span>
                    <h1 className="font-display text-4xl font-light tracking-tight text-white mt-2 mb-4 capitalize">
                      {currentTab === 'programming' ? 'Programming Problems' :
                       currentTab === 'math' ? 'Mathematics Depth' : 'Intuitive Thinking'}
                    </h1>
                    <p className="max-w-2xl text-sm text-white/50 leading-relaxed font-sans font-light">
                      {currentTab === 'programming' && 'We dissect classical algorithmic, dynamic programming, and mathematical structures, detailing invariants, complexity and optimal trade-offs.'}
                      {currentTab === 'math' && 'Inductive problem solving, Taylor expansions, geometric proofs, and counting groups. Dive into the breathtaking truth of pure forms.'}
                      {currentTab === 'thinking' && 'Reasoning, abstraction, heuristical guessing, and building custom model perspectives. Learn how to think accurately from first principles.'}
                    </p>
                  </div>

                  {/* Filter Rail & Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Filters Rail (Desktop) */}
                    <aside className="lg:col-span-3 space-y-6">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sticky top-24">
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-4">
                          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters &amp; Sorting
                        </h3>

                        {/* Search Feedback inside Rail */}
                        {searchQuery && (
                          <div className="mb-4 p-2 bg-blue-500/5 border border-blue-500/10 rounded-md text-[11px] font-mono text-white/50">
                            Search: &quot;{searchQuery}&quot;
                          </div>
                        )}

                        {/* Difficulty filters */}
                        <div className="mb-6">
                          <span className="block text-[10px] font-mono uppercase text-white/30 tracking-wider mb-2">Difficulty</span>
                          <div className="space-y-1.5">
                            {['Beginner', 'Intermediate', 'Deep', 'Master'].map((diff) => (
                              <button
                                key={diff}
                                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                                className={`flex items-center justify-between w-full text-xs font-mono px-2.5 py-1.5 rounded-md border text-left transition-all ${
                                  selectedDifficulty === diff
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 font-medium'
                                    : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{diff}</span>
                                {selectedDifficulty === diff && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tags filters */}
                        {allTags.length > 0 && (
                          <div className="mb-6">
                            <span className="block text-[10px] font-mono uppercase text-white/30 tracking-wider mb-2">Popular Tags</span>
                            <div className="flex flex-wrap gap-1.5">
                              {allTags.map((tag) => {
                                const isSelected = selectedTag === tag;
                                return (
                                  <button
                                    key={tag}
                                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                                    className={`text-[10px] font-mono px-2 py-1 rounded border transition-all ${
                                      isSelected
                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 font-medium'
                                        : 'bg-black border-white/5 text-white/40 hover:text-white hover:border-white/10'
                                    }`}
                                  >
                                    #{tag}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Clear button */}
                        {(selectedTag || selectedDifficulty || searchQuery) && (
                          <button
                            onClick={handleClearFilters}
                            className="w-full py-2 border border-dashed border-red-500/20 hover:border-red-500/40 text-red-400 rounded-md text-xs font-mono transition-all uppercase tracking-wider hover:bg-red-500/5"
                          >
                            Reset All Filters
                          </button>
                        )}
                      </div>
                    </aside>

                    {/* Right Articles Grid */}
                    <main className="lg:col-span-9">
                      {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="articles-grid">
                          {filteredArticles.map((article) => (
                            <ArticleCard
                              key={article.slug}
                              article={article}
                              onClick={() => handleArticleClick(article.slug)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 rounded-xl border border-white/5 bg-gray-900/10">
                          <Compass className="mx-auto h-12 w-12 text-gray-600 mb-4 animate-pulse" />
                          <h3 className="font-display font-semibold text-white text-base">No analyses found</h3>
                          <p className="mt-2 text-xs text-gray-400 max-w-sm mx-auto font-sans leading-relaxed">
                            No articles match your active filter criteria. Try resetting filters or expanding your search index query.
                          </p>
                          <button
                            onClick={handleClearFilters}
                            className="mt-6 rounded-md bg-white/5 border border-white/10 px-4 py-2 text-xs font-mono text-white hover:bg-white/10"
                          >
                            Clear Active Search &amp; Filters
                          </button>
                        </div>
                      )}
                    </main>

                  </div>
                </div>
              )}
                  {/* --- 📚 COURSES VIEW --- */}
              {currentTab === 'courses' && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                  
                  {/* Category Header */}
                  <div className="mb-12 border-b border-white/5 pb-8 relative">
                    <div className="absolute right-0 top-0 h-40 w-40 bg-blue-500/5 rounded-full blur-2xl" />
                    
                    <span className="font-mono text-xs uppercase tracking-widest text-[#93c5fd]">
                      Apprenticeship / Courses
                    </span>
                    <h1 className="font-display text-4xl font-light tracking-tight text-white mt-2 mb-4 capitalize">
                      Interactive Heuristics Lessons
                    </h1>
                    <p className="max-w-2xl text-sm text-white/50 leading-relaxed font-sans font-light">
                      Our courses package theoretical logic into beautiful visual lesson chapters. 
                      Follow the sequential video sessions, learn step-by-step, and test your comprehension.
                    </p>
                  </div>

                  {/* Courses Group layout */}
                  <div className="space-y-12">
                    {allCourses.map((course) => (
                      <div key={course.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                        
                        {/* Course Header card info */}
                        <div className="p-6 md:p-8 bg-white/[0.03] border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-2">
                              <BookOpen className="h-3.5 w-3.5" /> Interactive Course Series
                            </span>
                            <h2 className="font-display text-xl md:text-2xl font-light text-white tracking-tight">
                              {course.title}
                            </h2>
                            <p className="mt-2 text-xs text-white/50 max-w-2xl leading-relaxed font-light">
                              {course.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 shrink-0">
                            {course.tags.map((tag, i) => (
                              <span key={i} className="font-mono text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/40">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Chapter Lessons List grid */}
                        <div className="p-6 md:p-8">
                          <span className="font-mono text-[10px] uppercase text-white/30 tracking-wider block mb-4">Course Chapter Syllabus:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.chapters.map((chapter) => (
                              <div
                                key={chapter.slug}
                                onClick={() => handleArticleClick(chapter.slug)}
                                className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center space-x-3.5 min-w-0 pr-4">
                                  <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-lg border border-white/5 bg-white/5 font-mono text-xs font-medium text-blue-400 group-hover:bg-blue-500/10 group-hover:text-blue-300">
                                    {chapter.chapterOrder}
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="font-display text-sm font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors truncate">
                                      {chapter.title}
                                    </h3>
                                    <span className="font-mono text-[10px] text-white/40 mt-0.5 block flex items-center gap-1">
                                      Video Lesson • {chapter.duration || '15 mins'}
                                    </span>
                                  </div>
                                </div>
                                
                                <span className="font-mono text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  Start Chapter →
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic unified Footer */}
      <Footer />
      
    </div>
  );
}
