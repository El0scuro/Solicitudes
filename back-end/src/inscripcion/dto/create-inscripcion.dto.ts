import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Asignatura } from "../../asignatura/entities/asignatura.entity.js";

export class CreateInscripcionDto {

    @IsString()
    Tipo_Inscripcion: string;

    @IsString()
    num_Seccion: number;

    @IsString()
    Nombre_Profesor: string;

    @ValidateNested()
    @Type(() => Asignatura)
    asignatura: Asignatura;

}
