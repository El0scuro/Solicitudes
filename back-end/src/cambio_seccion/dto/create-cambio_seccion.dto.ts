import { ValidateNested } from "class-validator";
import { Seccion } from "../../seccion/entities/seccion.entity.js";
import { Type } from "class-transformer";

export class CreateCambioSeccionDto {
    
    @ValidateNested()
    @Type(() => Seccion)
    Seccion_Original: Seccion;

    @ValidateNested()
    @Type(() => Seccion)
    Seccion_Cambio: Seccion;

}
