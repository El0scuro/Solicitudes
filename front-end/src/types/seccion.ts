import { Asignatura } from "./asignatura";
import { Profesor } from "./profesor";

export interface Seccion {
    num_Seccion: number | null;
    asignatura: Asignatura | null;
    profesor: Profesor | null;
}