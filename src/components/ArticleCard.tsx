import { Article } from '../types';
import { Calendar, Tag, User, BarChart2, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const { title, description, date, tags, category, difficulty, author, chapterOrder, youtubeId } = article.frontMatter;

  const isCourse = category === 'courses';

  return (
    <motion.article
      whileHover={{ y: -3 }}
      id={`article-card-${article.slug}`}
      onClick={onClick}
      className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer h-full p-6 relative"
    >
      {/* Category Indicator Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#93c5fd] border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 rounded">
          {isCourse && chapterOrder ? `Chapter ${chapterOrder}` : category}
        </span>
        {difficulty && (
          <span className={`font-mono text-[9px] tracking-wide flex items-center gap-1 ${
            difficulty === 'Beginner' ? 'text-green-400' :
            difficulty === 'Intermediate' ? 'text-indigo-400' :
            difficulty === 'Deep' ? 'text-blue-400' : 'text-purple-400'
          }`}>
            <BarChart2 className="h-3 w-3" />
            {difficulty}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="flex-grow">
        <h3 className="font-display text-base md:text-lg font-light tracking-tight text-white line-clamp-2 hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-xs text-white/50 line-clamp-3 leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="mt-6 border-t border-white/5 pt-4">
        
        {/* Author / Date info line */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-white/40 gap-2 mb-3 leading-none">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-white/30" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-white/30" />
            <span>{date}</span>
          </div>
        </div>

        {/* Tags line */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="font-mono text-[9px] text-white/40 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                <Tag className="h-2 w-2 text-white/30" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="font-mono text-[8px] text-white/30">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Floating Read-more trigger */}
        <div className="flex items-center justify-between text-xs font-mono text-blue-400">
          <span className="group-hover:translate-x-1 duration-150 transition-transform">
            {isCourse ? (
              <span className="flex items-center gap-1.5">
                <Play className="h-3 w-3 fill-blue-400/20" /> Watch &amp; Learn
              </span>
            ) : 'Read Analysis'}
          </span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </motion.article>
  );
}
