// utils/table-utils.ts

import { FiltrosTabla, RegistroTabla } from "./tableType";


/**
 * Filtra los registros de la tabla según los criterios especificados
 */
export const filtrarRegistros = (
    registros: RegistroTabla[],
    filtros: FiltrosTabla
): RegistroTabla[] => {
    return registros.filter((registro) => {
        // Filtrar por DNI (si hay un valor en el filtro)
        const coincideDNI = filtros.dni
            ? registro.dni.toLowerCase().includes(filtros.dni.toLowerCase())
            : true;

        // Filtrar por responsable (si hay un valor en el filtro)
        const coincideResponsable = filtros.responsable
            ? registro.responsable.toLowerCase().includes(filtros.responsable.toLowerCase())
            : true;

        // Filtrar por estado (si hay un valor en el filtro)
        const coincideEstado = filtros.estado ? registro.estado === filtros.estado : true;

        // El registro debe cumplir con todos los filtros aplicados
        return coincideDNI && coincideResponsable && coincideEstado;
    });
};

/**
 * Formatea la fecha de YYYY-MM-DD a DD/MM/YYYY para mostrar en la tabla
 */
export const formatearFecha = (fecha: string): string => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

/**
 * Obtiene un array de responsables únicos para el selector de filtro
 */
export const obtenerResponsablesUnicos = (registros: RegistroTabla[]): string[] => {
    const responsablesSet = new Set<string>();

    registros.forEach(registro => {
        if (registro.responsable) {
            responsablesSet.add(registro.responsable);
        }
    });

    return Array.from(responsablesSet).sort();
};

/**
 * Determina el color de fondo según el estado
 */
export const obtenerColorEstado = (estado: string): string => {
    switch (estado) {
        case 'agenda':
            return 'bg-blue-100 text-blue-800';
        case 'sin asignar':
            return 'bg-gray-100 text-gray-800';
        case 'en proceso':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};