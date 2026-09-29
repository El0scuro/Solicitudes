import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity.js';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { constants, privateDecrypt, publicEncrypt, randomBytes, } from 'node:crypto';
import { AlmacenamientoService } from '../almacenamiento/almacenamiento.service.js';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto.js';
import { MetadatosCifradoService } from '../metadatos_cifrado/metadatos_cifrado.service.js';
import { HibridoService as HibridoServiceBack } from '../hibrido_back/hibrido.service.js';
import { HibridoService as HibridoServicefront } from '../hibrido_front/hibrido.service.js';

//interfaz para el estudiante cifrado para transporte
export interface EstudianteCifrado {
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

    // Rut
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

@Injectable()
export class EstudianteService {

  constructor(
      @InjectRepository(Estudiante, 'solicitudes')
      private estudianteRepository: Repository<Estudiante>,

      private readonly metadatosCifradoService: MetadatosCifradoService,

      private readonly almacenamientoService: AlmacenamientoService,

      private readonly hibridoServiceBack: HibridoServiceBack,

      private readonly hibridoServiceFront: HibridoServicefront,


  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {

    //traigo la llave privada de transporte
    const llavePrivadaTransporte = readFileSync(
      `keys/back-end/${createEstudianteDto.Version_Llave}/private.pem`,
      'utf8'
    );

    //descifro la llave temporal con la privada
    const llaveTemporal: Buffer = privateDecrypt(
        {
            key: llavePrivadaTransporte,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(createEstudianteDto.Llave_Cifrada, 'base64')
    );

    const mail_Transporte_Descifrado = await this.hibridoServiceBack
        .descifrarDatoTransporte(
            createEstudianteDto.Mail, 
            createEstudianteDto.Iv_Mail, 
            createEstudianteDto.Tag_Mail,
            llaveTemporal);

    const existente = await this.estudianteRepository.findOne({
        where:{
            Mail: mail_Transporte_Descifrado
        }
    })

    if(existente){
        return "Estudiante existente en el sistema";
    }

    //almaceno la llave y su versión
    const llaveAlmacenamiento = await this.almacenamientoService.getCurrent();

    // Le aplico un hash a la contraseña
    const ContrasenaHash = await bcrypt.hash(
        await this.hibridoServiceBack.descifrarDatoTransporte(
            createEstudianteDto.Contrasena,
            createEstudianteDto.Iv_Contrasena,
            createEstudianteDto.Tag_Contrasena,
            llaveTemporal
        ),
        10
    );

    //Rut
    const rut_Cifrado = 
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Rut,
                createEstudianteDto.Iv_Rut,
                createEstudianteDto.Tag_Rut,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );

    // Dígito verificador
    const digito_Verificador_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Digito_Verificador,
                createEstudianteDto.Iv_Digito_Verificador,
                createEstudianteDto.Tag_Digito_Verificador,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Primer nombre
    const primer_Nombre_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Primer_Nombre,
                createEstudianteDto.Iv_Primer_Nombre,
                createEstudianteDto.Tag_Primer_Nombre,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Segundo nombre
    let segundo_Nombre_cifrado;

    if (
        createEstudianteDto.Segundo_Nombre &&
        createEstudianteDto.Iv_Segundo_Nombre &&
        createEstudianteDto.Tag_Segundo_Nombre
    ) {
        segundo_Nombre_cifrado =
            await this.almacenamientoService.cifrarDatoAlmacenamiento(
                await this.hibridoServiceBack.descifrarDatoTransporte(
                    createEstudianteDto.Segundo_Nombre,
                    createEstudianteDto.Iv_Segundo_Nombre,
                    createEstudianteDto.Tag_Segundo_Nombre,
                    llaveTemporal
                ),
                llaveAlmacenamiento.llave
            );
    }


    // Primer apellido
    const primer_Apellido_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Primer_Apellido,
                createEstudianteDto.Iv_Primer_Apellido,
                createEstudianteDto.Tag_Primer_Apellido,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Segundo apellido
    const segundo_Apellido_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Segundo_Apellido,
                createEstudianteDto.Iv_Segundo_Apellido,
                createEstudianteDto.Tag_Segundo_Apellido,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Celular
    const celular_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Celular,
                createEstudianteDto.Iv_Celular,
                createEstudianteDto.Tag_Celular,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );

    // Semestre
    const semestre_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Semestre,
                createEstudianteDto.Iv_Semestre,
                createEstudianteDto.Tag_Semestre,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Año de ingreso
    const ano_Ingreso_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Ano_Ingreso,
                createEstudianteDto.Iv_Ano_Ingreso,
                createEstudianteDto.Tag_Ano_Ingreso,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );


