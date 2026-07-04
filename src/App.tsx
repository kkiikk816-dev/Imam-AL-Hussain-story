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
import AboutModal from "./components/AboutModal";
import JourneyTimeline from "./components/JourneyTimeline";
import AmbientAudio from "./components/AmbientAudio";
import DiwanModal from "./components/DiwanModal";
import ZiyaratModal from "./components/ZiyaratModal";
import { BookOpen, Menu, X, ScrollText, History, ChevronRight, ChevronLeft, Settings, Type, Moon, Sun, MonitorPlay, Users, Search, Filter, CalendarDays, Map, Info, Feather, Book } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { martyrs } from "./data/martyrs";
import { chapter15 } from "./data/chapters/chapter15";
import { chapter16 } from "./data/chapters/chapter16";
import { chapter17 } from "./data/chapters/chapter17";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMartyrsOpen, setIsMartyrsOpen] = useState(false);
  const [isDiwanOpen, setIsDiwanOpen] = useState(false);
  const [isZiyaratOpen, setIsZiyaratOpen] = useState(false);
  
  const [martyrSearchQuery, setMartyrSearchQuery] = useState("");
  const [martyrSelectedCategory, setMartyrSelectedCategory] = useState<string>("all");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const filteredMartyrs = martyrs.filter(martyr => {
    const matchesSearch = 
      martyr.name.toLowerCase().includes(martyrSearchQuery.toLowerCase()) ||
      martyr.title.toLowerCase().includes(martyrSearchQuery.toLowerCase());
    
    const matchesCategory = 
      martyrSelectedCategory === "all" || 
      martyr.category === martyrSelectedCategory;
      
    return matchesSearch && matchesCategory;
  });
  
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
    <div className={`h-screen flex flex-col font-sans overflow-hidden selection:bg-red-900/40 ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950'}`}>
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 h-1.5 w-full z-[60] bg-slate-800">
        <div 
          className="h-full bg-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* The Master Header */}
      <header className={`flex-shrink-0 sticky top-0 z-50 flex items-center justify-between px-4 py-2 border-b backdrop-blur-md ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/60 border-slate-800/80'}`}>
         {/* Right: Menu & Logo */}
         <div className="flex items-center gap-3 w-1/3">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
             <Menu size={22} />
           </button>
           <span className={`text-base font-sans font-black tracking-wide ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>أثَر</span>
         </div>
         {/* Center: Title Capsule */}
         <div className="flex justify-center w-1/3">
           <div className={`px-4 py-1.5 rounded-full text-xs font-amiri font-bold border transition-colors ${theme === 'light' ? 'bg-white/60 border-slate-200 text-slate-800 shadow-sm' : 'bg-white/5 border-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md'}`}>
             {currentChapter.title.split(':')[0]}
           </div>
         </div>
         {/* Left: Preferences */}
         <div className="flex gap-2 items-center justify-end w-1/3">
           <button onClick={() => setIsSettingsOpen(true)} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`} title="الإعدادات (حجم الخط والمظهر)">
             <Type size={18} />
           </button>
           <button onClick={() => setIsAboutOpen(true)} className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`} title="حول المنصة">
             <Info size={18} />
           </button>
         </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className={`fixed lg:relative inset-y-0 right-0 w-80 border-l z-50 flex flex-col transition-all ${!isSidebarOpen ? 'hidden lg:flex' : ''} ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}
            >
                   {/* Feature Hub Tabs */}
              <div className={`p-4 border-b flex gap-3 shrink-0 ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}>
                <button 
                  onClick={() => setIsMartyrsOpen(true)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all group ${theme === 'light' ? 'bg-white hover:bg-slate-100 border border-slate-200' : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'}`}
                >
                  <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-red-50 text-red-600' : 'bg-red-900/30 text-red-400'}`}>
                    <Users size={20} />
                  </div>
                  <span className={`text-xs font-bold font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>معجم الأطهار</span>
                </button>
                <button 
                  onClick={() => setIsTimelineOpen(true)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all group ${theme === 'light' ? 'bg-white hover:bg-slate-100 border border-slate-200' : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'}`}
                >
                  <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-amber-50 text-amber-600' : 'bg-amber-900/30 text-amber-400'}`}>
                    <Map size={20} />
                  </div>
                  <span className={`text-xs font-bold font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>محطات المسير</span>
                </button>
                <button 
                  onClick={() => setIsDiwanOpen(true)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all group ${theme === 'light' ? 'bg-white hover:bg-slate-100 border border-slate-200' : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'}`}
                >
                  <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}`}>
                    <Feather size={20} />
                  </div>
                  <span className={`text-xs font-bold font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>ديوان الملحمة</span>
                </button>
                <button 
                  onClick={() => setIsZiyaratOpen(true)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all group ${theme === 'light' ? 'bg-white hover:bg-slate-100 border border-slate-200' : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'}`}
                >
                  <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
                    <Book size={20} />
                  </div>
                  <span className={`text-xs font-bold font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>زيارة الشهداء</span>
                </button>
              </div>

              {/* Chapter Header */}
              <div className={`px-6 py-3 border-b shrink-0 flex items-center justify-between ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="flex items-center gap-2">
                  <ScrollText size={18} className="text-red-500 animate-pulse" />
                  <h2 className={`text-sm font-bold font-amiri ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>مسار القصة</h2>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`lg:hidden p-1.5 transition-colors ${theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                >
                  <X size={18} />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto relative py-6 px-4">
                <div className={`absolute top-0 bottom-0 right-[2.1rem] w-px ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`} />
                <div className="space-y-6 relative z-10">
                  {chapters.map((ch, idx) => {
                    const isCurrent = currentChapterIndex === idx;
                    const isCompleted = idx < currentChapterIndex;
                    
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setCurrentChapterIndex(idx);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-right flex items-start gap-4 group transition-all`}
                      >
                        {/* Timeline Node */}
                        <div className="relative flex flex-col items-center shrink-0 w-10 mt-1">
                          {isCurrent ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center relative ${theme === 'light' ? 'bg-red-100' : 'bg-red-950/50'}`}>
                              <div className="absolute inset-0 rounded-full animate-ping opacity-25 bg-red-500" />
                              <BookOpen size={14} className="text-red-500 relative z-10" />
                            </div>
                          ) : isCompleted ? (
                            <div className={`w-3 h-3 rounded-full mt-2 border-2 ${theme === 'light' ? 'bg-slate-300 border-slate-50' : 'bg-slate-600 border-slate-900'}`} />
                          ) : (
                            <div className={`w-3 h-3 rounded-full mt-2 border-2 ${theme === 'light' ? 'bg-transparent border-slate-300' : 'bg-transparent border-slate-700'}`} />
                          )}
                        </div>

                        {/* Card */}
                        <div className={`flex-1 p-3 rounded-xl transition-all border ${
                          isCurrent 
                            ? (theme === 'light' ? 'bg-white border-red-200 shadow-[0_0_15px_rgba(220,38,38,0.1)]' : 'bg-white/5 backdrop-blur-md border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.15)]')
                            : (theme === 'light' ? 'bg-transparent border-transparent hover:bg-slate-100/50' : 'bg-transparent border-transparent hover:bg-slate-800/50')
                        }`}>
                          <h3 className={`font-amiri text-lg font-bold mb-1 ${
                            isCurrent 
                              ? (theme === 'light' ? 'text-red-700' : 'text-red-400')
                              : (theme === 'light' ? 'text-slate-700' : 'text-slate-300 group-hover:text-slate-200')
                          }`}>
                            {ch.title}
                          </h3>
                          <p className={`text-xs line-clamp-2 leading-relaxed ${
                            isCurrent
                              ? (theme === 'light' ? 'text-red-900/60' : 'text-red-200/50')
                              : (theme === 'light' ? 'text-slate-500' : 'text-slate-500 group-hover:text-slate-400')
                          }`}>
                            {ch.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
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
          <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <button
              onClick={goToNextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-amiri text-lg transition-all border backdrop-blur-md w-full md:w-auto justify-center ${
                currentChapterIndex === chapters.length - 1
                  ? "opacity-50 cursor-not-allowed bg-transparent border-transparent text-slate-500"
                  : (theme === 'light' ? "bg-white/50 hover:bg-red-50 text-red-800 border-red-200 hover:border-red-300" : "bg-white/5 hover:bg-white/10 text-red-100 border-red-900/30 hover:border-red-500/50 shadow-lg")
              }`}
            >
              <ChevronRight size={20} className={currentChapterIndex !== chapters.length - 1 ? 'animate-pulse' : ''} />
              الفصل التالي
            </button>
            
            <button
              onClick={goToPrevChapter}
              disabled={currentChapterIndex === 0}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-amiri text-lg transition-all border backdrop-blur-md w-full md:w-auto justify-center ${
                currentChapterIndex === 0
                  ? "opacity-50 cursor-not-allowed bg-transparent border-transparent text-slate-500"
                  : (theme === 'light' ? "bg-transparent hover:bg-slate-100 text-slate-600 border-slate-300 hover:border-slate-400" : "bg-transparent hover:bg-white/5 text-slate-400 border-slate-800 hover:border-slate-600")
              }`}
            >
              الفصل السابق
              <ChevronLeft size={20} />
            </button>
          </div>

          <footer className={`max-w-4xl mx-auto px-6 pb-20 pt-8 border-t text-center ${theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-slate-900/50 text-slate-600'} flex flex-col items-center gap-4 relative z-10`}>
            {chapters[currentChapterIndex].quote && (
              <p className={`text-lg italic font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                "{chapters[currentChapterIndex].quote}"
              </p>
            )}
            <span className="text-[11px] font-bold tracking-widest uppercase opacity-30 select-none font-sans mt-4">
              نسألكم الدعاء ، أثَر | ATHAR
            </span>
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

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => {
                      setIsSettingsOpen(false);
                      setIsAboutOpen(true);
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      theme === 'light' 
                        ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800' 
                        : 'bg-amber-950/20 hover:bg-amber-950/40 border-amber-950/30 text-amber-400'
                    }`}
                  >
                    ✨ ما هو أثَر؟ (حول التطبيق)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Martyrs Dictionary Modal */}
      <AnimatePresence>
        {isMartyrsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsMartyrsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`relative w-screen h-screen flex flex-col overflow-hidden ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950 text-white'}`}
            >
              {/* Ambient Top Decorative Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-amber-500 to-red-800 z-10" />

              {/* Modal Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${theme === 'light' ? 'bg-white border-slate-200/80' : 'bg-slate-900/90 border-slate-800/80'}`}>
                <div className="flex items-center gap-4 text-red-500">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                    <Users size={32} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>سجل الشهداء (معجم الأطهار)</h3>
                    <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>شخصيات استشهدت في واقعة الطف وما قبلها دفاعاً عن ريحانة رسول الله (ص)</p>
                  </div>
                </div>
                
                {/* Spiritual Quote & Stats (Cosmetic/Ambient Feature) */}
                <div className="hidden lg:flex flex-col items-end gap-1 px-4 py-2 border-r border-slate-200/50 dark:border-slate-800/80 ml-auto mr-8">
                  <span className="text-xs font-amiri italic text-amber-500">"بَذَلُوا مُهَجَهُمْ دُونَ الحُسَيْنِ عَلَيْهِ السَّلام"</span>
                  <span className={`text-[10px] font-bold ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>معجم شامل بأسماء أبطال التضحية والفداء</span>
                </div>

                <button 
                  onClick={() => {
                    setIsMartyrsOpen(false);
                    setMartyrSearchQuery("");
                    setMartyrSelectedCategory("all");
                    setIsCategoryDropdownOpen(false);
                  }} 
                  className={`p-2 rounded-xl border transition-colors ${theme === 'light' ? 'hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800' : 'hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Compact Search & Dropdown Filter Bar */}
              <div className={`px-6 py-3 border-b shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3 ${theme === 'light' ? 'bg-white border-slate-200/60' : 'bg-slate-900 border-slate-800/60'}`}>
                {/* Compact Search Input (Name/Title Only) */}
                <div className="relative flex-1 max-w-lg">
                  <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    placeholder="ابحث باسم الشهيد أو اللقب الشريف فقط..."
                    value={martyrSearchQuery}
                    onChange={(e) => setMartyrSearchQuery(e.target.value)}
                    className={`w-full pr-9 pl-4 py-1.5 rounded-lg border text-xs font-medium transition-all outline-none ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-red-400 focus:ring-1 focus:ring-red-200' : 'bg-slate-950 border-slate-800 text-white focus:border-red-900/50 focus:ring-1 focus:ring-red-950/30'}`}
                  />
                  {martyrSearchQuery && (
                    <button 
                      onClick={() => setMartyrSearchQuery("")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Filter Selector & Stats */}
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className={`text-[11px] font-bold flex items-center gap-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Filter size={12} /> التصنيف:
                  </span>
                  
                  {/* Dropdown Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                        theme === 'light'
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="text-red-500">
                        {martyrSelectedCategory === "all" ? "الكل (جميع الفئات)" : 
                         martyrSelectedCategory === "أهل البيت (عليهم السلام)" ? "أهل البيت (ع)" :
                         martyrSelectedCategory === "الأصحاب الأنصار" ? "الأصحاب الأنصار" :
                         martyrSelectedCategory === "شهداء ما قبل الطف" ? "شهداء ما قبل الطف" :
                         "النساء والشهداء الآخرون"}
                      </span>
                      <span className="text-[9px] opacity-60">▼</span>
                    </button>

                    {/* Dropdown Menu Popup */}
                    {isCategoryDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setIsCategoryDropdownOpen(false)} />
                        <div className={`absolute left-0 md:right-0 md:left-auto mt-1.5 w-60 rounded-xl shadow-2xl border p-1 z-40 ${
                          theme === 'light'
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}>
                          {[
                            { id: "all", label: "الكل (جميع الفئات)" },
                            { id: "أهل البيت (عليهم السلام)", label: "أهل البيت (عليهم السلام)" },
                            { id: "الأصحاب الأنصار", label: "الأصحاب الأنصار" },
                            { id: "شهداء ما قبل الطف", label: "شهداء ما قبل الطف" },
                            { id: "النساء والشهداء الآخرون", label: "النساء والشهداء الآخرون" }
                          ].map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setMartyrSelectedCategory(cat.id);
                                setIsCategoryDropdownOpen(false);
                              }}
                              className={`w-full text-right px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                martyrSelectedCategory === cat.id
                                  ? 'bg-red-500/10 text-red-500 font-extrabold'
                                  : theme === 'light'
                                    ? 'hover:bg-slate-100 text-slate-700'
                                    : 'hover:bg-slate-800 text-slate-300'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Counter Badge */}
                  <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    theme === 'light' 
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-red-950/20 text-red-400 border border-red-950/30'
                  }`}>
                    العدد: <span className="text-amber-500 font-mono">{filteredMartyrs.length}</span>
                  </div>
                </div>
              </div>

              {/* Fullscreen Grid list of Martyrs */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-transparent to-slate-950/10">
                {filteredMartyrs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredMartyrs.map(martyr => (
                      <div 
                        key={martyr.id} 
                        className={`p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-300 group hover:-translate-y-1 ${
                          theme === 'light' 
                            ? 'bg-white border-slate-200/80 hover:border-red-300 hover:shadow-lg' 
                            : 'bg-slate-900/60 border-slate-800/80 hover:border-red-900/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-red-950/10'
                        }`}
                      >
                        {/* Header Details */}
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h4 className={`text-xl font-amiri font-bold transition-colors ${theme === 'light' ? 'text-red-700 group-hover:text-red-800' : 'text-red-400 group-hover:text-red-300'}`}>
                              {martyr.name}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide shrink-0 ${
                              martyr.category === "أهل البيت (عليهم السلام)"
                                ? "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-400 border border-green-200/40"
                                : martyr.category === "الأصحاب الأنصار"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/40"
                                  : martyr.category === "شهداء ما قبل الطف"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-400 border border-yellow-200/40"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200/40"
                            }`}>
                              {martyr.category === "أهل البيت (عليهم السلام)" ? "أهل البيت (ع)" : martyr.category}
                            </span>
                          </div>
                          <p className={`text-xs font-bold leading-relaxed ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{martyr.title}</p>
                        </div>

                        {/* Description */}
                        <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {martyr.description}
                        </p>

                        {/* Martyr Details Grid */}
                        <div className={`mt-auto pt-4 border-t grid grid-cols-2 gap-x-4 gap-y-3 text-xs ${theme === 'light' ? 'border-slate-200/60 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                          <div>
                            <span className="font-bold block text-[10px] text-red-500 uppercase tracking-wider mb-0.5">الموعد:</span>
                            <span className="font-medium">{martyr.timing}</span>
                          </div>
                          <div>
                            <span className="font-bold block text-[10px] text-red-500 uppercase tracking-wider mb-0.5">المكان:</span>
                            <span className="font-medium">{martyr.location}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold block text-[10px] text-red-500 uppercase tracking-wider mb-0.5">القاتل:</span>
                            <span className="font-medium">{martyr.killer || "جيش الأعداء الكافر"}</span>
                          </div>
                          <div className={`col-span-2 p-3 rounded-xl text-xs leading-relaxed mt-1 border transition-colors ${
                            theme === 'light' 
                              ? 'bg-red-50/40 border-red-100 text-slate-700 group-hover:bg-red-50' 
                              : 'bg-red-950/10 border-red-950/30 text-slate-300 group-hover:bg-red-950/20'
                          }`}>
                            <strong className="font-bold block text-[10px] text-red-500 mb-1">تفاصيل الاستشهاد:</strong>
                            {martyr.deathMethod}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="p-4 rounded-full bg-red-500/5 text-red-500/50 mb-4 animate-bounce">
                      <Users size={56} />
                    </div>
                    <p className={`text-xl font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>لا توجد نتائج مطابقة</p>
                    <p className={`text-sm mt-2 max-w-md mx-auto leading-relaxed ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      لم نجد أي اسم أو لقب يطابق <strong className="text-red-500">"{martyrSearchQuery}"</strong> في تصنيف <strong className="text-red-500">"{martyrSelectedCategory === 'all' ? 'الكل' : martyrSelectedCategory}"</strong>.
                    </p>
                    <button 
                      onClick={() => {
                        setMartyrSearchQuery("");
                        setMartyrSelectedCategory("all");
                      }}
                      className="mt-5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTimelineOpen && (
          <JourneyTimeline 
            theme={theme} 
            onClose={() => setIsTimelineOpen(false)} 
            chapters={chapters} 
            onSelectChapter={setCurrentChapterIndex} 
          />
        )}
      </AnimatePresence>

      {/* About Platform Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} theme={theme} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDiwanOpen && (
          <DiwanModal theme={theme} onClose={() => setIsDiwanOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isZiyaratOpen && (
          <ZiyaratModal theme={theme} onClose={() => setIsZiyaratOpen(false)} />
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
