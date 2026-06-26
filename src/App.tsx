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
import StoryView from "./components/StoryView";
import { BookOpen, Menu, X, ScrollText, History, ChevronRight, ChevronLeft, Settings, Type, Moon, Sun, MonitorPlay, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { martyrs } from "./data/martyrs";

export default function App() {
  const chapters = [
    chapter1, chapter2, chapter3, chapter4,
    chapter5, chapter6, chapter7, chapter8,
    chapter9, chapter10, chapter11, chapter12,
    chapter13, chapter14
  ];

  const [currentChapterIndex, setCurrentChapterIndex] = useState(() => {
    const saved = localStorage.getItem('karbala_current_chapter');
    const parsed = saved ? parseInt(saved, 10) : 0;
    return parsed >= chapters.length ? chapters.length - 1 : parsed;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMartyrsOpen, setIsMartyrsOpen] = useState(false);
  
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('karbala_font_size') || 'text-xl');
  const [theme, setTheme] = useState(() => localStorage.getItem('karbala_theme') || 'dark');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContent = document.getElementById('main-content-area');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentChapterIndex]);

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
    <div className={`min-h-screen font-sans selection:bg-red-900/40 ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950'}`}>
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 h-1.5 w-full z-[60] bg-slate-800">
        <div 
          className="h-full bg-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Mobile Header */}
      <header className={`lg:hidden flex items-center justify-between p-4 border-b sticky top-0 z-50 backdrop-blur-md ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-900'}`}>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
        >
          <Menu size={24} />
        </button>
        <h2 className={`text-lg font-amiri font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>ملحمة كربلاء</h2>
        <div className="flex gap-1">
          <button 
            onClick={() => setIsMartyrsOpen(true)}
            className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            <Users size={24} />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings size={24} />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className={`fixed lg:relative inset-y-0 right-0 w-80 border-l z-50 flex flex-col transition-all ${!isSidebarOpen && 'hidden lg:flex'} ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}
              id="sidebar"
            >
              <div className={`p-6 flex items-center justify-between border-b ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center gap-3 text-red-500">
                  <ScrollText size={24} />
                  <h2 className={`text-xl font-amiri font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>فصول الرواية</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsMartyrsOpen(true)}
                    className={`hidden lg:flex p-2 hover:bg-slate-800 rounded-full transition-colors ${theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white'}`}
                    title="سجل الشهداء"
                  >
                    <Users size={20} />
                  </button>
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className={`hidden lg:flex p-2 hover:bg-slate-800 rounded-full transition-colors ${theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white'}`}
                    title="الإعدادات"
                  >
                    <Settings size={20} />
                  </button>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`lg:hidden p-2 transition-colors ${theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChapterIndex(idx);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-right p-4 rounded-xl transition-all flex flex-col gap-1 group ${
                      currentChapter.id === ch.id 
                        ? (theme === 'light' ? "bg-red-50 border border-red-200" : "bg-red-950/30 border border-red-900/50") 
                        : (theme === 'light' ? "hover:bg-slate-100 border border-transparent" : "hover:bg-slate-800 border border-transparent")
                    }`}
                  >
                    <span className={`font-amiri text-lg ${
                      currentChapter.id === ch.id 
                        ? (theme === 'light' ? "text-red-700" : "text-red-400")
                        : (theme === 'light' ? "text-slate-700" : "text-slate-200")
                    }`}>
                      {ch.title}
                    </span>
                    <span className={`text-xs line-clamp-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>{ch.description}</span>
                  </button>
                ))}
              </nav>

              <div className={`p-6 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className={`rounded-2xl p-4 text-center ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800/50'}`}>
                  <p className="text-xs text-slate-500 mb-1">المصدر</p>
                  <p className={`text-sm font-amiri font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>بحار الأنوار - الجزء 44 و 45</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main id="main-content-area" className={`flex-1 h-screen overflow-y-auto relative ${theme === 'light' ? 'bg-slate-50' : 'bg-[radial-gradient(circle_at_center,rgba(69,10,10,0.05)_0%,rgba(2,6,23,1)_100%)]'}`}>
          {/* Subtle Background Elements */}
          {theme === 'dark' && <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-950/10 to-transparent pointer-events-none" />}
          
          <AnimatePresence mode="wait">
            <StoryView key={currentChapter.id} chapter={currentChapter} fontSizeClass={fontSize} theme={theme} />
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
            <button
              onClick={goToNextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-amiri text-lg transition-all ${
                currentChapterIndex === chapters.length - 1
                  ? "opacity-50 cursor-not-allowed bg-slate-900 text-slate-500"
                  : (theme === 'light' ? "bg-red-100 hover:bg-red-200 text-red-800 border border-red-300" : "bg-red-950/40 hover:bg-red-900/60 text-red-100 border border-red-900/50 hover:border-red-500/50")
              }`}
            >
              <ChevronRight size={20} />
              الفصل التالي
            </button>
            
            <button
              onClick={goToPrevChapter}
              disabled={currentChapterIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-amiri text-lg transition-all ${
                currentChapterIndex === 0
                  ? "opacity-50 cursor-not-allowed bg-slate-900 text-slate-500"
                  : (theme === 'light' ? "bg-white hover:bg-slate-100 text-slate-800 border border-slate-300" : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-600")
              }`}
            >
              الفصل السابق
              <ChevronLeft size={20} />
            </button>
          </div>

          <footer className={`max-w-4xl mx-auto px-6 py-12 border-t text-center ${theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-slate-900/50 text-slate-600'}`}>
            <p className="text-sm italic font-amiri">
              "يا بن رسول الله، إن جدي قد بشرني برؤياك مرملاً بالدماء..."
            </p>
          </footer>
        </main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-sm rounded-2xl p-6 shadow-2xl ${theme === 'light' ? 'bg-white' : 'bg-slate-900 border border-slate-700'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>إعدادات القراءة</h3>
                <button onClick={() => setIsSettingsOpen(false)} className={`p-2 rounded-full ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-800 text-slate-400'}`}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className={`text-sm mb-3 font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>حجم الخط</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFontSize('text-lg')}
                      className={`flex-1 py-2 rounded-lg font-amiri flex items-center justify-center gap-2 border transition-all ${fontSize === 'text-lg' ? (theme === 'light' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-red-900/40 border-red-500 text-white') : (theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-300')}`}
                    >
                      <Type size={16} /> صغير
                    </button>
                    <button 
                      onClick={() => setFontSize('text-xl')}
                      className={`flex-1 py-2 rounded-lg font-amiri flex items-center justify-center gap-2 border transition-all ${fontSize === 'text-xl' ? (theme === 'light' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-red-900/40 border-red-500 text-white') : (theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-300')}`}
                    >
                      <Type size={20} /> وسط
                    </button>
                    <button 
                      onClick={() => setFontSize('text-2xl')}
                      className={`flex-1 py-2 rounded-lg font-amiri flex items-center justify-center gap-2 border transition-all ${fontSize === 'text-2xl' ? (theme === 'light' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-red-900/40 border-red-500 text-white') : (theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-300')}`}
                    >
                      <Type size={24} /> كبير
                    </button>
                  </div>
                </div>

                <div>
                  <p className={`text-sm mb-3 font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>المظهر</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex-1 py-2 rounded-lg font-amiri flex items-center justify-center gap-2 border transition-all ${theme === 'light' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      <Sun size={18} /> فاتح
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex-1 py-2 rounded-lg font-amiri flex items-center justify-center gap-2 border transition-all ${theme === 'dark' ? 'bg-red-900/40 border-red-500 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
                    >
                      <Moon size={18} /> داكن
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Martyrs Dictionary Modal */}
      <AnimatePresence>
        {isMartyrsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMartyrsOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-slate-900 border border-slate-700'}`}
            >
              <div className={`p-6 border-b flex items-center justify-between shrink-0 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center gap-3 text-red-500">
                  <Users size={24} />
                  <h3 className={`text-2xl font-bold font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>سجل الشهداء (معجم الشخصيات)</h3>
                </div>
                <button onClick={() => setIsMartyrsOpen(false)} className={`p-2 rounded-full ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-800 text-slate-400'}`}>
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {martyrs.map(martyr => (
                    <div key={martyr.id} className={`p-4 rounded-xl border transition-all ${theme === 'light' ? 'bg-slate-50 border-slate-200 hover:border-red-300' : 'bg-slate-800/50 border-slate-700 hover:border-red-900/50'}`}>
                      <h4 className={`text-lg font-amiri font-bold mb-1 ${theme === 'light' ? 'text-red-700' : 'text-red-400'}`}>{martyr.name}</h4>
                      <p className={`text-xs mb-3 font-bold ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{martyr.title}</p>
                      <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{martyr.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
