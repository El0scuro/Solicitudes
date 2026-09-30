'use client'

import { AppBar, Box, Button, 
        TextField, Toolbar, Typography, 
        InputAdornment, IconButton, 
        CircularProgress, Backdrop 
        } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Person2Icon from '@mui/icons-material/Person2';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Logo_Publica from "@/Imagenes/Logo escuela blanco.png"

import __url from "@/lib/const";

export default function Login() {

    const perfiles = [
        {
            id: 'estudiante',
            title: 'Estudiantes',
            icon: 
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <PersonIcon sx={{color:'white', width:'80px', height:'80px'}} />
                <MenuBookIcon sx={{color:'white', width:'80px', height:'80px'}} />
            </Box>
            
        },
        {
            id:'secretaria',
            title:'Secretarias',
            icon: 
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Person2Icon sx={{color:'white', width:'80px', height:'80px'}} />
            </Box>
        },
        {
            id:'jefe_carrera',
            title:'Jefe de Carrera',
            icon: 
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <SupervisorAccountIcon sx={{color:'white', width:'80px', height:'80px'}} />
            </Box>
        },
        {
            id:'administrador',
            title:'Administrador',
            icon: 
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <PsychologyIcon sx={{color:'white', width:'80px', height:'80px'}} />
            </Box>
        }
    ];

    const [verPerfil, setVerPerfil] = useState(false);
    
    const [perfil, setPerfil] = useState<string>();

    const [stateBusqueda, setStateBusqueda] = useState(false);

    return (
    <Box
        sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        }}
    >
        {/* Header/AppBar */}
        <AppBar
        position="static"
        sx={{
            backgroundColor: '#003c58',
            padding: 3,
        }}
        >
        <Toolbar>
            <Box
            component="img"
            alt="Logo_Publica"
            src={Logo_Publica.src}
            sx={{
                height: '60px',
                objectFit: 'contain',
            }}
            />
        </Toolbar>
        </AppBar>

        <Backdrop
            open={stateBusqueda}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            >
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <CircularProgress
                        size={100}
                        thickness={5}
                        sx={{
                            color: "#003c58",
                        }}
                    />

                    <Typography
                        sx={{
                            marginTop: 2,
                            color: "black",
                            fontSize:'bold',
                        }}
                    >
                        Cargando registro 
                        <br/>
                        al sistema...
                    </Typography>
                </Box>
            </Backdrop>

        {/* Contenedor Principal (Cuerpo) */}
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            backgroundColor: '#00577f',
            width: '100%',
        }}
        >
        {/* Sección Izquierda: Títulos y Selección de Perfiles */}
        <Box
            sx={{
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: 4,
            gap: 4,
            justifyContent: 'space-around',
            alignItems: 'center',
            }}
        >
            {/* Título y Subtítulo */}
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '450px',
            }}
            >
            <Typography
                variant="h3"
                sx={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: { xs: '2rem', md: '3rem' },
                }}
            >
                Solicitudes Académicas
            </Typography>
            <Typography
                variant="h5"
                sx={{
                fontWeight: 'bold',
                color: 'white',
                mt: 1,
                }}
            >
                Administración Pública
            </Typography>
            </Box>

            {/* Botones de Selección de Perfil */}
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
            }}
            >
            <Typography
                variant="h5"
                sx={{
                fontWeight: 'bold',
                color: 'white',
                }}
            >
                Seleccione un perfil
            </Typography>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                }}
            >
                {perfiles.map((perfil) => (
                <Button
                    key={perfil.id}
                    variant="contained"
                    onClick={() => {
                    setVerPerfil(true);
                    setPerfil(perfil.id);
                    }}
                    sx={{
                    width: '160px',
                    height: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#003c58',
                    '&:hover': {
                        backgroundColor: '#00283b',
                    },
                    }}
                >
                    {perfil.icon}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                    {perfil.title}
                    </Typography>
                </Button>
                ))}
            </Box>
            </Box>
        </Box>

        {/* Sección Derecha: Panel de Login */}
        {verPerfil && (
            <Box
            sx={{
                width: { xs: '100%', md: '380px' },
                minWidth: '320px',
                backgroundColor: 'white',
            }}
            >
            <PerfilLogin key={perfil} perfil={perfil} cargando={() => setStateBusqueda(true)} />
            </Box>
        )}
        </Box>
    </Box>
    );
}

type pageProps = {
    perfil: string | undefined;
    cargando: () => void;
}


interface PerfilData {
    mail: string;
    contrasena: string;
}

interface Datos {
    mail: string;
    mail_Iv: string;
    tag_Mail: string;
    contrasena: string;
    contrasena_Iv: string;
    tag_Contrasena: string;
    llave_Temporal: string;
    version_Llave_Transporte: string;
}

interface DatoEncriptado {
    ivValor: string;
    valor: string;
    authTag: string;
}

interface LlaveEncriptada {
    llave: string;
}

interface LLave_Publica {
    llave: string;
    version: string;
}

