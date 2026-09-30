import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Key } from './entities/hibrido.entity.js';
import { Repository } from 'typeorm';
import {createDecipheriv} from 'node:crypto';
import axios from 'axios';

interface DatoEncriptado {
    ivValor: string;
    valor: string;
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
        @InjectRepository(Key, 'transporte_front')
        private key_frontRepository: Repository<Key>
    ) {}

    async create(body: {
        version: number,
        fechaActual: string,
        fechaVencimiento: string
    }) {

        //agrego los metadatos de la llave publica a la bd
        const nuevoPublic = this.key_frontRepository.create({
            Version: body.version,
            Tipo: "public",
            Estado: "current",
            Fecha_Creacion: body.fechaActual,
            Fecha_Vencimiento: body.fechaVencimiento
        });

        //agrego los metadatos de la llave privada a la bd
        const nuevoPriv = this.key_frontRepository.create({
            Version: body.version,
            Tipo: "private",
            Estado: "current",
            Fecha_Creacion: body.fechaActual,
            Fecha_Vencimiento: body.fechaVencimiento
        });

        return this.key_frontRepository.save([nuevoPublic, nuevoPriv]);
    }

    async metadatos() {
        const metadatos_Publica = await this.key_frontRepository.findOne({
            where: {
                Estado: "current",
                Tipo: "public"
            },
            select: {
                Fecha_Vencimiento: true
            }
        });

        return metadatos_Publica?.Fecha_Vencimiento
    }

    async updateMetadatos(body: {version: number}) {
        //actualizo el estado de la última llave pública a "old"
            await this.key_frontRepository.update(
                {
                    Version: (body.version - 1),
                    Tipo: "public"
                },
                {Estado: "old"}
            );

            //actualizo el estado de la última llave privada a "old"
            await this.key_frontRepository.update(
                {
                    Version: (body.version - 1),
                    Tipo: "private"
                },
                {Estado: "old"}
            );

    }
    
    async getCurrent() {

    const llave = await this.key_frontRepository.findOne({
	where: {
            Tipo: "public",
            Estado: "current"
        },
        select: {
            Version: true
        }
    });

    if (!llave) {
        console.log("C: NO EXISTE LLAVE");
        throw new NotFoundException('llave no encontrada');
    }
    
    let version: string;

    if (llave.Version < 10) {

        version = 'key-00' + String(llave.Version);

    } else if (llave.Version < 100) {

        version = 'key-0' + String(llave.Version);

    } else {

        version = 'key-' + String(llave.Version);
    }

    const response = await axios.get(
        `http://10.62.142.92:3001/api/keys/${version}`
    );

    return {
        llave: response.data.llave,
        version: version
    };
}
     

    async cifrarEstudiante(estudiante: EstudianteDescifrado, clave: Buffer){

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

            //por si la persona no tiene segundo nombre
            if (valor === null || valor === '') {
                continue;
            }

            const textoDato = String(valor);

            const datoValor = new TextEncoder().encode(textoDato);

            const ivValor = crypto.getRandomValues(
                new Uint8Array(12)
            );

            const cifradoValor = await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: ivValor
                },
                cryptoKey,
                datoValor
            );

            datosEncriptados.push({
                ivValor: this.uint8ArrayABase64(ivValor),
                valor: this.arrayBufferABase64(cifradoValor)
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

    async descifrarDatoTransporte(valor: string, ivValor: string, llaveTemporal: Buffer){
        const cifrado = Buffer.from(
            valor,
            'base64'
        );

        const iv = Buffer.from(
            ivValor,
            'base64'
        );

        const tag = cifrado.subarray(cifrado.length - 16);
        const textoCifrado = cifrado.subarray(0, cifrado.length - 16);

        const decipher = createDecipheriv(
            'aes-256-gcm',
            llaveTemporal,
            iv
        );

        decipher.setAuthTag(tag);

        const texto = Buffer.concat([
            decipher.update(textoCifrado),
            decipher.final(),
        ]);

        const dato = texto.toString('utf8');

        return dato;
    }
}
