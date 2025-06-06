"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { datosEjemplo } from "@/core/tickets/data";
import { RegistroTabla } from "@/core/tickets/tableType";
import SidebarTicket from "./components/SidebarTicket";
import GroupCategoryTicket from "./components/GroupCategoryTicket";
import DateTimePicker from "@/core/ui/DateTimePicker";
import CustomDropdown from "@/core/ui/CustomDropDown";
import { FiUser } from "react-icons/fi";
import Tabs from "./components/TabsFormSection";

type OptionType = {
    id: number | string;
    value: string;
    label: string;
    icon?: React.ReactNode;
};

interface FormData {
    responsable: string;
    primeraFecha: Date;
    segundaFecha: Date;
    estadoInicial: string;
    estadoAtm: string;
    tipoDeProblema: string;
    subtipoProblema: string;
    quiebre: string
    tipoDeSolucion: string,
    areaDerivada: string,
    solucionEntregada: string,
    fechaDeAgendamiento: Date,
    ResponsableDeAtencionEnAgendamiento: string,
    temaAgendado: string

}

const responsableOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Huaman', label: 'Huaman', icon: <FiUser size={16} /> },
    { id: 3, value: 'Treisi A.', label: 'Treisi A.', icon: <FiUser size={16} /> },
    { id: 4, value: 'Diego H.', label: 'Diego H.', icon: <FiUser size={16} /> },
];

const estadoInicial: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Conforme', label: 'Conforme', icon: null },
    { id: 3, value: 'Inconforme', label: 'Inconforme', icon: null },
    { id: 4, value: 'NoContesta', label: 'No Contesta', icon: null },
]

const estadoAtm: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Conforme', label: 'Conforme', icon: null },
    { id: 3, value: 'Inconforme', label: 'Inconforme', icon: null },
    { id: 4, value: 'NoContesta', label: 'No contesta', icon: null },
    { id: 5, value: 'Agendado', label: 'Agendado', icon: null },
    { id: 6, value: 'SolicitaBaja', label: 'Solicita baja', icon: null },
    { id: 7, value: 'Seguimiento', label: 'Seguimiento', icon: null },
];

const tipodeproblema: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Tecnico', label: 'Técnico', icon: null },
    { id: 3, value: 'Comercial', label: 'Comercial', icon: null },

];

const subtypeProblemOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'ActivacionPendiente', label: 'Activación Pendiente', icon: null },
    { id: 3, value: 'BajaSVA', label: 'Baja SVA', icon: null },
    { id: 4, value: 'Competencia', label: 'Competencia', icon: null },
    { id: 5, value: 'Facturacion', label: 'Facturación', icon: null },
    { id: 6, value: 'InformacionComercial', label: 'Información Comercial', icon: null },
    { id: 7, value: 'Instalacion', label: 'Instalación', icon: null },
    { id: 8, value: 'Mudanza', label: 'Mudanza', icon: null },
    { id: 9, value: 'NoUsaServicio', label: 'No usa el servicio', icon: null },
    { id: 10, value: 'OfrecimientoVentas', label: 'Ofrecimiento Ventas', icon: null },
    { id: 11, value: 'SinDatos', label: 'Sin Datos', icon: null },
    { id: 12, value: 'Viaje', label: 'Viaje', icon: null },
    { id: 13, value: 'IncumplimientoPostventa', label: 'Incumplimiento postventa', icon: null },
];

const quiebreOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'CambioVelocidadPendiente', label: 'Cambio de Velocidad pendiente', icon: null },
    { id: 3, value: 'CobroNoReconocido', label: 'Cobro no reconocido', icon: null },
    { id: 4, value: 'DsctoNoEjecutado', label: 'Dscto. no ejecutado', icon: null },
    { id: 5, value: 'InstalacionErroneaIncompleta', label: 'Instalación errónea/incompleta', icon: null },
    { id: 6, value: 'InstalacionIncompleta', label: 'Instalación incompleta', icon: null },
    { id: 7, value: 'MaltratoPostventa', label: 'Maltrato atención postventa', icon: null },
    { id: 8, value: 'MaltratoInstalacion', label: 'Maltrato en instalación', icon: null },
    { id: 9, value: 'NegativaVT', label: 'Negativa VT', icon: null },
    { id: 10, value: 'OfertaCompetencia', label: 'Oferta competencia', icon: null },
    { id: 11, value: 'ProblemasEconomicos', label: 'Problemas económicos', icon: null },
    { id: 12, value: 'RestriccionCanales', label: 'Restricción de canales', icon: null },
    { id: 13, value: 'SinCoberturaZona', label: 'Sin cobertura de zona', icon: null },
    { id: 14, value: 'SinDatos', label: 'Sin datos', icon: null },
    { id: 15, value: 'SvaNoActivado', label: 'SVA no activado', icon: null },
    { id: 16, value: 'SvaNoCorresponde', label: 'SVA no corresponde', icon: null },
    { id: 17, value: 'TrasladoPendiente', label: 'Traslado pendiente', icon: null },
    { id: 18, value: 'CompetenciaAdquirida', label: 'Competencia adquirida', icon: null },
    { id: 19, value: 'UpgradeRechazado', label: 'Upgrade rechazado', icon: null },
    { id: 20, value: 'InfoErroneaVenta', label: 'Información errónea en la venta', icon: null },
];

const solutionsOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'EnLinea', label: 'En linea', icon: null },
    { id: 3, value: 'Derivado', label: 'Derivado', icon: null },

];

const areaDerivedOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'AT', label: 'AT', icon: null },
    { id: 3, value: 'NOC', label: 'NOC', icon: null },
    { id: 4, value: 'VT', label: 'VT', icon: null },
    { id: 5, value: 'BO', label: 'BO', icon: null },
    { id: 6, value: 'FID', label: 'FID', icon: null },
];

const solutionDerivedOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'SolucionEntregada', label: 'Solución_Entregada', icon: null },
    { id: 3, value: 'Descuento', label: 'Descuento', icon: null },
    { id: 4, value: 'CambioDePlan', label: 'Cambio de plan', icon: null },
    { id: 5, value: 'AreaNoDetalla', label: 'Área no detalla', icon: null },
    { id: 6, value: 'ActivacionSVA', label: 'Activación SVA', icon: null },
    { id: 7, value: 'TrasladoEjecutado', label: 'Traslado ejecutado', icon: null },
    { id: 8, value: 'BajaSVA', label: 'Baja SVA', icon: null },
    { id: 9, value: 'InformativoWIFI', label: 'Informativo WIFI', icon: null },
    { id: 10, value: 'CableadoMESH', label: 'Cableado MESH', icon: null },
    { id: 11, value: 'MeshCableado', label: 'MESH + CABLEADO', icon: null },
    { id: 12, value: 'ConfiguracionGW', label: 'Configuración GW', icon: null },
    { id: 13, value: 'CambioDNS', label: 'Cambio DNS', icon: null },
    { id: 14, value: 'ReinicioONT', label: 'Reinicio de ONT', icon: null },
    { id: 15, value: 'ResetFactoryONT', label: 'Reset de fábrica ONT', icon: null },
    { id: 16, value: 'CambioPatchcord', label: 'Cambio de patchcord', icon: null },
    { id: 17, value: 'CambioRoseta', label: 'Cambio de roseta', icon: null },
    { id: 18, value: 'RecableadoDROP', label: 'Recableado DROP', icon: null },
    { id: 19, value: 'CambioIP', label: 'Cambio de IP', icon: null },
    { id: 20, value: 'CambioONT', label: 'Cambio de ONT', icon: null },
    { id: 21, value: 'ReubicacionONT', label: 'Reubicación ONT', icon: null },
    { id: 22, value: 'MantenimientoPEXT', label: 'Mantenimiento PEXT', icon: null },
    { id: 23, value: 'EntregaMESH', label: 'Entrega MESH', icon: null },
    { id: 24, value: 'ReseleccionCanales', label: 'Reselección de canales', icon: null },
    { id: 25, value: 'ConfiguracionWIFI', label: 'Configuración WIFI', icon: null },
    { id: 26, value: 'ConfiguracionVOIP', label: 'Configuración VOIP', icon: null },
    { id: 27, value: 'AsignamientoVLAN', label: 'Asignamiento VLAN', icon: null },
    { id: 28, value: 'RematriculaONT', label: 'Rematrícula ONT', icon: null },
    { id: 29, value: 'ConfiguracionSTA', label: 'Configuración STA', icon: null },
    { id: 30, value: 'SuspensionTemporal', label: 'Suspensión temporal', icon: null },
    { id: 31, value: 'ConfiguracionMESH', label: 'Configuración MESH', icon: null },
    { id: 32, value: 'InformativoCGNAT', label: 'Informativo CGNAT', icon: null },
    { id: 33, value: 'LiberacionCargaEstatica', label: 'Liberación de carga estática', icon: null },
    { id: 34, value: 'CambioTitular', label: 'Cambio de titular', icon: null },
    { id: 35, value: 'CableadoOTROS', label: 'Cableado OTROS', icon: null },
    { id: 36, value: 'STAHardwareLimitado', label: 'STA Hardware limitado', icon: null },
    { id: 37, value: 'EntregaWINBOX', label: 'Entrega de WINBOX', icon: null },
];

const responsableAgOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Liliana Z.', label: 'Huaman', icon: null },
    { id: 3, value: 'Treisi A.', label: 'Treisi A.', icon: null },
    { id: 4, value: 'Diego H.', label: 'Diego H.', icon: null },
];

const themeAgOptions: OptionType[] = [
    { id: 1, value: '', label: 'Sin asignar', icon: null },
    { id: 2, value: 'Soporte', label: 'Soporte', icon: null },
];

const tabItems = [
    { id: "datos", label: "Datos Iniciales" },
    { id: "problema", label: "Problema" },
    { id: "solucion", label: "Solución" },
    { id: "agendamiento", label: "Agendamiento" },
];

