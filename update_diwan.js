import fs from 'fs';

const fileData = `import React from 'react';
import { motion } from 'motion/react';
import { Feather, X } from 'lucide-react';

export default function DiwanModal({ theme, onClose }) {
  const [expandedItems, setExpandedItems] = React.useState({});
  
  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({...prev, [idx]: !prev[idx]}));
  };

  const poems = [
    { 
      title: "أرجوزة الإمام الحسين (ع) في الميدان", 
      verse: "أنا ابْنُ عَلِيٍّ الطُّهْرِ مِنْ آلِ هَاشِمٍ * كَفَانِي بِهَذَا مَفْخَراً حِينَ أَفْخَرُ\\nوَجَدِّي رَسُولُ اللهِ أَكْرَمُ مَنْ مَضَى * وَنَحْنُ سِرَاجُ اللهِ فِي الْخَلْقِ نَزْهَرُ\\nوَفَاطِمُ أُمِّي مِنْ سُلَالَةِ أَحْمَدَ * وَعَمِّي يُدْعَى ذَا الْجَنَاحَيْنِ جَعْفَرُ\\nوَفِينَا كِتَابُ اللهِ أُنْزِلَ صَادِقاً * وَفِينَا الْهُدَى وَالْوَحْيُ بِالْخَيْرِ يُذْكَرُ\\nوَنَحْنُ أَمَانُ اللَّهِ لِلنَّاسِ كُلِّهِمْ * * * نُسَرُّ بِهَذَا فِي الْأَنَامِ وَ نَجْهَرُ\\nوَنَحْنُ وُلَاةُ الْحَوْضِ نَسْقِي وُلَاتَنَا * * * بِكَأْسِ رَسُولِ اللَّهِ مَا لَيْسَ يُنْكَرُ\\nوَشِيعَتُنَا فِي النَّاسِ أَكْرَمُ شِيعَةٍ * * * وَمُبْغِضُنَا يَوْمَ الْقِيَامَةِ يَخْسَرُ",
      type: "poetry"
    },
    { 
      title: "أرجوزة الإمام الحسين (ع) حين واجه جيش الحر", 
      verse: "سَأَمْضِي وَمَا بِالْمَوْتِ عَارٌ عَلَى الْفَتَى * إِذَا مَا نَوَى حَقّاً وَجَاهَدَ مُسْلِماً\\nوَآسَى الرِّجَالَ الصَّالِحِينَ بِنَفْسِهِ * وَفَارَقَ مَثْبُوراً وَوَدَّعَ مُجْرِماً\\nفَإِنْ عِشْتُ لَمْ أَنْدَمْ وَإِنْ مِتُّ لَمْ أُلَمْ * * * كَفَى بِكَ ذُلًّا أَنْ تَعِيشَ وَ تُرْغَمَا",
      type: "poetry"
    },
    { 
      title: "شعار الإمام الحسين (ع) في يوم عاشوراء", 
      verse: "الْمَوْتُ أَوْلَى مِنْ رُكُوبِ الْعَارِ * وَالْعَارُ أَوْلَى مِنْ دُخُولِ النَّارِ\\nوَاللَّهِ مَا هَذَا وَ هَذَا جَارِي",
      type: "poetry"
    },
    {
      title: "أرجوزة مسلم بن عقيل (ع) في الكوفة",
      verse: "هُوَ الْمَوْتُ فَاصْنَعْ وَيْكَ مَا أَنْتَ صَانِعُ * فَأَنْتَ لِكَأْسِ الْمَوْتِ لَا شَكَّ جَارِعُ\\nفَصَبْراً لِأَمْرِ اللهِ جَلَّ جَلَالُهُ * فَحُكْمُ قَضَاءِ اللهِ فِي الْخَلْقِ ذَائِعُ",
      type: "poetry"
    },
    {
      title: "أرجوزة العباس بن علي (ع)",
      verse: "لَا أَرْهَبُ الْمَوْتَ إِذَا الْمَوْتُ رَقَا * * * حَتَّى أُوَارَى فِي الْمَصَالِيتِ لُقَى\\nنَفْسِي لِنَفْسِ الْمُصْطَفَى الطُّهْرِ وَقَا * * * إِنِّي أَنَا الْعَبَّاسُ أَغْدُو بِالسِّقَا\\nوَ لَا أَخَافُ الشَّرَّ يَوْمَ الْمُلْتَقَى\\nوَاللَّهِ إِنْ قَطَعْتُمُ يَمِينِي * * * إِنِّي أُحَامِي أَبَداً عَنْ دِينِي\\nوَعَنْ إِمَامٍ صَادِقِ الْيَقِينِ * * * نَجْلِ النَّبِيِّ الطَّاهِرِ الْأَمِينِ\\nيَا نَفْسُ لَا تَخْشَيْ مِنَ الْكُفَّارِ * * * وَ أَبْشِرِي بِرَحْمَةِ الْجَبَّارِ\\nمَعَ النَّبِيِّ السَّيِّدِ الْمُخْتَارِ * * * قَدْ قَطَعُوا بِبَغْيِهِمْ يَسَارِي\\nفَأَصْلِهِمْ يَا رَبِّ حَرَّ النَّارِ",
      type: "poetry"
    },
    {
      title: "أرجوزة القاسم بن الحسن (ع)",
      verse: "إِنْ تُنْكِرُونِي فَأَنَا ابْنُ الْحَسَنِ * * * سِبْطِ النَّبِيِّ الْمُصْطَفَى وَالْمُؤْتَمَنِ\\nهَذَا حُسَيْنٌ كَالْأَسِيرِ الْمُرْتَهَنِ * * * بَيْنَ أُنَاسٍ لَا سُقُوا صَوْبَ الْمُزْنِ",
      type: "poetry"
    },
    {
      title: "أرجوزة علي بن الحسين الأكبر (ع)",
      verse: "أَنَا عَلِيُّ بْنُ الْحُسَيْنِ بْنِ عَلِيٍّ * * * نَحْنُ وَ بَيْتِ اللَّهِ أَوْلَى بِالنَّبِيِّ\\nأَطْعَنُكُمْ بِالرُّمْحِ حَتَّى يَنْثَنِي * * * أَضْرِبُكُمْ بِالسَّيْفِ أَحْمِي عَنْ أَبِي\\nضَرْبَ غُلَامٍ هَاشِمِيٍّ عَلَوِيٍّ * * * وَ اللَّهِ لَا يَحْكُمُ فِينَا ابْنُ الدَّعِيِّ",
      type: "poetry"
    },
    {
      title: "رثاء وهب بن عبد الله الكلبي",
      verse: "إِنِّي زَعِيمٌ لَكِ أُمَّ وَهْبٍ * * * بِالطَّعْنِ فِيهِمْ تَارَةً وَالضَّرْبِ\\nضَرْبَ غُلَامٍ مُؤْمِنٍ بِالرَّبِّ * * * حَتَّى يُذِيقَ الْقَوْمَ مُرَّ الْحَرْبِ\\nإِنِّي امْرُؤٌ ذُو مِرَّةٍ وَعَصْبٍ * * * وَلَسْتُ بِالْخَوَّارِ عِنْدَ النَّكْبِ\\nحَسْبِي إِلَهِي مِنْ عَلِيمٍ حَسْبِي",
      type: "poetry"
    },
    {
      title: "أرجوزة برير بن خضير",
      verse: "أَنَا بُرَيْرٌ وَأَبِي خُضَيْرُ * * * لَيْثٌ يَرُوعُ الْأَسَدَ عِنْدَ الزُّئْرِ\\nيُعْرَفُ فِينَا الْخَيْرُ أَهْلَ الْخَيْرِ * * * أَضْرِبُكُمْ وَلَا أَرَى مِنْ ضَيْرِ\\nكَذَاكَ فِعْلُ الْخَيْرِ مِنْ بُرَيْرِ",
      type: "poetry"
    },
    { 
      title: "وداع الإمام الحسين (ع) لعياله", 
      verse: "يَا سُكَيْنَةُ يَا فَاطِمَةُ يَا زَيْنَبُ يَا أُمَّ كُلْثُومٍ، عَلَيْكُنَّ مِنِّي السَّلَامُ. فَنَادَتْهُ سُكَيْنَةُ: يَا أَبَتِ اسْتَسْلَمْتَ لِلْمَوْتِ؟ فَقَالَ: كَيْفَ لَا يَسْتَسْلِمُ مَنْ لَا نَاصِرَ لَهُ وَلَا مُعِينَ. فَقَالَتْ: يَا أَبَتِ رُدَّنَا إِلَى حَرَمِ جَدِّنَا. فَقَالَ: هَيْهَاتَ، لَوْ تُرِكَ الْقَطَا لَنَامَ.",
      type: "quote"
    },
    { 
      title: "ندبة الحوراء زينب (ع) عند الجسد الطاهر", 
      verse: "وَا مُحَمَّدَاهُ، صَلَّى عَلَيْكَ مَلِيكُ السَّمَاءِ، هَذَا حُسَيْنٌ بِالْعَرَاءِ، مُرَمَّلٌ بِالدِّمَاءِ، مُقَطَّعُ الْأَعْضَاءِ، وَبَنَاتُكَ سَبَايَا إِلَى اللَّهِ الْمُشْتَكَى وَإِلَى مُحَمَّدٍ الْمُصْطَفَى وَإِلَى عَلِيٍّ الْمُرْتَضَى وَإِلَى حَمْزَةَ سَيِّدِ الشُّهَدَاءِ وَا مُحَمَّدَاهُ هَذَا حُسَيْنٌ بِالْعَرَاءِ يَسْفِي عَلَيْهِ الصَّبَا قَتِيلُ أَوْلَادِ الْبَغَايَا يَا حُزْنَاهْ يَا كَرْبَاهْ الْيَوْمَ مَاتَ جَدِّي رَسُولُ اللَّهِ يَا أَصْحَابَ مُحَمَّدَاهْ هَؤُلَاءِ ذُرِّيَّةُ الْمُصْطَفَى يُسَاقُونَ سَوْقَ السَّبَايَا.",
      type: "quote"
    },
    { 
      title: "مناجاة الإمام الحسين (ع) الأخيرة", 
      verse: "إِلَهِي صَبْراً عَلَى قَضَائِكَ، وَلَا مَعْبُودَ سِوَاكَ يَا غِيَاثَ الْمُسْتَغِيثِينَ... اللَّهُمَّ إِنَّكَ تَعْلَمُ أَنَّهُمْ يَقْتُلُونَ رَجُلاً لَيْسَ عَلَى وَجْهِ الْأَرْضِ ابْنُ نَبِيٍّ غَيْرُهُ.",
      type: "quote"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 p-0 sm:p-0"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={\`w-full h-full sm:w-full sm:h-full overflow-hidden flex flex-col \${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
        }\`}
      >
        <div className={\`p-6 flex items-center justify-between border-b shrink-0 \${
          theme === 'light' ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-950/50'
        }\`}>
          <div className="flex items-center gap-3">
            <div className={\`p-2 rounded-xl \${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}\`}>
              <Feather size={24} />
            </div>
            <div>
              <h2 className={\`text-xl font-bold font-amiri \${theme === 'light' ? 'text-slate-900' : 'text-white'}\`}>
                قبسات من الملحمة
              </h2>
              <p className={\`text-sm font-amiri \${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}\`}>
                كلمات وأشعار وأراجيز خالدة من قلب المعركة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={\`p-2 rounded-full transition-colors \${
              theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-slate-800 text-slate-400'
            }\`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {poems.map((poem, idx) => {
              const isExpanded = expandedItems[idx];
              const shouldTruncate = poem.verse.length > 150;
              const displayText = (shouldTruncate && !isExpanded) ? poem.verse.substring(0, 150) + '...' : poem.verse;
              
              return (
                <div key={idx} className={\`p-5 rounded-xl border transition-all \${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/50 border-slate-700/50'
                }\`}>
                  <h3 className={\`text-lg font-bold mb-4 text-center \${theme === 'light' ? 'text-indigo-700' : 'text-indigo-400'}\`}>
                    {poem.title}
                  </h3>
                  <p className={\`text-xl text-center leading-loose font-amiri \${
                    poem.type === 'poetry' ? 'whitespace-pre-line text-amber-600 dark:text-amber-400' : (theme === 'light' ? 'text-slate-700' : 'text-slate-300')
                  }\`}>
                    {displayText}
                  </p>
                  {shouldTruncate && (
                    <div className="mt-4 flex justify-center">
                      <button 
                        onClick={() => toggleExpand(idx)}
                        className={\`text-sm px-4 py-1.5 rounded-full transition-colors font-bold \${
                          theme === 'light' ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50'
                        }\`}
                      >
                        {isExpanded ? 'طي النص' : 'إظهار النص كاملاً'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
`;

fs.writeFileSync('src/components/DiwanModal.tsx', fileData);
