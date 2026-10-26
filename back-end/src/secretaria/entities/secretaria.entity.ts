import { Column, Entity } from "typeorm";

@Entity("secretaria", { schema: "secretaria" })
export class Secretaria {

    @Column("varchar", {primary: true,  name: "Mail", length: 100 })
    Mail: string;

    @Column("varchar", {name: 'Contrasena', length: 384})
    Contrasena: string;
    
    @Column("varchar", { name: "Sede", length: 100 })
    Sede: string;
}
