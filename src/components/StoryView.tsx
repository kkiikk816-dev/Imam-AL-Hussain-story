import { motion } from "motion/react";
import { Chapter } from "../types";

interface StoryViewProps {
  chapter: Chapter;
}

export default function StoryView({ chapter }: StoryViewProps) {
  // Helper to format text: detect bold and blocks
  const formatContent = (text: string) => {
    return text.split("\n\n").map((paragraph, idx) => {
      // Check if it's a bold/speech block (simplified for now)
      if (paragraph.includes("**")) {
        const parts = paragraph.split("**");
        return (
          <p key={idx} className="mb-6 text-xl leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? (
                <span key={i} className="text-red-400 font-bold border-r-2 border-red-800 pr-3 mr-1 inline-block">
                  {part}
                </span>
              ) : part
            )}
          </p>
        );
      }
      return <p key={idx} className="mb-6 text-xl leading-relaxed text-slate-300">{paragraph}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12"
      id="story-container"
    >
      <header className="mb-12 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-block px-4 py-1 rounded-full bg-red-950/30 text-red-500 text-sm font-medium mb-4 border border-red-900/50"
        >
          {chapter.description}
        </motion.div>
        <h1 className="text-5xl font-amiri font-bold text-white mb-4 tracking-tight" id="chapter-title">
          {chapter.title}
        </h1>
        <div className="w-24 h-1 bg-red-900 mx-auto rounded-full" />
      </header>

      <div className="story-content text-right" dir="rtl" id="story-body">
        {formatContent(chapter.content)}
      </div>
    </motion.div>
  );
}
