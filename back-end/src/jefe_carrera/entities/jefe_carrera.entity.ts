import { Column, Entity } from "typeorm";

@Entity("estudiante", { schema: "solicitud" })
export class Jefe_Carrera {

    @Column("varchar", { primary: true, name: "Mail", length: 100 })
    Mail: string;

    @Column("varchar", { name: "Sede", length: 100 })
    Sede: string;

    @Column("varchar", {name: 'Contrasena', length: 384})
    Contrasena: string;

}