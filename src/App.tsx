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
import AboutHall from "./components/AboutHall";

import { Menu, Settings, Type, X, ChevronRight, ChevronLeft, Home } from "lucide-react";
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

  const [currentView, setCurrentView] = useState<'home' | 'story' | 'martyrs' | 'diwan' | 'ziyarat' | 'timeline' | 'about'>('home');
  
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('karbala_font_size') || 'text-xl');
  const [theme, setTheme] = useState(() => localStorage.getItem('karbala_theme') || 'dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('karbala_current_chapter', currentChapterIndex.toString());
  }, [currentChapterIndex]);

  useEffect(() => {
    localStorage.setItem('karbala_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('karbala_theme', theme);
  }, [theme]);

  const currentChapter = chapters[currentChapterIndex];

  // Scroll to top when chapter changes
  useEffect(() => {
    if (currentView === 'story') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mainContent = document.getElementById('main-content-area');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentChapterIndex, currentView]);

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
              </div>
              <div className="flex justify-center w-1/3">
                <div className={`px-4 py-1.5 rounded-full text-xs font-amiri font-bold border transition-colors ${theme === 'light' ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm' : 'bg-amber-950/20 border-amber-900/40 text-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.05)]'}`}>
                  {currentChapter.title.split(':')[0]}
                </div>
              </div>
              <div className="flex gap-2 items-center justify-end w-1/3">
                <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                  <Type size={18} />
                </button>
              </div>
            </header>

            {/* Settings Dropdown */}
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-16 left-4 z-50 p-4 rounded-xl border shadow-xl ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className={`block text-xs font-bold mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>حجم الخط</span>
                      <div className="flex gap-2">
                        <button onClick={() => setFontSize('text-lg')} className={`px-3 py-1 text-sm border rounded ${fontSize === 'text-lg' ? 'bg-amber-600 text-white border-amber-600' : theme === 'light' ? 'border-slate-200 hover:bg-slate-50' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>أ</button>
                        <button onClick={() => setFontSize('text-xl')} className={`px-3 py-1 text-base border rounded ${fontSize === 'text-xl' ? 'bg-amber-600 text-white border-amber-600' : theme === 'light' ? 'border-slate-200 hover:bg-slate-50' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>أ</button>
                        <button onClick={() => setFontSize('text-2xl')} className={`px-3 py-1 text-lg border rounded ${fontSize === 'text-2xl' ? 'bg-amber-600 text-white border-amber-600' : theme === 'light' ? 'border-slate-200 hover:bg-slate-50' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>أ</button>
                      </div>
                    </div>
                    <div>
                      <span className={`block text-xs font-bold mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>المظهر</span>
                      <div className="flex gap-2">
                        <button onClick={() => setTheme('light')} className={`flex-1 px-3 py-1 text-xs font-bold border rounded ${theme === 'light' ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>مضيء</button>
                        <button onClick={() => setTheme('dark')} className={`flex-1 px-3 py-1 text-xs font-bold border rounded ${theme === 'dark' ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-200 hover:bg-slate-50'}`}>داكن</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Content */}
            <div id="main-content-area" className="flex-1 overflow-y-auto relative pb-24">
              <StoryView chapter={currentChapter} fontSizeClass={fontSize} theme={theme} />
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
        {currentView === 'timeline' && <TimelineHall key="timeline" onBack={() => setCurrentView('home')} onSelectChapter={(idx) => { setCurrentChapterIndex(idx); setCurrentView('story'); }} />}
        {currentView === 'about' && <AboutHall key="about" onBack={() => setCurrentView('home')} />}

      </AnimatePresence>
    </div>
  );
}
