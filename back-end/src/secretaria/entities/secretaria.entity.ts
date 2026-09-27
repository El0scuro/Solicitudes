import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Administrador } from "../../administrador/entities/administrador.entity.js";
import { SecretariaSeccion } from "../../secretaria_seccion/entities/secretaria_seccion.entity.js";

@Entity("secretaria", { schema: "solicitud" })
export class Secretaria {
    @Column("int", { primary: true, name: "Rut_Secretaria" })
    Rut_Secretaria: number;

    @Column("int", { primary: true, name: "Digito_Verificador_Secretaria" })
    Digito_Verificador_Secretaria: number;

    @Column("int", { name: "Rut_Administrador" })
    Rut_Administrador: number;

    @Column("int", { name: "Digito_Verificador_Administrador" })
    Digito_Verificador_Administrador: number;

    @Column("varchar", { name: "Primer_Nombre", length: 100 })
    Primer_Nombre: string;

    @Column("varchar", { name: "Segundo_Nombre", length: 100, nullable: true })
    Segundo_Nombre: string | null;

    @Column("varchar", { name: "Primer_Apellido", length: 100 })
    Primer_Apellido: string;

    @Column("varchar", { name: "Segundo_Apellido", length: 100 })
    Segundo_Apellido: string;

    @Column("varchar", { name: "Mail", length: 100 })
    Mail: string;

    @ManyToOne(() => Administrador, (administrador) => administrador.secretarias)
    @JoinColumn([
        { name: "Rut_Administrador", referencedColumnName: "Rut" },
        { name: "Digito_Verificador_Administrador", referencedColumnName: "Digito_Verificador" }
    ])
    administrador: Administrador;

    @OneToMany(() => SecretariaSeccion, (secretariaSeccion) => secretariaSeccion.secretaria)
    secretariaSecciones: SecretariaSeccion[];
}
