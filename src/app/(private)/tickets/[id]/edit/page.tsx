"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { datosEjemplo } from "@/core/tickets/data";
import { RegistroTabla } from "@/core/tickets/tableType";
import SidebarTicket from "./components/SidebarTicket";
import TicketDetailsForm from "./components/TicketDetailsForm";


export default function EditTicketPage() {
    const params = useParams();
    const id = params?.id;
    const [ticket, setTicket] = useState<RegistroTabla | undefined>();

    useEffect(() => {
        const findData = datosEjemplo.find((data) => data.id == id);
        if (!findData) {
            console.log("Ticket no encontrado");
        }
        setTicket(findData);
    }, [id]);

    return (
        <div className="flex p-4 gap-6">
            <div className="w-2/3 bg-white shadow-md p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Editar Ticket</h2>
                {ticket && <TicketDetailsForm ticket={ticket} />}
            </div>
            <SidebarTicket detailsTicket={ticket} />
        </div>
    );
}
