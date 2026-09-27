import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("inscripcion", { schema: "solicitud" })
export class Inscripcion {
    @PrimaryColumn("int", { name: "ID_Solicitud" })
    ID_Solicitud: number;

    @Column("varchar", { name: "Ruta_Carta", length: 255 })
    Ruta_Carta: string;

    @Column("varchar", { name: "Tipo_Inscripcion", length: 100 })
    Tipo_Inscripcion: string;

    @OneToOne("Solicitud", (solicitud:Solicitud) => solicitud.inscripcion)
    @JoinColumn([{ name: "ID_Solicitud", referencedColumnName: "ID_Solicitud" }])
    solicitud: Solicitud;
}
