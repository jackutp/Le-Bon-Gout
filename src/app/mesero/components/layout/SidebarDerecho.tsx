import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function SidebarDerecho({ children }: Props) {
  return (
    <div className="col-span-2 bg-[#121214] border-l border-stone-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {children}
    </div>
  );
}