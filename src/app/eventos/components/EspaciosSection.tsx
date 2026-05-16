"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EspaciosSection() {
  // Datos centralizados para eventos
  const eventos = [
    {
      id: "salones-privados",
      nombre: "Salones Privados",
      imagen: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80",
      descripcion: "Tenemos tres espacios para atender grupos desde 10 hasta 50 personas.",
      detalles: [
        "Salón San Isidro: hasta 10 comensales.",
        "El histórico Salón de los Espejos: hasta para 20 personas.",
        "El Gran Salón Rosado: hasta 50 comensales."
      ],
      layout: "left"
    },
    {
      id: "jardin",
      nombre: "Jardín",
      imagen: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80",
      descripcion: "Es un espacio mágico para eventos al aire libre. Puede recibir grupos desde 25 hasta 100 personas. Además, se encuentra junto a la capilla de la casona, donde se pueden oficiar ceremonias religiosas privadas. Nuestro equipo está capacitado para personalizar las reservas según las necesidades del cliente.",
      detalles: null,
      layout: "right"
    },
    {
      id: "casona-completa",
      nombre: "Casona Completa",
      imagen: "https://images.unsplash.com/photo-1586999768265-24af89630739?auto=format&fit=crop&q=80",
      descripcion: "No solo reservamos toda la casa. Si la disponibilidad del restaurante lo permite, es posible reservarla para bodas, eventos sociales o corporativos con capacidad máxima de 300 personas.",
      detalles: null,
      layout: "full"
    },
    {
      id: "le-bon-gout",
      nombre: "Le Bon Goût en tu Casa",
      imagen: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80",
      descripcion: "Si planeas un evento en tu propio espacio, podemos llevar la experiencia de Astrid & Gastón hasta allá. Lo hacemos con el mismo cuidado por los detalles que nuestro equipo de servicio y de cocina tienen en el restaurante.",
      detalles: null,
      layout: "full"
    }
  ];

  const EventoCard = ({ evento, index }: { evento: typeof eventos[0], index: number }) => {
    if (evento.layout === "full") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center border-t border-stone-800 pt-16 first:border-t-0 first:pt-0"
        >
          <div className={`relative aspect-video rounded-2xl overflow-hidden border border-stone-800 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
            <Image
              src={evento.imagen}
              alt={evento.nombre}
              fill
              className="object-cover"
            />
          </div>
          <div className={index % 2 === 1 ? 'md:order-1' : ''}>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-amber-500 uppercase mb-4">
              {evento.nombre}
            </h2>
            <p className="text-stone-400 leading-relaxed text-base lg:text-lg">
              {evento.descripcion}
            </p>
            {evento.detalles && evento.detalles.length > 0 && (
              <ul className="space-y-3 mt-6">
                {evento.detalles.map((detalle, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-amber-500">—</span>
                    <span className="text-stone-300">{detalle}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: evento.layout === "left" ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-20 ${evento.layout === "right" ? 'lg:grid-cols-[0.8fr_1.2fr]' : ''}`}
      >
        <div className={evento.layout === "right" ? 'lg:order-2' : ''}>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-800">
            <Image
              src={evento.imagen}
              alt={evento.nombre}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className={evento.layout === "right" ? 'lg:order-1' : ''}>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-amber-500 uppercase mb-4">
            {evento.nombre}
          </h2>
          <p className="text-stone-400 leading-relaxed text-base lg:text-lg">
            {evento.descripcion}
          </p>
          {evento.detalles && evento.detalles.length > 0 && (
            <ul className="space-y-3 mt-6">
              {evento.detalles.map((detalle, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-amber-500">—</span>
                  <span className="text-stone-300">{detalle}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="px-6 lg:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl lg:text-6xl text-amber-500 uppercase tracking-wider mb-4">
            Eventos
          </h1>
          <div className="w-24 h-px bg-amber-500/50 mx-auto"></div>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          {eventos.map((evento, index) => (
            <EventoCard key={evento.id} evento={evento} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}