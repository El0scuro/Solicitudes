import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";
import { Profesor } from "../../profesor/entities/profesor.entity.js";
import type { SecretariaSeccion } from "../../secretaria_seccion/entities/secretaria_seccion.entity.js";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("seccion", { schema: "solicitud" })
export class Seccion {
    @Column({ type: "int", name: "num_Seccion" })
    num_Seccion: number;

    @Column("varchar", { name: "Codigo", length: 100 })
    Codigo: string;

    @ManyToOne(() => Asignatura, (asignatura) => asignatura.secciones)
    @JoinColumn([
        { name: "Codigo", referencedColumnName: "Codigo" },
        { name: "Ano_Malla", referencedColumnName: "Ano_Malla"}
    ])
    asignatura: Asignatura;

    @ManyToOne(() => Profesor, (profesor) => profesor.secciones)
    @JoinColumn([
        { name: "mail_Profesor", referencedColumnName: "Mail" },
    ])
    profesor: Profesor;

    @OneToMany("SecretariaSeccion", (secretariaSeccion: SecretariaSeccion) => secretariaSeccion.seccion)
    secretariaSecciones: SecretariaSeccion[];

    @OneToMany("Solicitud", (solicitud: Solicitud) => solicitud.seccion)
    solicitudes: Solicitud[];
}
