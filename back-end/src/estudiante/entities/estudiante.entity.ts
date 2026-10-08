import { Column, Entity, OneToMany } from "typeorm";
import { MetadatosCifrado } from "../../metadatos_cifrado/entities/metadatos_cifrado.entity.js";
import { Ficha } from "../../ficha/entities/ficha.entity.js";

@Entity("estudiante", { schema: "solicitud" })
export class Estudiante {
    @Column("varchar", { primary: true, name: "Rut", length: 384})
    Rut: string;

    @Column("varchar", { primary: true, name: "Digito_Verificador", length: 384 })
    Digito_Verificador: string;

    @Column("varchar", { name: "Primer_Nombre", length: 384 })
    Primer_Nombre: string;

    @Column("varchar", { name: "Segundo_Nombre", length: 384, nullable: true })
    Segundo_Nombre: string | null;

    @Column("varchar", { name: "Primer_Apellido", length: 384 })
    Primer_Apellido: string;

    @Column("varchar", { name: "Segundo_Apellido", length: 384 })
    Segundo_Apellido: string;

    @Column("varchar", { name: "Celular", length: 384 })
    Celular: string;

    @Column("varchar", { name: "Mail", length: 384, unique: true })
    Mail: string;

    @Column("varchar", { name: "Contrasena", length: 384 })
    Contrasena: string;

    @Column("varchar", {name: "Generacion", length: 384})
    Generacion: string;

    @Column("varchar", { name: "Semestre", length: 384 })
    Semestre: string;

    @Column("varchar", { name: "Ano_Ingreso", length: 384 })
    Ano_Ingreso: string;

    @Column("varchar", { name: "Sede", length: 384 })
    Sede: string;

    @OneToMany(
        () => MetadatosCifrado,
        (metadatosCifrado) => metadatosCifrado.estudiante
    )
    metadatosCifrados: MetadatosCifrado[];

    @OneToMany("Ficha", (fichas: Ficha) => fichas.estudiante)
    fichas: Ficha[];
}