import { IsString } from "class-validator";

export class CreateJustificacionDto {

    @IsString()
    ID_Solicitud: string;

    
    @IsString()
    Fecha_Inasistencia: string;
    
    @IsString()
    Tipo_Justificacion: string;

    @IsString()
    Semestre: string;
}
