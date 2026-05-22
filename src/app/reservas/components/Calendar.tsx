// src/app/reservas/components/Calendar.tsx

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelectDate }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 4);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    const prevMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
            setCurrentMonth(newMonth);
        }
    };

    const nextMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        if (newMonth <= maxDate) {
            setCurrentMonth(newMonth);
        }
    };

    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    return (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth} className="p-2 hover:text-amber-500 transition-colors">
                    <ChevronLeft />
                </button>
                <span className="text-xl font-serif capitalize">
                    {currentMonth.toLocaleString("es-ES", { month: "long", year: "numeric" })}
                </span>
                <button onClick={nextMonth} className="p-2 hover:text-amber-500 transition-colors">
                    <ChevronRight />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                    <div key={day} className="text-center text-stone-500 text-xs tracking-widest uppercase py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const thisDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isPast = thisDate < today;
                    const isSelected = selectedDate?.getTime() === thisDate.getTime();

                    return (
                        <button
                            key={day}
                            disabled={isPast}
                            onClick={() => onSelectDate(thisDate)}
                            className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all
                                ${isPast ? "opacity-20 cursor-not-allowed" : "hover:bg-stone-800"}
                                ${isSelected ? "bg-amber-500 text-black font-medium hover:bg-amber-400" : ""}
                            `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}