import { motion } from "motion/react";
import { X, ExternalLink, Sparkles, Heart, Bell, BookOpen, Calendar, Book, Clock } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

export default function AboutModal({ isOpen, onClose, theme }: AboutModalProps) {
  if (!isOpen) return null;

  const projects = [
    {
      title: "أثَر | لعلها ذكرى",
      desc: "القناة الرسمية لمنصة أثَر الرقمية على تيليجرام، تُعنى بنشر علوم وروايات أهل البيت (عليهم السلام) بحلة تصميمية تليق بمقامهم الرفيع.",
      badge: "قناة رئيسية",
      accent: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      title: "بوت أثَر | ATHAR",
      desc: "رفيقك العبادي والمعرفي اليومي على تيليجرام. يجمع لك الأدعية، والزيارات، ومواقيت الصلاة، والمناسبات الهجرية بأسلوب ميسر.",
      badge: "الإصدار 1.5.5",
      accent: "from-amber-500/10 to-yellow-500/10 text-amber-500 border-amber-500/20",
      isBot: true
    },
    {
      title: "أثَر | نسيم باسمي",
      desc: "مساحة شبه خاصة لنشر وتوثيق القصائد الحسينية والروائع الصوتية التي يتم جلبها وتنظيمها بعناية فائقة.",
      badge: "صوتيات حسينية",
      accent: "from-red-500/10 to-rose-500/10 text-red-500 border-red-500/20"
    },
    {
      title: "أثَر | Snaptube",
      desc: "الأداة الذكية لتحميل مقاطع الفيديو والملفات الصوتية من مختلف المنصات، ومن خلاله يتم نقل الكرومات والمناظر الطبيعية.",
      badge: "بوت خدمي",
      accent: "from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "أثَر | خلفيات ومناظر للتصاميم",
      desc: "مكتبة بصرية فريدة تحتوي على صور ومقاطع فيديو عالية الجودة مخصصة للتصاميم الدينية والولائية.",
      badge: "مكتبة بصرية",
      accent: "from-purple-500/10 to-fuchsia-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "أثَر | كرومات جاهزة للتصميم",
      desc: "كرومات قرآنية وأدعية بشاشة سوداء جاهزة للتصميم المباشر تيسيراً لخدمة القضية الحسينية ونشر المعارف الدينية.",
      badge: "موارد التصميم",
      accent: "from-cyan-500/10 to-sky-500/10 text-cyan-500 border-cyan-500/20"
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className={`relative w-full max-w-4xl h-[90vh] md:h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border ${
          theme === 'light' 
            ? 'bg-slate-50 border-slate-200 text-slate-800' 
            : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}
      >
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 z-10" />

        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between shrink-0 ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-500/20 shadow-md">
              <img 
                src="/logo.jpg" 
                alt="أثر" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className={`text-xl font-bold font-amiri ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                مِنصّة أثَر الرقمية
              </h3>
              <p className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                رؤية رقمية معاصرة لنشر علوم ومعارف العترة الطاهرة (ع)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              theme === 'light' 
                ? 'hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800' 
                : 'hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-right font-sans" dir="rtl">
          
          {/* Logo Hero Section */}
          <div className="flex flex-col items-center text-center py-6 border-b border-dashed border-slate-200 dark:border-slate-800">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-2 border-amber-500/30 p-1 bg-slate-950/80 mb-4 group transition-all duration-500 hover:scale-[1.03]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-red-600 to-amber-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
              <img 
                src="/logo.jpg" 
                alt="شعار أثر | ملحمة كربلاء" 
                className="relative w-full h-full rounded-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className={`text-2xl md:text-3xl font-black font-amiri tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              أثَر <span className="text-red-600">|</span> ملحمة كربلاء
            </h1>
            <p className="text-xs md:text-sm font-medium mt-1 text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              تطبيق تفاعلي يوثّق تفاصيل سيرة سيد الشهداء (ع) الخالدة ورجالات الطف البررة، مقدماً من منصة أثَر الرقمية.
            </p>
          </div>

          {/* About App Component */}
          <section className="space-y-4">
            <h4 className="text-lg font-bold font-amiri text-red-500 flex items-center gap-2">
              <span>●</span> حول التطبيق (أثَر | ملحمة كربلاء)
            </h4>
            <div className={`p-6 rounded-2xl border leading-relaxed space-y-4 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
            }`}>
              <p className="text-sm font-medium">
                تطبيق <strong>(أثَر | ملحمة كربلاء)</strong> هو تجربة قراءة تفاعلية تهدف لتجسيد وتوثيق تفاصيل واقعة الطف العظيمة ومسير سيد الشهداء الإمام الحسين (عليه السلام) مستنداً على أصح الروايات والتوثيقات التاريخية الواردة في كتاب <strong>«بحار الأنوار»</strong> للعلامة المجلسي (أعلى الله مقامه الشريف).
              </p>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                يتميز التطبيق بواجهة مريحة ومميزات حديثة تضمن للقارئ الغوص في أعماق السيرة المباركة، مع توفير سجلّ تفصيلي كامل بأسماء وتراجم الشهداء الأطهار من أهل بيت الحسين (ع) وأصحابه الأنصار الذين بذلوا مهجهم فداءً لريحانة رسول الله (ص).
              </p>
            </div>
          </section>

          {/* About Platform */}
          <section className="space-y-4">
            <h4 className="text-lg font-bold font-amiri text-amber-500 flex items-center gap-2">
              <span>●</span> منصة أثَر الرقمية وعطاؤها
            </h4>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              «أثَر» هي مظلة إعلامية رقمية واعدة تهدف إلى بث روايات أهل البيت (ع) والفضائل الولائية وتوفير بيئة متكاملة لخدمة المحبين والمصممين الحسينيين. تشتمل باقة مشاريع أثَر على مجموعة غنية من القنوات والبوتات التفاعلية على منصة تيليجرام:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all hover:scale-[1.01] ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 hover:shadow-md' 
                      : 'bg-slate-950/20 border-slate-800/80 hover:bg-slate-950/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-sm text-red-500 dark:text-red-400">{proj.title}</h5>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r ${proj.accent}`}>
                        {proj.badge}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                      {proj.desc}
                    </p>
                  </div>
                  
                  {proj.isBot && (
                    <div className={`mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 space-y-2`}>
                      <span className="font-bold text-amber-500 block mb-1">⭐️ ميزات بوت أثَر التفاعلي:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-amber-500" />
                          <span>مواقيت الجعفري لـ 30+ مدينة</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bell size={12} className="text-amber-500" />
                          <span>تنبيهات المناسبات والأذكار</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={12} className="text-amber-500" />
                          <span>أدعية ومناجيات وكتب PDF</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Heart size={12} className="text-amber-500" />
                          <span>نظام المفضلة وحفظ المحتوى</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Slogan Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
            <p className="text-xs italic font-amiri text-amber-500">
              "بَذَلُوا مُهَجَهُمْ دُونَ الحُسَيْنِ عَلَيْهِ السَّلام"
            </p>
            <p className="text-[11px] font-bold opacity-40">
              جميع الحقوق محفوظة لمنصة أثَر الرقمية © ٢٠٢٦
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
