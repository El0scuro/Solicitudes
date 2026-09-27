import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetadatosCifradoDto {

    @IsString()
    @IsNotEmpty()
    Rut: string;

    @IsString()
    @IsNotEmpty()
    Version_Llave: string;

    @IsString()
    @IsNotEmpty()
    Iv: string;

    @IsString()
    @IsNotEmpty()
    Atributo: string;

    @IsString()
    @IsNotEmpty()
    AuthTag: string;
}