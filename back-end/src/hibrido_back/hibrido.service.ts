import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/hibrido.entity.js';
import { Repository } from 'typeorm';
import {generarLlaves} from '../scripts/generar-llaves-transporte.js'
import { readFileSync } from 'node:fs';
import { Cron } from '@nestjs/schedule';
import {createDecipheriv} from 'node:crypto';

interface DatoEncriptado {
    ivValor: string;
    valor: string;
    authTag: string;
}

//interfaz para el estudiante descifrado en almacenamiento
interface EstudianteDescifrado {
    Primer_Nombre: string;
    Segundo_Nombre?: string;
    Primer_Apellido: string;
    Segundo_Apellido: string;
    Celular: string;
    Mail: string;
    Rut: string;
    Digito_Verificador: string;
    Ano_Ingreso: string;
    Sede: string;
    Semestre: string;
}

@Injectable()
export class HibridoService {

    constructor(
        @InjectRepository(Key, 'transporte_back')
        private key_backRepository: Repository<Key>
    ) {}

    // minuto / hora / dia-mes / mes / dia-semana
    //Esta función se ejecutará todos los días a las 12:00 de la noche
    @Cron('* * * * *')
    async create() {

        //traigo la fecha de vencimiento de la última llave pública
        const currentPublic = await this.key_backRepository.findOne({
            where:{
                Estado: "current",
                Tipo: "public"
            },
            select: {
                Fecha_Vencimiento: true
            }
        });

        //guardo la fecha actual
        const hoyDate = new Date();
        const fechaActual = hoyDate.toISOString().split('T')[0];

        if(!currentPublic){
            //creo las llaves y guardo la version
            const version = generarLlaves();

            //guardo la fecha de vencimiento
            const diasExtra = 30;
            const vencimientoDate = new Date();
            vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
            const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

            //agrego los metadatos de la llave publica a la bd
            const nuevoPublic = this.key_backRepository.create({
                Version: version,
                Tipo: "public",
                Estado: "current",
                Fecha_Creacion: fechaActual,
                Fecha_Vencimiento: fechaVencimiento
            });

            //agrego los metadatos de la llave privada a la bd
            const nuevoPriv = this.key_backRepository.create({
                Version: version,
                Tipo: "private",
                Estado: "current",
                Fecha_Creacion: fechaActual,
                Fecha_Vencimiento: fechaVencimiento
            })

            return this.key_backRepository.save([nuevoPublic, nuevoPriv]);
        }

        //reviso que si la llave actual venció hoy
        if(fechaActual >= currentPublic?.Fecha_Vencimiento){
            //creo las llaves y guardo la version
            const version = generarLlaves();
            
            //actualizo el estado de la última llave pública a "old"
            await this.key_backRepository.update(
                {
                    Version: (version - 1),
                    Tipo: "public"
                },
                {Estado: "old"}
            );

            //actualizo el estado de la última llave privada a "old"
            await this.key_backRepository.update(
                {
                    Version: (version - 1),
                    Tipo: "private"
                },
                {Estado: "old"}
            );

            //guardo la fecha de vencimiento
            const diasExtra = 30;
            const vencimientoDate = new Date();
            vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
            const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

            //agrego los metadatos de la llave publica a la bd
            const nuevoPublic = this.key_backRepository.create({
                Version: version,
                Tipo: "public",
                Estado: "current",
                Fecha_Creacion: fechaActual,
                Fecha_Vencimiento: fechaVencimiento
            });

            //agrego los metadatos de la llave privada a la bd
            const nuevoPriv = this.key_backRepository.create({
                Version: version,
                Tipo: "private",
                Estado: "current",
                Fecha_Creacion: fechaActual,
                Fecha_Vencimiento: fechaVencimiento
            })

            return this.key_backRepository.save([nuevoPublic, nuevoPriv]);
        }
    }

    async getCurrent() {
        const llave = await this.key_backRepository.findOne({
            where: {
                Tipo: "public",
                Estado: "current"
            },
            select: {
                Version: true
            }
        }); 

        if(!llave){
            throw new NotFoundException('llave no encontrada');
        }

        let version: string;

        if(llave.Version < 10){
            version = 'key-00' + String(llave.Version); 
        }else if(llave.Version < 100){
            version = 'key-0' + String(llave.Version); 
        }else{
            version = 'key-' + String(llave.Version); 
        }

        const current = readFileSync(`/app/keys/back-end/${version}/public.pem`, 'utf8');
		

        return {
            llave: current,
            version: version
        };
    }

    async cifrarEstudiante(estudiante: EstudianteDescifrado, clave: Buffer) {

        const datosEncriptados: DatoEncriptado[] = [];

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            new Uint8Array(clave),
            {
                name: 'AES-GCM',
            },
            false,
            ['encrypt']
        );

        for (const [atributo, valor] of Object.entries(estudiante)) {

            // por si la persona no tiene segundo nombre u otro atributo opcional
            if (valor === null || valor === '') {
                continue;
            }

            const textoDato = String(valor);
            const datoValor = new TextEncoder().encode(textoDato);

            const ivValor = crypto.getRandomValues(
                new Uint8Array(12)
            );

            // Retorna un ArrayBuffer que concatena: [Texto Cifrado (N bytes) + AuthTag (16 bytes)]
            const cifradoConTag = await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: ivValor
                },
                cryptoKey,
                datoValor
            );

            // Separamos el ciphertext del AuthTag (16 bytes = 128 bits)
            const tagLengthBytes = 16;
            const totalBytes = cifradoConTag.byteLength;
            const ciphertextBytes = totalBytes - tagLengthBytes;

            // Slice de los datos cifrados y del tag
            const ciphertextBuffer = cifradoConTag.slice(0, ciphertextBytes);
            const authTagBuffer = cifradoConTag.slice(ciphertextBytes);

            datosEncriptados.push({
                ivValor: this.uint8ArrayABase64(ivValor),
                valor: this.arrayBufferABase64(ciphertextBuffer),
                authTag: this.arrayBufferABase64(authTagBuffer),
            });
            
        }
        

        return datosEncriptados;
    }

    //transforma de uint8Array a string
    uint8ArrayABase64(bytes: Uint8Array): string {
        let binary = '';

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    //transforma de arrayBuffer a string
    arrayBufferABase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    async descifrarDatoTransporte(
        valor: string,
        ivValor: string,
        authTagValor: string,
        llaveTemporal: Buffer
    ) {
        const textoCifrado = Buffer.from(
            valor,
            'base64'
        );

        const iv = Buffer.from(
            ivValor,
            'base64'
        );

        const authTag = Buffer.from(
            authTagValor,
            'base64'
        );

        const decipher = createDecipheriv(
            'aes-256-gcm',
            llaveTemporal,
            iv
        );

        decipher.setAuthTag(authTag);

        const texto = Buffer.concat([
            decipher.update(textoCifrado),
            decipher.final(),
        ]);

        const dato = texto.toString('utf8');

        return dato;
    }
}
