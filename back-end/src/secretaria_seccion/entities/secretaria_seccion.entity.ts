import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type { Seccion } from "../../seccion/entities/seccion.entity.js";
import type { Secretaria } from "../../secretaria/entities/secretaria.entity.js";

@Entity("secretaria_seccion", { schema: "solicitud" })
export class SecretariaSeccion {

    @PrimaryColumn("int", { name: "num_Solicitud" })
    num_Seccion: number;
    
    @PrimaryColumn({ type: 'varchar', length: 100 })
    Codigo: string;
  
    @PrimaryColumn({ type: 'varchar', length: 100 })
    Mail: number;
    
    @ManyToOne("Seccion", (seccion: Seccion) => seccion.secretariaSecciones)
    @JoinColumn([
	{ name: "num_Seccion", referencedColumnName: "num_Seccion" },
	{ name: "Codigo", referencedColumnName: "Codigo" }
    ])
    seccion: Seccion;

    @ManyToOne("Secretaria", (secretaria: Secretaria) => secretaria.secretariaSecciones)
    @JoinColumn([
        { name: "Mail", referencedColumnName: "Mail" }
    ])
    secretaria: Secretaria;
}
