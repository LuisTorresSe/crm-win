"use client"

import { useEffect, useState } from "react";
import Table from "./components/TableTicket";
import { RegistroTabla } from "@/core/tickets/tableType";
import { datosEjemplo } from "@/core/tickets/data";

export default function TicketsPage() {
    const [registros, setRegistros] = useState<RegistroTabla[]>([]);

    // Cargar datos de ejemplo (en un caso real podrías obtenerlos de una API)
    useEffect(() => {
        setRegistros(datosEjemplo);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Registros</h1>

                {/* Componente principal de la tabla */}
                <Table registros={registros} />
            </div>
        </div>)
}