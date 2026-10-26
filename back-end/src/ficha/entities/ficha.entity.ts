import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Solicitud } from "../../solicitud/entities/solicitud.entity.js";
import { Jefe_Carrera } from "../../jefe_carrera/entities/jefe_carrera.entity.js";
import { Estudiante } from "../../estudiante/entities/estudiante.entity.js";

@Entity("ficha", { schema: "solicitud" })
export class Ficha {
    @PrimaryGeneratedColumn({ type: "int", name: "ID_Ficha" })
    ID_Ficha: number;

    @Column("varchar", { name: "Fecha_Actual", length: 100 })
    Fecha_Actual: string;

    @Column("varchar", { name: "Estado", length: 55 })
    Estado: string;

    @Column("varchar", { name: "Sede", length: 100 })
    Sede: string;
    
    @OneToMany(() => Solicitud, (solicitud) => solicitud.ficha)
    solicitudes: Solicitud[];

    @ManyToOne("Estudiante", (estudiante: Estudiante) => estudiante.fichas)
    @JoinColumn(
        {name: "Mail", referencedColumnName: "Mail"}
    )
    estudiante: Estudiante;
}
