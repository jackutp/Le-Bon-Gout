//src/app/mesero/components/productos/TarjetaProducto.tsx
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
  inStock: number;
}

interface Props {
  product: Product;
  addToOrder: (id: number) => void;
}

export function TarjetaProducto({ product, addToOrder }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`bg-[#121214] border ${product.inStock === 0 ? "border-red-900/50 opacity-70" : "border-stone-800"
        } rounded overflow-hidden flex flex-col`}
    >
      <div className="relative h-32 w-full">
        <Image src={product.img} alt={product.name} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.inStock > 0
              ? "bg-black/80 text-[#C6A96B] border border-[#C6A96B]"
              : "bg-red-900/80 text-white border border-red-500"
              }`}
          >
            {product.inStock > 0 ? `${product.inStock}` : "Agot"}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-base mb-0.5">{product.name}</h3>
          <p className="text-xs text-stone-400 mb-2">{product.desc}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-[#C6A96B]">S/ {product.price.toFixed(2)}</span>
          <button
            onClick={() => addToOrder(product.id)}
            disabled={product.inStock === 0}
            className="bg-stone-800 hover:bg-[#C6A96B] hover:text-black disabled:opacity-50 disabled:hover:bg-stone-800 disabled:hover:text-white text-white p-1.5 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}