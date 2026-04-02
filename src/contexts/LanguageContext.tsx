import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    categories: "Categories",
    about: "About",
    searchPlaceholder: "e.g. Laptop won't turn on, WiFi keeps dropping...",
    findFix: "Find Fix",
    noResults: "No results found for",
    tryDifferent: "Try a different search term",
    featuredFixes: "Featured Fixes",
    latestGuides: "Latest Guides",
    viewAll: "View All",
    relatedFixes: "Related Fixes",
    faqs: "Frequently Asked Questions",
    lastUpdated: "Last updated",
    minRead: "min read",
    didItResolve: "Did this resolve your issue?",
    keepUpdated: "If the steps above fixed your problem, make sure to keep your system updated to prevent it from happening again.",
    followSteps: "Don't panic. Follow these proven troubleshooting steps sequentially — we start with the easiest fixes first.",
    watchTutorial: "Watch Video Tutorial on YouTube",
    allRights: "All rights reserved.",
    notAffiliated: "Not affiliated with any specific hardware manufacturer.",
    legal: "Legal",
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    step: "Step",
    browseCategories: "What do you need help with?",
    browseCategoriesDesc: "Select your device or issue type to browse specific troubleshooting guides.",
    topCategories: "Browse all categories to find the right fix for your device.",
    heroTitle1: "Fix Your Tech Problems",
    heroTitle2: "Fast.",
    heroSubtitle: "Step-by-step troubleshooting guides for when your devices decide to stop cooperating. No jargon, just solutions.",
    language: "Language",
  },
  ar: {
    home: "الرئيسية",
    categories: "الفئات",
    about: "من نحن",
    searchPlaceholder: "مثال: الحاسوب لا يشتغل، الواي فاي ينقطع...",
    findFix: "ابحث عن الحل",
    noResults: "لا توجد نتائج لـ",
    tryDifferent: "جرب كلمة بحث مختلفة",
    featuredFixes: "الإصلاحات المميزة",
    latestGuides: "أحدث الأدلة",
    viewAll: "عرض الكل",
    relatedFixes: "إصلاحات ذات صلة",
    faqs: "الأسئلة الشائعة",
    lastUpdated: "آخر تحديث",
    minRead: "دقيقة قراءة",
    didItResolve: "هل حل هذا المشكلة؟",
    keepUpdated: "إذا أصلحت هذه الخطوات مشكلتك، تأكد من إبقاء نظامك محدثاً لمنع تكرارها.",
    followSteps: "لا تقلق. اتبع خطوات استكشاف الأخطاء هذه بالتسلسل — نبدأ بأسهل الحلول أولاً.",
    watchTutorial: "شاهد الشرح على يوتيوب",
    allRights: "جميع الحقوق محفوظة.",
    notAffiliated: "غير مرتبط بأي شركة تصنيع أجهزة معينة.",
    legal: "قانوني",
    aboutUs: "من نحن",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    step: "خطوة",
    browseCategories: "ما الذي تحتاج إلى مساعدة فيه؟",
    browseCategoriesDesc: "اختر نوع جهازك أو مشكلتك للاطلاع على أدلة استكشاف الأخطاء.",
    topCategories: "تصفح جميع الفئات للعثور على الإصلاح المناسب لجهازك.",
    heroTitle1: "أصلح مشاكلك التقنية",
    heroTitle2: "بسرعة.",
    heroSubtitle: "أدلة خطوة بخطوة لإصلاح مشاكل أجهزتك. بلا تعقيدات، فقط حلول.",
    language: "اللغة",
  },
  es: {
    home: "Inicio",
    categories: "Categorías",
    about: "Acerca de",
    searchPlaceholder: "Ej. La laptop no enciende, el WiFi se cae...",
    findFix: "Encontrar Solución",
    noResults: "Sin resultados para",
    tryDifferent: "Intenta con otro término de búsqueda",
    featuredFixes: "Soluciones Destacadas",
    latestGuides: "Guías Recientes",
    viewAll: "Ver Todo",
    relatedFixes: "Soluciones Relacionadas",
    faqs: "Preguntas Frecuentes",
    lastUpdated: "Última actualización",
    minRead: "min de lectura",
    didItResolve: "¿Esto resolvió tu problema?",
    keepUpdated: "Si los pasos anteriores solucionaron tu problema, mantén tu sistema actualizado para evitar que vuelva a ocurrir.",
    followSteps: "No te preocupes. Sigue estos pasos secuencialmente — comenzamos con las soluciones más sencillas primero.",
    watchTutorial: "Ver Tutorial en YouTube",
    allRights: "Todos los derechos reservados.",
    notAffiliated: "No afiliado con ningún fabricante de hardware específico.",
    legal: "Legal",
    aboutUs: "Sobre Nosotros",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    step: "Paso",
    browseCategories: "¿Con qué necesitas ayuda?",
    browseCategoriesDesc: "Selecciona el tipo de dispositivo o problema para ver guías de solución de problemas.",
    topCategories: "Explora todas las categorías para encontrar la solución correcta para tu dispositivo.",
    heroTitle1: "Soluciona tus Problemas Técnicos",
    heroTitle2: "Rápido.",
    heroSubtitle: "Guías paso a paso para cuando tus dispositivos dejan de funcionar. Sin tecnicismos, solo soluciones.",
    language: "Idioma",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("fixitech-lang") as Language;
      return saved && ["en", "ar", "es"].includes(saved) ? saved : "en";
    } catch {
      return "en";
    }
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem("fixitech-lang", newLang); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string) =>
    translations[lang]?.[key] ?? translations.en?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
