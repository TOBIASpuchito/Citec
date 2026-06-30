import { site } from "@/data/site";
import type { EventItem } from "@/data/events";
import type { Partner } from "@/data/partners";
import type { PulsePost } from "@/data/pulse";

export type SeoInput = {
  title?: string;
  description?: string;
  canonical?: string;
};

export type JsonLdNode = Record<string, unknown>;

export function pageTitle(title?: string) {
  if (!title) return site.title;
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pageDescription(description?: string) {
  return description ?? site.description;
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: absoluteUrl("/brand/citec-logo-stacked-color.svg"),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quito",
      addressCountry: "EC",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone,
      areaServed: "EC",
      availableLanguage: ["es"],
    },
    sameAs: Object.values(site.socials).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    inLanguage: site.language,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function webPageJsonLd({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: site.language,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemListJsonLd(name: string, items: Array<{ name: string; url: string; description?: string }>) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function pulseArticleJsonLd(post: PulsePost, url: string, image: string) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    image,
    articleSection: post.category,
    inLanguage: site.language,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function partnerOrganizationJsonLd(partner: Partner, url: string) {
  return {
    "@type": "Organization",
    name: partner.name,
    url,
    description: partner.description,
    sameAs: [partner.website],
    address: {
      "@type": "PostalAddress",
      addressLocality: partner.city,
      addressCountry: "EC",
    },
    memberOf: { "@id": `${site.url}/#organization` },
    knowsAbout: [partner.category, partner.industry, ...partner.benefits],
  };
}

export function eventJsonLd(event: EventItem) {
  const eventUrl = absoluteUrl("/eventos/");

  return {
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: eventUrl,
    location: {
      "@type": "Place",
      name: event.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: "EC",
      },
    },
    organizer: { "@id": `${site.url}/#organization` },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jsonLdGraph(nodes: Array<JsonLdNode | undefined | null>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
