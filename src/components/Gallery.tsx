import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Gallery = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  const galleryItems = [
    {
      src: "https://i.postimg.cc/XY36tNqj/IMG-20251016-WA0050.jpg",
      alt: "Design intérieur villa Benak Hills Marrakech",
      title: t("gallery.item1.title"),
      desc: t("gallery.item1.desc"),
    },
    {
      src: "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
      alt: "Piscine privée villa Marrakech",
      title: t("gallery.item2.title"),
      desc: t("gallery.item2.desc"),
    },
    {
      src: "https://i.postimg.cc/1RTJ9TpL/Screenshot-2026-03-17-at-5-20-37-PM.png",
      alt: "Plan villa 5 chambres Benak Hills",
      title: t("gallery.item3.title"),
      desc: t("gallery.item3.desc"),
    },
    {
      src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=800&q=80",
      alt: "Salle de bain marbre villa luxe",
      title: t("gallery.item4.title"),
      desc: t("gallery.item4.desc"),
    },
    {
      src: "https://i.postimg.cc/L6pW8CS4/IMG-20251016-WA0060.jpg",
      alt: "Vue domaine Benak Hills golf Marrakech",
      title: t("gallery.item5.title"),
      desc: t("gallery.item5.desc"),
    },
    {
      src: "https://i.postimg.cc/mrvw6k2s/IMG-20251016-WA0062.jpg",
      alt: "Façade contemporaine villa Marrakech",
      title: t("gallery.item6.title"),
      desc: t("gallery.item6.desc"),
    },
    {
      src: "https://i.postimg.cc/gjN3d2p1/IMG-20251016-WA0063.jpg",
      alt: "Entrée villa moderne Marrakech",
      title: t("gallery.item7.title"),
      desc: t("gallery.item7.desc"),
    },
    {
      src: "https://i.postimg.cc/9fkm33sb/IMG-20251017-WA0074.jpg",
      alt: "Vue d'ensemble villa Benak Hills",
      title: t("gallery.item8.title"),
      desc: t("gallery.item8.desc"),
    },
    {
      src: "https://i.postimg.cc/jdhRxnGZ/IMG-20251020-WA0041.jpg",
      alt: "Intérieur haut de gamme villa",
      title: t("gallery.item9.title"),
      desc: t("gallery.item9.desc"),
    },
    {
      src: "https://i.postimg.cc/KjDh8Cs4/IMG-20251020-WA0042.jpg",
      alt: "Espace détente villa design",
      title: t("gallery.item10.title"),
      desc: t("gallery.item10.desc"),
    },
    {
      src: "https://i.postimg.cc/g2JbGSyc/IMG-20251021-WA0020.jpg",
      alt: "Terrasse extérieure villa luxe",
      title: t("gallery.item11.title"),
      desc: t("gallery.item11.desc"),
    },
    {
      src: "https://i.postimg.cc/6q0FXnyR/IMG-20251021-WA0022.jpg",
      alt: "Architecture moderne villa Marrakech",
      title: t("gallery.item12.title"),
      desc: t("gallery.item12.desc"),
    },
  ];

  const navigate = (dir: number) => {
    if (selected === null) return;
    setSelected((selected + dir + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="galerie" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t("gallery.label")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          {t("gallery.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t("gallery.desc")}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <h4 className="font-heading text-lg text-foreground">{item.title}</h4>
                <p className="text-foreground/70 text-sm font-body mt-1">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-foreground hover:text-gold transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-foreground hover:text-gold transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center max-w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selected].src}
                alt={galleryItems[selected].alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              <div className="mt-4 text-center">
                <h4 className="font-heading text-xl text-foreground">{galleryItems[selected].title}</h4>
                <p className="text-foreground/70 text-sm font-body mt-1">{galleryItems[selected].desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