    // Sede
    const sede_Cifrado =
        await this.almacenamientoService.cifrarDatoAlmacenamiento(
            await this.hibridoServiceBack.descifrarDatoTransporte(
                createEstudianteDto.Sede,
                createEstudianteDto.Iv_Sede,
                createEstudianteDto.Tag_Sede,
                llaveTemporal
            ),
            llaveAlmacenamiento.llave
        );

    // Creo el nuevo estudiante cifrado
    const nuevo = this.estudianteRepository.create({

        Rut: rut_Cifrado.cifrado,

        Digito_Verificador: digito_Verificador_Cifrado.cifrado,

        Primer_Nombre: primer_Nombre_Cifrado.cifrado,

        // Segundo nombre: primero reviso si existe
        Segundo_Nombre: segundo_Nombre_cifrado?.cifrado,

        Primer_Apellido: primer_Apellido_Cifrado.cifrado,

        Segundo_Apellido: segundo_Apellido_Cifrado.cifrado,

        Celular: celular_Cifrado.cifrado,

        Mail: mail_Transporte_Descifrado + "@estudiantes.uv.cl",

        Contrasena: ContrasenaHash,

        Semestre: semestre_Cifrado.cifrado,

        Ano_Ingreso: ano_Ingreso_Cifrado.cifrado,

        Sede: sede_Cifrado.cifrado,
    });

    
    interface DatoCifrado {
        cifrado: string;
        iv: string;
        authTag: string;
    }

    const datosCifrados: Record<string, DatoCifrado | undefined> = {
        Rut: rut_Cifrado,
        Digito_Verificador: digito_Verificador_Cifrado,
        Primer_Nombre: primer_Nombre_Cifrado,
        Segundo_Nombre: segundo_Nombre_cifrado,
        Primer_Apellido: primer_Apellido_Cifrado,
        Segundo_Apellido: segundo_Apellido_Cifrado,
        Celular: celular_Cifrado,
        Semestre: semestre_Cifrado,
        Ano_Ingreso: ano_Ingreso_Cifrado,
        Sede: sede_Cifrado
    };

    await this.estudianteRepository.save(nuevo);

    //recorro todos los atributos del estudiante, y voy guardando los metadatos de cifrado de cada atributo
    for (const atributo of Object.keys(datosCifrados)) {

        const datoCifrado = datosCifrados[atributo];

        if (!datoCifrado) {
            continue;
        }

        console.log(datoCifrado.iv, atributo, datoCifrado.authTag);
        await this.metadatosCifradoService.create({
            Mail: mail_Transporte_Descifrado + "@estudiantes.uv.cl",
            Version_Llave: llaveAlmacenamiento.version,
            Iv: datoCifrado.iv,
            Atributo: atributo,
            AuthTag: datoCifrado.authTag
        });
        
    }

    return 'estudiante creado';
    
  }

  findAll() {
    return `This action returns all estudiante`;
  }

