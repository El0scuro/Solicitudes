import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Almacenamiento } from './entities/almacenamiento.entity.js';
import { Repository } from 'typeorm';
import {generarLlave} from '../scripts/generar-llaves-almacenamiento.js'
import { readFileSync } from 'node:fs';
import {randomBytes, createCipheriv, createDecipheriv} from 'node:crypto';

@Injectable()
export class AlmacenamientoService {

  constructor(
    @InjectRepository(Almacenamiento, 'almacenamiento')
    private almacenamientoRepository: Repository<Almacenamiento>
  ) {}
  
  // minuto / hora / dia-mes / mes / dia-semana
  //Esta función se ejecutará todos los días a las 12:00 de la noche
  @Cron('* * * * *')
  async create() {

      //traigo la fecha de vencimiento de la última llave pública
      const currentPublic = await this.almacenamientoRepository.findOne({
          where:{
              Estado: "current"
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
          const version = generarLlave();

          //guardo la fecha de vencimiento
          const diasExtra = 30;
          const vencimientoDate = new Date();
          vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
          const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

          //agrego los metadatos de la llave publica a la bd
          const nuevo = this.almacenamientoRepository.create({
              Version: version,
              Estado: "current",
              Fecha_Creacion: fechaActual,
              Fecha_Vencimiento: fechaVencimiento
          });

          return this.almacenamientoRepository.save(nuevo);
      }

      //reviso que si llave actual venció hoy
      if(fechaActual >= currentPublic?.Fecha_Vencimiento){
          //creo las llaves y guardo la version
          const version = generarLlave();
          
          //actualizo el estado de la última llave a "old"
          await this.almacenamientoRepository.update(
              {
                  Version: (version - 1)
              },
              {Estado: "old"}
          );

          //guardo la fecha de vencimiento
          const diasExtra = 30;
          const vencimientoDate = new Date();
          vencimientoDate.setDate(hoyDate.getDate() + diasExtra);
          const fechaVencimiento = vencimientoDate.toISOString().split('T')[0];

          //agrego los metadatos de la llave a la bd
          const nuevo = this.almacenamientoRepository.create({
              Version: version,
              Estado: "current",
              Fecha_Creacion: fechaActual,
              Fecha_Vencimiento: fechaVencimiento
          });

          return this.almacenamientoRepository.save(nuevo);
      }
  }

  //funcion para buscar una llave
  async getKey(version: string){

    const llave = readFileSync(`/app/keys/almacenamiento/${version}/key.bin`);

    return llave;
  }

  async getCurrent() {
    const llave = await this.almacenamientoRepository.findOne({
        where: {
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

    const current = readFileSync(`/app/keys/almacenamiento/${version}/key.bin`);

    return {
        llave: current,
        version: version
    };
}

  async cifrarDatoAlmacenamiento(
        dato: string,
        llave: Buffer
    ): Promise<{
        iv: string;
        cifrado: string;
        authTag: string;
    }> {

        const iv = randomBytes(12);

        const cipher = createCipheriv(
            'aes-256-gcm',
            llave,
            iv
        );

        let cifrado = cipher.update(
            dato,
            'utf8',
            'base64'
        );

        cifrado += cipher.final('base64');

        const authTag = cipher.getAuthTag();

        return {
            iv: iv.toString('base64'),
            cifrado,
            authTag: authTag.toString('base64')
        };
    }

  async descifrarDatoAlmacenamiento(
        ciphertext: string,
        ivDato: string,
        authTag: string,
        llave: Buffer
    ): Promise<string> {

        const iv = Buffer.from(ivDato, 'base64');
        const tag = Buffer.from(authTag, 'base64');

        const decipher = createDecipheriv(
            'aes-256-gcm',
            llave,
            iv
        );

        decipher.setAuthTag(tag);

        let descifrado = decipher.update(
            ciphertext,
            'base64',
            'utf8'
        );

        descifrado += decipher.final('utf8');

        return descifrado;
    }

  findAll() {
    return `This action returns all almacenamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} almacenamiento`;
  }


  remove(id: number) {
    return `This action removes a #${id} almacenamiento`;
  }
}
