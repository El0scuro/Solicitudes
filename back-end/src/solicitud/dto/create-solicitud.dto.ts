import { Type } from "class-transformer";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";
import { ValidateNested } from "class-validator";

export class CreateSolicitudDto {

    @ValidateNested()
    @Type(() => Asignatura)
    asignatura: Asignatura;

}
