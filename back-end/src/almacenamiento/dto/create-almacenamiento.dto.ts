import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsString,
} from "class-validator";

export class CreateAlmacenamientoDto {

    @IsInt()
    @IsNotEmpty()
    Version: number;

    @IsDateString()
    @IsNotEmpty()
    Fecha_Creacion: Date;

    @IsDateString()
    @IsNotEmpty()
    Fecha_Vencimiento: Date;

    @IsString()
    @IsNotEmpty()
    Estado: string;
}