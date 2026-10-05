'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    TextField, Typography, Checkbox,
    FormControlLabel, CircularProgress,
    Stack, Divider, FormControl,
    InputLabel, Select, MenuItem
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Ficha } from "@/types/ficha";

import Logo_Publica from "@/Imagenes/Logo escuela blanco.png"

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import axios from "axios";
import __url from "@/lib/const";
import { Asignatura } from "@/types/asignatura";
import { Seccion } from "@/types/seccion";

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
    Ano_Ingreso: string;
    Sede: string;
    Semestre: string;
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
        Ano_Ingreso: '',
        Sede: '',
        Semestre: ''
    });
    
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

    const [ficha, setFicha] = useState<Ficha>({
        Fecha_Actual: '',
        Estado: ''
    });

    const [verInscribir, setVerInscribir] = useState(false);
    const [verDesinscribir, setVerDesinscribir] = useState(false);
    const [verClase, setVerClase] = useState(false);
    const [verEvaluacion, setVerEvaluacion] = useState(false);
    const [verSeccion, setVerSeccion] = useState(false);

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
                }}
                >
                    {/*Datos estudiante*/}
                    <Box
                    component="fieldset"
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:2,
                        ml:'10%',
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
                        ml:'10%',
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
                            onClick={() => setVerSeccion(true)}
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
                        />
                    )}

                    {verDesinscribir && (
                        <Desinscribir_Page
                        close={() => setVerDesinscribir(false)}
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

                    {verSeccion && (
                        <Cambio_Seccion
                        close={() => setVerSeccion(false)}
                        />
                    )}
                </Box>


                {/*Boton para enviar la solicitud*/}
                <Box
                sx={{
                    display:'flex',
                    justifyContent:'center'
                }}
                >
                    <Button
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

interface PropRamo {
    close: () => void;
}

interface PropJustificacion {
    close: () => void;
}

interface PropCambio {
    close: () => void;
}

function Inscribir_Page({close}: PropRamo){
    
    const [parametroBusqueda, setParametroBusqueda] = useState<"Semestre" |  "Codigo" | "Nombre">("Codigo");

    const [valorBusqueda, setValorBusqueda] = useState<string>('');



    const [stateRespuesta, setStateRespuesta] = useState(false);

    const [stateError, setStateError] = useState(false);

    const [stateExito, setStateExito] = useState(false);

    const [respuestaServidor, setRespuestaServidor] = useState<Asignatura[]>();
    
    const [mensajeError, setMensajeError] = useState<string>();


    const [stateBusqueda, setStateBusqueda] = useState(false);


    const [stateCarta, setStateCarta] = useState(false);

    const [archivo, setArchivo] = useState<File | null>(null);


    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);


    const [secciones, setSecciones] = useState<Seccion[]>([]);

    const [seccionDuplicada, setSeccionDuplicada] = useState<Seccion>();

    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);


    const seleccionarSeccion = (asignatura: Asignatura, seccion: Seccion) => {
        setSecciones((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.find(sec => sec === seccion);


            if (yaSeleccionado) {
                return seccionesActuales;
            }

            if(secciones.some(sec => sec.asignatura?.Nombre === asignatura.Nombre)){
                setStateSeccionDuplicada(true);
                seccion.asignatura = asignatura;
                setSeccionDuplicada(seccion);
                
                return seccionesActuales;
            }

            seccion.asignatura = asignatura;

            return [...seccionesActuales, seccion];
        });
    };

    const deseleccionarRamo = (seccion: Seccion) => {
        setSecciones(secciones.filter(sec => sec !== seccion));
    };

    const buscar = async() => {

        let response;

       try {

        
        switch (parametroBusqueda) {
            
            case "Codigo":
            response = await axios.get(
                `${__url}/asignatura/buscar-codigo/${valorBusqueda}`
            );
            break;

            case "Nombre":
            response = await axios.get(
                `${__url}/asignatura/buscar-nombre/${valorBusqueda}`
            );
            break;

            case "Semestre":
            response = await axios.get(
                `${__url}/asignatura/buscar-semestre/${valorBusqueda}`
            );
            break;
        }

        setStateBusqueda(false);

        setStateRespuesta(true);
        setRespuestaServidor(response.data);
        setStateExito(true);

        } catch (error) {
        setStateExito(false);
        setStateError(true);

        if (parametroBusqueda === "Codigo") {
            setMensajeError("El código ingresado no es válido.");
        }

        if (parametroBusqueda === "Nombre") {
            setMensajeError("El nombre ingresado no es válido.");
        }

        if (parametroBusqueda === "Semestre") {
            setMensajeError(
            `La carrera Administración Pública no tiene un ${valorBusqueda} semestre.`
            );
        }
        
        setStateBusqueda(false);
        }
    };

    return(
        <Box
        sx={{
            alignItems: 'flex-start',
            width:'1500px',
            ml:'0.5%'
        }}
        >
            <Box
            component="fieldset"
            sx={{
            display:'flex',
            flexDirection:'column',
            height:'auto',
            gap: 10,
            border: '2px solid black',
            borderRadius: '8px',
            padding: 1,
            }}
            >

                <Typography
                component="legend"
                sx={{
                    fontWeight:'bold',
                    ml:'10px'
                }}
                >
                    Inscribir Asignaturas
                </Typography>

                {/* Buscador - CheckBox's - Cerrar*/}
                <Box
                sx={{
                display:'flex'
                }}
                >
                    <Box
                    sx={{
                        display:'flex',
                        gap:2,
                    }}
                    >

                        {/*CheckBox's */}
                        <Box
                        component="fieldset"
                        sx={{
                            display:'flex',
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 0.5,
                            width: '600px',
                            height:'80px'
                        }}
                        >

                            <Typography
                            component="legend"
                            sx={{
                                fontWeight:'bold',
                                ml:'10px'
                            }}
                            >
                                Buscar por
                            </Typography>
                                
                            {/*Código */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={codigoMarcado}
                                    onChange={(event) => setCodigoMarcado(event.target.checked)}
                                    onClick={() => {
                                        setCodigoMarcado(prev => !prev);
                                        setParametroBusqueda("Codigo");
                                        if (!codigoMarcado) {
                                            setNombreMarcado(false);
                                            setSemestreMarcado(false);
                                        }
                                    }}
                                    />
                                }
                                label="Código Asignatura"
                                />
                            </Box>

                            {/*Nombre */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={nombreMarcado}
                                    onChange={(event) => setNombreMarcado(event.target.checked)}
                                    onClick={() => {
                                        setNombreMarcado(prev => !prev);
                                        setParametroBusqueda("Nombre");
                                        if (!nombreMarcado) {
                                            setCodigoMarcado(false);
                                            setSemestreMarcado(false);
                                        }
                                    }}
                                    />
                                }
                                label="Nombre Asignatura"
                                />
                            </Box>

                            {/*Semestre */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={semestreMarcado}
                                    onChange={(event) => setSemestreMarcado(event.target.checked)}
                                    onClick={() => {
                                            setSemestreMarcado(prev => !prev);
                                            setParametroBusqueda("Semestre");
                                            if (!semestreMarcado) {
                                                setNombreMarcado(false);
                                                setCodigoMarcado(false);
                                            }
                                        }}
                                    />
                                }
                                label="Semestre Asignatura"
                                />
                            </Box>
                        </Box>

                        {/*Buscador */}
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            ml:'20px',
                            mt:'20px'
                        }}
                        >
                            {/*Buscador */}
                            <TextField
                            slotProps={{
                                input: {
                                endAdornment: (
                                    <Button

                                    onClick={() => {
                                        setStateBusqueda(true);
                                        buscar();
                                    }}

                                    disabled={
                                        !valorBusqueda ||
                                        (
                                        !codigoMarcado &&
                                        !nombreMarcado &&
                                        !semestreMarcado
                                        )
                                    }

                                    sx={{
                                        borderRadius:'50px',
                                        backgroundColor:'#006391',
                                        color:'white'
                                    }}
                                    >
                                        <SearchIcon/>
                                    </Button>
                                ),
                                },
                            }}
                            sx={{
                                width:'400px'
                            }}

                            value={valorBusqueda}

                            onChange={(e) => setValorBusqueda(e.target.value)}

                            placeholder={
                                nombreMarcado ? "Nombre Asignatura"
                                : codigoMarcado ? "APU 111"
                                : semestreMarcado ? "primero, segundo, etc"
                                : "Seleccione un filtro de Busqueda"
                            }
                            />

                            <Button
                            variant="text"
                            disableRipple
                            onClick={() => 
                                window.open("https://publica.uv.cl/escuela/pregrado/malla-curricular")
                            }
                            sx={{
                                fontWeight:'bold',
                                fontSize:'10px',
                                '&:hover': {
                                backgroundColor: 'transparent',
                                },
                                '&:active': {
                                backgroundColor: 'transparent',
                                }
                            }}
                            >
                                Malla Curricular Oficial
                            </Button>

                        </Box>
                        
                    </Box>

                    {/* Cerrar */}
                    <Button

                    onClick={() => close()}
                    sx={{
                        ml:'auto',
                        display:'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        backgroundColor:'red',
                        color:'white',
                        width:'30px',
                        height:'30px',
                        borderRadius:'50px'
                        }}
                    >
                        X
                    </Button>

                </Box>

                {/*Seleccionados - Repuesta / Carta */}
                <Stack
                spacing={5}
                divider={
                    <Divider
                        sx={{
                            width: '1200px',
                            alignSelf: 'center',
                            borderBottomWidth: 3,
                            borderColor:'#003c58'
                        }}
                    />
                }
                >
                    {/*Seleccionados - respuesta - Buscando */}
                    <Box
                    sx={{
                        display:'flex',
                        gap: 10
                    }}
                    >

                        {/* Ramos seleccionados */}
                        <Box
                        component="fieldset"
                        sx={{
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 0.5,
                            width: '300px',
                            minHeight:'300px',
                            height:'auto',
                        }}
                        >
                            <Typography
                            component="legend"
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Ramos Seleccionados
                            </Typography>

                            <Table
                                sx={{
                                    tableLayout: 'fixed',
                                    width: '190px'
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '65px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Código
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '150px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Asignatura
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion
                                        </TableCell>

                                        
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '150px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Correo Profesor
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Acción
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {secciones.map((seccion) => (
                                        <TableRow key={seccion.num_Seccion}>
                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.asignatura?.Codigo}
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.asignatura?.Nombre}
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.num_Seccion}
                                            </TableCell>
                                            
                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.profesor?.Mail}
                                            </TableCell>

                                            <TableCell align='center' sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5,
                                            }}>
                                                <Button
                                                onClick={() => deseleccionarRamo(seccion)}
                                                variant="outlined"
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>

                        {/*Respuesta servidor - Buscando */}
                        <Box
                        sx={{
                            position:'relative'
                        }}
                        >
                            {/*Respuesta servidor */}
                            {stateRespuesta && (
                                <Box>
                                    <Box>
                                        {stateError && (
                                            <Box
                                            sx={{
                                                display:'flex',
                                                justifyContent:'center',
                                                alignItems:'center'
                                            }}
                                            >
                                                <Typography>
                                                    {mensajeError}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box>
                                        {stateExito && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: 5
                                                }}
                                            >
                                                <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '65px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Código
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '150px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Asignatura
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '120px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Seccion
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '150px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Correo Profesor
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {respuestaServidor?.map(asig =>
                                                            asig.secciones?.map(seccion => (
                                                                <TableRow
                                                                    key={seccion.num_Seccion}
                                                                    onClick={() => {
                                                                        seleccionarSeccion(asig, seccion);
                                                                    }}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        backgroundColor: secciones.find(
                                                                            sec => 
                                                                            sec.num_Seccion === seccion.num_Seccion && 
                                                                            sec.asignatura?.Codigo === asig.Codigo
                                                                        )
                                                                            ? 'lightblue'
                                                                            : 'transparent'
                                                                    }}
                                                                >
                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {asig.Codigo}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {asig.Nombre}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {seccion.num_Seccion}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {seccion.profesor?.Mail}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>

                                                {stateSeccionDuplicada && (
                                                    <Box
                                                    sx={{
                                                        borderRadius:'20px',
                                                        border:'2px solid black',
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        width:'250px',
                                                        padding:2
                                                    }}
                                                    >
                                                        <Box
                                                        sx={{
                                                            display:'flex'
                                                        }}
                                                        >
                                                            <Button
                                                            onClick={() => setStateSeccionDuplicada(false)}
                                                            sx={{
                                                                borderRadius:'50px',
                                                                backgroundColor:'red',
                                                                ml:'auto',
                                                                color:'white',
                                                                width:'50px',
                                                                height:'50px'
                                                            }}
                                                            >
                                                                X
                                                            </Button>
                                                        </Box>
                                                        <Typography
                                                        sx={{
                                                            fontWeight:'bold',
                                                            fontSize:'15px'
                                                        }}
                                                        >
                                                            Ya seleccionaste una seccion
                                                            <br/>
                                                            de la asignatura {seccionDuplicada?.asignatura?.Nombre}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>

                                </Box>
                                
                                
                            )}

                            {/*Buscando ° */}
                            {stateBusqueda && (
                                <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 10,
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
                                            fontWeight:'bold',
                                        }}
                                    >
                                        Buscando...
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/*Button Carta */}
                    <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                    >
                        {stateCarta && (
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:2,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            >
                                {/*Nombre Archivo */}
                                <Box
                                sx={{
                                    display:'flex',
                                    gap:2,
                                    justifyContent:'center'
                                }}
                                >
                                    <Typography
                                    sx={{
                                        display:'flex',
                                        alignItems:'center'
                                    }}
                                    >
                                        {archivo?.name}
                                    </Typography>
                                    <Button
                                    sx={{
                                        color:'red'
                                    }}
                                    onClick={() => {
                                        setArchivo(null);
                                        setStateCarta(false);
                                    }}
                                    >
                                        X
                                    </Button>
                                </Box>

                                {/*Cambiar Carta */}
                                <Button     
                                sx={{
                                    backgroundColor:'#003c58',
                                    width:'300px'
                                }}       
                                variant="contained"
                                component="label"
                                >
                                    <Box
                                    sx={{
                                        display:'flex',
                                        gap:5
                                    }}
                                    >
                                        Cambiar Carta
                                        <ChangeCircleIcon sx={{color:'white' }}/>
                                    </Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        hidden
                                        onChange={(event) => {
                                            const archivoSeleccionado = event.target.files?.[0];

                                            if (archivoSeleccionado) {
                                                setArchivo(archivoSeleccionado);
                                            }
                                        }}
                                    />
                                </Button>
                            </Box>
                            
                        )}
                        
                        {!stateCarta && (
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center'
                            }}
                            >
                                <Button  
                                sx={{
                                    backgroundColor:'#003c58',
                                    width:'300px'
                                }}
                                
                                variant="contained"
                                component="label"
                                >
                                    <Box
                                    sx={{
                                        display:'flex',
                                        gap:5
                                    }}
                                    >
                                        <Typography>
                                            Cargar Carta
                                        </Typography>
                                        <CloudUploadIcon sx={{color:'white'}} />
                                    </Box>
                                    


                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        hidden
                                        onChange={(event) => {
                                            const archivoSeleccionado = event.target.files?.[0];

                                            if (archivoSeleccionado) {
                                                setArchivo(archivoSeleccionado)
                                                setStateCarta(true);
                                            }else{
                                                setStateCarta(false);
                                            }
                                        }}
                                    />
                                </Button>

                                <Typography
                                sx={{
                                    display:'flex'
                                }}
                                >
                                    (Formatos permitidos: doc, docx, pdf)
                                </Typography>
                            </Box>
                            
                        )}

                    </Box>   
                    
                </Stack>
                
            </Box>
                
            
        </Box>
            
    )
}

