/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { chapter1 } from "./data/chapters/chapter1";
import { chapter2 } from "./data/chapters/chapter2";
import { chapter3 } from "./data/chapters/chapter3";
import { chapter4 } from "./data/chapters/chapter4";
import { chapter5 } from "./data/chapters/chapter5";
import { chapter6 } from "./data/chapters/chapter6";
import { chapter7 } from "./data/chapters/chapter7";
import { chapter8 } from "./data/chapters/chapter8";
import { chapter9 } from "./data/chapters/chapter9";
import StoryView from "./components/StoryView";
import { BookOpen, Menu, X, ScrollText, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(chapter1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const chapters = [
    chapter1, chapter2, chapter3, 
    chapter4, chapter5, chapter6, 
    chapter7, chapter8, chapter9
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-red-900/40">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          id="open-menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-amiri font-bold text-white">ملحمة كربلاء</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className={`fixed lg:relative inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-800 z-50 flex flex-col transition-all ${!isSidebarOpen && 'hidden lg:flex'}`}
              id="sidebar"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3 text-red-500">
                  <ScrollText size={24} />
                  <h2 className="text-xl font-amiri font-bold text-white">فصول الرواية</h2>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChapter(ch);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-right p-4 rounded-xl transition-all flex flex-col gap-1 group ${
                      currentChapter.id === ch.id 
                        ? "bg-red-950/30 border border-red-900/50" 
                        : "hover:bg-slate-800 border border-transparent"
                    }`}
                  >
                    <span className={`font-amiri text-lg ${currentChapter.id === ch.id ? "text-red-400" : "text-slate-200"}`}>
                      {ch.title}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-1">{ch.description}</span>
                  </button>
                ))}
                
                <div className="pt-8 px-4 opacity-40">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <History size={14} />
                    <span className="text-xs uppercase tracking-widest font-medium">قريباً</span>
                  </div>
                  <div className="h-20 border-r-2 border-slate-800 border-dashed mr-4" />
                </div>
              </nav>

              <div className="p-6 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">المصدر</p>
                  <p className="text-sm font-amiri font-medium text-slate-300">بحار الأنوار - الجزء 44 و 45</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(69,10,10,0.05)_0%,rgba(2,6,23,1)_100%)]">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-950/10 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <StoryView key={currentChapter.id} chapter={currentChapter} />
          </AnimatePresence>

          <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-900/50 text-center">
            <p className="text-slate-600 text-sm italic font-amiri">
              "يا بن رسول الله، إن جدي قد بشرني برؤياك مرملاً بالدماء..."
            </p>
          </footer>
        </main>
      </div>

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
