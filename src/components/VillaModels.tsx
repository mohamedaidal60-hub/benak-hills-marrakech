import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const VillaModels = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const models = [
    {
      id: "01",
      title: t("models.01.title"),
      description: t("models.01.desc"),
      planRDC: "https://i.postimg.cc/1RTJ9TpL/Screenshot-2026-03-17-at-5-20-37-PM.png",
      planEtage: "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
    },
    {
      id: "02",
      title: t("models.02.title"),
      description: t("models.02.desc"),
      planRDC: "https://i.postimg.cc/Nj6WRc80/Whats-App-Image-2026-03-16-at-1-00-22-PM.jpg",
      planEtage: "https://i.postimg.cc/Kz27L6NF/Whats-App-Image-2026-03-16-at-1-01-16-PM-(2).jpg",
    },
    {
      id: "03",
      title: t("models.03.title"),
      description: t("models.03.desc"),
      planRDC: "https://i.postimg.cc/FHFMS8B3/Screenshot-2026-03-17-at-5-31-54-PM.png",
      planEtage: "https://i.postimg.cc/hGgh0cH3/Whats-App-Image-2026-03-16-at-1-01-17-PM-(1).jpg",
    },
    {
      id: "04",
      title: t("models.04.title"),
      description: t("models.04.desc"),
      planRDC: "https://i.postimg.cc/CKXXW1LX/Screenshot-2026-03-17-at-5-32-30-PM.png",
      planEtage: "https://i.postimg.cc/TP7L2B4Q/Whats-App-Image-2026-03-16-at-1-01-16-PM.jpg",
    },
  ];

  const current = models[active];

  return (
    <section id="modeles" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t("models.label")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          {t("models.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t("models.desc")}
        </motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {models.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              className={`px-4 md:px-6 py-3 text-[10px] md:text-xs tracking-wide-luxury font-body border transition-all duration-300 ${
                active === i
                  ? "border-gold bg-primary text-primary-foreground"
                  : "border-border text-foreground/60 hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <span className="hidden sm:inline">{m.id} — </span>{m.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-heading mb-4">{current.title}</h3>
              <p className="text-foreground/70 font-body leading-relaxed">{current.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative overflow-hidden bg-white/5 rounded">
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur px-3 py-1.5 z-10 rounded">
                  <span className="text-gold font-body text-xs tracking-wide uppercase">{t("models.rdc")}</span>
                </div>
                <img
                  src={current.planRDC}
                  alt={`Plan RDC - ${current.title}`}
                  className="w-full h-auto min-h-[250px] md:min-h-[400px] object-contain p-2"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden bg-white/5 rounded">
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur px-3 py-1.5 z-10 rounded">
                  <span className="text-gold font-body text-xs tracking-wide uppercase">{t("models.etage")}</span>
                </div>
                <img
                  src={current.planEtage}
                  alt={`Plan Étage - ${current.title}`}
                  className="w-full h-auto min-h-[250px] md:min-h-[400px] object-contain p-2"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VillaModels;
