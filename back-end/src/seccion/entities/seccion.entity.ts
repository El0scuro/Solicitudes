import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";
import { Profesor } from "../../profesor/entities/profesor.entity.js";
import type { SecretariaSeccion } from "../../secretaria_seccion/entities/secretaria_seccion.entity.js";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("seccion", { schema: "solicitud" })
export class Seccion {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_Seccion" })
    ID_Seccion: number;

    @Column("varchar", { name: "Codigo", length: 100 })
    Codigo: string;

    @Column("int", { name: "Rut" })
    Rut: number;

    @Column("int", { name: "Digito_Verificador" })
    Digito_Verificador: number;

    @ManyToOne(() => Asignatura, (asignatura) => asignatura.secciones)
    @JoinColumn([{ name: "Codigo", referencedColumnName: "Codigo" }])
    asignatura: Asignatura;

    @ManyToOne(() => Profesor, (profesor) => profesor.secciones)
    @JoinColumn([
        { name: "Digito_Verificador", referencedColumnName: "Digito_Verificador" },
        { name: "Rut", referencedColumnName: "Rut" }
    ])
    profesor: Profesor;

    @OneToMany("SecretariaSeccion", (secretariaSeccion: SecretariaSeccion) => secretariaSeccion.seccion)
    secretariaSecciones: SecretariaSeccion[];

    @OneToMany("Solicitud", (solicitud: Solicitud) => solicitud.seccion)
    solicitudes: Solicitud[];
}
