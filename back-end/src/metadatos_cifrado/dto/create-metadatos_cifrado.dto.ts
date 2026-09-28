import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetadatosCifradoDto {

    @IsString()
    @IsNotEmpty()
    Mail: string;

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