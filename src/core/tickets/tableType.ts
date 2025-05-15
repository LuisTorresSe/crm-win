export type Estado = 'agenda' | 'sin asignar' | 'en proceso';

export type TipoBase = 'tipo1' | 'tipo2' | 'tipo3';

export interface RegistroTabla {
    id: string;
    dni: string;
    numero: string;
    responsable: string;
    estado: Estado;
    fechaEntrega: string; // Formato YYYY-MM-DD
    tipoBase: TipoBase;
}

export interface FiltrosTabla {
    dni: string;
    responsable: string;
    estado: Estado | '';
}