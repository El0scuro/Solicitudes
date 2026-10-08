import { Asignatura } from "./asignatura";

export interface Seccion {
    num_Seccion: number | null;
    asignatura: Asignatura | null;
    Nombre_Profesor: string;
}