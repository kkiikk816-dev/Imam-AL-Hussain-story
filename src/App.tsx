/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { chapter1 } from "./data/chapters/chapter1";
import { chapter2 } from "./data/chapters/chapter2";
import { chapter3 } from "./data/chapters/chapter3";
import { chapter4 } from "./data/chapters/chapter4";
import { chapter5 } from "./data/chapters/chapter5";
import { chapter6 } from "./data/chapters/chapter6";
import { chapter7 } from "./data/chapters/chapter7";
import { chapter8 } from "./data/chapters/chapter8";
import { chapter9 } from "./data/chapters/chapter9";
import { chapter10 } from "./data/chapters/chapter10";
import { chapter11 } from "./data/chapters/chapter11";
import { chapter12 } from "./data/chapters/chapter12";
import { chapter13 } from "./data/chapters/chapter13";
import { chapter14 } from "./data/chapters/chapter14";
import { chapter15 } from "./data/chapters/chapter15";
import { chapter16 } from "./data/chapters/chapter16";
import { chapter17 } from "./data/chapters/chapter17";

import StoryView from "./components/StoryView";
import HomeView from "./components/HomeView";
import MartyrsHall from "./components/MartyrsHall";
import DiwanHall from "./components/DiwanHall";
import ZiyaratHall from "./components/ZiyaratHall";
import TimelineHall from "./components/TimelineHall";
import SettingsView from "./components/SettingsView";
import SearchView from "./components/SearchView";
import JourneyMapView from "./components/JourneyMapView";

