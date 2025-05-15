// components/data-table/TableRow.tsx

import { RegistroTabla } from "@/core/tickets/tableType";
import { formatearFecha, obtenerColorEstado } from "@/core/tickets/utils";
import TableActions from "./TableAction";


interface TableRowProps {
  registro: RegistroTabla;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssign?: (id: string) => void;
}

const TableRow = ({ registro, onView, onEdit, onDelete, onAssign }: TableRowProps) => {
  const fechaFormateada = formatearFecha(registro.fechaEntrega);
  const colorEstado = obtenerColorEstado(registro.estado);

  // Determina si mostrar el botón de asignación según el estado
  const mostrarBotonAsignar = registro.estado === 'sin asignar' && onAssign;

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {registro.dni}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {registro.numero}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {registro.responsable}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorEstado}`}>
          {registro.estado.charAt(0).toUpperCase() + registro.estado.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {fechaFormateada}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {registro.tipoBase}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <TableActions
          id={registro.id}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onAssign={mostrarBotonAsignar ? onAssign : undefined}
        />
      </td>
    </tr>
  );
};

export default TableRow;