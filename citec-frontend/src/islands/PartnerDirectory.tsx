import { ArrowUpRight, Building2, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { partnerCategories, partnerCities, partners } from "@/data/partners";

type PartnerDirectoryProps = {
  featuredOnly?: boolean;
  limit?: number;
};

export default function PartnerDirectory({ featuredOnly = false, limit }: PartnerDirectoryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [city, setCity] = useState("Todas");

  const filteredPartners = useMemo(() => {
    const source = featuredOnly ? partners.filter((partner) => partner.featured) : partners;
    const normalizedQuery = query.trim().toLowerCase();

    return source
      .filter((partner) => {
        const matchesQuery =
          !normalizedQuery ||
          [partner.name, partner.description, partner.industry, partner.category, partner.city]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === "Todas" || partner.category === category;
        const matchesCity = city === "Todas" || partner.city === city;

        return matchesQuery && matchesCategory && matchesCity;
      })
      .slice(0, limit);
  }, [category, city, featuredOnly, limit, query]);

  return (
    <section className="rounded-lg border border-citec-line/80 bg-white/78 p-4 shadow-glass backdrop-blur-xl sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_14rem_14rem]">
        <label className="relative block">
          <span className="sr-only">Buscar socios</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-citec-ink-soft" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 w-full rounded-md border border-citec-line bg-white pl-10 pr-3 text-sm font-semibold text-citec-ink outline-none transition duration-300 ease-premium placeholder:text-citec-ink-soft/55 focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
            placeholder="Buscar por empresa, industria o solucion"
            type="search"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Filtrar por categoria</span>
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-citec-ink-soft" />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 w-full appearance-none rounded-md border border-citec-line bg-white pl-10 pr-8 text-sm font-semibold text-citec-ink outline-none transition duration-300 ease-premium focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
          >
            <option>Todas</option>
            {partnerCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="relative block">
          <span className="sr-only">Filtrar por ciudad</span>
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-citec-ink-soft" />
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-12 w-full appearance-none rounded-md border border-citec-line bg-white pl-10 pr-8 text-sm font-semibold text-citec-ink outline-none transition duration-300 ease-premium focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
          >
            <option>Todas</option>
            {partnerCities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-citec-line/70 py-3 text-xs font-bold uppercase tracking-[0.08em] text-citec-ink-soft">
        <span>{filteredPartners.length} resultados</span>
        <span>Empresas por ciudad, categoria e industria</span>
      </div>

      {filteredPartners.length > 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPartners.map((partner) => (
            <article
              key={partner.slug}
              className="group relative flex min-h-[21rem] flex-col rounded-lg border border-citec-line/80 bg-white p-5 shadow-[0_14px_34px_rgba(13,39,66,0.07)] transition duration-300 ease-premium hover:-translate-y-1 hover:border-citec-cyan/55 hover:shadow-glass"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-citec-ink font-black text-white shadow-soft">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black leading-tight text-citec-ink">
                      <a href={`/socios/${partner.slug}/`} className="after:absolute after:inset-0">
                        {partner.name}
                      </a>
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-citec-ink-soft">
                      <MapPin className="h-3.5 w-3.5" />
                      {partner.city}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-citec-cyan/30 bg-citec-cyan/10 px-2.5 py-1 text-xs font-bold text-citec-blue">
                  {partner.category}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-citec-ink-soft">{partner.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {partner.benefits.slice(0, 3).map((benefit) => (
                  <span key={benefit} className="rounded-full border border-citec-line bg-citec-mist/70 px-2.5 py-1 text-xs font-bold text-citec-ink-soft">
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.08em] text-citec-ink-soft">
                  <Building2 className="h-3.5 w-3.5" />
                  {partner.industry}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-black text-citec-blue">
                  Perfil <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-citec-line bg-citec-mist/70 p-8 text-center">
          <p className="font-display text-xl font-black text-citec-ink">No hay socios para esos filtros.</p>
          <p className="mt-2 text-sm text-citec-ink-soft">Prueba con otra categoria, ciudad o palabra clave.</p>
        </div>
      )}
    </section>
  );
}