import { Menu, X, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const chapters = [
    chapter1, chapter2, chapter3, chapter4,
    chapter5, chapter6, chapter7, chapter8,
    chapter9, chapter10, chapter11, chapter12,
    chapter13, chapter14, chapter15, chapter16, chapter17
  ];

  const [currentChapterIndex, setCurrentChapterIndex] = useState(() => {
    const saved = localStorage.getItem('karbala_current_chapter');
    const parsed = saved ? parseInt(saved, 10) : 0;
    return parsed >= chapters.length ? chapters.length - 1 : parsed;
  });

  const [currentView, setCurrentView] = useState<'home' | 'story' | 'martyrs' | 'diwan' | 'ziyarat' | 'timeline' | 'settings' | 'search' | 'journey_map'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [targetHighlight, setTargetHighlight] = useState<string | null>(null);
  
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('karbala_font_size') || 'text-xl');
  const [theme, setTheme] = useState(() => localStorage.getItem('karbala_theme') || 'dark');
  const [chapterProgress, setChapterProgress] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('karbala_chapter_progress');
    return saved ? JSON.parse(saved) : {};
  });
  
  useEffect(() => {
    localStorage.setItem('karbala_current_chapter', currentChapterIndex.toString());
  }, [currentChapterIndex]);

  useEffect(() => {
    localStorage.setItem('karbala_chapter_progress', JSON.stringify(chapterProgress));
  }, [chapterProgress]);

  useEffect(() => {
    localStorage.setItem('karbala_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('karbala_theme', theme);
  }, [theme]);

  const handleNavigateToChapter = (idx: number, highlight?: string) => {
    setCurrentChapterIndex(idx);
    setTargetHighlight(highlight || null);
    setCurrentView('story');
    // If we're navigating to a specific highlight, we want to clear the saved scroll
    // so it doesn't fight with the highlight scrolling.
    if (highlight) {
      setChapterProgress(prev => ({ ...prev, [idx]: 0 }));
    }
  };

  const currentChapter = chapters[currentChapterIndex];

  // Scroll to saved position when chapter changes
  useEffect(() => {
    if (currentView === 'story' && !targetHighlight) {
      const savedScroll = chapterProgress[currentChapterIndex] || 0;
      const mainContent = document.getElementById('main-content-area');
      if (mainContent) {
        // Use a slight delay to ensure content is rendered before scrolling
        setTimeout(() => {
          mainContent.scrollTo({ top: savedScroll, behavior: 'auto' });
        }, 50);
      }
    }
  }, [currentChapterIndex, currentView, targetHighlight]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (currentView === 'story') {
      const target = e.currentTarget;
      // Use debounce or just update state directly (for simplicity here we update directly)
      setChapterProgress(prev => ({
        ...prev,
        [currentChapterIndex]: target.scrollTop
      }));
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const goToPrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} دقيقة`;
  };

  const progressPercentage = ((currentChapterIndex + 1) / chapters.length) * 100;

  return (
    <div className={`h-screen flex flex-col font-sans overflow-hidden selection:bg-red-900/40 ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0f1115]'}`}>
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <HomeView 
            key="home"
            onNavigate={(view) => setCurrentView(view as any)} 
            lastReadChapter={currentChapterIndex} 
          />
        )}

        {currentView === 'story' && (
          <motion.div 
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full relative"
          >
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 h-1 w-full z-50 bg-slate-800/50">
              <div 
                className="h-full bg-amber-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(217,119,6,0.8)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Main Header */}
            <header className={`flex-shrink-0 relative z-40 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/60 border-slate-800/80'}`}>
              <div className="flex items-center gap-3 w-1/3">
                <button onClick={() => setCurrentView('home')} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                  <Home size={22} />
                </button>
                <button onClick={() => setIsMenuOpen(true)} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                  <Menu size={22} />
                </button>
              </div>
              <div className="flex justify-center w-1/3">
                <div className={`px-4 py-1.5 rounded-full text-xs font-amiri font-bold border transition-colors ${theme === 'light' ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm' : 'bg-amber-950/20 border-amber-900/40 text-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.05)]'}`}>
                  {currentChapter.title}
                </div>
              </div>
              <div className="flex gap-2 items-center justify-end w-1/3">
              </div>
            </header>

            

            {/* Scrollable Content */}
            <div id="main-content-area" onScroll={handleScroll} className="flex-1 overflow-y-auto relative pb-24">
              <StoryView chapter={currentChapter} fontSizeClass={fontSize} theme={theme} highlightText={targetHighlight} />
            </div>

            {/* Bottom Navigation */}
            <div className={`flex-shrink-0 p-4 border-t flex justify-between items-center bg-black/10 backdrop-blur-md relative z-40 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <button 
                onClick={goToPrevChapter}
                disabled={currentChapterIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${currentChapterIndex === 0 ? 'opacity-30 cursor-not-allowed' : theme === 'light' ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                <ChevronRight size={18} />
                الفصل السابق
              </button>
              
              <span className={`text-xs font-bold font-mono tracking-widest ${theme === 'light' ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentChapterIndex + 1} / {chapters.length}
              </span>

              <button 
                onClick={goToNextChapter}
                disabled={currentChapterIndex === chapters.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${currentChapterIndex === chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]'}`}
              >
                الفصل التالي
                <ChevronLeft size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {currentView === 'martyrs' && <MartyrsHall key="martyrs" onBack={() => setCurrentView('home')} />}
        {currentView === 'diwan' && <DiwanHall key="diwan" onBack={() => setCurrentView('home')} />}
        {currentView === 'ziyarat' && <ZiyaratHall key="ziyarat" onBack={() => setCurrentView('home')} />}
        {currentView === 'timeline' && <TimelineHall key="timeline" onBack={() => setCurrentView('home')} onSelectChapter={handleNavigateToChapter} />}
        {currentView === 'settings' && (
          <SettingsView 
            key="settings" 
            onBack={() => setCurrentView('home')} 
            currentTheme={theme as any} 
            setTheme={setTheme as any} 
            fontSize={fontSize as any} 
            setFontSize={setFontSize as any} 
          />
        )}
        {currentView === 'search' && (
          <SearchView 
            key="search"
            onBack={() => setCurrentView('home')}
            onNavigateToChapter={handleNavigateToChapter}
            onNavigateToMartyr={(id) => { setCurrentView('martyrs'); }} // Note: We could pass the ID to highlight it in the martyrs hall later.
          />
        )}
        {currentView === 'journey_map' && (
          <JourneyMapView
            key="journey_map"
            onBack={() => setCurrentView('home')}
            onNavigateToChapter={handleNavigateToChapter}
          />
        )}

      </AnimatePresence>

      {/* Chapter Selection Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`w-80 h-full shadow-2xl flex flex-col ${theme === 'light' ? 'bg-white border-l border-slate-200' : 'bg-slate-900 border-l border-slate-800'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-4 border-b flex justify-between items-center ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <h2 className={`font-amiri font-bold text-xl ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>فهرس الفصول</h2>
                <button onClick={() => setIsMenuOpen(false)} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}>
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" dir="rtl">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentChapterIndex(idx);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col text-right p-3 rounded-lg transition-colors border ${
                      currentChapterIndex === idx 
                        ? (theme === 'light' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/20 border-amber-900/40') 
                        : (theme === 'light' ? 'border-transparent hover:bg-slate-50' : 'border-transparent hover:bg-slate-800/50')
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <div className="flex-1 min-w-0">
                        <span className={`block truncate font-amiri font-bold ${currentChapterIndex === idx ? 'text-amber-600' : (theme === 'light' ? 'text-slate-800' : 'text-slate-200')}`}>
                          {ch.title}
                        </span>
                        <span className={`text-xs mt-1 line-clamp-2 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                          {ch.description}
                        </span>
                      </div>
                      <span className={`flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded-full ${theme === 'light' ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'}`}>
                        {idx + 1}
                      </span>
                    </div>
                    <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      وقت القراءة: {calculateReadingTime(ch.content)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
