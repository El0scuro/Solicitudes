import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type { Seccion } from "../../seccion/entities/seccion.entity.js";
import type { Secretaria } from "../../secretaria/entities/secretaria.entity.js";

@Entity("secretaria_seccion", { schema: "solicitud" })
export class SecretariaSeccion {
    @PrimaryColumn("int", { name: "Rut" })
    Rut: number;

    @PrimaryColumn("int", { name: "Digito_Verificador" })
    Digito_Verificador: number;

    @PrimaryColumn("int", { name: "ID_Seccion" })
    ID_Seccion: number;

    @ManyToOne("Seccion", (seccion: Seccion) => seccion.secretariaSecciones)
    @JoinColumn([{ name: "ID_Seccion", referencedColumnName: "ID_Seccion" }])
    seccion: Seccion;

    @ManyToOne("Secretaria", (secretaria: Secretaria) => secretaria.secretariaSecciones)
    @JoinColumn([
        { name: "Rut", referencedColumnName: "Rut_Secretaria" },
        { name: "Digito_Verificador", referencedColumnName: "Digito_Verificador_Secretaria" }
    ])
    secretaria: Secretaria;
}