  async findOne(parametros: {
    mail: string;
    mail_Iv: string;
    tag_Mail: string;
    contrasena: string;
    contrasena_Iv: string;
    tag_Contrasena: string;
    llave_Temporal: string;
    version_Llave_Transporte: string;
  }) {

    //Mail - Mail_Iv - Tag_Mail - Contrasena - Contrasena_Iv - Tag_Contrasena - Llave_Temporal_Cifrada - Version_Llave


    //traigo la llave privada de transporte
    const llavePrivadaTransporte = readFileSync(
      `keys/back-end/${parametros.version_Llave_Transporte}/private.pem`,
      'utf8'
    );

    //descifro la llave temporal con la privada
    const llave_Temporal_Login: Buffer = privateDecrypt(
        {
            key: llavePrivadaTransporte,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(parametros.llave_Temporal, 'base64')
    );             
     
    //Mail transporte descifrado
    const mail_Transporte_Descifrado = (await this.hibridoServiceBack
        .descifrarDatoTransporte(
            parametros.mail, 
            parametros.mail_Iv,
            parametros.tag_Mail,
            llave_Temporal_Login
        ));

    //traigo a todos los estudiantes del bd
    const estudiantes = await this.estudianteRepository.find({
        relations: {
            metadatosCifrados: true
        }
    });


    //reviso todos los estudiantes hasta encontrar una coincidencia
    for(const estudiante of estudiantes){

      //metadatados del estudiante
      const metadatosEstudiante = estudiante.metadatosCifrados;

      //Mail almacenado descifrado
      const metadataMail = metadatosEstudiante.find(
            metadata => metadata.Atributo === "Mail"
        );

        if (!metadataMail) {
            throw new Error("No existe metadata para Mail");
        }

        const metadataRut = estudiante.metadatosCifrados.find(
                metadata => metadata.Atributo === "Rut"
            );
            if(!metadataRut){
                return;
            }
        const rutalmacenamiento = await this.almacenamientoService.descifrarDatoAlmacenamiento(
            estudiante.Rut,
            metadataRut?.Iv,
            metadataRut?.AuthTag,
            await this.almacenamientoService.getKey(
                    metadataRut.Version_Llave
                )

        )
        console.log(rutalmacenamiento);
        const mailAlmacenadoDescifrado =
            await this.almacenamientoService.descifrarDatoAlmacenamiento(
                estudiante.Mail,
                metadataMail.Iv,
                metadataMail.AuthTag,
                await this.almacenamientoService.getKey(
                    metadataMail.Version_Llave
                )
            );

      //comparo los mails
      if( mail_Transporte_Descifrado === mailAlmacenadoDescifrado){

        //descifro la contraseña de transporte
        const contrasenaDescifrada =
            await this.hibridoServiceBack.descifrarDatoTransporte(
                parametros.contrasena,
                parametros.contrasena_Iv,
                parametros.tag_Contrasena,
                llave_Temporal_Login
            );

        const contrasenaCorrecta = await bcrypt.compare(
            contrasenaDescifrada,
            estudiante.Contrasena
        );

        if(contrasenaCorrecta){

            //mensaje para el front
            const menssage = "Loggin exitoso";

            //creo la llave aes temporal
            const llave_Temporal_Ficha = randomBytes(32);

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

            // Inicializo el estudiante cifrado vacío
            let estudianteCifrado: EstudianteCifrado = {
                // Primer Nombre
                Primer_Nombre: '',
                Iv_Primer_Nombre: '',
                Tag_Primer_Nombre: '',

                // Segundo Nombre
                Segundo_Nombre: '',
                Iv_Segundo_Nombre: '',
                Tag_Segundo_Nombre: '',

                // Primer Apellido
                Primer_Apellido: '',
                Iv_Primer_Apellido: '',
                Tag_Primer_Apellido: '',

                // Segundo Apellido
                Segundo_Apellido: '',
                Iv_Segundo_Apellido: '',
                Tag_Segundo_Apellido: '',

                // Celular
                Celular: '',
                Iv_Celular: '',
                Tag_Celular: '',

                //Rut
                Rut: '',
                Iv_Rut: '',
                Tag_Rut: '',

                // Dígito Verificador
                Digito_Verificador: '',
                Iv_Digito_Verificador: '',
                Tag_Digito_Verificador: '',

                // Año de Ingreso
                Ano_Ingreso: '',
                Iv_Ano_Ingreso: '',
                Tag_Ano_Ingreso: '',

                // Sede
                Sede: '',
                Iv_Sede: '',
                Tag_Sede: '',

                // Semestre
                Semestre: '',
                Iv_Semestre: '',
                Tag_Semestre: '',

                // Datos de la llave de transporte
                Llave_Cifrada: '',
                Version_Llave: ''
            };

            //inicializo el estudiante descifrado vacío
            let estudiante_Descifrado: EstudianteDescifrado = {
                Primer_Nombre: "",
                Segundo_Nombre: "",
                Primer_Apellido: "",
                Segundo_Apellido: "",
                Celular: "",
                Mail: "",
                Rut: "",
                Digito_Verificador: "",
                Ano_Ingreso: "", 
                Sede: "",
                Semestre: ""
            }

            //descifro los datos del estudiante
            for (const [atributo, valor] of Object.entries(estudiante)) {

                if (
                    atributo === "Contrasena" ||
                    atributo === "estudianteFichas" ||
                    atributo === "metadatosCifrados" ||
                    atributo === "Mail"
                ) {
                    continue;
                }

                if (valor === null || valor === '') {
                    continue;
                }

                const metadata = metadatosEstudiante.find(
                    metadata => metadata.Atributo === atributo
                );

                if (!metadata) {
                    throw new Error(`No existe metadata para ${atributo}`);
                }

                const clave = atributo as keyof EstudianteDescifrado;

                estudiante_Descifrado[clave] =
                    await this.almacenamientoService.descifrarDatoAlmacenamiento(
                        valor,
                        metadata.Iv,
                        metadata.AuthTag,
                        await this.almacenamientoService.getKey(
                            metadata.Version_Llave
                        )
                    );
            }
            
            //cifro los datos del estudiante para transporte
            const datosEncriptados = (await this.hibridoServiceBack
                .cifrarEstudiante(
                    estudiante_Descifrado,
                    llave_Temporal_Ficha
                )
            );

            const llave_Publica = await this.hibridoServiceFront.getCurrent();

            //cifro la llave temporal
            const llaveCifrada: Buffer = publicEncrypt(
                {
                    key: llave_Publica.llave,
                    padding: constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                llave_Temporal_Ficha
            );
           
            let indiceCifrado = 0;

            // Primer Nombre
            estudianteCifrado.Primer_Nombre = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Primer_Nombre = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Primer_Nombre = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;


           

            // Segundo Nombre (Opcional)
            if (estudiante_Descifrado.Segundo_Nombre !== '') {
                estudianteCifrado.Segundo_Nombre = datosEncriptados[indiceCifrado].valor;
                estudianteCifrado.Iv_Segundo_Nombre = datosEncriptados[indiceCifrado].ivValor;
                estudianteCifrado.Tag_Segundo_Nombre = datosEncriptados[indiceCifrado].authTag;
                indiceCifrado++;
            }

            // Primer Apellido
            estudianteCifrado.Primer_Apellido = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Primer_Apellido = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Primer_Apellido = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Segundo Apellido
            estudianteCifrado.Segundo_Apellido = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Segundo_Apellido = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Segundo_Apellido = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Celular
            estudianteCifrado.Celular = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Celular = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Celular = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Mail
            estudianteCifrado.Rut = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Rut = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Rut = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Dígito Verificador
            estudianteCifrado.Digito_Verificador = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Digito_Verificador = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Digito_Verificador = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Año de Ingreso
            estudianteCifrado.Ano_Ingreso = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Ano_Ingreso = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Ano_Ingreso = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Sede
            estudianteCifrado.Sede = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Sede = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Sede = datosEncriptados[indiceCifrado].authTag;
            indiceCifrado++;

            // Semestre
            estudianteCifrado.Semestre = datosEncriptados[indiceCifrado].valor;
            estudianteCifrado.Iv_Semestre = datosEncriptados[indiceCifrado].ivValor;
            estudianteCifrado.Tag_Semestre = datosEncriptados[indiceCifrado].authTag;

            // Información de transporte de la llave
            estudianteCifrado.Llave_Cifrada = llaveCifrada.toString('base64');
            estudianteCifrado.Version_Llave = llave_Publica.version;

            return {
                menssage,
                estudianteCifrado
            };
        }else{
            const menssage = 'Contraseña incorrecta';
            return menssage;
        }
      }else{
        continue;
      }
    }
    console.log("no existente")
    const menssage = 'Estudiante no existente';
    return menssage;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
