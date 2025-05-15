"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableFilters from './TableFilters';
import TablePagination from './TablePagination';
import { FiltrosTabla, RegistroTabla } from '@/core/tickets/tableType';
import { filtrarRegistros } from '@/core/tickets/utils';

interface TableProps {
    registros: RegistroTabla[];
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onAssign?: (id: string) => void;
}

const Table = ({
    registros,
    onView = () => { },
    onEdit,
    onDelete = () => { },
    onAssign = () => { }
}: TableProps) => {
    const router = useRouter();

    const [filtros, setFiltros] = useState<FiltrosTabla>({
        dni: '',
        responsable: '',
        estado: '',
    });

    const handleEdit = (id: string) => {
        if (onEdit) {
            onEdit(id);
        } else {
            router.push(`/tickets/${id}/edit`);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [campoOrdenActual, setCampoOrdenActual] = useState<string>('fechaEntrega');
    const [ordenAscendente, setOrdenAscendente] = useState<boolean>(true);
    const [registrosFiltrados, setRegistrosFiltrados] = useState<RegistroTabla[]>([]);

    useEffect(() => {
        let resultado = filtrarRegistros(registros, filtros);

        resultado = [...resultado].sort((a, b) => {
            const valorA = a[campoOrdenActual as keyof RegistroTabla];
            const valorB = b[campoOrdenActual as keyof RegistroTabla];

            if (typeof valorA === 'string' && typeof valorB === 'string') {
                return ordenAscendente
                    ? valorA.localeCompare(valorB)
                    : valorB.localeCompare(valorA);
            }

            if (campoOrdenActual === 'fechaEntrega') {
                const dateA = new Date(valorA as string);
                const dateB = new Date(valorB as string);
                return ordenAscendente ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
            }

            return 0;
        });

        setRegistrosFiltrados(resultado);
        setCurrentPage(1);
    }, [registros, filtros, campoOrdenActual, ordenAscendente]);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const handleSort = (campo: string) => {
        if (campo === campoOrdenActual) {
            setOrdenAscendente(!ordenAscendente);
        } else {
            setCampoOrdenActual(campo);
            setOrdenAscendente(true);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = registrosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flex flex-col">
            <TableFilters
                registros={registros}
                filtros={filtros}
                setFiltros={setFiltros}
            />

            <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow border-b border-gray-200 rounded-lg overflow-hidden">
                        {registrosFiltrados.length > 0 ? (
                            <>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <TableHeader
                                        onSort={handleSort}
                                        campoOrdenActual={campoOrdenActual}
                                        ordenAscendente={ordenAscendente}
                                    />
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((registro) => (
                                            <TableRow
                                                key={registro.id}
                                                registro={registro}
                                                onView={onView}
                                                onEdit={handleEdit}
                                                onDelete={onDelete}
                                                onAssign={onAssign}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <TablePagination
                                    totalItems={registrosFiltrados.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <div className="bg-white px-4 py-10 text-center">
                                <p className="text-gray-500">No se encontraron registros con los filtros aplicados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
