import { RegistroTabla } from "@/core/tickets/tableType";

export default function SidebarTicket({ detailsTicket }: { detailsTicket: RegistroTabla | undefined }) {
    return <aside>
        <p>Detalles del cliente </p>
        <p>{detailsTicket?.dni}</p>
        <p>{detailsTicket?.numero}</p>
        <p>{detailsTicket?.responsable}</p>

    </aside>

}

