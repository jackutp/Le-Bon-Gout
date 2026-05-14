// src/app/admin/components/InventoryView.tsx
"use client";

import { InsumosView } from "./InsumosView";
import { ProductosView } from "./ProductosView";

export function InventoryView() {
    return (
        <div className="space-y-12">
            <InsumosView />
            <ProductosView />
        </div>
    );
}