'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow,
    Typography, FormControl, InputLabel, 
    Select, MenuItem, TextField
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

    setStateCambios: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cambio_Seccion({
    close, 
    seccionesSolicitud, setSeccionesSolicitud,
    setStateCambios
} : PropCambio){

    //Asignaturas seleccionadas//
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>();

    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState<Asignatura>({
        Codigo: '',
        Nombre: '',
        Ano_Malla: ''
    });

    
    //Secciones inscrita y cambio//
    const [stateSecciones, setStateSecciones] = useState(false);


    //Warnings//
    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);

    const [stateMismaSeccion, setStateMismaSeccion] = useState(false);


    //Seccion y Profesor//
    const [num_SeccionInsrita, setNum_SeccionInscrita] = useState<number | null>(null);
    const [nombreProfesorInscrita, setNombreProfesorInscrita] = useState<string>("");

    const [num_SeccionCambio, setNum_SeccionCambio] = useState<number | null>(null);
    const [nombreProfesorCambio, setNombreProfesorCambio] = useState<string>("");


    const seccionesDisponibles: number[] = [1, 2, 3, 4, 5];



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

            if(num_SeccionInsrita === num_SeccionCambio){
                mostrarMismas();
                return seccionesCargadas;
            }
            

            const seccionInscrita: Seccion = {
                num_Seccion: num_SeccionInsrita,
                Nombre_Profesor: nombreProfesorInscrita,
                asignatura: asignaturaSeleccionada
            };

            const seccionCambio: Seccion = {
                num_Seccion: num_SeccionCambio,
                Nombre_Profesor: nombreProfesorCambio,
                asignatura: asignaturaSeleccionada
            };


            //reviso si el arreglo está vacío
            if(!seccionesCargadas){

                return [[seccionInscrita, seccionCambio]];
            }

            //reviso si hay más de una sección asociada a la misma asignatura
            const duplicadas = seccionesSolicitud.some(
                secs => secs.some(sec => (
                    sec.num_Seccion === num_SeccionInsrita &&
                    sec.asignatura?.Codigo === asignaturaSeleccionada.Codigo    
                ))
            )

            if(duplicadas){
                mostrarDuplicado();
                return seccionesCargadas;
            }

            setStateCambios(true);
            return [...seccionesCargadas, [seccionInscrita, seccionCambio]]
        });
    }

    const deseleccionarRamos = (secciones: Seccion[]) => {
        setSeccionesSolicitud(seccionesSolicitud.filter(secs =>
            (secs[0].asignatura?.Codigo !== secciones[0].asignatura?.Codigo) 
        ));

        setStateCambios(false);
    }


    const mostrarDuplicado = () => {
        setStateSeccionDuplicada(true);

        setTimeout(() => {
            setStateSeccionDuplicada(false);
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
            display:'flex',
            justifyContent:'center'
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
            minWidth:'80%'
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
                    alignItems:'center',
                    height: '90%',
                    width:'100%'
                }}
                >
                    {/*Asignaturas - Solicitudes_Cambio*/}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:5,
                        height:'100%',
                        width:'30%'
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
                                if(e.target.value === undefined){
                                    setAsignaturaSeleccionada({
                                        Codigo:'',
                                        Nombre: '',
                                        Ano_Malla: ''
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

                                setStateSecciones(true);
                            }}
                            >
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
                            width:'100%',
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
                                            width: '40%',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Asignatura
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion <br/> Actual
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Seccion <br/> Solicitada
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
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
                                            key={secs[0].asignatura?.Nombre}
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
                        
                    {/*Inscrita-Cambio - Agregar - Warnings */}
                    <Box
                    sx={{
                        display:'flex',
                        gap:4,
                        height:'100%',
                        width:'70%'
                    }}
                    >
                        {stateSecciones && (
                            <Box
                            sx={{
                                display:'flex',
                                gap:4,
                                height:'100%',
                                width:'100%'
                            }}
                            >
                                {/*Inscrita y Cambio */}
                                <Box
                                sx={{
                                    display:'flex',
                                    gap:10,
                                    height:'100%',
                                    width:'90%'
                                }}
                                >
                                    {/*Inscrita*/}
                                    <Box
                                    sx={{
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'center',
                                        height:'100%',
                                        width:'50%'
                                    }}
                                    >
                                        
                                        <Typography
                                        align="left"
                                        sx={{
                                            fontWeight:'bold',
                                            width:'100%'
                                        }}
                                        >
                                            Indique que sección tiene inscrita
                                            <br/>
                                            actualmente, y su profesor asociado.
                                        </Typography>

                                        {/*Seccion - Nombre */}
                                        <Box
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            gap: 4,
                                            height:'100%',
                                            width:'100%'
                                        }}
                                        >
                                            {/*Secciones */}
                                            <FormControl sx={{ width: '200px' }}>
                                                <InputLabel id="seccion-label">
                                                    Seleccione una sección
                                                </InputLabel>

                                                <Select
                                                    labelId="seccion-label"
                                                    id="seccion-select"
                                                    label="Seleccione una sección"
                                                    value={num_SeccionInsrita ?? ''}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;

                                                        if (valor === null) {
                                                            setNombreProfesorInscrita('');
                                                            setNum_SeccionInscrita(null);
                                                            return;
                                                        }

                                                        setNum_SeccionInscrita(Number(valor));
                                                    }}
                                                >
                                                    {seccionesDisponibles.map(sec => (
                                                        <MenuItem
                                                            key={sec}
                                                            value={Number(sec)}
                                                        >
                                                            {sec}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            
                                            <TextField
                                            label='Nombre Profesor'
                                            placeholder="Nombre Profesor"
                                            value={nombreProfesorInscrita}
                                            onChange={(e) => setNombreProfesorInscrita(e.target.value)}
                                            sx={{
                                                width:'200px'
                                            }}
                                            />
                                        </Box>
                                    </Box>

                                    {/*Cambio */}
                                    <Box
                                    sx={{
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'center',
                                        height:'100%',
                                        width:'50%'
                                    }}
                                    >

                                        <Typography
                                        align="left"
                                        sx={{
                                            fontWeight:'bold',
                                            width:'100%'
                                        }}
                                        >
                                            Indique a que sección quiere cambiarse,
                                            <br/>
                                            y su profesor asociado.
                                        </Typography>

                                        {/*Seccion - Nombre */}
                                        <Box
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            gap: 4,
                                            height:'100%',
                                            width:'100%'
                                        }}
                                        >
                                            {/*Secciones */}
                                            <FormControl sx={{ width: '200px' }}>
                                                <InputLabel id="seccion-label">
                                                    Seleccione una sección
                                                </InputLabel>

                                                <Select
                                                    labelId="seccion-label"
                                                    id="seccion-select"
                                                    label="Seleccione una sección"
                                                    value={num_SeccionCambio ?? ''}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;

                                                        if (valor === null) {
                                                            setNombreProfesorInscrita('');
                                                            setNum_SeccionCambio(null);
                                                            return;
                                                        }

                                                        setNum_SeccionCambio(Number(valor));
                                                    }}
                                                >
                                                    {seccionesDisponibles.map(sec => (
                                                        <MenuItem
                                                            key={sec}
                                                            value={Number(sec)}
                                                        >
                                                            {sec}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            
                                            <TextField
                                            label='Nombre Profesor'
                                            placeholder="Nombre Profesor"
                                            value={nombreProfesorCambio}
                                            onChange={(e) => setNombreProfesorCambio(e.target.value)}
                                            sx={{
                                                width:'200px'
                                            }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                
                                {/*Agregar Cambio y Warnings*/}
                                <Box
                                sx={{
                                    display:'flex',
                                    flexDirection:'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    width:'10%px',
                                    height: '100%',
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
                                    disabled={ 
                                        (!num_SeccionInsrita || !nombreProfesorInscrita) &&
                                        (!num_SeccionCambio || !nombreProfesorCambio)
                                    }
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
    );
}