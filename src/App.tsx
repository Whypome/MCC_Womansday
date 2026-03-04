import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Quote, Flower2, ChevronRight, Share2, Copy, Check } from 'lucide-react';
import { RosePetals } from './components/RosePetals';

const QUOTES = [
  { text: "Эмэгтэй хүн бидний хийж чадах зүйлд хязгаар гэж үгүй.", author: "Мишель Обама" },
  { text: "Эмэгтэй хүн цайны идээ шиг - халуун усанд хийхээс нааш хэр хүчтэйг нь мэдэх боломжгүй.", author: "Элеонор Рузвельт" },
  { text: "Хийх хамгийн үр дүнтэй арга бол зүгээр л хийх юм.", author: "Амелия Эрхарт" },
  { text: "Өөр нэгэн эмэгтэй эрх чөлөөгүй байхад, түүний дөнгө минийхээс өөр байсан ч би эрх чөлөөтэй байж чадахгүй.", author: "Одри Лорд" },
  { text: "Хатан хаан шиг сэтгэ. Хатан хаан алдахаас айдаггүй. Алдаа бол агуу ирээдүйд хүрэх бас нэгэн шат юм.", author: "Опра Уинфри" }
];

const WISHES = [
  "Та бол дэлхийн хамгийн үзэсгэлэнтэй цэцэг юм.",
  "Таны инээмсэглэл ертөнцийг гэрэлтүүлдэг.",
  "Хүчирхэг, ухаалаг, үзэсгэлэнтэй танд баярын мэнд хүргэе.",
  "Эх хүн, эмэгтэй хүн та энэ хорвоогийн хамгийн агуу хайр юм.",
  "Таны амьдрал үргэлж цэцэг шиг дэлбээлж байг.",
  "Та бол энэ хорвоогийн хамгийн нандин эрдэнэ.",
  "Зөөлөн сэтгэлт, зоригт эмэгтэй танд хамгийн сайн сайхныг хүсье."
];

