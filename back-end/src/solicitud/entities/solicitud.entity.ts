import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import type { Ficha } from "../../ficha/entities/ficha.entity.js";
import type { Seccion } from "../../seccion/entities/seccion.entity.js";
import type { CambioSeccion } from "../../cambio_seccion/entities/cambio_seccion.entity.js";
import type { Inscripcion } from "../../inscripcion/entities/inscripcion.entity.js";
import type { Justificacion } from "../../justificacion/entities/justificacion.entity.js";

@Entity("solicitud", { schema: "solicitud" })
export class Solicitud {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_Solicitud" })
    ID_Solicitud: number;

    @ManyToOne("Ficha", (ficha: Ficha) => ficha.solicitudes)
    @JoinColumn([{ name: "ID_Ficha", referencedColumnName: "ID_Ficha" }])
    ficha: Ficha;

    @ManyToOne("Seccion", (seccion: Seccion) => seccion.solicitudes)
    @JoinColumn([{ name: "ID_Seccion", referencedColumnName: "ID_Seccion" }])
    seccion: Seccion;

    @OneToOne("CambioSeccion", (cambioSeccion: CambioSeccion) => cambioSeccion.solicitud)
    cambioSeccion: CambioSeccion;

    @OneToOne("Inscripcion", (inscripcion: Inscripcion) => inscripcion.solicitud)
    inscripcion: Inscripcion;

    @OneToOne("Justificacion", (justificacion: Justificacion) => justificacion.solicitud)
    justificacion: Justificacion;
}
