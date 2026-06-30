export const site = {
  name: "CITEC",
  shortName: "CITEC",
  legalName: "Camara de Innovacion y Tecnologia Ecuatoriana",
  title: "CITEC | Camara de Innovacion y Tecnologia Ecuatoriana",
  description:
    "Hub digital de la Camara de Innovacion y Tecnologia Ecuatoriana para conectar empresas, talento, regulacion e innovacion.",
  url: "https://citec.ec",
  ogImage: "/og-image.png",
  language: "es-EC",
  locale: "es_EC",
  themeColor: "#2D368E",
  email: "info@citec.ec",
  phone: "+593 2 000 0000",
  address: "Quito, Ecuador",
  socials: {
    linkedin: "https://www.linkedin.com/company/citec-ec",
    x: "https://x.com/citec_ec",
  },
  stats: [
    { value: "90+", label: "empresas del ecosistema" },
    { value: "12", label: "verticales tecnologicas" },
    { value: "24/7", label: "visibilidad institucional" },
  ],
};

export type SiteStat = (typeof site.stats)[number];
