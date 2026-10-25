import { Column, Entity } from "typeorm";

@Entity("secretaria", { schema: "secretaria" })
export class Secretaria {

    @Column("varchar", { name: "Mail", length: 100 })
    Mail: string;

    @Column("varchar", {name: 'Contrasena', length: 384})
    Contrasena: string;

}
