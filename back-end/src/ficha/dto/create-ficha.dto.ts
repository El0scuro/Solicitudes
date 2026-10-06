import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateInscripcionDto } from "../../inscripcion/dto/create-inscripcion.dto.js";
import { CreateJustificacionDto } from "../../justificacion/dto/create-justificacion.dto.js";
import { CreateCambioSeccionDto } from "../../cambio_seccion/dto/create-cambio_seccion.dto.js";

export class CreateFichaDto {

    //Datos de la Ficha//
    @IsString()
    Mail: string;

    @IsString()
    Fecha_Actual: string;

    @IsString()
    Estado: string;


    //Revisamos que solicitudes vienen en la ficha//
    @IsBoolean()
    Inscripcion: boolean;

    @IsBoolean()
    Desinscripcion: boolean;

    @IsBoolean()
    Clase: boolean;

    @IsBoolean()
    Evaluacion: boolean;

    @IsBoolean()
    Cambio: boolean;


    //Inscripciones y Desinscripciones//
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateInscripcionDto)
    Inscripciones: CreateInscripcionDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateInscripcionDto)
    Desinscripciones: CreateInscripcionDto[];


    //Clase y Evaluacion//
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateJustificacionDto)
    Clases: CreateJustificacionDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateJustificacionDto)
    Evaluaciones: CreateJustificacionDto[];


    //Cambios//
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateCambioSeccionDto)
    Cambios: CreateCambioSeccionDto[];
}
