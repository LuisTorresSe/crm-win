import { FiltrosTabla, RegistroTabla } from '@/core/tickets/tableType';
import { obtenerResponsablesUnicos } from '@/core/tickets/utils';
import { useState, useEffect } from 'react';


interface TableFiltersProps {
    registros: RegistroTabla[];
    filtros: FiltrosTabla;
    setFiltros: (filtros: FiltrosTabla) => void;
}

export const TableFilters = ({ registros, filtros, setFiltros }: TableFiltersProps) => {
    const [responsablesUnicos, setResponsablesUnicos] = useState<string[]>([]);

    useEffect(() => {
        setResponsablesUnicos(obtenerResponsablesUnicos(registros));
    }, [registros]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFiltros({
            ...filtros,
            [name]: value,
        });
    };

    const limpiarFiltros = () => {
        setFiltros({
            dni: '',
            responsable: '',
            estado: '',
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Filtros</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtro por DNI */}
                <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                        DNI
                    </label>
                    <input
                        type="text"
                        id="dni"
                        name="dni"
                        value={filtros.dni}
                        onChange={handleInputChange}
                        placeholder="Buscar por DNI"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Filtro por Responsable */}
                <div>
                    <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">
                        Responsable
                    </label>
                    <select
                        id="responsable"
                        name="responsable"
                        value={filtros.responsable}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Todos los responsables</option>
                        {responsablesUnicos.map((responsable) => (
                            <option key={responsable} value={responsable}>
                                {responsable}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Estado */}
                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                    </label>
                    <select
                        id="estado"
                        name="estado"
                        value={filtros.estado}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Todos los estados</option>
                        <option value="agenda">Agenda</option>
                        <option value="sin asignar">Sin asignar</option>
                        <option value="en proceso">En proceso</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={limpiarFiltros}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
};

export default TableFilters;