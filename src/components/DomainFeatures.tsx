import { motion } from "framer-motion";
import { TreePine, Dumbbell, Bike, Baby } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DomainFeatures = () => {
  const { t } = useLanguage();

  const features = [
    { icon: TreePine, title: t("features.gardens.title"), desc: t("features.gardens.desc") },
    { icon: Dumbbell, title: t("features.padel.title"), desc: t("features.padel.desc") },
    { icon: Bike, title: t("features.mobility.title"), desc: t("features.mobility.desc") },
    { icon: Baby, title: t("features.family.title"), desc: t("features.family.desc") },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t("features.label")}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t("features.desc")}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-dark-surface border border-border p-8 text-center group hover:border-gold/40 transition-colors duration-500"
            >
              <f.icon className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-heading text-lg mb-2">{f.title}</h4>
              <p className="text-foreground/60 font-body text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainFeatures;
