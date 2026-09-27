import { Column, Entity, PrimaryColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";
import type { RutasJustificativos } from "../../rutas_justificativos/entities/rutas_justificativo.entity.js";

@Entity("justificacion", { schema: "solicitud" })
export class Justificacion {
    @PrimaryColumn("int", { name: "ID_solicitud" })
    ID_solicitud: number;

    @Column("varchar", { name: "Fecha_Inasistencia", length: 100 })
    Fecha_Inasistencia: string;

    @Column("varchar", { name: "Tipo_Justificacion", length: 100 })
    Tipo_Justificacion: string;

    @Column("varchar", { name: "Semestre", length: 100 })
    Semestre: string;

    @OneToOne("Solicitud", (solicitud:Solicitud) => solicitud.justificacion)
    @JoinColumn([{ name: "ID_solicitud", referencedColumnName: "ID_Solicitud" }])
    solicitud: Solicitud;

    @OneToMany("RutasJustificativos", (rutasJustificativos: RutasJustificativos) => rutasJustificativos.justificacion)
    rutasJustificativos: RutasJustificativos[];
}
