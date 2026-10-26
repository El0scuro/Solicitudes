import { Column, Entity, OneToMany } from "typeorm";
import { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("asignatura", { schema: "solicitud" })
export class Asignatura {
    @Column("varchar", { primary: true, name: "Codigo", length: 100 })
    Codigo: string;

    @Column("varchar", { name: "Nombre", length: 100 })
    Nombre: string;

    @Column("varchar", { name: "Semestre", length: 100 })
    Semestre: string;

    @Column("varchar", { primary: true, name: "Ano_Malla", length: 100 })
    Ano_Malla: string;

    @OneToMany(() => Solicitud, (solicitud) => solicitud.asignatura)
    solicitudes: Solicitud[];
}
