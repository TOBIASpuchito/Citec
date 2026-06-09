export type Benefit = {
  title: string;
  description: string;
  metric: string;
  tag: string;
};

export const benefits: Benefit[] = [
  {
    title: "Visibilidad institucional",
    description: "Presencia curada dentro del directorio y espacios editoriales de CITEC.",
    metric: "SEO local",
    tag: "Atraccion",
  },
  {
    title: "Inteligencia regulatoria",
    description: "Lecturas ejecutivas para anticipar cambios legales, tecnologicos y de mercado.",
    metric: "Pulse",
    tag: "Decision",
  },
  {
    title: "Red de confianza",
    description: "Conexion con empresas, talento, gobierno, academia y aliados de innovacion.",
    metric: "Ecosistema",
    tag: "Conexion",
  },
  {
    title: "Mesas de trabajo",
    description: "Espacios de articulacion para crear agenda publica y oportunidades sectoriales.",
    metric: "Agenda",
    tag: "Influencia",
  },
];

export const membershipTiers = [
  {
    name: "Empresa emergente",
    description: "Para equipos que buscan visibilidad, red y primeras alianzas.",
    value: "Directorio + comunidad + actividades",
  },
  {
    name: "Socio corporativo",
    description: "Para companias que necesitan agenda, analisis y posicionamiento.",
    value: "Pulse + mesas + presencia destacada",
  },
  {
    name: "Aliado estrategico",
    description: "Para instituciones que impulsan transformacion digital a escala pais.",
    value: "Co-creacion + agenda publica + eventos",
  },
];

export const testimonials = [
  {
    quote: "CITEC nos ayuda a convertir conversaciones dispersas del ecosistema en agenda concreta.",
    author: "Directora de Innovacion",
    company: "Empresa socia",
  },
  {
    quote: "El valor esta en la mezcla: regulacion, tecnologia y relacionamiento en un mismo lugar.",
    author: "Founder",
    company: "Startup fintech",
  },
];
