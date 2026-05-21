import { useState } from 'react';
import { BookOpen, Brain, Terminal, Compass, Search, Menu, X, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab, searchQuery, setSearchQuery }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'programming', label: 'Programming', icon: Terminal },
    { id: 'math', label: 'Math', icon: HelpCircle },
    { id: 'thinking', label: 'Intuitive Thinking', icon: Brain },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Mathematical Vibe */}
        <div 
          onClick={() => handleTabChange('home')}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
          id="nav-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded border border-white/40 bg-white/5 font-serif italic text-lg text-white">
            Φ
          </div>
          <div>
            <span className="font-display text-lg font-medium tracking-tight text-white">
              Math Is <span className="font-serif italic text-blue-400 ml-0.5">God</span>
            </span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
              Heuristics & Problem Solving
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-1.5 rounded-md px-3 h-9 text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-white/5 text-blue-400 border border-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Search and Secondary elements */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              id="global-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder="Search concepts, proofs..."
              className="h-8.5 w-48 rounded-md border border-white/5 bg-white/5 pl-9 pr-3 text-xs tracking-wide text-white placeholder-gray-500 transition-all focus:w-60 focus:border-blue-500/30 focus:bg-white/10 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute top-2 right-2.5 text-gray-400 hover:text-white text-xs font-mono"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center sm:hidden space-x-2">
          <button 
            id="mobile-search-toggle"
            onClick={() => handleTabChange('home')}
            className="p-1 text-gray-400 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md border border-white/5 p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-gray-950 px-4 py-3 sm:hidden shadow-2xl">
          <div className="relative mb-3">
            <Search className="absolute top-2.5 left-3 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              id="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder="Search articles, problems..."
              className="h-8.5 w-full rounded-md border border-white/5 bg-neutral-900 pl-9 pr-8 text-xs text-white placeholder-gray-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute top-2 right-3 text-gray-400 text-xs font-mono"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`mobile-tab-btn-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    currentTab === tab.id
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
