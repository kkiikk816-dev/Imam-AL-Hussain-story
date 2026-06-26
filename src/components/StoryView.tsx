import { motion } from "motion/react";
import { Chapter } from "../types";
import React, { useEffect, useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface StoryViewProps {
  chapter: Chapter;
  fontSizeClass?: string;
  theme?: string;
  key?: string | number;
}

export default function StoryView({ chapter, fontSizeClass = "text-xl", theme = "dark" }: StoryViewProps) {
  const [sharePos, setSharePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Calculate position relative to viewport
        setSharePos({
          x: rect.left + rect.width / 2,
          y: rect.top - 50,
        });
        setSelectedText(selection.toString().trim());
        setCopied(false);
      } else {
        setSharePos(null);
        setSelectedText("");
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ملحمة كربلاء",
          text: `"${selectedText}"\n\n- ${chapter.title}`,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
    setSharePos(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${selectedText}"\n\n- ${chapter.title}`);
    setCopied(true);
    setTimeout(() => {
      setSharePos(null);
    }, 2000);
  };

  // Helper to format text: detect bold and verses
  const formatContent = (text: string) => {
    return text.split("\n\n").map((paragraph, idx) => {
      if (!paragraph.trim()) return null;

      // Check if it's a heading-like bold line
      if (paragraph.startsWith("**") && paragraph.endsWith("**") && paragraph.split("**").length === 3) {
        return (
          <h3 key={idx} className={`font-amiri font-bold text-red-400 mt-12 mb-6 border-r-4 border-red-800 pr-4 ${fontSizeClass === 'text-xl' ? 'text-2xl' : fontSizeClass === 'text-2xl' ? 'text-3xl' : 'text-4xl'}`}>
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }

      // Check if it contains poetry verses (usually separated by ***)
      if (paragraph.includes("***")) {
        const verses = paragraph.split('\n').map((line, lineIdx) => {
          if (line.includes("***")) {
            const parts = line.split("***");
            return (
              <div key={lineIdx} className={`flex justify-center gap-8 my-2 font-amiri ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} ${fontSizeClass}`}>
                <span className="w-1/2 text-left">{parts[0].trim()}</span>
                <span className="w-1/2 text-right">{parts[1].trim()}</span>
              </div>
            );
          }
          return <div key={lineIdx} className={`text-center font-amiri my-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} ${fontSizeClass}`}>{line}</div>;
        });
        return (
          <div key={idx} className={`my-8 p-6 rounded-2xl border ${theme === 'light' ? 'bg-slate-100 border-slate-300' : 'bg-slate-900/50 border-slate-800'}`}>
            {verses}
          </div>
        );
      }

      // Normal paragraph with inline bold
      const parts = paragraph.split("**");
      return (
        <p key={idx} className={`mb-6 leading-relaxed font-sans ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'} ${fontSizeClass}`}>
          {parts.map((part, i) => 
            i % 2 === 1 ? (
              <strong key={i} className={`font-bold ${theme === 'light' ? 'text-red-700' : 'text-red-300'}`}>
                {part}
              </strong>
            ) : part.split('\n').map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {line}
                {lineIdx < part.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))
          )}
        </p>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-12 lg:py-20 relative z-10"
        id="story-container"
      >
        <header className="mb-12 text-center">
          {chapter.description && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 border ${theme === 'light' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-950/30 text-red-500 border-red-900/50'}`}
            >
              {chapter.description}
            </motion.div>
          )}
          <h1 className={`text-4xl md:text-5xl font-amiri font-bold mb-6 tracking-tight leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`} id="chapter-title">
            {chapter.title}
          </h1>
          <div className="w-24 h-1 bg-red-900 mx-auto rounded-full" />
        </header>

        <div className="story-content text-right" dir="rtl" id="story-body">
          {formatContent(chapter.content)}
        </div>

        {/* Subtle Athar Signature */}
        <div className="mt-16 pt-8 border-t border-dashed border-slate-200/10 dark:border-slate-800/40 text-center select-none">
          <p className={`text-xs font-medium tracking-wide opacity-30 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            نسألكم الدعاء ، أثَر | ATHAR
          </p>
        </div>
      </motion.div>

      {/* Floating Share Button */}
      {sharePos && (
        <div 
          className="fixed z-[100] transform -translate-x-1/2 flex items-center gap-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-2 pointer-events-auto"
          style={{ 
            top: `${Math.max(10, sharePos.y)}px`, 
            left: `${sharePos.x}px` 
          }}
        >
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 rounded-md transition-colors"
          >
            <Share2 size={16} />
            مشاركة
          </button>
          <div className="w-px h-6 bg-slate-700" />
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 rounded-md transition-colors"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            {copied ? "تم النسخ" : "نسخ"}
          </button>
        </div>
      )}
    </>
  );
}
