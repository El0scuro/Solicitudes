import { NextResponse } from 'next/server';

import { descifrarLlaveTemporal } from '@/lib/crypto/llaveTemporal';
import { descifrarDatoTransporte } from '@/lib/crypto/descifrarDatoTransporte';

// interfaz para el estudiante cifrado para transporte
interface EstudianteCifrado {
    // Mail
    Mail: string;
    Iv_Mail: string;
    Tag_Mail: string;

    // Primer Nombre
    Primer_Nombre: string;
    Iv_Primer_Nombre: string;
    Tag_Primer_Nombre: string;

    // Segundo Nombre (Opcional)
    Segundo_Nombre?: string;
    Iv_Segundo_Nombre?: string;
    Tag_Segundo_Nombre?: string;

    // Primer Apellido
    Primer_Apellido: string;
    Iv_Primer_Apellido: string;
    Tag_Primer_Apellido: string;

    // Segundo Apellido
    Segundo_Apellido: string;
    Iv_Segundo_Apellido: string;
    Tag_Segundo_Apellido: string;

    // Celular
    Celular: string;
    Iv_Celular: string;
    Tag_Celular: string;

    // RUT
    Rut: string;
    Iv_Rut: string;
    Tag_Rut: string;

    // Dígito Verificador
    Digito_Verificador: string;
    Iv_Digito_Verificador: string;
    Tag_Digito_Verificador: string;

    // Año de Ingreso
    Ano_Ingreso: string;
    Iv_Ano_Ingreso: string;
    Tag_Ano_Ingreso: string;

    // Sede
    Sede: string;
    Iv_Sede: string;
    Tag_Sede: string;

    // Semestre
    Semestre: string;
    Iv_Semestre: string;
    Tag_Semestre: string;

    // Claves de Transporte
    Llave_Cifrada: string;
    Version_Llave: string;
}

interface EstudianteDescifrado {
    Mail: string;
    Primer_Nombre: string;
    Segundo_Nombre?: string;
    Primer_Apellido: string;
    Segundo_Apellido: string;
    Celular: string;
    Rut: string;
    Digito_Verificador: string;
    Ano_Ingreso: string;
    Sede: string;
    Semestre: string;
}

export async function POST(request: Request) {

    const datosEstudiante: EstudianteCifrado =
        await request.json();

    // Objeto donde guardaremos los datos descifrados
    const estudiante_Descifrado: EstudianteDescifrado = {
        Mail: '',
        Primer_Nombre: '',
        Segundo_Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Celular: '',
        Rut: '',
        Digito_Verificador: '',
        Ano_Ingreso: '',
        Sede: '',
        Semestre: ''
    };

    // Desciframos la llave AES temporal
    const llaveTemporal = descifrarLlaveTemporal(
        datosEstudiante.Llave_Cifrada,
        datosEstudiante.Version_Llave
    );

    // Desciframos cada atributo
    for (const atributo of Object.keys(estudiante_Descifrado)) {

        const clave =
            atributo as keyof EstudianteDescifrado;

        // Nombre del IV
        const nombreIv =
            `Iv_${atributo}` as keyof EstudianteCifrado;

        // Nombre del AuthTag
        const nombreTag =
            `Tag_${atributo}` as keyof EstudianteCifrado;

        // Obtenemos IV, AuthTag y valor cifrado
        const iv =
            datosEstudiante[nombreIv];

        const authTag =
            datosEstudiante[nombreTag];

        const valorCifrado =
            datosEstudiante[clave];

        // Si falta alguno de los datos necesarios, saltamos el atributo
        if (!valorCifrado || !iv || !authTag) {
            console.log("iv: ", iv, "authtag: ", authTag, "valorcifrado: ", valorCifrado)
            continue;
        }

        estudiante_Descifrado[clave] =
            descifrarDatoTransporte(
                valorCifrado,
                iv,
                authTag,
                llaveTemporal
            );
    }

    // Enviamos el estudiante ya descifrado al navegador
    return NextResponse.json(estudiante_Descifrado);
}