'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow,
    Typography, FormControl, InputLabel, 
    Select, MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


import DeleteIcon from '@mui/icons-material/Delete';
import __url from "@/lib/const";

import { Asignatura } from "@/types/asignatura";
import { Seccion } from "@/types/seccion";


interface PropCambio {
    close: () => void;


    seccionesSolicitud: Seccion[][];

    setSeccionesSolicitud: React.Dispatch<React.SetStateAction<Seccion[][]>>;
}

export default function Cambio_Seccion({close, seccionesSolicitud, setSeccionesSolicitud} : PropCambio){

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
            const duplicadas = seccionesSolicitud.some(
                secs => secs.some(sec => (
                    sec.num_Seccion === seccionActual?.num_Seccion &&
                    sec.asignatura?.Codigo === asignaturaSeleccionada.Codigo    
                ))
            )

            if(duplicadas){
                mostrarDuplicado();
                const originales = seccionesSolicitud.find(
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
        setSeccionesSolicitud(seccionesSolicitud.filter(secs =>
            (secs[0].asignatura?.Codigo !== secciones[0].asignatura?.Codigo) 
        ));

        setSeccionActual(undefined);
        setSeccionCambio(undefined);
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
                        {/*Asignaturas */}
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
                                    {seccionesSolicitud.map(secs => 
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
                                                                    sec.asignatura = asignaturaSeleccionada;
                                                                    setSeccionActual(sec);
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor: 
                                                                        (sec.num_Seccion === seccionActual?.num_Seccion &&
                                                                            asignaturaSeleccionada.Codigo === sec.asignatura?.Codigo
                                                                        ) ||
                                                                        seccionesSolicitud.some(
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
                                                                    sec.asignatura = asignaturaSeleccionada;
                                                                    setSeccionCambio(sec);
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor: 
                                                                        (sec.num_Seccion === seccionCambio?.num_Seccion &&
                                                                            asignaturaSeleccionada.Codigo === sec.asignatura?.Codigo
                                                                        ) ||
                                                                        seccionesSolicitud.some(
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
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        width:'300px',
                                        height: '200px',
                                        gap:4,
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
                                        <Button
                                        onClick={() => agregarCambio()}
                                        variant="contained"
                                        sx={{
                                            width:'200px',
                                            height:'50px',
                                        }}
                                        >
                                            Cargar Cambio
                                        </Button>
                                        
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