export default function App() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isRoseActive, setIsRoseActive] = useState(false);
  const [pops, setPops] = useState<{ id: number; x: number }[]>([]);
  const [currentWish, setCurrentWish] = useState("");
  const [copied, setCopied] = useState(false);
  const [bokeh, setBokeh] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Reduced particle count for mobile performance
    const particles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      delay: Math.random() * 5
    }));
    setBokeh(particles);
  }, []);

  const playPopSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 1.0;
    audio.play().catch(() => {
      // Ignore errors if audio can't play (e.g. user hasn't interacted yet)
    });
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    playPopSound();
  };

  const generateWish = () => {
    const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
    setCurrentWish(randomWish);
    triggerPop();
    playPopSound();
  };

  const copyWish = () => {
    if (!currentWish) return;
    navigator.clipboard.writeText(currentWish);
    setCopied(true);
    playPopSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerPop = () => {
    const id = Date.now();
    setPops(prev => [...prev, { id, x: Math.random() * 100 - 50 }]);
    setTimeout(() => {
      setPops(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const handleBloom = () => {
    setIsRoseActive(!isRoseActive);
    triggerPop();
    playPopSound();
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isRoseActive ? 'bg-[#1a0505]' : 'bg-[#0a0502]'} text-white font-sans relative overflow-hidden`}>
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: isRoseActive ? 0.9 : 0.8,
            scale: isRoseActive ? 1.1 : 1
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a1510_0%,transparent_60%)]" 
        />
        <motion.div 
          animate={{ 
            opacity: isRoseActive ? 0.5 : 0.3,
            scale: isRoseActive ? 1.2 : 1
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#ef4444_0%,transparent_50%)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,#f87171_0%,transparent_40%)] opacity-20" />
        
        {/* Bokeh Particles */}
        {bokeh.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              x: [`${p.x}vw`, `${p.x + 5}vw`, `${p.x}vw`],
              y: [`${p.y}vh`, `${p.y - 5}vh`, `${p.y}vh`],
            }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: p.delay
            }}
            className="absolute rounded-full bg-red-500/10 blur-3xl pointer-events-none will-change-transform"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Falling Petals Background */}
      <RosePetals />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center will-change-transform">
        
        {/* MCC Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-montserrat font-black text-4xl md:text-6xl text-white tracking-widest">
            МСС
          </span>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-24 mt-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <Flower2 className="w-20 h-20 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-red-300" />
              </motion.div>
            </div>
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-serif font-bold mb-6 tracking-tighter leading-none">
            3-р сарын <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">08</span>
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-[0.4em] uppercase opacity-60">
            Олон улсын эмэгтэйчүүдийн баяр
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl w-full mb-24">
          
          {/* Main Interactive Rose - Large Span */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl transition-all duration-500 hover:bg-white/[0.05] transform-gpu"
          >
            <motion.div 
              animate={isRoseActive ? { 
                scale: [1, 1.6, 1.3],
                rotate: [0, 20, -20, 0],
              } : { scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="absolute top-0 right-0 p-8 opacity-30 group-hover:opacity-100 transition-opacity z-20"
            >
              <Sparkles className={isRoseActive ? "w-10 h-10 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "w-10 h-10 text-red-300"} />
            </motion.div>
            
            <motion.div
              animate={isRoseActive ? { rotate: [0, -5, 5, 0], scale: 1.15 } : {}}
              onClick={handleBloom}
              className="cursor-pointer mb-12 relative"
            >
              <motion.div 
                animate={{ scale: isRoseActive ? 1.8 : 1.5 }}
                className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full" 
              />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Stem */}
                  <path 
                    d="M100 180C100 180 85 150 85 110C85 70 115 70 115 110C115 150 100 180 100 180Z" 
                    fill="#166534" 
                  />
                  {/* Petals */}
                  <motion.path 
                    animate={isRoseActive ? { scale: 1.2, fill: '#ef4444' } : { scale: 1, fill: '#991b1b' }}
                    d="M100 110C100 110 150 90 150 50C150 10 100 10 100 50C100 10 50 10 50 50C50 90 100 110 100 110Z" 
                  />
                  <motion.path 
                    animate={isRoseActive ? { rotate: 25, x: 10, y: -5 } : {}}
                    d="M100 110C100 110 140 100 160 70C180 40 150 20 120 50C110 60 100 110 100 110Z" 
                    fill="#b91c1c"
                    opacity="0.9"
                  />
                  <motion.path 
                    animate={isRoseActive ? { rotate: -25, x: -10, y: -5 } : {}}
                    d="M100 110C100 110 60 100 40 70C20 40 50 20 80 50C90 60 100 110 100 110Z" 
                    fill="#b91c1c"
                    opacity="0.9"
                  />
                  {/* Center Detail */}
                  <motion.circle 
                    animate={isRoseActive ? { scale: 1.5, opacity: 1 } : { scale: 0, opacity: 0 }}
                    cx="100" cy="65" r="8" fill="#fca5a5" 
                  />
                </svg>
              </motion.div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Танд зориулсан сарнай</h2>
            <p className="text-white/50 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
              Сарнайг дарж дэлбээлэхийг нь хараарай. Таны ертөнцөд авчирч буй хүч чадал, гоо үзэсгэлэн, тэсвэр тэвчээрийг үнэлж буй өчүүхэн бэлэг юм.
            </p>
            
            <div className="relative">
              <button 
                onClick={handleBloom}
                className="px-12 py-5 bg-red-600 hover:bg-red-500 rounded-full font-semibold text-lg transition-all flex items-center gap-3 group relative z-10 shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.5)] active:scale-95"
              >
                {isRoseActive ? 'Үргэлжлүүлэн дэлбээл' : 'Дэлбээлүүлэх'}
                <Heart className={`w-6 h-6 transition-transform duration-500 ${isRoseActive ? 'scale-125 fill-white' : 'group-hover:scale-110'}`} />
              </button>

              <AnimatePresence>
                {pops.map(pop => (
                  <motion.div
                    key={pop.id}
                    initial={{ opacity: 1, y: 0, x: pop.x, scale: 0.5 }}
                    animate={{ 
                      opacity: 0, 
                      y: -150, 
                      x: pop.x * 2, 
                      scale: 2, 
                      rotate: pop.x * 2 
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 pointer-events-none text-red-400"
                  >
                    <Heart className="w-8 h-8 fill-current drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quote Card - Medium Span */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl transition-all duration-500 hover:bg-white/[0.05]"
          >
            <div>
              <Quote className="w-12 h-12 text-red-500 mb-8 opacity-40" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl md:text-3xl font-serif italic leading-snug mb-8"
                >
                  "{QUOTES[currentQuote].text}"
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <span className="text-red-400 font-medium tracking-wide text-lg">— {QUOTES[currentQuote].author}</span>
              <button 
                onClick={nextQuote}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-90"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>

          {/* Wish Generator - Small Span */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="md:col-span-6 bg-red-600/10 backdrop-blur-xl border border-red-500/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-xl transition-all duration-500 hover:bg-red-600/15"
          >
            <Sparkles className="w-10 h-10 text-red-400 mb-6" />
            <h3 className="text-2xl font-serif mb-6">Танд зориулсан ерөөл</h3>
            <div className="min-h-[100px] flex items-center justify-center mb-8 relative w-full">
              <AnimatePresence mode="wait">
                {currentWish ? (
                  <motion.div
                    key={currentWish}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <p className="text-xl md:text-2xl font-medium text-red-200 leading-relaxed">
                      {currentWish}
                    </p>
                    <button 
                      onClick={copyWish}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Хууллаа' : 'Хуулах'}
                    </button>
                  </motion.div>
                ) : (
                  <p className="text-white/30 italic">Товчлуур дээр дарж ерөөлөө аваарай</p>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={generateWish}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center gap-2 group shadow-lg"
            >
              Ерөөл авах
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>

          {/* Stats Grid - Small Span */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center flex flex-col justify-center shadow-xl transition-all duration-500 hover:bg-white/[0.05]"
            >
              <p className="text-5xl font-serif font-bold text-red-500 mb-2">1911</p>
              <p className="text-xs uppercase tracking-widest opacity-40">Анхны тэмдэглэлт</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center flex flex-col justify-center shadow-xl transition-all duration-500 hover:bg-white/[0.05]"
            >
              <p className="text-5xl font-serif font-bold text-red-500 mb-2">∞</p>
              <p className="text-xs uppercase tracking-widest opacity-40">Хязгааргүй боломж</p>
            </motion.div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 mb-24 text-center opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-px w-24 bg-linear-to-r from-transparent via-red-500 to-transparent"
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif italic text-red-400 tracking-wide"
            >
              "Улаанбаатарын залуучуудаас нь"
            </motion.p>
            <div className="h-px w-24 bg-linear-to-r from-transparent via-red-500 to-transparent" />
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <motion.a 
              href="https://www.google.com/search?gs_ssp=eJzj4tDP1TfIKs-LN2D04i7Iz01NL0rMSyxJBQBXUAfV&q=pomegranate&oq=pomeg&gs_lcrp=EgZjaHJvbWUqBwgBEC4YgAQyBggAEEUYOTIHCAEQLhiABDIHCAIQLhiABDIHCAMQLhiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABDIHCAoQABiABDIHCAsQABiABDIHCAwQABiABDIHCA0QLhiABDIHCA4QABiPAtIBCDE2OTRqMGo3qAIPsAIB8QXPLgofUifz8Q&client=ms-android-oppo-terr1-rso2&sourceid=chrome-mobile&ie=UTF-8"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }} 
              className="cursor-pointer"
            >
              <Share2 className="w-6 h-6 hover:text-red-400 transition-colors" />
            </motion.a>
            <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
              <Heart className="w-6 h-6 hover:text-red-400 transition-colors" />
            </motion.div>
          </div>
          <p className="text-xs tracking-[0.5em] uppercase opacity-40 font-medium">
            Ертөнцийг өөрчилж буй эмэгтэйчүүдээ өдөр бүр алдаршуулж байна.
          </p>
        </footer>
      </main>

      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-red-500/10 blur-[180px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
    </div>
  );
}
