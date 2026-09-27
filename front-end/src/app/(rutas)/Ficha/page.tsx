'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    TextField, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useState } from "react";

import { Ficha } from "@/types/ficha";

import Logo_Publica from "@/Imagenes/Logo-Administracion_Publica.webp"

import DeleteIcon from '@mui/icons-material/Delete';

export default function Solicitud_Ficha(){
    const [ficha, setFicha] = useState<Ficha>({
        Nombre: '',
        Rut: null,
        Dig_Verificador: null,
        Celular: null,
        Mail: '',
        Sede: '',
        Ano_Ingreso: null,
        Semestre: '',
        Fecha_Actual: ''
    });

    const [verInscribir, setVerInscribir] = useState(false);
    const [verDesinscribir, setVerDesinscribir] = useState(false);
    const [verClase, setVerClase] = useState(false);
    const [verEvaluacion, setVerEvaluacion] = useState(false);

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
                    <Button
                    sx={{
                        width:'400px',
                        height:'150px'
                    }}
                    >
                        <Box
                        component="img"
                        alt="Logo_Publica"
                        src={Logo_Publica.src}
                        sx={{
                            width: '80%',
                            height: '60%'
                        }}
                        />
                    </Button>
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

                {/*Datos obligatorios*/}
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
                    width:'85%',
                    alignItems:'center'
                }}
                >
                    <Typography
                    variant="body1"
                    component="legend"
                    sx={{
                        fontWeight: 'bold'
                    }}
                    >
                        Datos Obligatorios
                    </Typography>
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap: 2,
                        height:'auto'
                    }}
                    >
                        <Box
                        sx={{
                            display:'flex',
                            flexDirection:'row',
                            gap: 4,
                            flexWrap:'wrap'
                        }}
                        >
                            <TextField
                            label="Nombre"
                            placeholder="Ingrese su nombre completo"
                            value={ficha.Nombre}
                            onChange={(e) => setFicha({
                                ...ficha,
                                Nombre: e.target.value
                            })}
                            sx={{
                                width:'300px'
                            }}
                            />

                            <TextField
                            label={
                                <>
                                Numero
                                <br/>
                                Celular
                                </>
                            }
                            placeholder="912345678"
                            value={ficha.Celular ?? ''}
                            sx={{
                                    width:'150px',
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                onChange={(e) => setFicha({
                                    ...ficha,
                                    Celular: e.target.value === ''
                                    ? null 
                                    : Number(e.target.value)
                                })}
                            />

                            <TextField
                            label={
                                <>
                                Correo
                                <br/>
                                Institucional
                                </>
                            }
                            placeholder="nombre@estudiantes.uv.cl"
                            value={ficha.Mail ?? ''}
                            sx={{
                                width:'300px',
                                '& .MuiInputLabel-root':{
                                    fontSize: '10px'
                                }
                            }}
                            onChange={(e) => setFicha({
                                ...ficha,
                                Mail: e.target.value
                            })}
                            />
                            
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
                                value={ficha.Rut ?? ''}
                                sx={{
                                    width:'150px',
                                    '& input::placeholder':{
                                        fontSize: '10px'
                                    },
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                onChange={(e) => setFicha({
                                    ...ficha,
                                    Rut: e.target.value === ''
                                    ? null 
                                    : Number(e.target.value) 
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
                                value={ficha.Dig_Verificador ?? ''}
                                sx={{
                                    width:'80px',
                                    '& .MuiInputLabel-root':{
                                        fontSize: '10px'
                                    }
                                }}
                                onChange={(e) => setFicha({
                                    ...ficha,
                                    Dig_Verificador: e.target.value === ''
                                    ? null 
                                    : Number(e.target.value)
                                })}
                                />
                            </Box>
                        </Box>

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
                            value={ficha.Ano_Ingreso ?? ''}
                            onChange={(e) => setFicha({
                                ...ficha,
                                Ano_Ingreso: e.target.value === ''
                                ? null
                                : Number(e.target.value)
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
                            value={ficha.Semestre}
                            onChange={(e) => setFicha({
                                ...ficha, 
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
                            label={
                                <>
                                Fecha
                                <br/>
                                Actual
                                </>
                            }
                            placeholder="01/01/2001"
                            value={ficha.Semestre}
                            onChange={(e) => setFicha({
                                ...ficha, 
                                Fecha_Actual: e.target.value
                            })}
                            sx={{
                                width:'150px',
                                '& .MuiInputLabel-root':{
                                    fontSize: '10px'
                                }
                            }}
                            />
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
                    width:'85%',
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

                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                        gap: 2,
                        justifyContent:'center',
                        flexWrap:'wrap'
                    }}
                    >
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
                                    width:'250px',
                                    fontWeight:'bold'
                                }}
                                onClick={() => setVerInscribir(true)}
                                >
                                    Inscripción
                                    <br/>
                                    Asginaturas
                                </Button>

                                <Button
                                variant='contained'
                                sx={{
                                    backgroundColor:'red',
                                    width:'250px',
                                    fontWeight:'bold'
                                }}
                                onClick={() => setVerDesinscribir(true)}
                                >
                                    Desinscripción
                                    <br/>
                                    Asignaturas
                                </Button>
                            </Box>
                        </Box>

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
                                    width:'250px',
                                    fontWeight:'bold'
                                }}
                                onClick={() => setVerClase(true)}
                                >
                                    Justificar inasistencia
                                    <br/>
                                    a clase
                                </Button>

                                <Button
                                variant='contained'
                                sx={{
                                    width:'250px',
                                    fontWeight:'bold'
                                }}
                                
                                >
                                    Justificar inasistencia
                                    <br/>
                                    a evaluación
                                </Button>
                                
                            </Box>
                        </Box>
                    </Box>

                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        gap: 2,
                        ml:'2%'
                    }}
                    >
                        <Typography>
                            Otra, (especifique): 
                        </Typography>
                        <TextField
                        variant="standard"
                        sx={{
                            width:'90%'
                        }}
                        />
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
                    Seleccione los ramos que va a inscribir
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
                                ml: '2%',
                                width:'100%'
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