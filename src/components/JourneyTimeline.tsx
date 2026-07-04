import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowLeft, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { Chapter } from '../types';

interface JourneyTimelineProps {
  theme: 'light' | 'dark';
  onClose: () => void;
  chapters: Chapter[];
  onSelectChapter: (index: number) => void;
}

export default function JourneyTimeline({ theme, onClose, chapters, onSelectChapter }: JourneyTimelineProps) {
  const stations = [
    { name: "المدينة المنورة", description: "خروج الإمام الحسين (ع) خائفاً يترقب", chapterIndices: [0] },
    { name: "مكة المكرمة", description: "وصول الإمام وورود رسائل أهل الكوفة، ثم خروجه منها", chapterIndices: [1, 7] },
    { name: "الكوفة (أحداث مسلم)", description: "وصول مسلم بن عقيل، خذلان الناس، وشهادته", chapterIndices: [2, 3, 4, 5, 6] },
    { name: "زبالة وشراف", description: "تلقي خبر استشهاد مسلم، ولقاء الحر الرياحي", chapterIndices: [7, 8] },
    { name: "كربلاء (النزول)", description: "النزول في أرض الطف، وحصار الماء، وليلة العاشر", chapterIndices: [9, 10, 11] },
    { name: "كربلاء (يوم عاشوراء)", description: "الحملات، شهادة الأصحاب وبني هاشم، والمأساة الكبرى", chapterIndices: [12, 13] },
    { name: "الكوفة (السبايا)", description: "مسير السبايا وقوفهم أمام ابن زياد", chapterIndices: [14, 15] },
    { name: "دمشق", description: "مجلس يزيد، خطب أهل البيت، وإقامة العزاء", chapterIndices: [16] },
    { name: "المدينة المنورة (العودة)", description: "رجوع الركب وإعلان العزاء في يثرب", chapterIndices: [16] }, // Included in 17
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl border ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
        dir="rtl"
      >
        <div className={`p-6 border-b flex items-center justify-between shrink-0 ${theme === 'light' ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900/50'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/30 text-red-500'}`}>
              <MapPin size={24} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>محطات المسير</h2>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>خريطة زمنية ومكانية لأحداث النهضة الحسينية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className={`absolute top-0 bottom-0 right-14 md:right-[5.5rem] w-1 rounded-full ${theme === 'light' ? 'bg-red-900/10' : 'bg-red-900/30'}`} />
          
          <div className="space-y-12">
            {stations.map((station, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                <div className={`relative z-10 flex flex-col items-center shrink-0 w-8 md:w-12 mt-1`}>
                  <div className="relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${theme === 'light' ? 'bg-red-500' : 'bg-red-500'}`} />
                    <div className={`relative z-10 w-full h-full rounded-full border-4 flex items-center justify-center ${theme === 'light' ? 'bg-white border-red-700 shadow-sm' : 'bg-slate-900 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'}`}>
                      <div className={`w-2 h-2 rounded-full ${theme === 'light' ? 'bg-red-700' : 'bg-red-500'}`} />
                    </div>
                  </div>
                </div>

                <div className={`flex-1 p-6 rounded-2xl border ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/50 border-slate-700'}`}>
                  <h3 className={`text-xl font-bold mb-2 font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {station.name}
                  </h3>
                  <p className={`text-sm mb-6 font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {station.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>المشاهد المرتبطة</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {station.chapterIndices.map(chapterIndex => {
                        const chapter = chapters[chapterIndex];
                        if (!chapter) return null;
                        return (
                          <button
                            key={chapterIndex}
                            onClick={() => {
                              onSelectChapter(chapterIndex);
                              onClose();
                            }}
                            className={`flex items-start gap-3 p-3 rounded-xl text-right transition-all group ${
                              theme === 'light' 
                                ? 'bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-200' 
                                : 'bg-slate-900/50 hover:bg-red-900/20 border border-slate-800 hover:border-red-900/50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg mt-0.5 transition-colors ${
                              theme === 'light'
                                ? 'bg-white text-red-600 group-hover:bg-red-100'
                                : 'bg-slate-800 text-red-400 group-hover:bg-red-900/50'
                            }`}>
                              <BookOpen size={16} />
                            </div>
                            <div className="flex-1">
                              <h5 className={`text-sm font-bold mb-1 font-amiri ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                                {chapter.title}
                              </h5>
                              <p className={`text-xs line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                                {chapter.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
