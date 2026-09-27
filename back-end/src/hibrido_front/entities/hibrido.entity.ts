import { Column, Entity } from "typeorm";

@Entity("key", { schema: "metadata_llaves_transporte_front" })
export class Key {
    @Column("int", {primary: true, name: "Version"})
    Version: number;

    @Column("varchar", {primary: true, name: "Tipo", length:55})
    Tipo: string;

    @Column("varchar", {name: "Estado", length:55})
    Estado: string;

    @Column("varchar", {name: "Fecha_Creacion", length:100})
    Fecha_Creacion: string;

    @Column("varchar", {name: "Fecha_Vencimiento", length:100})
    Fecha_Vencimiento: string;
}