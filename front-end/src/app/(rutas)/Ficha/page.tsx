'use client';

import { Box, Button, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";


import Logo_Publica from "@/Imagenes/Logo escuela blanco.png"

import __url from "@/lib/const";

import { Seccion } from "@/types/seccion";

import Inscribir_Page from "./components/inscribir";
import Desinscribir_Page from "./components/desinscribir";
import Justificar_Clase_Page from "./components/clase";
import Cambio_Seccion from "./components/cambio";


//interfaz para el estudiante cifrado para transporte
interface EstudianteCifrado {
    // Mail
    Mail: string;
    Iv_Mail: string;
    Tag_Mail: string;

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

interface EstudianteDescifrado {
    Mail: string;
    Primer_Nombre: string;
    Segundo_Nombre?: string;
    Primer_Apellido: string;
    Segundo_Apellido: string;
    Celular: string;
    Rut: string;
    Digito_Verificador: string;
    Generacion: string;
    Ano_Ingreso: string;
    Sede: string;
    Semestre: string;
}


//Interface para las inscripciones de la solicitud//
interface InscripcionInterface {
    Tipo_Inscripcion: string;

    Codigo: string;
    Ano_Malla: string;
    num_Seccion: number;
}

//Interface para las justificaciones//
interface JustificacionesInterface {
    Fecha_Inasistencia: string;
    Tipo_Justificacion: string;
    Semestre: string;

    Codigo: string;
    Ano_Malla: string;
    num_Seccion: number;
}

//Interface para los cambios//
interface CambioInterface {
    Seccion_Original: number;

    Codigo: string;
    Ano_Malla: string;
    num_Seccion: number;
}

//Interfaz para la creación de la ficha en la base de datos//
interface CrearFicha {
    //Datos de la Ficha//
    Mail: string;
    Fecha_Actual: string;
    Estado: string;


    //Estado de las solicitudes//
    Inscripcion: boolean;
    Desinscripcion: boolean;
    Clase: boolean;
    Evaluacion: boolean;
    Cambio: boolean;


    //Inscripciones y Desinscripciones//
    Inscripciones: InscripcionInterface[];
    cartaInscripcion?: FormData | null;

    Desinscripciones: InscripcionInterface[];
    cartaDesinscripcion?: FormData | null;

    //Clases y Evaluaciones//
    Clases: JustificacionesInterface[];
    justificativosClases?: FormData[] | null;

    Evaluaciones: JustificacionesInterface[];
    justificativosEvaluaciones?: FormData[] | null;


    //Cambio//
    Cambios: CambioInterface[];
}


export default function Solicitud_Ficha() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Solicitud_Ficha_Content />
        </Suspense>
    );
}

