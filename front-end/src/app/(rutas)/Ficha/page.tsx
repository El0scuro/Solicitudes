'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    TextField, Typography, Checkbox,
    FormControlLabel
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Ficha } from "@/types/ficha";

import Logo_Publica from "@/Imagenes/Logo escuela blanco.png"

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import __url from "@/lib/const";
import { Asignatura } from "@/types/asignatura";
import { Seccion } from "@/types/seccion";

//interfaz para el estudiante cifrado para transporte
interface EstudianteCifrado {
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

export default function Solicitud_Ficha(){

    const router = useRouter();

    const searchParams = useSearchParams();

    const estudiante = searchParams.get('estudiante');

    const [estudianteDescifrado, setEstudianteDescifrado] = useState<EstudianteDescifrado>({
        Primer_Nombre: '',
        Segundo_Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Celular: '',
        Mail: '',
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
                        width:'25%',
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
                                        {estudianteDescifrado.Rut}
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
                        width:'300px'
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

function Inscribir_Page({close}: PropRamo){
    
    const [parametroBusqueda, setParametroBusqueda] = useState<"Semestre" |  "Codigo" | "Nombre">("Codigo");

    const [valorBusqueda, setValorBusqueda] = useState<string>('');


    const [stateRespuesta, setStateRespuesta] = useState(false);

    const [stateError, setStateError] = useState(false);

    const [stateExito, setStateExito] = useState(false);

    const [respuestaServidor, setRespuestaServidor] = useState<Asignatura[]>();
    
    const [mensajeError, setMensajeError] = useState<string>();


    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);

    const [secciones, setSecciones] = useState<Seccion[]>([]);

    const seleccionarSeccion = (seccion: Seccion) => {
        setSecciones((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.find(sec => sec === seccion);

            if (yaSeleccionado) {
                return seccionesActuales;
            }

            return [...seccionesActuales, seccion];
        });
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

        setStateRespuesta(true);
        setRespuestaServidor(response.data);
        setStateExito(true);

        } catch (error) {
        setStateExito(false);
        setStateRespuesta(false);
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
        }
    };

    const deseleccionarRamo = (seccion: Seccion) => {
        setSecciones(secciones.filter(sec => sec !== seccion));
        return secciones;
    };

    return(
        <Box
        sx={{
            ml:'2%',
            alignItems: 'flex-start',
            width:'1480px'
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

                                    onClick={() => buscar()}

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

                <Box
                sx={{
                    display:'flex'
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
                                        width: '120px',
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
                                        width: '120px',
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
                                            {seccion.asignatura.Codigo}
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            {seccion.asignatura.Nombre}
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
                                            {seccion.mail_Profesor}
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
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                    >
                                        {respuestaServidor?.map(asig => (
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
                                                            width: '120px',
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
                                                            width: '120px',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            Correo Profesor
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {respuestaServidor.map(asig => 
                                                        asig.secciones.map(seccion => (
                                                            <TableRow
                                                                key={asig.Codigo}
                                                                onClick={() => {
                                                                    seleccionarSeccion(seccion);
                                                                    
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor: secciones.find(
                                                                        sec => sec === seccion
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
                                                                    {asig.Codigo}
                                                                </TableCell>

                                                                <TableCell sx={{
                                                                    border: '1px solid black',
                                                                    py: 0.25,
                                                                    px: 0.5
                                                                }}>
                                                                    {seccion.mail_Profesor}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                    </TableBody>
                                                </Table>
                                                ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        
                        
                    )}
                </Box>
                
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


    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);

    const [secciones, setSecciones] = useState<Seccion[]>([]);

    const seleccionarSeccion = (seccion: Seccion) => {
        setSecciones((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.find(sec => sec === seccion);

            if (yaSeleccionado) {
                return seccionesActuales;
            }

            return [...seccionesActuales, seccion];
        });
    };



    const buscar = async() => {
        let response;

        switch(parametroBusqueda){
            case "Codigo":
                response = await axios.get(`${__url}/asignatura/buscar-codigo/${valorBusqueda}`);
                if(response.data === "Asignatura no existente"){
                    setMensajeError("El código ingresado no es válido.")
                }else{
                    setRespuestaServidor(response.data);
                }
                break;
            case "Nombre":
                response = await axios.get(`${__url}/asignatura/buscar-nombre/${valorBusqueda}`);
                if(response.data === "Asignatura no existente"){
                    setMensajeError("El nombre ingresado no es válido.")
                }else{
                    setRespuestaServidor(response.data);
                }
                break;
            case "Semestre":
                response = await axios.get(`${__url}/asignatura/buscar-semestre/${valorBusqueda}`);
                if(response.data === "Semestre no existente"){
                    setMensajeError(`La carrera Administración Pública no tiene un ${valorBusqueda} semestre.`)
                }else{
                    setRespuestaServidor(response.data);
                }

                break;
        }
    }

    const deseleccionarRamo = (seccion: Seccion) => {
        setSecciones(secciones.filter(sec => sec !== seccion));
        return secciones;
    };

    return(
        <Box
        sx={{
            display:'flex',
            height:'auto',
            gap: 10,
            ml:'2%',
            alignItems: 'flex-start'
        }}
        >

            {/* Buscador - CheckBox's */}
            <Box
            sx={{
                display:'flex',
                gap:2,
                flexDirection:'column'
            }}
            >
                {/*Buscador */}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                }}
                >
                    {/*Buscador */}
                    <TextField
                    slotProps={{
                        input: {
                        endAdornment: (
                            <Button

                            onClick={() => buscar()}

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
                
                {/*CheckBox's */}
                <Box
                component="fieldset"
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    border: '2px solid black',
                    borderRadius: '8px',
                    padding: 0.5,
                    width: '250px'
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
            </Box>

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
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            >
                                {respuestaServidor?.map(asig => (
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
                                                    width: '120px',
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
                                                    width: '120px',
                                                    py: 0.25,
                                                    px: 0.5
                                                }}>
                                                    Correo Profesor
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {respuestaServidor.map(asig => 
                                                asig.secciones.map(seccion => (
                                                    <TableRow
                                                        key={asig.Codigo}
                                                        onClick={() => {
                                                            seleccionarSeccion(seccion);
                                                            
                                                        }}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            backgroundColor: secciones.find(
                                                                sec => sec === seccion
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
                                                            {asig.Codigo}
                                                        </TableCell>

                                                        <TableCell sx={{
                                                            border: '1px solid black',
                                                            py: 0.25,
                                                            px: 0.5
                                                        }}>
                                                            {seccion.mail_Profesor}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                            </TableBody>
                                        </Table>
                                        ))}
                            </Box>
                        )}
                    </Box>
                </Box>
                
                
            )}

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
                position:'relative',
                left:'45    0px'
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
                                width: '120px',
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
                                width: '120px',
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
                                    {seccion.asignatura.Codigo}
                                </TableCell>

                                <TableCell sx={{
                                    border: '1px solid black',
                                    py: 0.25,
                                    px: 0.5
                                }}>
                                    {seccion.asignatura.Nombre}
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
                                    {seccion.mail_Profesor}
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

