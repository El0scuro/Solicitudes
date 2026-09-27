import { constants, privateDecrypt } from "node:crypto";
import { readFileSync } from 'node:fs';

export function descifrarLlaveTemporal(
    llaveCifrada: string,
    version: string
): Buffer {

    const llavePrivada = readFileSync(
        `/app/keys/front-end/${version}/private.pem`,
        'utf8'
    );
    
    const ciphertext = Buffer.from(llaveCifrada, 'base64');

    const temporal = privateDecrypt(
        {
            key: llavePrivada,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        ciphertext
    );

    return temporal;
}