import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/db";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Maximize, BedDouble, ChevronRight } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  surface: string | null;
  rooms: string | null;
  type: string;
  features: string | null;
  images: string[] | null;
  active: boolean;
};

const FeaturedOffers = () => {
  const { t, lang } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await db.getOffers();
        // Only show active offers
        setOffers((data as Offer[]).filter(o => o.active));
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading || offers.length === 0) return null;

  return (
    <section id="offres" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">
            {lang === "fr" ? "Opportunités Uniques" : "Unique Opportunities"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-16"
        >
          {lang === "fr" ? "Nos Offres Disponibles" : "Available Offers"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-dark-surface border border-border overflow-hidden hover:border-gold/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.images && offer.images[0] ? offer.images[0] : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 border border-gold/20">
                  <span className="text-gold font-heading text-sm">{offer.price} MAD</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-heading group-hover:text-gold transition-colors">{offer.title}</h3>
                  <span className="text-[10px] tracking-widest uppercase text-foreground/40 font-body border border-border px-2 py-1">
                    {offer.type}
                  </span>
                </div>

                <p className="text-foreground/60 font-body text-sm line-clamp-2 leading-relaxed">
                  {offer.description}
                </p>

                <div className="flex items-center gap-6 pt-2 border-t border-border/50">
                  {offer.surface && (
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-gold/60" />
                      <span className="text-xs font-body text-foreground/60">{offer.surface} m²</span>
                    </div>
                  )}
                  {offer.rooms && (
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-gold/60" />
                      <span className="text-xs font-body text-foreground/60">{offer.rooms} Ch.</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gold/60" />
                    <span className="text-xs font-body text-foreground/60">Marrakech</span>
                  </div>
                </div>

                <a 
                  href="#contact" 
                  className="flex items-center justify-between w-full pt-4 text-xs tracking-luxury font-body text-gold group/link"
                >
                  {lang === "fr" ? "PLUS D'INFORMATIONS" : "NEED MORE DETAILS"}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
