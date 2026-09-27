import { createDecipheriv } from "node:crypto";

export function descifrarDatoTransporte(
    valor: string, 
    ivValor: string,
    authTag: string, 
    llaveTemporal: Buffer
): string {
    
    // 1. Convertimos los strings Base64 a Buffers
    const textoCifrado = Buffer.from(valor, 'base64');
    const iv = Buffer.from(ivValor, 'base64');
    const tag = Buffer.from(authTag, 'base64');

    // 2. Inicializamos el decipher
    const decipher = createDecipheriv(
        'aes-256-gcm',
        llaveTemporal,
        iv
    );

    // 3. Asignamos el AuthTag recibido desde la petición
    decipher.setAuthTag(tag);

    
    // 4. Desciframos y validamos la autenticidad
    const texto = Buffer.concat([
        decipher.update(textoCifrado),
        decipher.final(),
    ]);

    return texto.toString('utf8');
}