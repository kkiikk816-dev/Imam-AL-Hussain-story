import { motion } from "motion/react";
import { Chapter } from "../types";
import React from "react";

interface StoryViewProps {
  chapter: Chapter;
}

export default function StoryView({ chapter }: StoryViewProps) {
  // Helper to format text: detect bold and verses
  const formatContent = (text: string) => {
    return text.split("\n\n").map((paragraph, idx) => {
      if (!paragraph.trim()) return null;

      // Check if it's a heading-like bold line
      if (paragraph.startsWith("**") && paragraph.endsWith("**") && paragraph.split("**").length === 3) {
        return (
          <h3 key={idx} className="text-2xl font-amiri font-bold text-red-400 mt-12 mb-6 border-r-4 border-red-800 pr-4">
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
              <div key={lineIdx} className="flex justify-center gap-8 my-2 font-amiri text-xl text-slate-300">
                <span className="w-1/2 text-left">{parts[0].trim()}</span>
                <span className="w-1/2 text-right">{parts[1].trim()}</span>
              </div>
            );
          }
          return <div key={lineIdx} className="text-center font-amiri text-xl text-slate-400 my-2">{line}</div>;
        });
        return (
          <div key={idx} className="my-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            {verses}
          </div>
        );
      }

      // Normal paragraph with inline bold
      const parts = paragraph.split("**");
      return (
        <p key={idx} className="mb-6 text-xl leading-relaxed text-slate-300 font-sans">
          {parts.map((part, i) => 
            i % 2 === 1 ? (
              <strong key={i} className="text-red-300 font-bold">
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12"
      id="story-container"
    >
      <header className="mb-12 text-center">
        {chapter.description && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-red-950/30 text-red-500 text-sm font-medium mb-4 border border-red-900/50"
          >
            {chapter.description}
          </motion.div>
        )}
        <h1 className="text-4xl md:text-5xl font-amiri font-bold text-white mb-6 tracking-tight leading-tight" id="chapter-title">
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
