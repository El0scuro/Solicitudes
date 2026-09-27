import { Seccion } from "./seccion";

export interface Asignatura {
    Codigo: string;
    Nombre: string;
    secciones: Seccion[];
}