function PerfilLogin({perfil, cargando} : pageProps){

    const router = useRouter();

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    
    const [datos, setDatos] = useState<PerfilData>({
        mail: '',
        contrasena: ''
    });

    const [controller, setController] = useState<string>('');

    const [mail, setMail] = useState<string>();

    useEffect(() => {
        const gestionPerfil = (perfil: string | undefined) => {
            if(!perfil){
                return;
            }
            switch(perfil){
                case "estudiante":
                    setMail("@estudiantes.uv.cl");
                    setController("estudiante");
                    break;
                
                case "secretaria":
                    setMail("@uv.cl");
                    setController("secretaria");
                    break;

                case "jefe_carrera":
                    setMail("@uv.cl");
                    setController("jefe-carrera");
                    break;
                
                case "administrador":
                    setMail("@uv.cl");
                    setController("administrador");
                    break;

                default:
                    setMail("@uv.cl");
                    break;
            }
        };
        gestionPerfil(perfil);
    }, [perfil]);


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


    //Función para cifrar los datos ingresado por el usuario
    const cifrarDatos = async (
        perfilData: PerfilData,
        clave: CryptoKey
    ) => {

        const datosEncriptados: DatoEncriptado[] = [];

        for (const [atributo, valor] of Object.entries(perfilData)) {

            let textoDato: string;

            if (atributo === "mail") {
                textoDato = String(valor) + mail;
            } else {
                textoDato = String(valor);
            }

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

            
            // AES-GCM agrega el AuthTag al final del resultado.
            const cifradoCompleto = new Uint8Array(cifradoValor);

            // Los últimos 16 bytes corresponden al AuthTag.
            const authTag = cifradoCompleto.slice(
                cifradoCompleto.length - 16
            );

            // Todo lo anterior corresponde al texto cifrado.
            const textoCifrado = cifradoCompleto.slice(
                0,
                cifradoCompleto.length - 16
            );

            datosEncriptados.push({
                ivValor: uint8ArrayABase64(ivValor),
                valor: uint8ArrayABase64(textoCifrado),
                authTag: uint8ArrayABase64(authTag)
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

    const loggear = async() => {

        if(!datos.contrasena || !datos.mail){
            alert('[ERROR], complete los campos restantes');
            return;
        }
        //traigo la llave publica desde el back
        const publicKey: LLave_Publica = (await axios.get(`${__url}/hibrido_back/get-key`)).data;

        //creo la llave temporal
        const claveTemporal = await generarClave();

        //cifro los datos del estudiante con la llave temporal
        const datosEncriptados = await cifrarDatos(datos, claveTemporal);

        //cifro la llave temporal
        const temporalEncriptado = await cifrarLlaveTemporal(claveTemporal, publicKey.llave);

        const data: Datos = {
            mail: datosEncriptados[0].valor,
            mail_Iv: datosEncriptados[0].ivValor,
            tag_Mail: datosEncriptados[0].authTag,

            contrasena: datosEncriptados[1].valor,
            contrasena_Iv: datosEncriptados[1].ivValor,
            tag_Contrasena: datosEncriptados[1].authTag,
            llave_Temporal: temporalEncriptado.llave,

            version_Llave_Transporte: publicKey.version
        };

        try{
            const response = await axios.post(`${__url}/${controller}/login`, 
                data
            );

            switch(response.data.menssage){
                case "Loggin exitoso":

                    cargando();

                    router.push(
                        `/Ficha?estudiante=${encodeURIComponent(
                            JSON.stringify(response.data.estudianteCifrado)
                        )}`
                    );
                    break;
                case "Contraseña incorrecta":
                    alert("[ERROR], contraseña incorrecta");
                    break;
                case "Estudiante no existente":
                    alert("Estudiante no existente en el sistema");
                    break;
            }
        }catch(error){
            console.log(error);
        }
    };
    
     return(
        <Box
        sx={{
            backgroundColor:'white',
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            padding:3,
            alignItems:'center',
            gap:10
        }}
        >
            <Typography
            variant="h5"
            sx={{
                fontWeight:'bold',
                color:'#003c58'
            }}
            >
                Ingrese sus datos
            </Typography>
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:5
            }}
            >
               {/*Cuenta y contrasena */}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:1
                }}
                >
                    {/*Cuenta */}
                    <Typography
                    variant="h6"
                    sx={{
                        color:'#003c58',
                        fontWeight:'bold',
                        width:'100px'
                    }}
                    >
                        Cuenta
                    </Typography>

                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                       }}
                    >
                        {/*TextField Cuenta */}
                        <TextField
                        placeholder="nombre.apellido"
                        value={datos?.mail}
                        onChange={(e) => setDatos({
                            ...datos,
                            mail: e.target.value
                        })}
                        sx={{
                        width:'150px'
                        }}
                        />
                        <Typography
                        variant= "subtitle1"
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            color:'#003c58',
                            fontWeight:'bold',
                            padding:1,
                            width:'100px'
                        }}
                        >
                            {mail}
                        </Typography>
                    </Box>
                    
                </Box>
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:1
                    }}
                >
                    {/*Contrasena */}
                    <Typography
                    variant="h6"
                    sx={{
                        color:'#003c58',
                        fontWeight:'bold',
                        width:'100px'
                    }}
                    >
                        Contraseña
                    </Typography>

                    <TextField
                        placeholder="Contraseña"
                        type={mostrarContrasena ? "text" : "password"}
                        value={datos.contrasena}
                        sx={{
                            width: '300px'
                        }}
                        onChange={(e) => setDatos({
                            ...datos,
                            contrasena: e.target.value
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
                </Box>
                
                {/*¿Olvidó? */}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    gap:5
                }}
                >
                    <Button
                    variant="text"
                    onClick={() => router.push('/')}
                    sx={{
                        fontWeight:'bold',
                        color:'#0288d1'
                    }}
                    >
                        ¿Olvidaste tu
                        <br/>
                        contraseña?
                    </Button>

                    <Button
                    onClick={() => router.push('/Register')}
                    variant="text"
                    sx={{
                        fontWeight:'bold',
                        color:'#0288d1'
                    }}
                    >
                        ¿No te has
                        <br/>
                        registrado?
                    </Button>
                </Box>

                {/*Botón loggeo */}
                <Box
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                    <Button
                    onClick={() => loggear()}
                    variant="contained"
                    sx={{
                        width:'300px',
                        fontWeight:'bold',
                        color:'white',
                        backgroundColor:'#003c58'
                    }}
                    >
                        Iniciar sesión
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