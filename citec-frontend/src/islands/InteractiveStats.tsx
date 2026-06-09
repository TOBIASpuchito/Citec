import { Activity, Building2, FileText } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    value: "90+",
    label: "Empresas",
    detail: "Directorio para descubrir socios, sectores y ciudades con claridad.",
    icon: Building2,
  },
  {
    value: "12",
    label: "Verticales",
    detail: "Categorias pensadas para ordenar capacidades y oportunidades del ecosistema.",
    icon: Activity,
  },
  {
    value: "3",
    label: "Pulse briefs",
    detail: "Lecturas editoriales para autoridad regulatoria, mercado y talento.",
    icon: FileText,
  },
];

export default function InteractiveStats() {
  const [active, setActive] = useState(0);
  const selected = stats[active];
  const Icon = selected.icon;

  return (
    <div className="rounded-lg border border-citec-line/80 bg-white/78 p-4 shadow-glass backdrop-blur-xl">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          const isActive = index === active;

          return (
            <button
              key={stat.label}
              onClick={() => setActive(index)}
              className={`grid min-h-24 place-items-center rounded-md border p-3 text-center transition duration-300 ease-premium ${
                isActive
                  ? "border-citec-cyan/60 bg-citec-ink text-white shadow-soft"
                  : "border-citec-line bg-white text-citec-ink hover:bg-citec-mist"
              }`}
              type="button"
            >
              <StatIcon className="mb-2 h-4 w-4" />
              <span className="font-display text-2xl font-black">{stat.value}</span>
              <span className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.08em]">{stat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-md bg-citec-mist/72 p-4">
        <Icon className="h-5 w-5 text-citec-blue" />
        <p className="mt-3 text-sm leading-7 text-citec-ink-soft">{selected.detail}</p>
      </div>
    </div>
  );
}
