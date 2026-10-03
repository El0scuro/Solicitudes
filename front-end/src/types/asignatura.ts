import { Seccion } from "./seccion";

export interface Asignatura {
    Codigo: string;
    Nombre: string;
    Ano_Malla: string;
    secciones: Seccion[] | null;
}