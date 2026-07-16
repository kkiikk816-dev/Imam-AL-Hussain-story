import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen, Users, ScrollText, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { martyrs } from '../data/martyrs';
import { poems } from '../data/poems';
import { chapter1 } from "../data/chapters/chapter1";
import { chapter2 } from "../data/chapters/chapter2";
import { chapter3 } from "../data/chapters/chapter3";
import { chapter4 } from "../data/chapters/chapter4";
import { chapter5 } from "../data/chapters/chapter5";
import { chapter6 } from "../data/chapters/chapter6";
import { chapter7 } from "../data/chapters/chapter7";
import { chapter8 } from "../data/chapters/chapter8";
import { chapter9 } from "../data/chapters/chapter9";
import { chapter10 } from "../data/chapters/chapter10";
import { chapter11 } from "../data/chapters/chapter11";
import { chapter12 } from "../data/chapters/chapter12";
import { chapter13 } from "../data/chapters/chapter13";
import { chapter14 } from "../data/chapters/chapter14";
import { chapter15 } from "../data/chapters/chapter15";
import { chapter16 } from "../data/chapters/chapter16";
import { chapter17 } from "../data/chapters/chapter17";

const chapters = [
  chapter1, chapter2, chapter3, chapter4,
  chapter5, chapter6, chapter7, chapter8,
  chapter9, chapter10, chapter11, chapter12,
  chapter13, chapter14, chapter15, chapter16, chapter17
];

interface SearchViewProps {
  onBack: () => void;
  onNavigateToChapter: (chapterIdx: number, highlight?: string) => void;
  onNavigateToMartyr: (id: string) => void;
}

type SearchResult = {
  type: 'chapter' | 'martyr' | 'poem';
  id: string | number;
  title: string;
  preview: string;
};

export default function SearchView({ onBack, onNavigateToChapter, onNavigateToMartyr }: SearchViewProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 0);
    const matches = (text: string) => searchTerms.every(term => text.toLowerCase().includes(term));
    
    const chapterResults: SearchResult[] = [];
    chapters.forEach((ch, idx) => {
      if (matches(ch.title) || matches(ch.content)) {
        // Extract a preview snippet
        const snippetIndex = ch.content.toLowerCase().indexOf(searchTerms[0]);
        const start = Math.max(0, snippetIndex - 40);
        const end = Math.min(ch.content.length, snippetIndex + 80);
        let preview = ch.content.substring(start, end).replace(/\*/g, '');
        if (start > 0) preview = '...' + preview;
        if (end < ch.content.length) preview = preview + '...';
        
        chapterResults.push({
          type: 'chapter',
          id: idx,
          title: ch.title.split(':')[0],
          preview
        });
      }
    });

    const martyrResults: SearchResult[] = [];
    martyrs.forEach(m => {
      if (matches(m.name) || matches(m.description) || matches(m.title)) {
        martyrResults.push({
          type: 'martyr',
          id: m.id,
          title: m.name,
          preview: m.description.substring(0, 100) + '...'
        });
      }
    });

    const poemResults: SearchResult[] = [];
    poems.forEach((p, idx) => {
      if (matches(p.title) || matches(p.verse)) {
        poemResults.push({
          type: 'poem',
          id: idx,
          title: p.title,
          preview: p.verse.substring(0, 100) + '...'
        });
      }
    });

    return [...chapterResults, ...martyrResults, ...poemResults];
  }, [query]);

  const sampleQueries = [
    "المدينة المنورة", "مسلم بن عقيل", "خطبة الإمام الحسين",
    "العباس بن علي", "يوم العاشر", "زهير بن القين", "كربلاء"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1115] flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-slate-800 bg-slate-900/50 p-4 pt-6">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
            <ArrowRight size={24} />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ابحث في السيرة، الشهداء، والقصائد..."
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors font-amiri text-lg"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>
      </header>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          
          {/* Sample Queries */}
          {query.trim().length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center"
            >
              <p className="text-slate-500 font-amiri text-lg mb-6">كلمات بحث مقترحة</p>
              <div className="flex flex-wrap justify-center gap-3">
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(sample)}
                    className="bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-full font-amiri transition-colors text-sm md:text-base"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {query.trim().length > 0 && query.trim().length < 2 && (
            <p className="text-center text-slate-500 font-amiri text-xl mt-12">يرجى إدخال حرفين على الأقل للبحث</p>
          )}
          
          {query.trim().length >= 2 && results.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-slate-500 font-amiri text-xl mt-12"
            >
              لم يتم العثور على نتائج تطابق "{query}"
            </motion.p>
          )}

          <AnimatePresence>
            {results.map((res, i) => (
              <motion.button
                key={`${res.type}-${res.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  if (res.type === 'chapter') onNavigateToChapter(res.id as number, query);
                  // For martyr/poem we just show them or if we have a way to navigate to them:
                  // Currently App.tsx doesn't have a direct 'martyr details' route, but we could navigate to 'martyrs' view.
                  // For now, if martyr, maybe navigate to martyrs view.
                }}
                className="text-right p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2 text-amber-500/80 mb-1">
                  {res.type === 'chapter' && <BookOpen size={16} />}
                  {res.type === 'martyr' && <Users size={16} />}
                  {res.type === 'poem' && <ScrollText size={16} />}
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {res.type === 'chapter' && 'السيرة'}
                    {res.type === 'martyr' && 'معجم الشهداء'}
                    {res.type === 'poem' && 'ديوان الطف'}
                  </span>
                </div>
                <h3 className="font-amiri font-bold text-xl text-slate-200 group-hover:text-white transition-colors">{res.title}</h3>
                <p className="font-amiri text-slate-400 leading-relaxed line-clamp-2">{res.preview}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
