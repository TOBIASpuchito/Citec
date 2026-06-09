export type Partner = {
  name: string;
  slug: string;
  logo: string;
  city: "Quito" | "Guayaquil" | "Cuenca" | "Loja" | "Manta";
  category:
    | "Software"
    | "Ciberseguridad"
    | "Fintech"
    | "LegalTech"
    | "Cloud"
    | "Data & AI"
    | "EdTech";
  industry: string;
  description: string;
  website: string;
  benefits: string[];
  clickCount: number;
  featured?: boolean;
};

export const partners: Partner[] = [
  {
    name: "Andes Cloud Lab",
    slug: "andes-cloud-lab",
    logo: "AC",
    city: "Quito",
    category: "Cloud",
    industry: "Infraestructura digital",
    description: "Arquitectura cloud, continuidad operativa y modernizacion de plataformas criticas.",
    website: "https://example.com/andes-cloud-lab",
    benefits: ["Diagnostico cloud", "Workshops ejecutivos", "Creditos de arquitectura"],
    clickCount: 148,
    featured: true,
  },
  {
    name: "NovaLex Tech",
    slug: "novalex-tech",
    logo: "NL",
    city: "Guayaquil",
    category: "LegalTech",
    industry: "Cumplimiento y regulacion",
    description: "Automatizacion legal, cumplimiento digital y trazabilidad para operaciones reguladas.",
    website: "https://example.com/novalex-tech",
    benefits: ["Brief regulatorio", "Auditoria documental", "Mesa legal-tech"],
    clickCount: 126,
    featured: true,
  },
  {
    name: "Sierra Data Studio",
    slug: "sierra-data-studio",
    logo: "SD",
    city: "Cuenca",
    category: "Data & AI",
    industry: "Analitica avanzada",
    description: "Modelos predictivos, inteligencia operacional y tableros para decisiones ejecutivas.",
    website: "https://example.com/sierra-data-studio",
    benefits: ["Sesion de datos", "Benchmark de madurez", "Prototipo de tablero"],
    clickCount: 177,
    featured: true,
  },
  {
    name: "Pacific Secure",
    slug: "pacific-secure",
    logo: "PS",
    city: "Manta",
    category: "Ciberseguridad",
    industry: "Seguridad empresarial",
    description: "Gestion de riesgo, respuesta ante incidentes y proteccion de activos digitales.",
    website: "https://example.com/pacific-secure",
    benefits: ["Evaluacion inicial", "Simulacion ejecutiva", "Reporte de brechas"],
    clickCount: 93,
  },
  {
    name: "Kuntur Pay",
    slug: "kuntur-pay",
    logo: "KP",
    city: "Quito",
    category: "Fintech",
    industry: "Pagos digitales",
    description: "Infraestructura de pagos, conciliacion y herramientas financieras embebidas.",
    website: "https://example.com/kuntur-pay",
    benefits: ["Sandbox fintech", "Guia de integracion", "Mesa de pagos"],
    clickCount: 112,
  },
  {
    name: "AulaTec Ecuador",
    slug: "aulatec-ecuador",
    logo: "AT",
    city: "Loja",
    category: "EdTech",
    industry: "Formacion digital",
    description: "Programas de reskilling, academias corporativas y certificaciones para equipos tech.",
    website: "https://example.com/aulatec-ecuador",
    benefits: ["Ruta de upskilling", "Becas cohortes", "Diagnostico de talento"],
    clickCount: 84,
  },
  {
    name: "Quinde Software",
    slug: "quinde-software",
    logo: "QS",
    city: "Guayaquil",
    category: "Software",
    industry: "Producto digital",
    description: "Diseno y desarrollo de plataformas empresariales con foco en experiencia y rendimiento.",
    website: "https://example.com/quinde-software",
    benefits: ["Discovery sprint", "Revision UX", "Roadmap tecnico"],
    clickCount: 101,
  },
];

export const partnerCategories = Array.from(new Set(partners.map((partner) => partner.category)));
export const partnerCities = Array.from(new Set(partners.map((partner) => partner.city)));