function Desinscribir_Page({close}: PropRamo){
    
    const [parametroBusqueda, setParametroBusqueda] = useState<"Semestre" |  "Codigo" | "Nombre">("Codigo");

    const [valorBusqueda, setValorBusqueda] = useState<string>('');



    const [stateRespuesta, setStateRespuesta] = useState(false);

    const [stateError, setStateError] = useState(false);

    const [stateExito, setStateExito] = useState(false);

    const [respuestaServidor, setRespuestaServidor] = useState<Asignatura[]>();
    
    const [mensajeError, setMensajeError] = useState<string>();


    const [stateBusqueda, setStateBusqueda] = useState(false);


    const [stateCarta, setStateCarta] = useState(false);

    const [archivo, setArchivo] = useState<File | null>(null);


    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);


    const [secciones, setSecciones] = useState<Seccion[]>([]);

    const [seccionDuplicada, setSeccionDuplicada] = useState<Seccion>();

    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);


    const seleccionarSeccion = (asignatura: Asignatura, seccion: Seccion) => {
        setSecciones((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.find(sec => sec === seccion);


            if (yaSeleccionado) {
                return seccionesActuales;
            }

            if(secciones.some(sec => sec.asignatura?.Nombre === asignatura.Nombre)){
                setStateSeccionDuplicada(true);
                seccion.asignatura = asignatura;
                setSeccionDuplicada(seccion);
                
                return seccionesActuales;
            }

            seccion.asignatura = asignatura;

            return [...seccionesActuales, seccion];
        });
    };

    const deseleccionarRamo = (seccion: Seccion) => {
        setSecciones(secciones.filter(sec => sec !== seccion));
    };


    const buscar = async() => {

        let response;

       try {

        
        switch (parametroBusqueda) {
            
            case "Codigo":
            response = await axios.get(
                `${__url}/asignatura/buscar-codigo/${valorBusqueda}`
            );
            break;

            case "Nombre":
            response = await axios.get(
                `${__url}/asignatura/buscar-nombre/${valorBusqueda}`
            );
            break;

            case "Semestre":
            response = await axios.get(
                `${__url}/asignatura/buscar-semestre/${valorBusqueda}`
            );
            break;
        }

        setStateBusqueda(false);

        setStateRespuesta(true);
        setRespuestaServidor(response.data);
        setStateExito(true);

        } catch (error) {
        setStateExito(false);
        setStateError(true);

        if (parametroBusqueda === "Codigo") {
            setMensajeError("El código ingresado no es válido.");
        }

        if (parametroBusqueda === "Nombre") {
            setMensajeError("El nombre ingresado no es válido.");
        }

        if (parametroBusqueda === "Semestre") {
            setMensajeError(
            `La carrera Administración Pública no tiene un ${valorBusqueda} semestre.`
            );
        }
        
        setStateBusqueda(false);
        }
    };


    return(
        <Box
        sx={{
            alignItems: 'flex-start',
            width:'1500px',
            ml:'0.5%'
        }}
        >
            <Box
            component="fieldset"
            sx={{
            display:'flex',
            flexDirection:'column',
            height:'auto',
            gap: 10,
            border: '2px solid black',
            borderRadius: '8px',
            padding: 1,
            }}
            >

                <Typography
                component="legend"
                sx={{
                    fontWeight:'bold',
                    ml:'10px'
                }}
                >
                    Desinscribir Asignaturas
                </Typography>

                {/* Buscador - CheckBox's - Cerrar*/}
                <Box
                sx={{
                display:'flex'
                }}
                >
                    <Box
                    sx={{
                        display:'flex',
                        gap:2,
                    }}
                    >

                        {/*CheckBox's */}
                        <Box
                        component="fieldset"
                        sx={{
                            display:'flex',
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 0.5,
                            width: '600px',
                            height:'80px'
                        }}
                        >

                            <Typography
                            component="legend"
                            sx={{
                                fontWeight:'bold',
                                ml:'10px'
                            }}
                            >
                                Buscar por
                            </Typography>
                                
                            {/*Código */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={codigoMarcado}
                                    onChange={(event) => setCodigoMarcado(event.target.checked)}
                                    onClick={() => {
                                        setCodigoMarcado(prev => !prev);
                                        setParametroBusqueda("Codigo");
                                        if (!codigoMarcado) {
                                            setNombreMarcado(false);
                                            setSemestreMarcado(false);
                                        }
                                    }}
                                    />
                                }
                                label="Código Asignatura"
                                />
                            </Box>

                            {/*Nombre */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={nombreMarcado}
                                    onChange={(event) => setNombreMarcado(event.target.checked)}
                                    onClick={() => {
                                        setNombreMarcado(prev => !prev);
                                        setParametroBusqueda("Nombre");
                                        if (!nombreMarcado) {
                                            setCodigoMarcado(false);
                                            setSemestreMarcado(false);
                                        }
                                    }}
                                    />
                                }
                                label="Nombre Asignatura"
                                />
                            </Box>

                            {/*Semestre */}
                            <Box>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={semestreMarcado}
                                    onChange={(event) => setSemestreMarcado(event.target.checked)}
                                    onClick={() => {
                                            setSemestreMarcado(prev => !prev);
                                        setParametroBusqueda("Semestre");
                                            if (!semestreMarcado) {
                                                setNombreMarcado(false);
                                                setCodigoMarcado(false);
                                            }
                                        }}
                                    />
                                }
                                label="Semestre Asignatura"
                                />
                            </Box>
                        </Box>

                        {/*Buscador */}
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            ml:'20px',
                            mt:'20px'
                        }}
                        >
                            {/*Buscador */}
                            <TextField
                            slotProps={{
                                input: {
                                endAdornment: (
                                    <Button

                                    onClick={() => {
                                        setStateBusqueda(true);
                                        buscar();
                                    }}

                                    disabled={
                                        !valorBusqueda ||
                                        (
                                        !codigoMarcado &&
                                        !nombreMarcado &&
                                        !semestreMarcado
                                        )
                                    }

                                    sx={{
                                        borderRadius:'50px',
                                        backgroundColor:'#006391',
                                        color:'white'
                                    }}
                                    >
                                        <SearchIcon/>
                                    </Button>
                                ),
                                },
                            }}
                            sx={{
                                width:'400px'
                            }}

                            value={valorBusqueda}

                            onChange={(e) => setValorBusqueda(e.target.value)}

                            placeholder={
                                nombreMarcado ? "Nombre Asignatura"
                                : codigoMarcado ? "APU 111"
                                : semestreMarcado ? "primero, segundo, etc"
                                : "Seleccione un filtro de Busqueda"
                            }
                            />

                            <Button
                            variant="text"
                            disableRipple
                            onClick={() => 
                                window.open("https://publica.uv.cl/escuela/pregrado/malla-curricular")
                            }
                            sx={{
                                fontWeight:'bold',
                                fontSize:'10px',
                                '&:hover': {
                                backgroundColor: 'transparent',
                                },
                                '&:active': {
                                backgroundColor: 'transparent',
                                }
                            }}
                            >
                                Malla Curricular Oficial
                            </Button>

                        </Box>
                        
                    </Box>

                    {/* Cerrar */}
                    <Button

                    onClick={() => close()}
                    sx={{
                        ml:'auto',
                        display:'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        backgroundColor:'red',
                        color:'white',
                        width:'30px',
                        height:'30px',
                        borderRadius:'50px'
                        }}
                    >
                        X
                    </Button>

                </Box>

                <Stack
                spacing={5}
                divider={
                    <Divider
                        sx={{
                            width: '1200px',
                            alignSelf: 'center',
                            borderBottomWidth: 3,
                            borderColor:'#003c58'
                        }}
                    />
                }
                >
                    {/*Seleccionados - respuesta - Buscando */}
                    <Box
                    sx={{
                        display:'flex',
                        gap: 10
                    }}
                    >

                        {/* Ramos seleccionados */}
                        <Box
                        component="fieldset"
                        sx={{
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 0.5,
                            width: '300px',
                            minHeight:'300px',
                            height:'auto',
                        }}
                        >
                            <Typography
                            component="legend"
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Ramos Seleccionados
                            </Typography>

                            <Table
                                sx={{
                                    tableLayout: 'fixed',
                                    width: '190px'
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '65px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Código
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '150px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Asignatura
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion
                                        </TableCell>

                                        
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '150px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Correo Profesor
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Acción
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {secciones.map((seccion) => (
                                        <TableRow key={seccion.num_Seccion}>
                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.asignatura?.Codigo}
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.asignatura?.Nombre}
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.num_Seccion}
                                            </TableCell>
                                            
                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {seccion.profesor?.Mail}
                                            </TableCell>

                                            <TableCell align='center' sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5,
                                            }}>
                                                <Button
                                                onClick={() => deseleccionarRamo(seccion)}
                                                variant="outlined"
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>

                        {/*Respuesta servidor - Buscando */}
                        <Box
                        sx={{
                            position:'relative'
                        }}
                        >
                            {/*Respuesta servidor */}
                            {stateRespuesta && (
                                <Box>
                                    <Box>
                                        {stateError && (
                                            <Box
                                            sx={{
                                                display:'flex',
                                                justifyContent:'center',
                                                alignItems:'center'
                                            }}
                                            >
                                                <Typography>
                                                    {mensajeError}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box>
                                        {stateExito && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    gap: 5
                                                }}
                                            >
                                                <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '65px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Código
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '150px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Asignatura
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '120px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Seccion
                                                            </TableCell>

                                                            <TableCell sx={{
                                                                border: '1px solid black',
                                                                width: '150px',
                                                                py: 0.25,
                                                                px: 0.5
                                                            }}>
                                                                Correo Profesor
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {respuestaServidor?.map(asig =>
                                                            asig.secciones?.map(seccion => (
                                                                <TableRow
                                                                    key={seccion.num_Seccion}
                                                                    onClick={() => {
                                                                        seleccionarSeccion(asig, seccion);
                                                                    }}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        backgroundColor: secciones.find(
                                                                            sec => 
                                                                            sec.num_Seccion === seccion.num_Seccion && 
                                                                            sec.asignatura?.Codigo === asig.Codigo
                                                                        )
                                                                            ? 'lightblue'
                                                                            : 'transparent'
                                                                    }}
                                                                >
                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {asig.Codigo}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {asig.Nombre}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {seccion.num_Seccion}
                                                                    </TableCell>

                                                                    <TableCell sx={{
                                                                        border: '1px solid black',
                                                                        py: 0.25,
                                                                        px: 0.5
                                                                    }}>
                                                                        {seccion.profesor?.Mail}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>

                                                {stateSeccionDuplicada && (
                                                    <Box
                                                    sx={{
                                                        borderRadius:'20px',
                                                        border:'2px solid black',
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        width:'250px',
                                                        padding:2
                                                    }}
                                                    >
                                                        <Box
                                                        sx={{
                                                            display:'flex'
                                                        }}
                                                        >
                                                            <Button
                                                            onClick={() => setStateSeccionDuplicada(false)}
                                                            sx={{
                                                                borderRadius:'50px',
                                                                backgroundColor:'red',
                                                                ml:'auto',
                                                                color:'white',
                                                                width:'50px',
                                                                height:'50px'
                                                            }}
                                                            >
                                                                X
                                                            </Button>
                                                        </Box>
                                                        <Typography
                                                        sx={{
                                                            fontWeight:'bold',
                                                            fontSize:'15px'
                                                        }}
                                                        >
                                                            Ya seleccionaste una seccion
                                                            <br/>
                                                            de la asignatura {seccionDuplicada?.asignatura?.Nombre}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>

                                </Box>
                                
                                
                            )}

                            {/*Buscando ° */}
                            {stateBusqueda && (
                                <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 10,
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
                                            fontWeight:'bold',
                                        }}
                                    >
                                        Buscando...
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/*Button Carta */}
                    <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                    >
                        {stateCarta && (
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:2,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            >
                                {/*Nombre Archivo */}
                                <Box
                                sx={{
                                    display:'flex',
                                    gap:2,
                                    justifyContent:'center'
                                }}
                                >
                                    <Typography
                                    sx={{
                                        display:'flex',
                                        alignItems:'center'
                                    }}
                                    >
                                        {archivo?.name}
                                    </Typography>
                                    <Button
                                    sx={{
                                        color:'red'
                                    }}
                                    onClick={() => {
                                        setArchivo(null);
                                        setStateCarta(false);
                                    }}
                                    >
                                        X
                                    </Button>
                                </Box>

                                {/*Cambiar Carta */}
                                <Button     
                                sx={{
                                    backgroundColor:'#003c58',
                                    width:'300px'
                                }}       
                                variant="contained"
                                component="label"
                                >
                                    <Box
                                    sx={{
                                        display:'flex',
                                        gap:5
                                    }}
                                    >
                                        Cambiar Carta
                                        <ChangeCircleIcon sx={{color:'white' }}/>
                                    </Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        hidden
                                        onChange={(event) => {
                                            const archivoSeleccionado = event.target.files?.[0];

                                            if (archivoSeleccionado) {
                                                setArchivo(archivoSeleccionado);
                                            }
                                        }}
                                    />
                                </Button>
                            </Box>
                            
                        )}
                        
                        {!stateCarta && (
                            <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center'
                            }}
                            >
                                <Button  
                                sx={{
                                    backgroundColor:'#003c58',
                                    width:'300px'
                                }}
                                
                                variant="contained"
                                component="label"
                                >
                                    <Box
                                    sx={{
                                        display:'flex',
                                        gap:5
                                    }}
                                    >
                                        <Typography>
                                            Cargar Carta
                                        </Typography>
                                        <CloudUploadIcon sx={{color:'white'}} />
                                    </Box>
                                    


                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        hidden
                                        onChange={(event) => {
                                            const archivoSeleccionado = event.target.files?.[0];

                                            if (archivoSeleccionado) {
                                                setArchivo(archivoSeleccionado)
                                                setStateCarta(true);
                                            }else{
                                                setStateCarta(false);
                                            }
                                        }}
                                    />
                                </Button>

                                <Typography>
                                    (Formatos permitidos: doc, docx, pdf)
                                </Typography>
                            </Box>
                            
                        )}

                    </Box>   
                    
                </Stack>
                
                
            </Box>
                
            
        </Box>
            
    )
}

