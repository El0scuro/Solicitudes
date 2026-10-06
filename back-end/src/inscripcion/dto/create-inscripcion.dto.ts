import { IsNumber, IsString } from "class-validator";

export class CreateInscripcionDto {

    @IsString()
    Tipo_Inscripcion: string;


    @IsString()
    Codigo: string;

    @IsString()
    Ano_Malla: string;

    @IsNumber()
    num_Seccion: number;

}
