import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import type { Estudiante } from '../../estudiante/entities/estudiante.entity.js';

@Entity('metadatos_cifrado')
export class MetadatosCifrado {

    @PrimaryGeneratedColumn({ type: "int", name: "ID_Cifrado" })
    ID_Cifrado: number;

    @Column("varchar", { name: "Mail", length: 384 })
    Mail: string;

    @Column("varchar", { name: "Version_Llave", length: 384 })
    Version_Llave: string;

    @Column("varchar", { name: "Iv", length: 384 })
    Iv: string;

    @Column("varchar", { name: "AuthTag", length: 384 })
    AuthTag: string;

    @Column("varchar", { name: "Atributo", length: 384 })
    Atributo: string;

    @ManyToOne(
        "Estudiante",
        (estudiante: Estudiante) => estudiante.metadatosCifrados,
        {
            nullable: false,
        },
    )
    @JoinColumn(
        {
            name: 'Rut',
            referencedColumnName: 'Rut',
        },
    )
    estudiante: Estudiante;
}