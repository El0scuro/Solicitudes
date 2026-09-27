import { Column, Entity, OneToMany } from "typeorm";
import { Seccion } from "../../seccion/entities/seccion.entity.js";

@Entity("asignatura", { schema: "solicitud" })
export class Asignatura {
    @Column("varchar", { primary: true, name: "Codigo", length: 100 })
    Codigo: string;

    @Column("varchar", { name: "Nombre", length: 100 })
    Nombre: string;

    @Column("varchar", { name: "Semestre", length: 100 })
    Semestre: string;

    @OneToMany(() => Seccion, (seccion) => seccion.asignatura)
    secciones: Seccion[];
}
