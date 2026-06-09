export type PulsePost = {
  title: string;
  slug: string;
  date: string;
  category: "Regulacion" | "Industria" | "Talento" | "Mercado";
  summary: string;
  insights: string[];
  visual: "regulatory" | "market" | "talent";
  featured?: boolean;
};

export const pulsePosts: PulsePost[] = [
  {
    title: "Claves regulatorias para escalar servicios digitales en Ecuador",
    slug: "claves-regulatorias-servicios-digitales-ecuador",
    date: "2026-06-02",
    category: "Regulacion",
    summary:
      "Una lectura ejecutiva de los frentes normativos que mas inciden en plataformas, datos, pagos y servicios cloud.",
    insights: [
      "La trazabilidad documental ya es una ventaja competitiva, no solo una obligacion.",
      "Los equipos legales y de producto deben operar con una misma matriz de riesgo.",
      "La adopcion cloud requiere evidencia de continuidad y seguridad desde el diseno.",
    ],
    visual: "regulatory",
    featured: true,
  },
  {
    title: "Mapa breve de demanda tech empresarial para el segundo semestre",
    slug: "demanda-tech-empresarial-segundo-semestre",
    date: "2026-05-21",
    category: "Mercado",
    summary:
      "Senales de inversion, necesidades de automatizacion y prioridades de compra dentro del ecosistema empresarial.",
    insights: [
      "La eficiencia operativa supera a la experimentacion como argumento de compra.",
      "Ciberseguridad y datos aparecen como presupuestos defensivos y estrategicos.",
      "Las empresas medianas buscan proveedores locales con gobierno tecnico claro.",
    ],
    visual: "market",
  },
  {
    title: "Talento digital: perfiles que conectan tecnologia y negocio",
    slug: "talento-digital-tecnologia-negocio",
    date: "2026-05-08",
    category: "Talento",
    summary:
      "El mercado requiere perfiles hibridos capaces de convertir estrategia, datos y producto en ejecucion medible.",
    insights: [
      "Product ops, data translators y security leads crecen en relevancia.",
      "Las certificaciones pesan mas cuando se conectan a casos reales.",
      "La colaboracion academia-empresa necesita ciclos mas cortos de aprendizaje.",
    ],
    visual: "talent",
  },
];