export default function EditTicketPage() {
    const [formData, setFormData] = useState<FormData>({
        responsable: "",
        primeraFecha: new Date,
        segundaFecha: new Date,
        estadoInicial: "",
        estadoAtm: "",
        tipoDeProblema: "",
        subtipoProblema: "",
        quiebre: "",
        tipoDeSolucion: "",
        areaDerivada: "",
        solucionEntregada: "",
        fechaDeAgendamiento: new Date,
        ResponsableDeAtencionEnAgendamiento: "",
        temaAgendado: ""
    });
    const params = useParams();
    const id = params?.id;
    const [activeSection, setActiveSection] = useState("datos");
    const [ticket, setTicket] = useState<RegistroTabla | undefined>();
    const [fechaPrimera, setFechaPrimera] = useState<Date>(new Date());
    const [fechaSegunda, setFechaSegunda] = useState<Date>(new Date());
    const handleDropdownChange = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    useEffect(() => {
        const findData = datosEjemplo.find((data) => data.id == id);
        if (!findData) {
            console.log("Ticket no encontrado");
        }
        setTicket(findData);
    }, [id]);

    return (
        <div className="flex p-4 gap-6 justify-between ">
            <div className=" w-[80%] ">
                <div className="w-full max-h-screen ">
                    <h2 className="mb-4 font-bold text-2xl">Atención del ticket n. {ticket?.id}</h2>

                    <Tabs tabs={tabItems} activeTab={activeSection} onChange={setActiveSection} />

                    {activeSection === "datos" && (<>
                        <GroupCategoryTicket namegroup="1. Responsable y fechas">

                            <CustomDropdown
                                label="Responsable de atención"
                                name="responsable"
                                options={responsableOptions}
                                placeholder="Sin asignar"
                                onChange={(value) => handleDropdownChange('responsable', value)}
                            />
                            <DateTimePicker
                                label="Primera fecha de revisión"
                                value={fechaPrimera}
                                onChange={(date) => setFechaPrimera(date)}
                            />
                            <DateTimePicker
                                label="Segunda fecha de revisión"
                                value={fechaSegunda}
                                onChange={(date) => setFechaSegunda(date)}
                            />

                        </GroupCategoryTicket >
                        <GroupCategoryTicket namegroup="2. Estado de caso"  >

                            <CustomDropdown options={estadoInicial}
                                label="Estado inicial"
                                name="EstadoInicial"
                                placeholder="Sin asignar" />
                            <CustomDropdown options={estadoAtm}
                                label="Estado atm"
                                name="estadoAtm"
                                placeholder="Sin asignar" />

                        </GroupCategoryTicket></>

                    )}

                    {activeSection === "problema" && (<>


                        <GroupCategoryTicket namegroup="3. Clasificacion del problema">

                            <CustomDropdown options={tipodeproblema}
                                label="Tipo de problema"
                                name="TipoDeProblema"
                                placeholder="Sin asignar"
                            />


                            <CustomDropdown options={subtypeProblemOptions}
                                label="Subtipo de problema"
                                name="SubtipoProblema"
                                placeholder="Sin asignar"
                            />

                            <CustomDropdown options={quiebreOptions}
                                label="Quiebre"
                                name="Quiebre"
                                placeholder="Sin asignar"
                            />




                        </GroupCategoryTicket>
                    </>
                    )}

                    {activeSection === "solucion" && (
                        <GroupCategoryTicket namegroup="Asignación de solución">

                            <CustomDropdown options={solutionsOptions}
                                label="Tipo de solución"
                                name="TipoSolución"
                                placeholder="Sin asignar"

                            />



                            <CustomDropdown
                                options={areaDerivedOptions}
                                label="Área derivada"
                                name="area_derived"
                                placeholder="Sin asignar"
                            />

                            <CustomDropdown
                                options={solutionDerivedOptions}
                                label="Solución entregada"
                                name="solution_derived"
                                placeholder="Sin asignar"
                            />
                        </GroupCategoryTicket>
                    )}


                    {activeSection === "agendamiento" && (
                        <GroupCategoryTicket namegroup="4. Agendamiento">

                            <DateTimePicker
                                label="Fecha de agendamiento"
                                value={fechaPrimera}
                                onChange={(date) => setFechaPrimera(date)}
                            />
                            <CustomDropdown
                                options={responsableAgOptions}
                                label="Responsable de atención"
                                name="responsable_ag"
                                placeholder="Sin asignar"
                            />

                            <CustomDropdown
                                options={themeAgOptions}
                                label="Tema agendado"
                                name="theme_ag"
                                placeholder="Sin asignar"
                            />

                        </GroupCategoryTicket>
                    )}


                </div>

                <div className="mt-6 flex gap-4 place-self-center">
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={() => {
                            // Aquí iría la función para guardar la información
                            alert("Guardar clickeado");
                        }}
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                        onClick={() => {
                            // Aquí iría la función para cancelar/limpiar el formulario o regresar
                            alert("Cancelar clickeado");
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            <SidebarTicket detailsTicket={ticket} />
        </div>
    );
}
