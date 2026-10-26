import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import type { Ficha } from "../../ficha/entities/ficha.entity.js";
import type { CambioSeccion } from "../../cambio_seccion/entities/cambio_seccion.entity.js";
import type { Inscripcion } from "../../inscripcion/entities/inscripcion.entity.js";
import type { Justificacion } from "../../justificacion/entities/justificacion.entity.js";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";

@Entity("solicitud", { schema: "solicitud" })
export class Solicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_Solicitud" })
    ID_Solicitud: number;

    @ManyToOne("Ficha", (ficha: Ficha) => ficha.solicitudes)
    @JoinColumn([{ name: "ID_Ficha", referencedColumnName: "ID_Ficha" }])
    ficha: Ficha;

    @ManyToOne("Asignatura", (asignatura: Asignatura) => asignatura.solicitudes)
    @JoinColumn([
        { name: "Codigo", referencedColumnName: "Codigo" },
        { name: "Ano_Malla", referencedColumnName: "Ano_Malla"}
    ])
    asignatura: Asignatura;

    @OneToOne("CambioSeccion", (cambioSeccion: CambioSeccion) => cambioSeccion.solicitud)
    cambioSeccion: CambioSeccion;

    @OneToOne("Inscripcion", (inscripcion: Inscripcion) => inscripcion.solicitud)
    inscripcion: Inscripcion;

    @OneToOne("Justificacion", (justificacion: Justificacion) => justificacion.solicitud)
    justificacion: Justificacion;
}
