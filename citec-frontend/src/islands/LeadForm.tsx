import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

const interests = ["Afiliacion", "Directorio", "Pulse", "Eventos", "Alianza estrategica"];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-citec-cyan/40 bg-white/86 p-6 shadow-glass">
        <CheckCircle2 className="h-10 w-10 text-citec-success" />
        <h3 className="mt-5 font-display text-2xl font-black text-citec-ink">Solicitud registrada</h3>
        <p className="mt-3 text-sm leading-7 text-citec-ink-soft">
          Gracias por escribirnos. El equipo de CITEC revisara tu solicitud para orientar el siguiente paso.
        </p>
        <button
          className="mt-5 rounded-md border border-citec-line bg-white px-4 py-2 text-sm font-bold text-citec-ink transition hover:bg-citec-mist"
          onClick={() => setSubmitted(false)}
          type="button"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-citec-line/80 bg-white/86 p-5 shadow-glass backdrop-blur-xl sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" autoComplete="name" required />
        <Field label="Empresa" name="company" autoComplete="organization" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Telefono" name="phone" type="tel" autoComplete="tel" />
        <label className="grid gap-2 text-sm font-bold text-citec-ink sm:col-span-2">
          <span>Interes</span>
          <select
            name="interest"
            className="h-12 rounded-md border border-citec-line bg-white px-3 text-sm text-citec-ink outline-none transition duration-300 ease-premium focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
            required
          >
            <option value="">Selecciona una opcion</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-citec-ink sm:col-span-2">
          <span>Mensaje</span>
          <textarea
            name="message"
            rows={5}
            className="resize-none rounded-md border border-citec-line bg-white px-3 py-3 text-sm text-citec-ink outline-none transition duration-300 ease-premium placeholder:text-citec-ink-soft/55 focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
            placeholder="Cuentanos que tipo de afiliacion o alianza quieres explorar"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold leading-5 text-citec-ink-soft">
          Tus datos se usaran para responder esta solicitud de afiliacion o alianza.
        </p>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-citec-ink px-5 py-3 text-sm font-black text-white shadow-soft transition duration-300 ease-premium hover:-translate-y-0.5 hover:bg-citec-navy" type="submit">
          Enviar solicitud <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", autoComplete, required }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-citec-ink">
      <span>{label}</span>
      <input
        className="h-12 rounded-md border border-citec-line bg-white px-3 text-sm text-citec-ink outline-none transition duration-300 ease-premium placeholder:text-citec-ink-soft/55 focus:border-citec-blue focus:ring-4 focus:ring-citec-cyan/20"
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  );
}
