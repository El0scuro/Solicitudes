import { Column, Entity, OneToMany } from "typeorm";
import { Ficha } from "../../ficha/entities/ficha.entity.js";

@Entity("estudiante", { schema: "solicitud" })
export class Jefe_Carrera {
    @Column("int", { primary: true, name: "Rut" })
    Rut: number;

    @Column("int", { primary: true, name: "Digito_Verificador" })
    Digito_Verificador: number;

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

    @Column("varchar", { name: "Semestre", length: 100 })
    Semestre: string;

    @Column("varchar", { name: "Sede", length: 100 })
    Sede: string;

    @OneToMany(() => Ficha, (ficha) => ficha.jefe_carrera)
    fichas: Ficha[];
}