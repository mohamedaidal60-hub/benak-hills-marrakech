import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/db";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    configuration: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await db.insertLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        budget: form.budget,
        configuration: form.configuration,
        message: form.message,
        status: "nouveau",
      });

      setLoading(false);
      setSubmitted(true);
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successDesc"),
      });
    } catch (error) {
      setLoading(false);
      toast({ 
        title: t("contact.errorTitle"), 
        description: t("contact.errorDesc"), 
        variant: "destructive" 
      });
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-4 bg-dark-surface">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-heading mb-4">{t("contact.thankTitle")}</h2>
          <p className="text-foreground/70 font-body">{t("contact.thankDesc")}</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", phone: "", budget: "", configuration: "", message: "" });
            }}
            className="mt-8 border border-gold text-gold px-6 py-3 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t("contact.another")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t("contact.label")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-2xl mx-auto mb-16"
        >
          {t("contact.desc")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">{t("contact.phone")}</p>
                <a href="tel:+212786360767" className="text-foreground font-body hover:text-gold transition-colors">
                  +212 786 360 767
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">{t("contact.email")}</p>
                <a href="mailto:contact@benakhills.com" className="text-foreground font-body hover:text-gold transition-colors">
                  contact@benakhills.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">{t("contact.address")}</p>
                <p className="text-foreground font-body">{t("contact.addressValue")}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.name")}</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required maxLength={100}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder={t("contact.namePlaceholder")} />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.emailLabel")}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required maxLength={255}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder="votre@email.com" />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.phoneLabel")}</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength={20}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder={t("contact.phonePlaceholder")} />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.budget")}</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors">
                  <option value="" className="bg-card">{t("contact.budgetSelect")}</option>
                  <option value="4-5M" className="bg-card">4 - 5 Millions MAD</option>
                  <option value="5-6M" className="bg-card">5 - 6 Millions MAD</option>
                  <option value="6-8M" className="bg-card">6 - 8 Millions MAD</option>
                  <option value="8M+" className="bg-card">8 Millions MAD +</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.config")}</label>
              <select name="configuration" value={form.configuration} onChange={handleChange}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors">
                <option value="" className="bg-card">{t("contact.configSelect")}</option>
                <option value="5-chambres" className="bg-card">{t("config.5ch")}</option>
                <option value="4-chambres-master" className="bg-card">{t("config.4chMaster")}</option>
                <option value="3-chambres-master" className="bg-card">{t("config.3chMaster")}</option>
                <option value="4-chambres-etage" className="bg-card">{t("config.4chEtage")}</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t("contact.message")}</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} maxLength={1000}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors resize-none"
                placeholder={t("contact.messagePlaceholder")} />
            </div>

            <button type="submit" disabled={loading}
              className="border border-gold text-gold px-8 py-4 text-xs tracking-luxury font-body flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50">
              {loading ? t("contact.sending") : t("contact.submit")}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
