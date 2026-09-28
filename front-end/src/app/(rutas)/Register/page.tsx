'use client';

import {Box, Typography, TextField, Button, AppBar, Toolbar, InputAdornment, IconButton} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

import __url from '@/lib/const';

import Logo_Publica from "@/Imagenes/Logo escuela blanco.png";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Estudiante } from "@/types/estudiante";

interface DatoEncriptado {
    valor: string;
    ivValor: string;
    authTag: string;
}

interface LlaveEncriptada {
    llave: string;
}

interface LLave_Publica {
    llave: string;
    version: string;
}

interface Datos {

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

    // Mail
    Mail: string;
    Iv_Mail: string;
    Tag_Mail: string;

    //Contrasena
    Contrasena: string;
    Iv_Contrasena: string;
    Tag_Contrasena: string;

    // RUT
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

export default function RegisterPage(){

    const router = useRouter();

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    
    const [estudiante, setEstudiante] = useState<Estudiante>({
        Primer_Nombre: '',
        Segundo_Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Celular: '',
        Mail: '',
        Contrasena: '', 
        Rut: '',
        Dig_Verificador: '',
        Ano_Ingreso: '', 
        Sede: '',
        Semestre: ''
    });

    //transforma de uint8Array a string
    const uint8ArrayABase64 = (bytes: Uint8Array): string => {
        let binary = '';

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    };

    //transforma de arrayBuffer a string
    const arrayBufferABase64 = (buffer: ArrayBuffer): string => {
        const bytes = new Uint8Array(buffer);
        let binary = '';

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    };


    //Crea la llave temporal
    const generarClave = async () => {

        const clave = await crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256
            },
            true,
            ['encrypt', 'decrypt']
        );
        return clave;
    };

    //Función para cifrar los datos personales del estudiante
    const cifrarEstudiante = async (estudiante: Estudiante, clave: CryptoKey) => {

        const datosEncriptados: DatoEncriptado[] = [];

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
                clave,
                datoValor
            );

            // Separamos el ciphertext del AuthTag (16 bytes = 128 bits)
            const tagLengthBytes = 16;
            const totalBytes = cifradoValor.byteLength;
            const ciphertextBytes = totalBytes - tagLengthBytes;

            // Slice de los datos cifrados y del tag
            const ciphertextBuffer = cifradoValor.slice(0, ciphertextBytes);
            const authTagBuffer = cifradoValor.slice(ciphertextBytes);



            datosEncriptados.push({
                valor: arrayBufferABase64(ciphertextBuffer),
                ivValor: uint8ArrayABase64(ivValor),
                authTag: arrayBufferABase64(authTagBuffer)
            });
        }

        return datosEncriptados;
    };

    //Función para cifrar la llave temporal
    const cifrarLlaveTemporal = async (
        llaveTemporal: CryptoKey,
        publicKey: string
    ) => {

        const publicKeyPem = await importarLlavePublica(publicKey);

        const temporalModificado = await crypto.subtle.exportKey(
            'raw',
            llaveTemporal
        );

        const cifradoValor = await crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP'
            },
            publicKeyPem,
            temporalModificado
        );

        const llaveEncriptada: LlaveEncriptada = {
            llave: arrayBufferABase64(cifradoValor)
        };

        return llaveEncriptada;
    };


    const registrar = async () => {

        if(!estudiante.Primer_Nombre || !estudiante.Primer_Apellido || !estudiante.Segundo_Apellido
            || !estudiante.Rut || !estudiante.Dig_Verificador
            || !estudiante.Celular || !estudiante.Mail
            || !estudiante.Contrasena
            || !estudiante.Ano_Ingreso || !estudiante.Semestre || !estudiante.Sede
        ){
            alert('[ERROR], complete los campos restantes.');
            return;
        }
        else{
            
            //traigo la llave publica desde el back
            const publicKey: LLave_Publica = (await axios.get(`${__url}/hibrido_back/get-key`)).data;

            //creo la llave temporal
            const claveTemporal = await generarClave();

            //cifro los datos del estudiante con la llave temporal
            const datosEncriptados = await cifrarEstudiante(estudiante, claveTemporal);

            //cifro la llave temporal
            const temporalEncriptado = await cifrarLlaveTemporal(claveTemporal, publicKey.llave);

            let indice = 0;

            // Datos cifrados del estudiante
            let datos: Datos = {
                Primer_Nombre: datosEncriptados[0].valor,
                Iv_Primer_Nombre: datosEncriptados[0].ivValor,
                Tag_Primer_Nombre: datosEncriptados[0].authTag,

                Primer_Apellido: '',
                Iv_Primer_Apellido: '',
                Tag_Primer_Apellido: '',
                
                Segundo_Apellido: '',
                Iv_Segundo_Apellido: '',
                Tag_Segundo_Apellido: '',

                Celular: '',
                Iv_Celular: '',
                Tag_Celular: '',

                Mail: '',
                Iv_Mail: '',
                Tag_Mail: '',

                Contrasena: '',
                Iv_Contrasena: '',
                Tag_Contrasena: '',

                Rut: '',
                Iv_Rut: '',
                Tag_Rut: '',

                Digito_Verificador: '',
                Iv_Digito_Verificador: '',
                Tag_Digito_Verificador: '',

                Ano_Ingreso: '',
                Iv_Ano_Ingreso: '',
                Tag_Ano_Ingreso: '',

                Sede: '',
                Iv_Sede: '',
                Tag_Sede: '',

                Semestre: '',
                Iv_Semestre: '',
                Tag_Semestre: '',

                Llave_Cifrada: '',

                Version_Llave: ''
            };

            indice++;

            if (estudiante.Segundo_Nombre !== '') {
                datos.Segundo_Nombre = datosEncriptados[indice].valor;
                datos.Iv_Segundo_Nombre = datosEncriptados[indice].ivValor;
                datos.Tag_Segundo_Nombre = datosEncriptados[indice].authTag;
                indice++;
            }

            datos.Primer_Apellido = datosEncriptados[indice].valor;
            datos.Iv_Primer_Apellido = datosEncriptados[indice].ivValor;
            datos.Tag_Primer_Apellido = datosEncriptados[indice].authTag;

            indice++;

            datos.Segundo_Apellido = datosEncriptados[indice].valor;
            datos.Iv_Segundo_Apellido = datosEncriptados[indice].ivValor;
            datos.Tag_Segundo_Apellido = datosEncriptados[indice].authTag;

            indice++;

            datos.Celular = datosEncriptados[indice].valor;
            datos.Iv_Celular = datosEncriptados[indice].ivValor;
            datos.Tag_Celular = datosEncriptados[indice].authTag;

            indice++;

            datos.Mail = datosEncriptados[indice].valor;
            datos.Iv_Mail = datosEncriptados[indice].ivValor;
            datos.Tag_Mail = datosEncriptados[indice].authTag;

            indice++;

            datos.Contrasena = datosEncriptados[indice].valor;
            datos.Iv_Contrasena = datosEncriptados[indice].ivValor;
            datos.Tag_Contrasena = datosEncriptados[indice].authTag;

            indice++;

            datos.Rut = datosEncriptados[indice].valor;
            datos.Iv_Rut = datosEncriptados[indice].ivValor;
            datos.Tag_Rut = datosEncriptados[indice].authTag;

            indice++;

            datos.Digito_Verificador = datosEncriptados[indice].valor;
            datos.Iv_Digito_Verificador = datosEncriptados[indice].ivValor;
            datos.Tag_Digito_Verificador = datosEncriptados[indice].authTag;

            indice++;

            datos.Ano_Ingreso = datosEncriptados[indice].valor;
            datos.Iv_Ano_Ingreso = datosEncriptados[indice].ivValor;
            datos.Tag_Ano_Ingreso = datosEncriptados[indice].authTag;

            indice++;

            datos.Sede = datosEncriptados[indice].valor;
            datos.Iv_Sede = datosEncriptados[indice].ivValor;
            datos.Tag_Sede = datosEncriptados[indice].authTag;

            indice++;

            datos.Semestre = datosEncriptados[indice].valor;
            datos.Iv_Semestre = datosEncriptados[indice].ivValor;
            datos.Tag_Semestre = datosEncriptados[indice].authTag;

            datos.Llave_Cifrada = temporalEncriptado.llave;

            datos.Version_Llave = publicKey.version;

            try{
                const response = await axios.post(`${__url}/estudiante/register`, 
                    datos
                );

                console.log(response.data);

                router.push('/Login');
            }catch(error){
                console.log(error);
            }
            

        }
    };

    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh',
            width:'100%',
            backgroundColor:'#00577f',
            gap:5
        }}
        >
            <AppBar
            sx={{
            backgroundColor:'#003c58',
            padding:5,
            position:'static',
            display:'flex'
            }}
            >
                <Toolbar>
                    <Button
                    onClick={() => router.push('/Login')}
                    sx={{
                        width:'300px',
                        height:'90px'
                    }}
                    >
                        <Box
                        component="img"
                        alt="Logo_Publica"
                        src={Logo_Publica.src}
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                        />
                    </Button>

                    <Typography
                    variant="h3"
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        ml:'200px'
                    }}
                    >
                        REGISTRO ESTUDIANTES
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
            sx={{
                width:'100%',
                height:'auto',
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }}
            >

                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:10,
                    border: '2px solid black',
                    borderRadius: '8px',
                    padding: 3,
                    width:'70%',
                    height:'100%',
                    alignItems:'center',
                    backgroundColor:'white',
                }}
                >

                    {/*Datos obligatorios*/}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center'

                    }}
                    >

                        <Typography
                        variant="body1" 
                        sx={{
                            fontWeight: 'bold'
                        }}
                        >
                            Datos Obligatorios
                        </Typography>

                        <Typography
                        variant="body1" 
                        sx={{
                            fontWeight: 'bold'
                        }}
                        >
                            (En caso de no tener segundo nombre, dejar espacio en blanco)
                        </Typography>

                        {/*Datos*/}
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap: 2,
                            height:'auto'
                        }}
                        >
                            {/*Nombre completo*/}
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'row',
                                gap: 4,
                                flexWrap:'wrap'
                            }}
                            >
                                <TextField
                                label="Primer nombre"
                                placeholder="Primer nombre"
                                value={estudiante.Primer_Nombre}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Primer_Nombre: e.target.value
                                })}
                                sx={{
                                    width:'150px'
                                }}
                                />

                                <TextField
                                label="Segundo nombre"
                                placeholder="Segundo nombre"
                                value={estudiante.Segundo_Nombre}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Segundo_Nombre: e.target.value
                                })}
                                sx={{
                                    width:'150px'
                                }}
                                />
                                
                                <TextField
                                label="Primer Apellido"
                                placeholder="Primer apellido"
                                value={estudiante.Primer_Apellido}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Primer_Apellido: e.target.value
                                })}
                                sx={{
                                    width:'150px'
                                }}
                                />

                                <TextField
                                label="Segundo Apellido"
                                placeholder="Segundo Apellido"
                                value={estudiante.Segundo_Apellido}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Segundo_Apellido: e.target.value
                                })}
                                sx={{
                                    width:'160px'
                                }}
                                />
                                
                            </Box>


                            {/*Rut-Digito verificador - Numero*/}
                            <Box
                            sx={{
                                display:'flex',
                                gap:6
                            }}
                            >
                                <Box
                                sx={{
                                    display:'flex',
                                    flexDirection:'row',
                                    gap: 1
                                }}
                                >
                                    <TextField
                                    label={
                                        <>
                                        Rut sin el 
                                        <br/>
                                        digito verificador
                                        </>
                                    }
                                    placeholder="12345678"
                                    value={estudiante.Rut}
                                    sx={{
                                        width:'150px',
                                        '& input::placeholder':{
                                            fontSize: '10px'
                                        },
                                        '& .MuiInputLabel-root':{
                                            fontSize: '10px'
                                        }
                                    }}
                                    onChange={(e) => setEstudiante({
                                        ...estudiante,
                                        Rut: e.target.value
                                    })}
                                    />

                                    <Typography
                                    sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        fontSize:'30px'
                                    }}
                                    >
                                        -
                                    </Typography>

                                    <TextField
                                    label={
                                        <>
                                        Digito
                                        <br/>
                                        Verificador
                                        </>
                                    }
                                    placeholder="9"
                                    value={estudiante.Dig_Verificador}
                                    sx={{
                                        width:'80px',
                                        '& .MuiInputLabel-root':{
                                            fontSize: '10px'
                                        }
                                    }}
                                    onChange={(e) => setEstudiante({
                                        ...estudiante,
                                        Dig_Verificador: e.target.value
                                    })}
                                    />
                                </Box>

                                <Box
                                sx={{
                                    display:'flex',
                                    width:'auto',
                                    height:'auto'
                                }}
                                >
                                    <Typography
                                    sx={{
                                        fontSize:'20px',
                                        backgroundColor:'#003c58',
                                        width:'50px',
                                        height:'55px',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',    
                                        color: 'white'
                                    }}
                                    >
                                        +56
                                    </Typography>

                                    <TextField
                                    label={
                                        <>
                                        Numero
                                        <br/>
                                        Celular
                                        </>
                                    }
                                    placeholder="912345678"
                                    value={estudiante.Celular}
                                    sx={{
                                            width:'150px',
                                            '& .MuiInputLabel-root':{
                                                fontSize: '10px'
                                            }
                                        }}
                                        onChange={(e) => setEstudiante({
                                            ...estudiante,
                                            Celular: e.target.value
                                        })}
                                    />
                                </Box>
                            </Box>
                                

                            {/*Correo*/}
                            <Box
                            sx={{
                                display:'flex',
                                width:'auto',
                                height:'auto'
                            }}
                            >

                                <TextField
                                label={
                                    <>
                                    Correo
                                    <br/>
                                    Institucional
                                    </>
                                }
                                placeholder="nombre.apellido@estudiantes.uv.cl"
                                value={estudiante.Mail ?? ''}
                                sx={{
                                    width:'300px',
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Mail: e.target.value
                                })}
                                />
                                <Typography
                                sx={{
                                    backgroundColor:'#003c58',
                                    width:'200px',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    color: 'white'
                                }}
                                >
                                    @estudiantes.uv.cl
                                </Typography>
                            </Box>
                            

                            {/*Contraseña*/}
                            <TextField
                                label="Contraseña"
                                type={mostrarContrasena ? "text" : "password"}
                                value={estudiante.Contrasena}
                                sx={{
                                    width: '500px'
                                }}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Contrasena: e.target.value
                                })}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                                    edge="end"
                                                >
                                                    {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                            

                            {/*Año - Semestre - Sede*/}
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'row',
                                gap: 4,
                                flexWrap:'wrap'
                            }}
                            >
                                <TextField
                                label={
                                    <>
                                    Año
                                    <br/>
                                    Ingreso
                                    </>
                                }
                                placeholder="2024"
                                value={estudiante.Ano_Ingreso ?? ''}
                                onChange={(e) => setEstudiante({
                                    ...estudiante,
                                    Ano_Ingreso: e.target.value
                                })}
                                sx={{
                                    width:'100px',
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                />

                                <TextField
                                label={
                                    <>
                                    Semestre
                                    <br/>
                                    que cursa
                                    </>
                                }
                                placeholder="primero"
                                value={estudiante.Semestre}
                                onChange={(e) => setEstudiante({
                                    ...estudiante, 
                                    Semestre: e.target.value
                                })}
                                sx={{
                                    width:'100px',
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                />

                                <TextField
                                label="Sede"
                                placeholder="valparaiso, santiago"
                                value={estudiante.Sede}
                                onChange={(e) => setEstudiante({
                                    ...estudiante, 
                                    Sede: e.target.value
                                })}
                                sx={{
                                    width:'150px'
                                }}
                                />
                            </Box>
                                    
                        </Box>
                    </Box>
                        
                    {/*Botón registro*/}
                    <Button
                    onClick={() => {
                        registrar();
                    }}
                    variant="contained"
                    >
                        Registrarse
                    </Button>

                </Box>
            
            </Box>
        </Box>
    );
}


async function importarLlavePublica(pem: string): Promise<CryptoKey> {
    // Eliminar encabezado y pie del PEM
    const base64 = pem
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "")
        .replace(/\s/g, "");

    // Base64 → bytes
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    // Bytes → CryptoKey
    return await crypto.subtle.importKey(
        "spki",
        bytes.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        false,
        ["encrypt"]
    );
}

