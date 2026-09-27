//import para la creación de las llaves
import {
    generateKeyPairSync,
} from 'node:crypto';

//imports para manipulación y creación de los archivos
import {
    existsSync,
    mkdirSync,
    readdirSync,
    writeFileSync,
} from 'node:fs';

//import para la creación de las rutas
import {
    join,
} from 'node:path';

//Carpeta principal que almacenará las versiones de las llaves
const DIRECTORIO_LLAVES = '/app/keys/back-end';


function obtenerSiguienteVersion(): number {

    if (!existsSync(DIRECTORIO_LLAVES)) {
        return 1;
    }

    //guarda los nombres de las carpetas
    const carpetas = readdirSync(DIRECTORIO_LLAVES);

    //filtra las carpetas que no empiecen por "key-" y luego conserva el número de la versión
    const versiones = carpetas
        .filter((nombre) => nombre.startsWith('key-'))
        .map((nombre) => {
            return Number(nombre.replace('key-', ''));
        })
        .filter((numero) => !isNaN(numero));

    if (versiones.length === 0) {
        return 1;
    }

    //retorna el número más alto y le suma uno para indicar la nueva versión
    return Math.max(...versiones) + 1;
}


export function generarLlaves() {

    if (!existsSync(DIRECTORIO_LLAVES)) {
        mkdirSync(DIRECTORIO_LLAVES, {
            recursive: true,
        });
    }

    //numero de versión de la llave
    const version = obtenerSiguienteVersion();

    //creo el nombre completo "key-00x"
    const nombreVersion = `key-${String(version).padStart(3, '0')}`;

    //crea la ruta de la carpeta
    const directorioVersion = join(
        DIRECTORIO_LLAVES,
        nombreVersion
    );

    //crea la carpeta
    mkdirSync(directorioVersion);

    console.log(`Generando ${nombreVersion}...`);

    //genera las llaves 
    const { publicKey, privateKey } =
        generateKeyPairSync('rsa', {

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

    //crea los archivos dentro de la carpeta "key-00x/public.pem"
    writeFileSync(
        join(directorioVersion, 'public.pem'),
        publicKey
    );

    writeFileSync(
        join(directorioVersion, 'private.pem'),
        privateKey
    );


    console.log('Llaves generadas correctamente.');
    console.log(`Versión: ${nombreVersion}`);
    console.log(`Directorio: ${directorioVersion}`);

    return version;
}

