import { generateKeyPairSync, } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, writeFileSync, } from 'node:fs';
import { join, } from 'node:path';
const DIRECTORIO_LLAVES = '/app/keys/back-end';
function obtenerSiguienteVersion() {
    if (!existsSync(DIRECTORIO_LLAVES)) {
        return 1;
    }
    const carpetas = readdirSync(DIRECTORIO_LLAVES);
    const versiones = carpetas
        .filter((nombre) => nombre.startsWith('key-'))
        .map((nombre) => {
        return Number(nombre.replace('key-', ''));
    })
        .filter((numero) => !isNaN(numero));
    if (versiones.length === 0) {
        return 1;
    }
    return Math.max(...versiones) + 1;
}
export function generarLlaves() {
    if (!existsSync(DIRECTORIO_LLAVES)) {
        mkdirSync(DIRECTORIO_LLAVES, {
            recursive: true,
        });
    }
    const version = obtenerSiguienteVersion();
    const nombreVersion = `key-${String(version).padStart(3, '0')}`;
    const directorioVersion = join(DIRECTORIO_LLAVES, nombreVersion);
    mkdirSync(directorioVersion);
    console.log(`Generando ${nombreVersion}...`);
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });
    writeFileSync(join(directorioVersion, 'public.pem'), publicKey);
    writeFileSync(join(directorioVersion, 'private.pem'), privateKey);
    console.log('Llaves generadas correctamente.');
    console.log(`Versión: ${nombreVersion}`);
    console.log(`Directorio: ${directorioVersion}`);
    return version;
}
//# sourceMappingURL=generar-llaves-transporte.js.map