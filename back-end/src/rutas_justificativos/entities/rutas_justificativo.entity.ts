import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Justificacion } from "../../justificacion/entities/justificacion.entity.js";

@Entity("rutas_justificativos", { schema: "solicitud" })
export class RutasJustificativos {
    @PrimaryColumn("int", { name: "ID_Solicitud" })
    ID_Solicitud: number;

    @PrimaryColumn("varchar", { name: "Ruta_Justificativo", length: 255 })
    Ruta_Justificativo: string;

    @ManyToOne(() => Justificacion, (justificacion) => justificacion.rutasJustificativos)
    @JoinColumn([{ name: "ID_Solicitud", referencedColumnName: "ID_solicitud" }])
    justificacion: Justificacion;
}
