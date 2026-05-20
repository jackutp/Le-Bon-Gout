import { TableData, InvoiceData } from "../../types";
import { TarjetaMesa } from "./TarjetaMesa";

interface Props {
  tables: TableData[];
  setInvoiceModal: (data: InvoiceData) => void;
}

export function EstadosMesa({ tables, setInvoiceModal }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tables.map((table) => (
        <TarjetaMesa key={table.id} table={table} setInvoiceModal={setInvoiceModal} />
      ))}
    </div>
  );
}