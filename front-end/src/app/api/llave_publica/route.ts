import { NextResponse } from 'next/server';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIRECTORIO_LLAVES = '/app/keys/front-end';

export async function GET() {

    if (!existsSync(DIRECTORIO_LLAVES)) {
        return NextResponse.json(
            { mensaje: 'No existen llaves' },
            { status: 404 }
        );
    }

    const carpetas = readdirSync(DIRECTORIO_LLAVES);

    const versiones = carpetas
        .filter((nombre) => nombre.startsWith('key-'))
        .map((nombre) => ({
            nombre,
            version: Number(nombre.replace('key-', ''))
        }))
        .filter((llave) => !isNaN(llave.version));

    if (versiones.length === 0) {
        return NextResponse.json(
            { mensaje: 'No existen versiones de llaves' },
            { status: 404 }
        );
    }

    const ultimaVersion = versiones.reduce(
        (actual, siguiente) =>
            siguiente.version > actual.version
                ? siguiente
                : actual
    );

    const rutaLlavePublica = join(
        DIRECTORIO_LLAVES,
        ultimaVersion.nombre,
        'public.pem'
    );

    const llavePublica = readFileSync(
        rutaLlavePublica,
        'utf8'
    );

    return NextResponse.json({
        version: ultimaVersion.nombre,
        llave: llavePublica
    });
}