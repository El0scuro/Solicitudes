'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    TextField, Typography, Checkbox,
    FormControlLabel, CircularProgress,
    Stack, Divider
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import __url from "@/lib/const";

import { Asignatura } from "@/types/asignatura";
import { Seccion } from "@/types/seccion";


interface PropRamo {
    close: () => void;

    seccionesSolicitud: Seccion[];

    setSeccionesSolicitud: React.Dispatch<React.SetStateAction<Seccion[]>>;
}

export default function Desinscribir_Page({close, seccionesSolicitud, setSeccionesSolicitud}: PropRamo){
    
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


    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);


    const seleccionarSeccion = (asignatura: Asignatura, seccion: Seccion) => {
        setSeccionesSolicitud((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.some(sec => 
                (sec.num_Seccion === seccion.num_Seccion) && 
                (sec.asignatura?.Codigo === asignatura.Codigo)
            );


            if (yaSeleccionado) {
                return seccionesActuales;
            }

            if(seccionesSolicitud.some(sec => sec.asignatura?.Nombre === asignatura.Nombre)){
                mostrarDuplicado();
                seccion.asignatura = asignatura;
                
                return seccionesActuales;
            }

            seccion.asignatura = asignatura;

            return [...seccionesActuales, seccion];
        });
    };

    const deseleccionarRamo = (seccion: Seccion) => {
        setSeccionesSolicitud(seccionesSolicitud.filter(sec => sec !== seccion));
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


    const mostrarDuplicado = () => {
        setStateSeccionDuplicada(true);

        setTimeout(() => {
            setStateSeccionDuplicada(false);
        }, 7000);
    }
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
                                    {seccionesSolicitud.map((seccion) => (
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
                                                                        backgroundColor: seccionesSolicitud.find(
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
                                                    <Typography
                                                    align="center"
                                                    sx={{
                                                        fontWeight:'bold',
                                                        fontSize:'15px'
                                                    }}
                                                    >
                                                        Ya seleccionaste una seccion de la misma asignatura
                                                    </Typography>
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