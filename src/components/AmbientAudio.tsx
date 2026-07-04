import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function AmbientAudio({ theme }: { theme: 'light' | 'dark' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/02/10/audio_516c59b207.mp3?filename=desert-wind-and-sand-115201.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio playback failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleAudio}
      className={`p-2 transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
      title={isPlaying ? 'إيقاف المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية (رياح الصحراء)'}
    >
      {isPlaying ? <Volume2 size={24} className="animate-pulse text-red-500" /> : <VolumeX size={24} />}
    </button>
  );
}
