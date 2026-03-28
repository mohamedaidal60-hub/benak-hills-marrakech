import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.home": { fr: "ACCUEIL", en: "HOME" },
  "nav.domain": { fr: "LE DOMAINE", en: "THE ESTATE" },
  "nav.models": { fr: "LES MODÈLES", en: "VILLA MODELS" },
  "nav.gallery": { fr: "GALERIE", en: "GALLERY" },
  "nav.contact": { fr: "CONTACT", en: "CONTACT" },
  "nav.cta": { fr: "NOUS CONTACTER", en: "GET IN TOUCH" },

  // Hero
  "hero.subtitle": { fr: "Votre villa en toute sérénité", en: "Your villa in complete serenity" },
  "hero.desc": {
    fr: "Découvrez des villas élégantes et modulables pensées pour votre confort et votre style de vie au cœur de Marrakech. Votre villa. Votre choix. Votre tranquillité.",
    en: "Discover elegant, modular villas designed for your comfort and lifestyle in the heart of Marrakech. Your villa. Your choice. Your peace of mind.",
  },
  "hero.cta": { fr: "DÉCOUVRIR LE PROJET", en: "DISCOVER THE PROJECT" },

  // Concept
  "concept.label": { fr: "Le Concept", en: "The Concept" },
  "concept.title": { fr: "La Villa Signature 2", en: "The Signature Villa 2" },
  "concept.p1": {
    fr: "Superbe maison de <gold>240 m²</gold>, avec piscine privée, édifiée sur une parcelle de <gold>300 m²</gold> et plus, offrant un cadre de vie unique et prestigieux.",
    en: "A stunning <gold>240 m²</gold> home with a private pool, built on a plot of <gold>300 m²</gold> and more, offering a unique and prestigious living environment.",
  },
  "concept.p2": {
    fr: "Avec des terrains titrés et entièrement viabilisés, votre acquisition est totalement sécurisée. Modulable selon vos envies avec 4 plans architecturaux distincts.",
    en: "With titled and fully serviced land, your investment is completely secure. Customizable to your wishes with 4 distinct architectural plans.",
  },
  "concept.p3": {
    fr: "Investir dans l'immobilier de luxe à Marrakech n'a jamais été aussi serein. Benak Hills redéfinit le haut de gamme marocain en alliant architecture contemporaine et finitions nobles.",
    en: "Investing in luxury real estate in Marrakech has never been so seamless. Benak Hills redefines Moroccan high-end living by combining contemporary architecture with noble finishes.",
  },
  "concept.priceLabel": { fr: "Offre de lancement", en: "Launch offer" },
  "concept.priceFrom": { fr: "À partir de ", en: "Starting from " },

  // Domain
  "domain.label": { fr: "Environnement Premium", en: "Premium Environment" },
  "domain.title": { fr: "Domaine & Localisation", en: "Estate & Location" },
  "domain.subtitle": { fr: "Une adresse rare et privilégiée", en: "A rare and privileged address" },
  "domain.desc": {
    fr: "Située dans l'un des quartiers les plus prestigieux de Marrakech, à seulement 10 minutes de la mythique place Jamaa el Fna et du centre-ville, notre résidence vous place au cœur du triangle d'or de l'élégance marocaine.",
    en: "Located in one of the most prestigious neighborhoods of Marrakech, just 10 minutes from the legendary Jemaa el-Fna square and downtown, our residence places you at the heart of the golden triangle of Moroccan elegance.",
  },
  "domain.loc1": {
    fr: "Attenant au majestueux Golf Royal et au Domaine Al Maaden.",
    en: "Adjacent to the majestic Royal Golf and Al Maaden Estate.",
  },
  "domain.loc2": {
    fr: "À quelques pas seulement du Golf Amelkis et du luxueux Mandarin Oriental.",
    en: "Just steps away from Amelkis Golf and the luxurious Mandarin Oriental.",
  },
  "domain.mapBtn": { fr: "Voir sur Google Maps", en: "View on Google Maps" },

  // Domain Features
  "features.label": { fr: "Domaine Benakil", en: "Benakil Estate" },
  "features.desc": {
    fr: "Une propriété de luxe conçue comme un véritable havre de paix. Un domaine entièrement sécurisé doté d'infrastructures haut de gamme pour garantir un quotidien exceptionnel.",
    en: "A luxury property designed as a true haven of peace. A fully secured estate equipped with high-end infrastructure to ensure an exceptional daily life.",
  },
  "features.gardens.title": { fr: "Jardins Luxuriants", en: "Lush Gardens" },
  "features.gardens.desc": { fr: "Un aménagement paysager tropical et soigné.", en: "A carefully curated tropical landscape." },
  "features.padel.title": { fr: "Padel & Sport", en: "Padel & Sport" },
  "features.padel.desc": { fr: "Des courts de Padel et équipements premium exclusifs.", en: "Exclusive Padel courts and premium equipment." },
  "features.mobility.title": { fr: "Mobilité Douce", en: "Soft Mobility" },
  "features.mobility.desc": { fr: "Des pistes cyclables sécurisées au sein du domaine.", en: "Secured cycling paths within the estate." },
  "features.family.title": { fr: "Vie de Famille", en: "Family Life" },
  "features.family.desc": { fr: "Aires de jeux pour enfants et commerces de proximité.", en: "Playgrounds and nearby shops." },

  // Villa Models
  "models.label": { fr: "Plans & Architecture", en: "Plans & Architecture" },
  "models.title": { fr: "Villas Modulables sur-mesure", en: "Custom Modular Villas" },
  "models.desc": {
    fr: "Votre villa s'adapte à votre style de vie. Découvrez nos 4 configurations intelligentes, pensées par nos architectes pour maximiser l'espace, la lumière et le confort.",
    en: "Your villa adapts to your lifestyle. Discover our 4 smart configurations, designed by our architects to maximize space, light and comfort.",
  },
  "models.rdc": { fr: "Rez-de-chaussée", en: "Ground floor" },
  "models.etage": { fr: "Étage", en: "Upper floor" },
  "models.01.title": { fr: "Configuration 5 Chambres", en: "5 Bedroom Configuration" },
  "models.01.desc": {
    fr: "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité. Un agencement harmonieux pensé pour allier praticité, convivialité et bien-être au quotidien.",
    en: "This first configuration offers 5 spacious bedrooms, including a ground-floor suite, ideal for hosting or enjoying single-level living. Upstairs, 4 bright bedrooms complete the sleeping area, offering comfort and privacy. A harmonious layout designed to combine practicality, conviviality and daily well-being.",
  },
  "models.02.title": { fr: "4 Chambres avec Master-room", en: "4 Bedrooms with Master Suite" },
  "models.02.desc": {
    fr: "Cette seconde configuration permet toujours de bénéficier d'une suite au rez-de-chaussée, tout en offrant à l'étage trois chambres dont une superbe master room. Les volumes généreux, la luminosité et le niveau de confort créent un espace nuit à la fois élégant, moderne et particulièrement accueillant.",
    en: "This second configuration still offers a ground-floor suite, while providing three bedrooms upstairs including a superb master room. Generous volumes, natural light and comfort create a sleeping space that is both elegant, modern and particularly welcoming.",
  },
  "models.03.title": { fr: "3 Chambres avec Master-room", en: "3 Bedrooms with Master Suite" },
  "models.03.desc": {
    fr: "Cette troisième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout en conservant à l'étage 3 chambres, dont une superbe master room. Les volumes généreux, la luminosité et le confort offrent un espace nuit à la fois élégant, moderne et accueillant.",
    en: "This third configuration offers a particularly spacious living area, while maintaining 3 bedrooms upstairs, including a superb master room. Generous volumes, light and comfort create an elegant, modern and welcoming sleeping space.",
  },
  "models.04.title": { fr: "4 Chambres Étage", en: "4 Upstairs Bedrooms" },
  "models.04.desc": {
    fr: "Cette quatrième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout comme l'option 3. À la différence près qu'à l'étage, entièrement dédié à l'espace nuit, vous trouverez 4 chambres, parfaitement pensées pour répondre à vos besoins.",
    en: "This fourth configuration offers a particularly spacious living area, just like option 3. The difference is that the entire upper floor, dedicated to the sleeping area, features 4 bedrooms perfectly designed to meet your needs.",
  },

  // Gallery
  "gallery.label": { fr: "Inspiration Visuelle", en: "Visual Inspiration" },
  "gallery.title": { fr: "Notre Galerie d'Exception", en: "Our Exceptional Gallery" },
  "gallery.desc": {
    fr: "Découvrez en images le niveau de finition, le choix des matériaux nobles et la qualité de vie qu'offre le domaine Benak Hills à Marrakech.",
    en: "Discover through images the level of finish, the choice of noble materials and the quality of life offered by the Benak Hills estate in Marrakech.",
  },
  "gallery.item1.title": { fr: "Grand Salon", en: "Grand Living Room" },
  "gallery.item1.desc": { fr: "Un espace de vie baigné de lumière naturelle.", en: "A living space bathed in natural light." },
  "gallery.item2.title": { fr: "Piscine & Jardins", en: "Pool & Gardens" },
  "gallery.item2.desc": { fr: "Votre oasis privée au cœur du domaine.", en: "Your private oasis in the heart of the estate." },
  "gallery.item3.title": { fr: "Plan 5 Chambres", en: "5 Bedroom Plan" },
  "gallery.item3.desc": { fr: "Configuration spacieuse avec suite parentale.", en: "Spacious layout with master suite." },
  "gallery.item4.title": { fr: "Salle de Bain", en: "Bathroom" },
  "gallery.item4.desc": { fr: "Marbre, bois massif et robinetterie premium.", en: "Marble, solid wood and premium fixtures." },
  "gallery.item5.title": { fr: "Vue du Domaine", en: "Estate View" },
  "gallery.item5.desc": { fr: "Sécurité 24h/24 dans un cadre verdoyant.", en: "24/7 security in a green setting." },
  "gallery.item6.title": { fr: "Architecture Contemporaine", en: "Contemporary Architecture" },
  "gallery.item6.desc": { fr: "Des lignes épurées et intemporelles.", en: "Clean and timeless lines." },
  "gallery.item7.title": { fr: "Entrée de Villa", en: "Villa Entrance" },
  "gallery.item7.desc": { fr: "Un accueil majestueux et élégant.", en: "A majestic and elegant welcome." },
  "gallery.item8.title": { fr: "Vue d'Ensemble", en: "Overview" },
  "gallery.item8.desc": { fr: "Harmonie architecturale et paysagère.", en: "Architectural and landscape harmony." },
  "gallery.item9.title": { fr: "Finitions Premium", en: "Premium Finishes" },
  "gallery.item9.desc": { fr: "Chaque détail soigné avec exigence.", en: "Every detail crafted with excellence." },
  "gallery.item10.title": { fr: "Espace Détente", en: "Relaxation Space" },
  "gallery.item10.desc": { fr: "Confort et design au quotidien.", en: "Daily comfort and design." },
  "gallery.item11.title": { fr: "Terrasse Privée", en: "Private Terrace" },
  "gallery.item11.desc": { fr: "Profitez du climat marocain toute l'année.", en: "Enjoy the Moroccan climate all year round." },
  "gallery.item12.title": { fr: "Lignes Modernes", en: "Modern Lines" },
  "gallery.item12.desc": { fr: "Une architecture pensée pour durer.", en: "Architecture designed to last." },

  // Contact
  "contact.label": { fr: "Contactez-nous", en: "Contact Us" },
  "contact.title": { fr: "Demande de Renseignements", en: "Information Request" },
  "contact.desc": {
    fr: "Vous souhaitez en savoir plus sur nos prestations haut de gamme ? Remplissez le formulaire ci-dessous et notre équipe vous recontactera pour répondre à toutes vos questions.",
    en: "Want to learn more about our premium services? Fill in the form below and our team will get back to you to answer all your questions.",
  },
  "contact.phone": { fr: "Téléphone", en: "Phone" },
  "contact.email": { fr: "Email", en: "Email" },
  "contact.address": { fr: "Adresse", en: "Address" },
  "contact.addressValue": { fr: "Marrakech, Maroc", en: "Marrakech, Morocco" },
  "contact.name": { fr: "Nom complet *", en: "Full name *" },
  "contact.namePlaceholder": { fr: "Votre nom", en: "Your name" },
  "contact.emailLabel": { fr: "Email *", en: "Email *" },
  "contact.phoneLabel": { fr: "Téléphone *", en: "Phone *" },
  "contact.phonePlaceholder": { fr: "+212 6XX XXX XXX", en: "+212 6XX XXX XXX" },
  "contact.budget": { fr: "Budget estimé", en: "Estimated budget" },
  "contact.budgetSelect": { fr: "Sélectionner", en: "Select" },
  "contact.config": { fr: "Configuration souhaitée", en: "Desired configuration" },
  "contact.configSelect": { fr: "Sélectionner une configuration", en: "Select a configuration" },
  "contact.message": { fr: "Message", en: "Message" },
  "contact.messagePlaceholder": { fr: "Votre message...", en: "Your message..." },
  "contact.submit": { fr: "ENVOYER MA DEMANDE", en: "SEND MY REQUEST" },
  "contact.sending": { fr: "ENVOI EN COURS...", en: "SENDING..." },
  "contact.thankTitle": { fr: "Merci pour votre intérêt !", en: "Thank you for your interest!" },
  "contact.thankDesc": {
    fr: "Votre demande a bien été reçue. Notre équipe vous recontactera dans les plus brefs délais.",
    en: "Your request has been received. Our team will get back to you as soon as possible.",
  },
  "contact.another": { fr: "ENVOYER UNE AUTRE DEMANDE", en: "SEND ANOTHER REQUEST" },
  "contact.successTitle": { fr: "Demande envoyée !", en: "Request sent!" },
  "contact.successDesc": {
    fr: "Nous vous recontacterons dans les plus brefs délais.",
    en: "We will get back to you as soon as possible.",
  },
  "contact.errorTitle": { fr: "Erreur", en: "Error" },
  "contact.errorDesc": {
    fr: "Impossible d'envoyer votre demande. Réessayez.",
    en: "Unable to send your request. Please try again.",
  },

  // Footer
  "footer.desc": {
    fr: "L'élégance architecturale au service de votre sérénité.\nL'immobilier de prestige à Marrakech redéfini.\nRéservez dès maintenant votre future villa.",
    en: "Architectural elegance at the service of your serenity.\nPrestige real estate in Marrakech redefined.\nReserve your future villa now.",
  },
  "footer.contactTitle": { fr: "Contactez notre agence", en: "Contact our agency" },
  "footer.copyright": {
    fr: "© 2026 BENAK HILLS. TOUS DROITS RÉSERVÉS. IMMOBILIER LUXE MAROC.",
    en: "© 2026 BENAK HILLS. ALL RIGHTS RESERVED. LUXURY REAL ESTATE MOROCCO.",
  },
  "footer.legal": { fr: "MENTIONS LÉGALES", en: "LEGAL NOTICE" },
  "footer.privacy": { fr: "CONFIDENTIALITÉ", en: "PRIVACY POLICY" },

  // Config names (used in contact select)
  "config.5ch": { fr: "5 Chambres", en: "5 Bedrooms" },
  "config.4chMaster": { fr: "4 Chambres avec Master-room", en: "4 Bedrooms with Master Suite" },
  "config.3chMaster": { fr: "3 Chambres avec Master-room", en: "3 Bedrooms with Master Suite" },
  "config.4chEtage": { fr: "4 Chambres Étage", en: "4 Upstairs Bedrooms" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
