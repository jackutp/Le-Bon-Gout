//src/app/mesero/components/productos/FiltroCategorias.tsx
interface Props {
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
}

export function FiltroCategorias({ categoryFilter, setCategoryFilter }: Props) {
  const categories = ["all", "PLATO", "BEBIDA", "POSTRE"];

  return (
    <div className="flex gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoryFilter(cat)}
          className={`px-3 py-1.5 rounded text-xs uppercase tracking-widest transition-colors ${categoryFilter === cat
            ? "bg-[#C6A96B] text-black"
            : "border border-stone-800 text-stone-400 hover:text-white hover:border-[#C6A96B]"
            }`}
        >
          {cat === "all" ? "Todos" : cat}
        </button>
      ))}
    </div>
  );
}
