import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  url?: string;
  lang?: string;
}

const SITE_URL = "https://fixitech.site";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function SEO({ title, description, type = "website", url, lang = "en" }: SEOProps) {
  const siteName = "fixitech";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_SA" />
      <meta property="og:locale:alternate" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${url || "/"}`} />
      <link rel="alternate" hrefLang="ar" href={`${SITE_URL}${url || "/"}`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}${url || "/"}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${url || "/"}`} />

      {/* Extra SEO */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="author" content="fixitech" />
      <meta name="keywords" content="tech fix, troubleshooting, laptop repair, phone fix, wifi fix, windows fix, android fix, iphone fix, how to fix" />
    </Helmet>
  );
}