function Justificar_Clase_Page({close} : PropJustificacion){

    const opciones = [
        "Fallecimiento de un familiar, o de un ser querido", 
        "Problema médico", 
        "problema psicológico", 
        "Problema de transporte",
        "Problemas laborales",
        "Problemas económicos",
        "Viaje",
        "Otro"
    ];

    return(
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
            <Box
            sx={{
                border: '4px solid black',
                borderRadius: '20px',
                padding: 2,
                display:'flex',
                flexDirection:'column',
                gap: 5
            }}
            component="fieldset"
            >
                <Typography
                component="legend"
                sx={{
                    fontWeight:'bold'
                }}
                >
                    Seleccione sus motivos de inasistencia
                </Typography>
                <Button
                sx={{
                    backgroundColor:'red',
                    color:'white',
                    width:'100px',
                    ml:'auto'
                }}
                onClick={close}
                >
                    X
                </Button>

                <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                border: '1px solid black',
                                width: '65px',
                                py: 0.25,
                                px: 0.5
                            }}>
                                Justificación
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {opciones.map((opcion) => (
                            <TableRow
                                key={opcion}
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <TableCell sx={{
                                    border: '1px solid black',
                                    py: 0.25,
                                    px: 0.5
                                }}>
                                    {opcion}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            </Box>
        </Box>
    );
}

function Cambio_Seccion({close} : PropCambio){

    const [asignaturas, setAsignaturas] = useState<Asignatura[]>();

    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState<Asignatura>({
        Codigo: '',
        Nombre: '',
        Ano_Malla: '',
        secciones: []
    });

    
    const [stateSecciones, setStateSecciones] = useState(false);

    const [seccionActual, setSeccionActual] = useState<Seccion>();

    const [seccionCambio, setSeccionCambio] = useState<Seccion>();

    const [seccionesSolicitud, setSeccionesSolicitud] = useState<Seccion[][]>();


    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);

    const [stateIncompleto, setStateIncompleto] = useState(false);

    const [stateMismaSeccion, setStateMismaSeccion] = useState(false);

    //inicializo asignaturas
    useEffect(() => {
        const datos = async() => {
            const response = await axios.get(`${__url}/asignatura/buscar-todas`);
            setAsignaturas(response.data);
        }
        datos();

        
    }, []);


    const agregarCambio = () => {

        setSeccionesSolicitud((seccionesCargadas) => {

            if(!seccionActual || !seccionCambio){
                mostrarIncompleto();
                return seccionesCargadas;
            }

            if(seccionActual.num_Seccion === seccionCambio.num_Seccion){
                mostrarMismas();
                return seccionesCargadas;
            }
            
            seccionActual.asignatura = asignaturaSeleccionada;
            seccionCambio.asignatura = asignaturaSeleccionada;

            //reviso si el arreglo está vacío
            if(!seccionesCargadas){
                return [[seccionActual, seccionCambio]];
            }

            //reviso si hay más de una sección asociada a la misma asignatura
            const duplicadas = seccionesSolicitud?.some(
                secs => secs.some(sec => (
                    sec.num_Seccion === seccionActual?.num_Seccion &&
                    sec.asignatura?.Codigo === asignaturaSeleccionada.Codigo    
                ))
            )

            if(duplicadas){
                mostrarDuplicado();
                const originales = seccionesSolicitud?.find(
                    secs => secs.some(sec => (
                        sec.num_Seccion === seccionActual?.num_Seccion &&
                        sec.asignatura?.Codigo === asignaturaSeleccionada.Codigo    
                    ))
                )
                setSeccionActual(originales![0]);
                setSeccionCambio(originales![1]);
                return seccionesCargadas;
            }

            return [...seccionesCargadas, [seccionActual, seccionCambio]]
        });
    }

    const deseleccionarRamos = (secciones: Seccion[]) => {
        setSeccionesSolicitud(seccionesSolicitud?.filter(secs =>
            (secs[0].asignatura?.Codigo !== secciones[0].asignatura?.Codigo) 
        ));
    }


    const mostrarDuplicado = () => {
        setStateSeccionDuplicada(true);

        setTimeout(() => {
            setStateSeccionDuplicada(false);
        }, 7000);
    }

    const mostrarIncompleto = () => {
        setStateIncompleto(true);

        setTimeout(() => {
            setStateIncompleto(false);
        }, 7000);
    }

    const mostrarMismas = () => {
        setStateMismaSeccion(true);

        setTimeout(() => {
            setStateMismaSeccion(false);
        }, 7000);
    }

    return(
        <Box
        sx={{
            alignItems: 'flex-start',
            width:'1500px',
            ml:'0.5%',
        }}
        >
            <Box
            component="fieldset"
            sx={{
            display:'flex',
            flexDirection:'column',
            height:'auto',
            gap: 5,
            border: '2px solid black',
            borderRadius: '8px',
            padding: 2,
            }}
            >

                <Typography
                component="legend"
                sx={{
                    fontWeight:'bold',
                    ml:'10px'
                }}
                >
                    Cambio de Sección
                </Typography>

                {/* Cerrar */}
                <Button

                onClick={() => close()}
                sx={{
                    ml:'auto',
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    backgroundColor:'red',
                    color:'white',
                    width:'30px',
                    height:'30px',
                    borderRadius:'50px'
                    }}
                >
                    X
                </Button>
                
                {/*Asignaturas - Solicitudes_Cambio - Secciones - Cambio*/}
                <Box
                sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                    gap:5,
                    alignItems:'center'
                }}
                >
                    {/*Asignaturas - Solicitudes_Cambio*/}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:5
                    }}
                    >
                        <FormControl
                        sx={{
                            minWidth:'250px'
                        }}
                        >
                            <InputLabel id="demo-simple-select-label">Seleccione una asignatura</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={asignaturas}
                            label="Asignaturas"
                            onChange={(e) => {
                                if(e.target.value === "Seleccione"){
                                    setAsignaturaSeleccionada({
                                        Codigo:'',
                                        Nombre: '',
                                        Ano_Malla: '',
                                        secciones: []
                                    });
                                    setStateSecciones(false);
                                }
                                if(!asignaturas){
                                    return;
                                }

                                const seleccionado = asignaturas.find(asig => asig.Codigo === e.target.value);
                                if(!seleccionado){
                                    return;
                                }
                                setAsignaturaSeleccionada(seleccionado);

                                setSeccionActual(undefined);
                                setSeccionCambio(undefined);

                                setStateSecciones(true);
                            }}
                            >
                                <MenuItem
                                value={"Seleccione"}
                                ></MenuItem>

                                {asignaturas?.map(asig => (
                                    <MenuItem 
                                    value={asig.Codigo}
                                    >
                                        {asig.Nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/*Solicitudes_Cambio */}
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap:2,
                            width:'auto',
                            height:'auto'
                        }}
                        >

                            <Typography
                            sx={{
                                fontWeight:'bold',
                                display:'flex',
                                justifyContent:'flex-start'
                            }}
                            >
                                Cambios Solicitados
                            </Typography>

                            <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                                <TableHead>
                                    <TableRow>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '130px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Asignatura
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion Actual
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '130px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion Solicitada
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '120px',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Acción
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {seccionesSolicitud?.map(secs => 
                                        <TableRow
                                            key={secs[0].asignatura?.Codigo}
                                            sx={{
                                                cursor: 'pointer'
                                            }}
                                        >

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {secs[0].asignatura?.Nombre}
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {secs[0].num_Seccion} 
                                            </TableCell>

                                            <TableCell sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5
                                            }}>
                                                {secs[1].num_Seccion} 
                                            </TableCell>

                                            <TableCell align='center' sx={{
                                                border: '1px solid black',
                                                py: 0.25,
                                                px: 0.5,
                                            }}>
                                                <Button
                                                onClick={() => deseleccionarRamos(secs)}
                                                variant="outlined"
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                        

                    {/*Secciones - Cambio - Solicitar-Duplicado - Incompleto */}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                        gap:10
                    }}
                    >
                        {/*Secciones - Cambio */}
                        <Box
                        sx={{
                            display:'flex',
                            gap:4
                        }}
                        >
                            {stateSecciones && (
                                <Box
                                sx={{
                                    display:'flex',
                                    gap:10
                                }}
                                >
                                    {/*Secciones y Secciones_Cambio */}
                                    <Box
                                    sx={{
                                        display:'flex',
                                        gap:4
                                    }}
                                    >
                                        {/*Secciones */}
                                        <Box
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            justifyContent:'center',
                                        }}
                                        >
                                            
                                            <Typography
                                            align="left"
                                            sx={{
                                                fontWeight:'bold'
                                            }}
                                            >
                                                Indique que sección tiene 
                                                <br/>
                                                inscrita actualmente
                                            </Typography>

                                            <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                                                <TableHead>
                                                    <TableRow>

                                                        <TableCell sx={{
                                                            border: '1px solid black',
                                                            width: '120px',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            Seccion
                                                        </TableCell>

                                                        <TableCell sx={{
                                                            border: '1px solid black',
                                                            width: '120px',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            Nombre Profesor
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {asignaturaSeleccionada?.secciones?.map(sec => (
                                                            <TableRow
                                                                key={sec.num_Seccion}
                                                                onClick={() => {
                                                                    setSeccionActual(sec);
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor: seccionActual === undefined ? 'transparent'
                                                                    : sec.num_Seccion === seccionActual?.num_Seccion ||
                                                                    seccionesSolicitud?.some(
                                                                        secs =>
                                                                            secs[0].asignatura?.Codigo === asignaturaSeleccionada.Codigo &&
                                                                            secs[0].num_Seccion === sec.num_Seccion
                                                                    )
                                                                        ? 'lightblue'
                                                                        : 'transparent'
                                                                }}
                                                            >

                                                                <TableCell sx={{
                                                                    border: '1px solid black',
                                                                    py: 0.25,
                                                                    px: 0.5
                                                                }}>
                                                                    {sec.num_Seccion}
                                                                </TableCell>

                                                                <TableCell sx={{
                                                                    border: '1px solid black',
                                                                    py: 0.25,
                                                                    px: 0.5
                                                                }}>
                                                                    {sec.profesor?.Primer_Nombre} {sec.profesor?.Segundo_Nombre} {sec.profesor?.Primer_Apellido} {sec.profesor?.Segundo_Apellido}
                                                                </TableCell>
                                                            </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>

                                        {/*Secciones_Cambio */}
                                        <Box
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            justifyContent:'center',
                                        }}
                                        >

                                            <Typography
                                            align="left"
                                            sx={{
                                                fontWeight:'bold'
                                            }}
                                            >
                                                Indique a que sección 
                                                <br/>
                                                quiere cambiarse
                                            </Typography>

                                            <Table sx={{ tableLayout: 'fixed', width: '190px' }}>
                                                <TableHead>
                                                    <TableRow>

                                                        <TableCell sx={{
                                                            border: '1px solid black',
                                                            width: '120px',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            Seccion
                                                        </TableCell>

                                                        <TableCell sx={{
                                                            border: '1px solid black',
                                                            width: '120px',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            Nombre Profesor
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {asignaturaSeleccionada?.secciones?.map(sec => (
                                                            <TableRow
                                                                key={sec.num_Seccion}
                                                                onClick={() => {
                                                                    setSeccionCambio(sec)
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor:
                                                                    seccionCambio === undefined ? 'transparent'
                                                                    : sec.num_Seccion === seccionCambio?.num_Seccion ||
                                                                    seccionesSolicitud?.some(
                                                                        secs =>
                                                                            secs[1].asignatura?.Codigo === asignaturaSeleccionada.Codigo &&
                                                                            secs[1].num_Seccion === sec.num_Seccion
                                                                    )
                                                                        ? 'lightgreen'
                                                                        : 'transparent'
                                                                }}
                                                            >

                                                                <TableCell sx={{
                                                                    border: '1px solid black',
                                                                    py: 0.25,
                                                                    px: 0.5
                                                                }}>
                                                                    {sec.num_Seccion}
                                                                </TableCell>

                                                                <TableCell sx={{
                                                                    border: '1px solid black',
                                                                    py: 0.25,
                                                                    px: 0.5
                                                                }}>
                                                                    {sec.profesor?.Primer_Nombre} {sec.profesor?.Segundo_Nombre} {sec.profesor?.Primer_Apellido} {sec.profesor?.Segundo_Apellido}
                                                                </TableCell>
                                                            </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Box>
                                    
                                    {/*Agregar Cambio y mensajes de advertencia*/}
                                    <Box
                                    sx={{
                                        display:'flex',
                                        flexDirection:'column',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:'auto',
                                        gap:4
                                    }}
                                    >
                                        {stateSeccionDuplicada && (
                                            <Box
                                            sx={{
                                                borderRadius:'20px',
                                                border:'2px solid black',
                                                width:'300px',
                                                height:'100px',
                                                display:'flex',
                                                justifyContent:'center'
                                            }}
                                            >
                                                <Typography
                                                align="center"
                                                sx={{
                                                    fontWeight:'bold',
                                                    fontSize:'15px'
                                                }}
                                                >
                                                    No puedes solicitar más de un 
                                                    <br/>
                                                    cambio de sección de una misma asignatura.
                                                </Typography>
                                                
                                            </Box>
                                        )}

                                        {stateIncompleto && (
                                            <Box
                                            sx={{
                                                borderRadius:'20px',
                                                border:'2px solid black',
                                                width:'300px',
                                                height:'100px',
                                                display:'flex',
                                                justifyContent:'center'
                                            }}
                                            >
                                                <Typography
                                                align="center"
                                                sx={{
                                                    fontWeight:'bold',
                                                    fontSize:'15px'
                                                }}
                                                >
                                                    Debe indicar su seccion actual 
                                                    <br/>
                                                    y a cual desea cambiarse.
                                                </Typography>
                                                
                                            </Box>
                                        )}

                                        {stateMismaSeccion && (
                                            <Box
                                            sx={{
                                                borderRadius:'20px',
                                                border:'2px solid black',
                                                width:'300px',
                                                height:'100px',
                                                display:'flex',
                                                justifyContent:'center'
                                            }}
                                            >
                                                <Typography
                                                align="center"
                                                sx={{
                                                    fontWeight:'bold',
                                                    fontSize:'15px'
                                                }}
                                                >
                                                    La seccion solicitada debe ser
                                                    <br/>
                                                    distinta a la inscrita actualmente.
                                                </Typography>
                                                
                                            </Box>
                                        )}

                                        {/*Agregar Cambio */}
                                        <Box
                                        sx={{
                                            display:'flex',
                                            alignItems:'flex-end',
                                            justifyContent:'center'
                                        }}
                                        >
                                            <Button
                                            onClick={() => agregarCambio()}
                                            variant="contained"
                                            >
                                                Cargar Cambio
                                            </Button>
                                        </Box>
                                        
                                    </Box>
                                </Box>
                                
                            )}
                        </Box>

                    </Box>
                    
                </Box>

                
                    
            </Box>
        </Box>
    );
}

