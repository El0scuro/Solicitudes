import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import type { Solicitud } from "../../solicitud/entities/solicitud.entity.js";

@Entity("cambio_seccion", { schema: "solicitud" })
export class CambioSeccion {
    @PrimaryColumn("int", { name: "ID_Solicitud" })
    ID_Solicitud: number;

    @Column({type: "int", name: "Num_Seccion_Original"})
    Num_Seccion_Original: number;

    @Column("varchar", {name: "Profesor_Original", length:100})
    Profesor_Original: string;

    @OneToOne("Solicitud", (solicitud: Solicitud) => solicitud.cambioSeccion)
    @JoinColumn([{ name: "ID_Solicitud", referencedColumnName: "ID_Solicitud" }])
    solicitud: Solicitud;
}
