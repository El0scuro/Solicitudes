import { Column, Entity } from "typeorm";

@Entity("key", { schema: "metadata_llaves_almacenamiento" })
export class Almacenamiento {

    @Column("int", {
        primary: true,
        name: "Version",
    })
    Version: number;

    @Column("varchar", {
        name: "Fecha_Creacion",
        length: 100
    })
    Fecha_Creacion: string;

    @Column("varchar", {
        name: "Fecha_Vencimiento",
        length: 55
    })
    Fecha_Vencimiento: string;

    @Column("varchar", {
        name: "Estado",
        length: 55,
    })
    Estado: string;
}