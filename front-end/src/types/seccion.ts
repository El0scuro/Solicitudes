import { Asignatura } from "./asignatura";

export interface Seccion {
    num_Seccion: number;
    asignatura: Asignatura;
    mail_Profesor: string;
}