function Solicitud_Ficha_Content(){

    const router = useRouter();


    const searchParams = useSearchParams();


    const estudiante = searchParams.get('estudiante');

    const [estudianteDescifrado, setEstudianteDescifrado] = useState<EstudianteDescifrado>({
        Mail: '',
        Primer_Nombre: '',
        Segundo_Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Celular: '',
        Rut: '',
        Digito_Verificador: '',
        Generacion: '',
        Ano_Ingreso: '',
        Sede: '',
        Semestre: ''
    });
    

    const [seccionesInscripcion, setSeccionesInscripcion] = useState<Seccion[]>([]);
    const [cartaInscripcion, setCartaInscripcion] = useState<File| null>(null);

    const [seccionesDesinscripcion, setSeccionesDesinscripcion] = useState<Seccion[]>([]);
    const [cartaDesinscripcion, setCartaDesinscripcion] = useState<File | null>(null);

    const [seccionesClase, setSeccionesClase] = useState<Seccion[]>([]);
    const [justificativosClases, setJustificativosClases] = useState<File[] | null>(null);

    const [seccionesEvaluacion, setSeccionesEvaluacion] = useState<Seccion[]>([]);
    const [justificativosEvaluaciones, setJustificativosEvaluaciones] = useState<File[] | null>(null);
    
    const [seccionesCambio, setSeccionesCambio] = useState<Seccion[][]>([]);


    const [verInscribir, setVerInscribir] = useState(false);

    const [verDesinscribir, setVerDesinscribir] = useState(false);

    const [verClase, setVerClase] = useState(false);

    const [verEvaluacion, setVerEvaluacion] = useState(false);

    const [verCambio, setVerCambio] = useState(false);


    const [stateInscripcion, setStateInscripcion] = useState(false);

    const [stateDesinscripcion, setStateDesinscripcion] = useState(false);

    const [stateClase, setStateClase] = useState(false);

    const [stateEvaluacion, setStateEvaluacion] = useState(false);

    const [stateCambio, setStateCambio] = useState(false);


    useEffect(() => {
        if (!estudiante) {
            return;
        }

        const descifrarEstudiante = async () => {

            const datosEstudiante: EstudianteCifrado = JSON.parse(estudiante);

            const respuesta = await fetch('/api/descifrar_estudiante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosEstudiante)
            });

            if (!respuesta.ok) {
                const error = await respuesta.text();

                console.error(
                    "ERROR DEL SERVIDOR:",
                    error
                );

                return;
            }

            const estudianteDescifrado: EstudianteDescifrado =
                await respuesta.json();

            setEstudianteDescifrado(estudianteDescifrado);
        };

        descifrarEstudiante();

    }, [estudiante]);

    
    const generarFicha = async() => {

        const Fecha_Actual = (new Date()).toISOString().split("T")[0];


        const inscripciones: InscripcionInterface[] = [];
        const formDataInscripcion = new FormData;

        const desinscripciones: InscripcionInterface[] = [];
        const formDataDesinscripcion = new FormData();

        const clases: JustificacionesInterface[] = [];
        const formDataClases = new FormData();

        const evaluaciones: JustificacionesInterface[] = [];
        const formDataEvaluaciones = new FormData();
        
        const cambios: CambioInterface[] = [];
        const formDataCambios = new FormData();


        if(stateInscripcion){
            for(const seccion of seccionesInscripcion){

                const datos: InscripcionInterface = {
                    Tipo_Inscripcion: 'inscripcion',

                    Codigo: seccion.asignatura!.Codigo,
                    Ano_Malla: estudianteDescifrado.Generacion,
                    num_Seccion: seccion.num_Seccion
                }

                inscripciones.push(datos);
            }

            if(cartaInscripcion === null){
                alert('Debe subir la carta para la sus inscripciones');
                return;
            }
            formDataInscripcion.append('cartaInscripcion', cartaInscripcion);
        }

        if(stateDesinscripcion){
            for(const seccion of seccionesDesinscripcion){

                const datos: InscripcionInterface = {
                    Tipo_Inscripcion: 'desinscripcion',

                    Codigo: seccion.asignatura!.Codigo,
                    Ano_Malla: estudianteDescifrado.Generacion,
                    num_Seccion: seccion.num_Seccion
                }

                desinscripciones.push(datos);
            }

            if(cartaDesinscripcion === null){
                alert('Debe subir la carta para la sus desinscripciones');
                return;
            }
            formDataInscripcion.append('cartaInscripcion', cartaDesinscripcion);
        }

        if(stateClase){
            for(const seccion of seccionesClase){

                //const datos: JustificacionesInterface = {
                    
                //}

                //clases.push(datos);
            }
        }

        if(stateEvaluacion){

        }

        if(stateCambio){
            for(const secciones of seccionesCambio){
                const datos: CambioInterface = {
                    Seccion_Original: secciones[0].num_Seccion,

                    Codigo: secciones[0].asignatura!.Codigo,
                    Ano_Malla: estudianteDescifrado.Generacion,
                    num_Seccion: secciones[1].num_Seccion
                }

                cambios.push(datos);
                
            }
        }



        const datos: CrearFicha = {
            Mail: estudianteDescifrado.Mail,
            Fecha_Actual,
            Estado: 'revision',


            Inscripcion: stateInscripcion,
            Desinscripcion: stateDesinscripcion,
            Clase: stateClase,
            Evaluacion: stateEvaluacion,
            Cambio: stateCambio,


            Inscripciones: inscripciones,
            cartaInscripcion: formDataInscripcion,

            Desinscripciones: desinscripciones,
            cartaDesinscripcion: formDataDesinscripcion,

            Clases: clases,
            Evaluaciones: evaluaciones,
            Cambios: cambios,
        };
        try{
            await axios.post(`${__url}/ficha/crear`,
                datos
            )
        }catch(error){
            console.log(error);
        }
    }

    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            gap: 10
        }}
        >
            <AppBar 
            position="static"
            sx={{
                backgroundColor:'#003c58',
                boxShadow:'10'
            }}
            >
                <Toolbar
                sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}
                >
                    <Box
                    component="img"
                    alt="Logo_Publica"
                    src={Logo_Publica.src}
                    sx={{
                        width: '300px',
                        height: '90px'
                    }}
                    />    
                </Toolbar>
            </AppBar>

            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                gap: 10
            }}
            >

                {/*Título, y subtitulos*/}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap: 4
                }}
                >
                    <Typography
                    variant="h3"
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}
                    >
                        FORMULARIO DE SOLICITUDES ACADÉMICAS
                    </Typography>

                    <Typography
                    variant="subtitle1"
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}
                    >
                    En este formulario usted debe explicar brevemente su solocitud y exponer los antecedentes que considere necesarios para justificarla. 
                    <br/>
                    Si lo considera necesario, puede adjuntar una carta para explicar en profundidad situaciones que lo ameriten. 
                    </Typography>

                    <Typography
                    variant="subtitle1"
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}
                    >
                        La información de este formulario está protegida por la Ley de Protección de Datos Personales.
                    </Typography>
                </Box>

                {/* Datos y Tipo */}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    gap:5
                }}
                >
                    {/*Datos estudiante*/}
                    <Box
                    component="fieldset"
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:2,
                        ml:'4%',
                        border: '2px solid black',
                        borderRadius: '8px',
                        padding: 3,
                        width:'35%',
                        height:'auto',
                        alignItems:'flex-start'
                    }}
                    >
                        <Typography
                        variant="body1"
                        component="legend"
                        sx={{
                            fontWeight: 'bold'
                        }}
                        >
                            Datos del estudiante
                        </Typography>
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap: 4,
                            height:'auto',
                            flexWrap:'wrap'
                        }}
                        >
                            {/*Nombre completo*/}
                            <Box
                            sx={{
                                display:'flex',
                                gap:1,
                                alignItems: 'center'
                            }}
                            >
                                <Typography
                                sx={{
                                    fontWeight:'bold'
                                }}
                                >
                                    Nombre completo: 
                                </Typography>
                                <Box
                                sx={{
                                    display:'flex',
                                    gap: 1,
                                }}
                                >
                                    <Typography>
                                        {estudianteDescifrado.Primer_Nombre}
                                    </Typography>

                                    <Typography>
                                        {estudianteDescifrado.Segundo_Nombre}
                                    </Typography>

                                    <Typography>
                                        {estudianteDescifrado.Primer_Apellido}
                                    </Typography>

                                    <Typography>
                                        {estudianteDescifrado.Segundo_Apellido}
                                    </Typography>
                                </Box>
                            </Box>

                            {/*Rut*/}
                            <Box
                            sx={{
                                display:'flex',
                                gap:1,
                                alignItems: 'center'
                            }}
                            >
                                <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    Rut: 
                                </Typography>
                                <Box
                                sx={{
                                    display:'flex',
                                    gap: 1,
                                }}
                                >
                                    <Typography>
                                        {estudianteDescifrado.Rut}-{estudianteDescifrado.Digito_Verificador}
                                    </Typography>
                                </Box>
                            </Box>

                            {/*Correo */}
                            <Box
                            sx={{
                                display:'flex',
                                gap:1,
                                alignItems: 'center'
                            }}
                            >
                                <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    Correo institucional: 
                                </Typography>
                                <Box
                                sx={{
                                    display:'flex',
                                    gap: 1,
                                }}
                                >
                                    <Typography>
                                        {estudianteDescifrado.Mail}
                                    </Typography>
                                </Box>
                            </Box>

                            {/*Celular */}
                            <Box
                            sx={{
                                display:'flex',
                                gap:1,
                                alignItems: 'center'
                            }}
                            >
                                <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    Celular: 
                                </Typography>
                                <Box
                                sx={{
                                    display:'flex',
                                    flexDirection:'row',
                                    gap: 1,
                                    alignItems:'center'
                                }}
                                >
                                    <Typography>
                                        +56
                                    </Typography>

                                    <Typography>
                                        {estudianteDescifrado.Celular}
                                    </Typography>
                                </Box>
                            </Box>
                                

                            {/*Semestre */}
                            <Box
                            sx={{
                                display:'flex',
                                gap: 2,
                            }}
                            >
                                
                                <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    Semestre que cursa: 
                                </Typography>

                                <Typography>
                                    {estudianteDescifrado.Semestre}
                                </Typography>

                            </Box>

                            {/* ano ingreso */}
                            <Box
                            sx={{
                                display:'flex',
                                gap: 2,
                            }}
                            >
                                
                                <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    Año de ingreso: 
                                </Typography>

                                <Typography>
                                    {estudianteDescifrado.Ano_Ingreso}
                                </Typography>

                            </Box>
                                    
                        </Box>
                    </Box>

                    {/*Tipo de solicitud*/}
                    <Box
                    component="fieldset"
                    sx={{
                        display:'flex',
                        gap:2,
                        border: '2px solid black',
                        borderRadius: '8px',
                        padding: 1,
                        flexWrap:'wrap',
                        flexDirection:'column',
                        width:'30%',
                    }}
                    >
                        <Typography
                        variant="body1"
                        component="legend"
                        sx={{
                            fontWeight:'bold'
                        }}
                        >
                            Tipo de solicitud
                        </Typography>

                        {/*Gestión de inscripciones*/}
                        <Box
                        component="fieldset"
                        sx={{
                            display:'flex',
                            gap:2,
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 3,
                        }}
                        >
                            <Typography
                            variant="body1"
                            component="legend"
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Gestión de Inscripciones
                            </Typography>
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'row',
                                gap:5
                            }}
                            >
                                <Button
                                variant='contained'
                                sx={{
                                    width:'350px',
                                    fontWeight:'bold',
                                    backgroundColor:'#006391'
                                }}
                                onClick={() => setVerInscribir(true)}
                                >
                                    Inscripción Asignaturas
                                </Button>

                                <Button
                                variant='contained'
                                sx={{
                                    backgroundColor:'#006391',
                                    width:'350px',
                                    fontWeight:'bold'
                                }}
                                onClick={() => setVerDesinscribir(true)}
                                >
                                    Desinscripción Asignaturas
                                </Button>
                            </Box>
                        </Box>

                        {/*Justificación inasistencias*/}
                        <Box
                        component="fieldset"
                        sx={{
                            display:'flex',
                            gap:2,
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 3
                        }}
                        >
                            <Typography
                            variant="body1"
                            component="legend"
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Justificación Inasistencias
                            </Typography>
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'row',
                                gap:5
                            }}
                            >
                                <Button
                                variant='contained'
                                sx={{
                                    width:'350px',
                                    fontWeight:'bold',
                                    backgroundColor:'#006391'
                                }}
                                onClick={() => setVerClase(true)}
                                >
                                    Justificar inasistencia a clase
                                </Button>

                                <Button
                                variant='contained'
                                sx={{
                                    width:'350px',
                                    fontWeight:'bold',
                                    backgroundColor:'#006391'
                                }}
                                
                                >
                                    Justificar inasistencia a evaluación
                                </Button>
                                
                            </Box>
                        </Box>

                        {/*Cambio de Sección */}
                        <Box
                        component="fieldset"
                        sx={{
                            display:'flex',
                            gap:2,
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 3,
                            justifyContent:'center'
                        }}
                        >
                            <Typography
                            variant="body1"
                            component="legend"
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Cambio de Sección
                            </Typography>

                            <Button
                            variant='contained'
                            sx={{
                                width:'350px',
                                fontWeight:'bold',
                                backgroundColor:'#006391'
                            }}
                            onClick={() => setVerCambio(true)}
                            >
                                Cambiar Sección
                            </Button>
                        </Box>
                            
                    </Box>
                </Box>
                
                
                {/*Páginas seleccionadas*/}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:10
                }}
                >
                    {verInscribir && (
                        <Inscribir_Page
                        close={() => setVerInscribir(false)}
                        seccionesSolicitud={seccionesInscripcion}
                        setSeccionesSolicitud={setSeccionesInscripcion}
                        carta={cartaInscripcion}
                        setCarta={setCartaInscripcion}
                        setStateInscripciones={setStateInscripcion}
                        />
                    )}

                    {verDesinscribir && (
                        <Desinscribir_Page
                        close={() => setVerDesinscribir(false)}
                        seccionesSolicitud={seccionesDesinscripcion}
                        setSeccionesSolicitud={setSeccionesDesinscripcion}
                        carta={cartaDesinscripcion}
                        setCarta={setCartaDesinscripcion}
                        setStateDesinscripciones={setStateDesinscripcion}
                        />
                    )}

                    {verClase && (
                        <Justificar_Clase_Page
                        close={() => setVerClase(false)}
                        />
                    )}
{/*
                    {verEvaluacion && (

                    )}
                     */}

                    {verCambio && (
                        <Cambio_Seccion
                        close={() => setVerCambio(false)}
                        seccionesSolicitud={seccionesCambio}
                        setSeccionesSolicitud={setSeccionesCambio}
                        setStateCambios={setStateCambio}
                        />
                    )}
                </Box>


                {/*Boton para enviar la solicitud*/}
                <Box
                sx={{
                    display:'flex',
                    justifyContent:'center',
                }}
                >
                    <Button
                    onClick={() => generarFicha()}
                    disabled={
                        (verInscribir && !seccionesInscripcion) ||
                        (verDesinscribir && !seccionesDesinscripcion) ||
                        (verClase && !seccionesClase) ||
                        (verEvaluacion && !seccionesEvaluacion) ||
                        (verCambio && !seccionesCambio)
                    }
                    variant="contained"
                    sx={{
                        width:'300px',
                        backgroundColor:'#003c58'
                    }}
                    >
                        Enviar Solicitud
                    </Button>
                </Box>
                    
            </Box>
                
            
        </Box>
    );
}











