import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "#accueil" },
    { label: t("nav.domain"), href: "#domaine" },
    { label: t("nav.models"), href: "#modeles" },
    { label: t("nav.gallery"), href: "#galerie" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#accueil")} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold">
            <rect x="8" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="14" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="20" y="4" width="4" height="32" rx="1" fill="currentColor" />
            <rect x="26" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="32" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
          </svg>
          <div className="flex flex-col">
            <span className="text-foreground font-body text-sm font-semibold tracking-luxury">BENAK</span>
            <span className="text-gold text-xs font-body tracking-luxury">HILLS</span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-foreground/80 hover:text-gold text-xs font-body tracking-wide-luxury transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: Lang + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-foreground/70 hover:text-gold text-xs font-body tracking-wide transition-colors duration-300"
            title={lang === "fr" ? "Switch to English" : "Passer en français"}
          >
            <Globe className="w-4 h-4" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t("nav.cta")}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-foreground/70 hover:text-gold text-xs font-body transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-foreground">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-foreground/80 hover:text-gold text-sm font-body tracking-wide-luxury transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-2"
            >
              {t("nav.cta")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
