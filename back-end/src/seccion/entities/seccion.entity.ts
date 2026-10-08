import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";
import type { SecretariaSeccion } from "../../secretaria_seccion/entities/secretaria_seccion.entity.js";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("seccion", { schema: "solicitud" })
export class Seccion {

    @Column("varchar", {name:'Sede', length: 100})
    Sede: string;

    @Column("varchar", {name:'Nombre_Profesor', length: 100})
    Nombre_Profesor: string;

    @PrimaryColumn({ type: "int", name: "num_Seccion" })
    num_Seccion: number;

    @PrimaryColumn("varchar", { name: "Codigo", length: 100 })
    Codigo: string;


    @ManyToOne(() => Asignatura, (asignatura) => asignatura.secciones)
    @JoinColumn([
        { name: "Codigo", referencedColumnName: "Codigo" }
    ])
    asignatura: Asignatura;


    @OneToMany("SecretariaSeccion", (secretariaSeccion: SecretariaSeccion) => secretariaSeccion.seccion)
    secretariaSecciones: SecretariaSeccion[];

    @OneToMany("Solicitud", (solicitud: Solicitud) => solicitud.seccion)
    solicitudes: Solicitud[];
}
