import { IsOptional, IsString } from "class-validator";

export class CreateEstudianteDto {

    @IsString()
    Primer_Nombre: string;

    @IsString()
    Iv_Primer_Nombre: string;

    @IsString()
    Tag_Primer_Nombre: string;


    @IsString()
    @IsOptional()
    Segundo_Nombre?: string;

    @IsString()
    @IsOptional()
    Iv_Segundo_Nombre?: string;

    @IsString()
    @IsOptional()
    Tag_Segundo_Nombre?: string;


    @IsString()
    Primer_Apellido: string;

    @IsString()
    Iv_Primer_Apellido: string;

    @IsString()
    Tag_Primer_Apellido: string;


    @IsString()
    Segundo_Apellido: string;

    @IsString()
    Iv_Segundo_Apellido: string;

    @IsString()
    Tag_Segundo_Apellido: string;


    @IsString()
    Celular: string;

    @IsString()
    Iv_Celular: string;

    @IsString()
    Tag_Celular: string;


    @IsString()
    Mail: string;

    @IsString()
    Iv_Mail: string;

    @IsString()
    Tag_Mail: string;


    @IsString()
    Contrasena: string;

    @IsString()
    Iv_Contrasena: string;

    @IsString()
    Tag_Contrasena: string;


    @IsString()
    Rut: string;

    @IsString()
    Iv_Rut: string;

    @IsString()
    Tag_Rut: string;


    @IsString()
    Digito_Verificador: string;

    @IsString()
    Iv_Digito_Verificador: string;

    @IsString()
    Tag_Digito_Verificador: string;


    @IsString()
    Ano_Ingreso: string;

    @IsString()
    Iv_Ano_Ingreso: string;

    @IsString()
    Tag_Ano_Ingreso: string;


    @IsString()
    Sede: string;

    @IsString()
    Iv_Sede: string;

    @IsString()
    Tag_Sede: string;


    @IsString()
    Semestre: string;

    @IsString()
    Iv_Semestre: string;

    @IsString()
    Tag_Semestre: string;


    @IsString()
    Llave_Cifrada: string;

    @IsString()
    Version_Llave: string;
}