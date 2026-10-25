import { Column, Entity } from "typeorm";

@Entity("administrador", { schema: "administrador" })
export class Administrador {

    @Column("varchar", { primary: true, name: "Mail", length: 100 })
    Mail: string;

    @Column("varchar", {name: 'Contrasena', length: 384})
    Contrasena: string;
}

