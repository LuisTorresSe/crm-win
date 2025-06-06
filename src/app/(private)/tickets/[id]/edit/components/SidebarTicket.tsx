import { RegistroTabla } from "@/core/tickets/tableType";

export default function SidebarTicket({ detailsTicket }: { detailsTicket: RegistroTabla | undefined }) {
    return (
        <aside className="w-full max-w-xs  p-4 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Detalles del cliente</h2>

            <div className="space-y-3 text-sm text-gray-600">
                <InfoItem label="DNI" value={detailsTicket?.dni || 'No disponible'} />
                <InfoItem label="Nombre del cliente" value="Luis Antonio Torres Sevillanos" />
                <InfoItem label="Código del pedido" value="123141" />
                <InfoItem label="Número" value={detailsTicket?.numero || 'No disponible'} />
                <InfoItem label="Número 2" value="02313123123" />

                <hr className="my-2" />

                <InfoItem label="Tipo de base" value={detailsTicket?.fechaEntrega || 'No disponible'} />
                <InfoItem label="Servicio" value="Residencial" />
                <InfoItem label="Estado CRM" value="Activo" />
                <InfoItem label="Ticket último mes" value="NO" />
                <InfoItem label="Tipo de ticket" value="-" />
            </div>
        </aside>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between">
            <span className="font-medium text-gray-500">{label}:</span>
            <span className="text-gray-700">{value}</span>
        </div>
    );
}
