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

    const [filtroMarcado, setFiltroMarcado] = useState(false);


    const [errorBusqueda, setErrorBusqueda] = useState(false);
    const [mensajeError, setMensajeError] = useState<string>();

    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);

    const [ramos, setRamos] = useState<string[][]>([]);

    const seleccionarRamo = (ramo: { codigo: string; nombre: string }) => {
        setRamos((ramosActuales) => {
            const yaSeleccionado = ramosActuales.some(
                ([codigo]) => codigo === ramo.codigo
            );

            if (yaSeleccionado) {
                return ramosActuales;
            }

            return [...ramosActuales, [ramo.codigo, ramo.nombre]];
        });
    };



    const buscar = async() => {
        let response;

        switch(parametroBusqueda){
            case "Codigo":
                response = await axios.get(`${__url}/asignatura/buscar-codigo/${valorBusqueda}`);
                if(response.data === "Asignatura no existente"){
                    setMensajeError("El código ingresado no es válido.")
                }
                break;
            case "Nombre":
                response = await axios.get(`${__url}/asignatura/buscar-nombre/${valorBusqueda}`);
                if(response.data === "Asignatura no existente"){
                    setMensajeError("El nombre ingresado no es válido.")
                }
                break;
            case "Semestre":
                response = await axios.get(`${__url}/asignatura/buscar-semestre/${valorBusqueda}`);
                if(response.data === "Semestre no existente"){
                    setMensajeError(`La carrera Administración Pública no tiene un ${valorBusqueda} semestre.`)
                }
                break;
        }
    }

    const deseleccionarRamo = (ramo: string[]) => {
        setRamos(ramos.filter(ram => ram[0] !== ramo[0]));
        return ramos;
    };

    return(
        <Box
        sx={{
            display:'flex',
            height:'auto',
            gap: 20,
            ml:'10%',
            alignItems: 'flex-start'
        }}
        >

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
                    fontWeight:'bold'
                }}
                >
                    Filtros de Busqueda
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

            {/* Buscador - Seleccionados */}
            <Box
            sx={{
                display:'flex',
                gap:5
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
                    height:'auto'
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
                                    Deseleccionar Ramo
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {ramos.map((ramo) => (
                                <TableRow key={ramo[0]}>
                                    <TableCell sx={{
                                        border: '1px solid black',
                                        py: 0.25,
                                        px: 0.5
                                    }}>
                                        {ramo[0]}
                                    </TableCell>

                                    <TableCell sx={{
                                        border: '1px solid black',
                                        py: 0.25,
                                        px: 0.5
                                    }}>
                                        {ramo[1]}
                                    </TableCell>
                                    <TableCell align='center' sx={{
                                        border: '1px solid black',
                                        py: 0.25,
                                        px: 0.5,
                                    }}>
                                        <Button
                                        onClick={() => deseleccionarRamo(ramo)}
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

                {/* Buscador */}
                <Box
                component="fieldset"
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    height:'auto',
                    border: '2px solid black',
                    borderRadius: '8px',
                    padding: 2,
                    width: '500px',
                    gap:5
                }}
                >

                    <Typography
                    component="legend"
                    variant="body1"
                    sx={{
                        fontWeight:'bold'
                    }}
                    >
                        Seleccione los ramos que va a inscribir
                    </Typography>

                    {/* X */}
                    <Button
                    sx={{
                        backgroundColor:'red',
                        color:'white',
                        width:'30px',
                        height:'30px',
                        ml:'auto'
                    }}
                    onClick={close}
                    >
                        X
                    </Button>

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

                                disabled={!valorBusqueda}

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
                            : codigoMarcado ? "Código Asignatura"
                            : semestreMarcado ? "Indique el semestre de la Asignatura"
                            : "Seleccione el Buscador"
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

                    {errorBusqueda && (
                        <Typography>
                            {mensajeError}
                        </Typography>
                    )}
                        
                </Box>
            </Box>
                

            
        </Box>
            
    )
}

function Desinscribir_Page({close}: PropRamo){
    const primerSemestre = [
    { codigo: "APU111", nombre: "Teoría de la Organización" },
    { codigo: "APU112", nombre: "Fundamentos de Ciencia Política" },
    { codigo: "APU113", nombre: "Nociones Generales de Derecho" },
    { codigo: "APU114", nombre: "Razonamiento Lógico Matemático" },
    { codigo: "APU115", nombre: "Inducción a la Formación Profesional" },
    { codigo: "APU116", nombre: "Competencias Lecto-Escritoras" },
    ];

    const segundoSemestre = [
        { codigo: "APU121", nombre: "Teoría de la Administración" },
        { codigo: "APU122", nombre: "Sociología" },
        { codigo: "APU123", nombre: "Derecho Constitucional" },
        { codigo: "APU124", nombre: "Matemática para la Gestión" },
        { codigo: "APU125", nombre: "Historia Política e Institucional de Chile" },
        { codigo: "APU126", nombre: "Tecnologías de la Información y la Comunicación Aplicadas a la Gestión" },
    ];

    const tercerSemestre = [
        { codigo: "APU211", nombre: "Administración Pública Chilena" },
        { codigo: "APU212", nombre: "Ideas e Instituciones Políticas" },
        { codigo: "APU213", nombre: "Derecho Administrativo I" },
        { codigo: "APU214", nombre: "Estadística" },
        { codigo: "APU215", nombre: "Gestión de Personas I" },
        { codigo: "APU216", nombre: "Inglés I" },
    ];

    const cuartoSemestre = [
        { codigo: "APU221", nombre: "Administración de Bienes y Servicios" },
        { codigo: "APU222", nombre: "Comunicación Pública" },
        { codigo: "APU223", nombre: "Derecho Administrativo II" },
        { codigo: "APU224", nombre: "Microeconomía" },
        { codigo: "APU225", nombre: "Gestión de Personas II" },
        { codigo: "APU226", nombre: "Inglés II" },
    ];

    const quintoSemestre = [
        { codigo: "APU311", nombre: "Administración Financiera del Estado" },
        { codigo: "APU312", nombre: "Contabilidad General" },
        { codigo: "APU313", nombre: "Régimen Laboral en el Sector Público" },
        { codigo: "APU314", nombre: "Macroeconomía" },
        { codigo: "APU315", nombre: "Metodología de la Investigación Cuantitativa" },
        { codigo: "APU316", nombre: "Inglés III" },
    ];

    const sextoSemestre = [
        { codigo: "APU321", nombre: "Finanzas Públicas" },
        { codigo: "APU322", nombre: "Contabilidad General de la Nación" },
        { codigo: "APU323", nombre: "Transparencia y Probidad Administrativa" },
        { codigo: "APU324", nombre: "Economía e Integración Internacional" },
        { codigo: "APU325", nombre: "Metodología de la Investigación Cualitativa" },
        { codigo: "APU326", nombre: "Taller de Modelos de Toma de Decisión Pública" },
    ];

    const septimoSemestre = [
        { codigo: "APU411", nombre: "Control de la Gestión en el Sector Público" },
        { codigo: "APU412", nombre: "Sistemas de Información" },
        { codigo: "APU413", nombre: "Derecho Internacional Público" },
        { codigo: "APU414", nombre: "Práctica Profesional I" },
        { codigo: "APU415", nombre: "Teoría y método de la fiscalización" },
        { codigo: "APU416", nombre: "Taller de Integración Sello UV I" },
    ];

    const octavoSemestre = [
        { codigo: "APU421", nombre: "Análisis Financiero" },
        { codigo: "APU422", nombre: "Relaciones Internacionales" },
        { codigo: "APU423", nombre: "Gerencia Pública" },
        { codigo: "APU424", nombre: "Gobierno y Administración Regional" },
        { codigo: "APU425", nombre: "Administración Municipal" },
        { codigo: "APU426", nombre: "Taller de Integración Sello UV II" },
    ];

    const novenoSemestre = [
        { codigo: "APU511", nombre: "Políticas Públicas" },
        { codigo: "APU512", nombre: "Taller de Negociación y Resolución de Conflictos" },
        { codigo: "APU513", nombre: "Práctica Profesional II" },
        { codigo: "APU514", nombre: "Taller de Integración Ciclo Profesional" },
        { codigo: "APU515", nombre: "Diseño y Formulación de Proyectos" },
        { codigo: "APU516", nombre: "Taller de Integración Sello UV III" },
    ];

    const decimoSemestre = [
        { codigo: "APU521", nombre: "Seminario de Título" },
        { codigo: "APU522", nombre: "Taller de Investigación Aplicada" },
        { codigo: "APU523", nombre: "Asignatura Electiva" },
    ];

    const [ramos, setRamos] = useState<string[][]>([]);

    const seleccionarRamo = (ramo: { codigo: string; nombre: string }) => {
        setRamos((ramosActuales) => {
            const yaSeleccionado = ramosActuales.some(
                ([codigo]) => codigo === ramo.codigo
            );

            if (yaSeleccionado) {
                return ramosActuales;
            }

            return [...ramosActuales, [ramo.codigo, ramo.nombre]];
        });
    };

    const deseleccionarRamo = (ramo: string[]) => {
        setRamos(ramos.filter(ram => ram[0] !== ramo[0]));
        return ramos;
    };

    return(
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            height:'auto'
        }}
        >
            <Box
            component="fieldset"
            sx={{
                display: 'flex',
                flexDirection:'column',
                height:'auto',
                border: '4px solid black',
                borderRadius: '20px',
                padding: 2,
                width: 'auto',
                alignItems:'flex-start',
                gap:5
            }}
            >

                <Typography
                component="legend"
                variant="body1"
                sx={{
                    fontWeight:'bold',
                    ml:'40%'
                }}
                >
                    Seleccione los ramos que va a desinscribir
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

                <Box
                sx={{
                    display: 'flex',
                    flexDirection:'row',
                    alignItems:'flex-start',
                    gap:10
                }}
                >
                    {/* Ramos disponibles */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width:'80%'
                        }}
                    >

                        {/* Primer-Décimo semestre */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                ml: '2%'
                            }}
                        >
                            {/* Primer-Cuarto semestre */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}
                            >

                                {/* PRIMER SEMESTRE */}
                                <Box
                                    component="fieldset"
                                    sx={{
                                        border: '2px solid black',
                                        borderRadius: '8px',
                                        padding: 0.5,
                                        width: '200px'
                                    }}
                                >
                                    <Typography component="legend">
                                        Primer Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {primerSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => {
                                                        seleccionarRamo(ramo);
                                                        
                                                    }}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* SEGUNDO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Segundo Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {segundoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* TERCER SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Tercer Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {tercerSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* CUARTO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Cuarto Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {cuartoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                            </Box>


                            {/* Quinto-Octavo semestre */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}
                            >

                                {/* QUINTO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Quinto Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {quintoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* SEXTO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Sexto Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {sextoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* SÉPTIMO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Séptimo Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {septimoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* OCTAVO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Octavo Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {octavoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                            </Box>


                            {/* Noveno-Décimo semestre */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}
                            >

                                {/* NOVENO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Noveno Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {novenoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>


                                {/* DÉCIMO SEMESTRE */}
                                <Box component="fieldset" sx={{
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    padding: 0.5,
                                    width: '200px'
                                }}>
                                    <Typography component="legend">
                                        Décimo Semestre
                                    </Typography>

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
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {decimoSemestre.map((ramo) => (
                                                <TableRow
                                                    key={ramo.codigo}
                                                    onClick={() => seleccionarRamo(ramo)}
                                                    sx={{ cursor: 'pointer',
                                                        backgroundColor: ramos.some(
                                                            ([codigo]) => codigo === ramo.codigo
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
                                                        {ramo.codigo}
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        border: '1px solid black',
                                                        py: 0.25,
                                                        px: 0.5
                                                    }}>
                                                        {ramo.nombre}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                            </Box>

                        </Box>

                    </Box>

                    {/* Ramos seleccionados */}
                    <Box
                    component="fieldset"
                    sx={{
                        border: '2px solid black',
                        borderRadius: '8px',
                        padding: 0.5,
                        width: '300px',
                        minHeight:'300px',
                        height:'auto'
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
                                        Deseleccionar Ramo
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {ramos.map((ramo) => (
                                    <TableRow key={ramo[0]}>
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            {ramo[0]}
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            {ramo[1]}
                                        </TableCell>
                                        <TableCell align='center' sx={{
                                            border: '1px solid black',
                                            py: 0.25,
                                            px: 0.5,
                                        }}>
                                            <Button
                                            onClick={() => deseleccionarRamo(ramo)}
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

