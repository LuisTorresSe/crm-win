import { useState } from 'react';

interface TableHeaderProps {
    onSort: (campo: string) => void;
    campoOrdenActual: string;
    ordenAscendente: boolean;
}

const TableHeader = ({
    onSort,
    campoOrdenActual,
    ordenAscendente,
}: TableHeaderProps) => {
    // Función para mostrar el indicador de ordenamiento
    const renderSortIndicator = (campo: string) => {
        if (campoOrdenActual === campo) {
            return ordenAscendente ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            );
        }
        return null;
    };

    const handleSort = (campo: string) => {
        onSort(campo);
    };

    return (
        <thead className="bg-gray-100">
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('dni')}
                >
                    DNI
                    {renderSortIndicator('dni')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('numero')}
                >
                    Número
                    {renderSortIndicator('numero')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('responsable')}
                >
                    Responsable
                    {renderSortIndicator('responsable')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('estado')}
                >
                    Estado
                    {renderSortIndicator('estado')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('fechaEntrega')}
                >
                    Fecha de Entrega
                    {renderSortIndicator('fechaEntrega')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('tipoBase')}
                >
                    Tipo Base
                    {renderSortIndicator('tipoBase')}
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                    Acciones
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;