"use client";

import { es } from "date-fns/locale/es";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays, LuClock } from "react-icons/lu";

interface DateTimePickerProps {
    label?: string;
    value?: Date;
    onChange?: (date: Date) => void | null;
}
registerLocale("es", es);
export default function DateTimePicker({
    label,
    value,
    onChange,
}: DateTimePickerProps) {
    const [startDate, setStartDate] = useState<Date>(value || new Date());

    const handleChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
            onChange?.(date);
        }
    };

    return (
        <div className="flex gap-4 w-full max-w-sm ">
            {label && (
                <label className="text-sm text-gray-600 font-medium w-[40%] tracking-wide">
                    {label}
                </label>
            )}
            <div className=" group">
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    timeCaption="Hora"
                    locale={es}
                    className="w-full bg-white px-4 py-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-all duration-200"
                    calendarClassName="!rounded-xl !shadow-lg !border !border-gray-200"
                />


            </div>
        </div>
    );
}
