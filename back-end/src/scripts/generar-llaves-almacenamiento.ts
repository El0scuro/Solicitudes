// Import para generar la llave AES
import {
    randomBytes,
} from 'node:crypto';

// Imports para manipulación y creación de archivos
import {
    existsSync,
    mkdirSync,
    readdirSync,
    writeFileSync,
} from 'node:fs';

// Import para la creación de rutas
import {
    join,
} from 'node:path';


// Carpeta principal que almacenará las versiones de las llaves
const DIRECTORIO_LLAVES = '/app/keys/almacenamiento';


function obtenerSiguienteVersion(): number {

    if (!existsSync(DIRECTORIO_LLAVES)) {
        return 1;
    }

    // Guarda los nombres de las carpetas
    const carpetas = readdirSync(DIRECTORIO_LLAVES);

    // Filtra las carpetas que comiencen por "key-"
    // y conserva solamente el número de versión
    const versiones = carpetas
        .filter((nombre) => nombre.startsWith('key-'))
        .map((nombre) => {
            return Number(nombre.replace('key-', ''));
        })
        .filter((numero) => !isNaN(numero));

    if (versiones.length === 0) {
        return 1;
    }

    // Retorna el número más alto + 1
    return Math.max(...versiones) + 1;
}


export function generarLlave() {

    // Si no existe la carpeta principal, la crea
    if (!existsSync(DIRECTORIO_LLAVES)) {
        mkdirSync(DIRECTORIO_LLAVES, {
            recursive: true,
        });
    }

    // Número de versión de la llave
    const version = obtenerSiguienteVersion();

    // Crea el nombre "key-001", "key-002", etc.
    const nombreVersion = `key-${String(version).padStart(3, '0')}`;

    // Crea la ruta de la carpeta de la versión
    const directorioVersion = join(
        DIRECTORIO_LLAVES,
        nombreVersion
    );

    // Crea la carpeta
    mkdirSync(directorioVersion);

    console.log(`Generando ${nombreVersion}...`);

    // Genera una llave AES de 256 bits
    const llave = randomBytes(32);

    // Guarda la llave
    writeFileSync(
        join(directorioVersion, 'key.bin'),
        llave
    );

    console.log('Llave AES generada correctamente.');
    console.log(`Versión: ${nombreVersion}`);
    console.log(`Directorio: ${directorioVersion}`);

    return version;
}
