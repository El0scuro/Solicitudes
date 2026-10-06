import { IsString } from "class-validator";

export class CreateCambioSeccionDto {
    
    @IsString()
    Seccion_Original: number;
}
