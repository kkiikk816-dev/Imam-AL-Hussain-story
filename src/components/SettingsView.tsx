import { ChevronRight, Settings, Info, Sun, Moon, Type } from "lucide-react";
import { motion } from "motion/react";

interface SettingsViewProps {
  onBack: () => void;
  currentTheme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

export default function SettingsView({ onBack, currentTheme, setTheme, fontSize, setFontSize }: SettingsViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed inset-0 z-50 ${currentTheme === 'light' ? 'bg-[#f8f9fa] text-slate-900' : 'bg-[#0a0a0a] text-slate-200'} overflow-y-auto transition-colors duration-500`}
    >
      <div className={`sticky top-0 p-6 border-b flex items-center gap-4 backdrop-blur-md z-20 ${currentTheme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-black/80 border-white/10'}`}>
        <button onClick={onBack} className={`p-2 rounded-full transition-colors ${currentTheme === 'light' ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'}`}>
          <ChevronRight size={24} />
        </button>
        <h1 className="text-2xl font-bold font-amiri flex items-center gap-2">
          <Settings size={24} className={currentTheme === 'light' ? 'text-slate-500' : 'text-slate-400'} /> الإعدادات
        </h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-12 pb-20">
        
        {/* قسم المظهر */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            المظهر
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setTheme('dark')}
              className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                currentTheme === 'dark' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                  : 'border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Moon size={24} />
              <span className="font-bold">داكن</span>
            </button>
            <button 
              onClick={() => setTheme('light')}
              className={`flex-1 py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                currentTheme === 'light' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-500' 
                  : 'border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Sun size={24} />
              <span className="font-bold">مضيء</span>
            </button>
          </div>
        </section>

        {/* قسم حجم الخط */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Type size={20} /> حجم نص القراءة
          </h2>
          <p className="text-sm text-slate-500 mb-4">* يتم تطبيق هذا الحجم على القصة والديوان والزيارات.</p>
          <div className={`flex gap-2 p-2 rounded-2xl border ${currentTheme === 'light' ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'}`}>
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size as any)}
                className={`flex-1 py-3 rounded-xl font-amiri transition-all ${
                  fontSize === size 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : (currentTheme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5')
                }`}
              >
                {size === 'small' ? 'أ (صغير)' : size === 'medium' ? 'أ (متوسط)' : 'أ (كبير)'}
              </button>
            ))}
          </div>
        </section>

        <hr className={currentTheme === 'light' ? 'border-slate-200' : 'border-white/10'} />

        {/* قسم عن أثر */}
        <section>
          <h2 className="text-2xl font-bold font-amiri mb-6 flex items-center gap-2">
            <Info size={24} className="text-blue-500" /> عن منصة أثَر
          </h2>
          <div className={`rounded-3xl p-6 border leading-relaxed font-amiri text-lg ${
            currentTheme === 'light' 
              ? 'bg-white border-slate-200 text-slate-700' 
              : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            <p className="mb-4">
              منصة <strong>أثَر</strong> الرقمية هي متحف رقمي وتطبيق تفاعلي يوثق الأحداث الكاملة لـ <strong>ملحمة كربلاء</strong> التاريخية وسيرة سيد الشهداء الإمام الحسين بن علي (ع) وأصحابه البررة.
            </p>
            <p>
              تم الاعتماد في جمع النصوص التاريخية على كتاب <strong>بحار الأنوار</strong> للعلامة المجلسي، وتهدف المنصة إلى تقديم هذه الملحمة بطريقة معاصرة تدمج بين جماليات التصميم والمزايا التفاعلية لتسهيل الدراسة والبحث.
            </p>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
