export type EventItem = {
  title: string;
  date: string;
  city: string;
  format: "Mesa" | "Foro" | "Workshop" | "Encuentro";
  description: string;
};

export const events: EventItem[] = [
  {
    title: "Mesa de confianza digital y proteccion de datos",
    date: "2026-06-27",
    city: "Quito",
    format: "Mesa",
    description: "Dialogo ejecutivo sobre cumplimiento, seguridad y adopcion responsable de datos.",
  },
  {
    title: "Foro de industria tech Ecuador",
    date: "2026-07-10",
    city: "Guayaquil",
    format: "Foro",
    description: "Senales de mercado, casos empresariales y oportunidades para proveedores locales.",
  },
  {
    title: "Workshop de producto y escalabilidad",
    date: "2026-07-24",
    city: "Cuenca",
    format: "Workshop",
    description: "Sesion practica para conectar roadmap, arquitectura y crecimiento comercial.",
  },
];
