'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    TextField, Typography, Checkbox,
    FormControlLabel, CircularProgress,
    Stack, Divider, FormControl,
    InputLabel, Select, MenuItem
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

    carta: File | null;
    setCarta: React.Dispatch<React.SetStateAction<File | null>>;

    setStateDesinscripciones: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Desinscribir_Page({
    close, 
    seccionesSolicitud, setSeccionesSolicitud, 
    carta, setCarta,
    setStateDesinscripciones
}: PropRamo){
    
    //Buscador//
    const [parametroBusqueda, setParametroBusqueda] = useState<"Semestre" |  "Codigo" | "Nombre">("Codigo");

    const [valorBusqueda, setValorBusqueda] = useState<string>('');


    //Respuesta busqueda//
    const [stateRespuesta, setStateRespuesta] = useState(false);

    const [stateError, setStateError] = useState(false);

    const [stateExito, setStateExito] = useState(false);

    const [respuestaServidor, setRespuestaServidor] = useState<Asignatura[]>();
    
    const [mensajeError, setMensajeError] = useState<string>();


    //Buscando...//
    const [stateBusqueda, setStateBusqueda] = useState(false);


    //Carta//
    const [stateCarta, setStateCarta] = useState(false);


    //Buscadores//
    const [semestreMarcado, setSemestreMarcado] = useState(false);

    const [codigoMarcado, setCodigoMarcado] = useState(true);

    const [nombreMarcado, setNombreMarcado] = useState(false);


    //Seccion y Profesor//
    const [stateNumNom, setStateNumNom] = useState(false);

    const [num_Seccion, setNum_Seccion] = useState<number | null>(null);

    const [nombreProfesor, setNombreProfesor] = useState<string>("");

    const [seccionSeleccionada, setSeccionSeleccionada] = useState<Seccion>({
        num_Seccion: null,
        Nombre_Profesor: '',
        asignatura: null
    });

    const seccionesDisponibles: number[] = [1, 2, 3, 4, 5];

    const [asignaturaActual, setAsignaturaActual] = useState<Asignatura>();

    // mismo numero de seccion :O //
    const [stateSeccionDuplicada, setStateSeccionDuplicada] = useState(false);


    const seleccionarSeccion = () => {
        setSeccionesSolicitud((seccionesActuales) => {

            const yaSeleccionado = seccionesActuales.some(sec => 
                (sec.num_Seccion === num_Seccion) && 
                (sec.asignatura?.Codigo === asignaturaActual!.Codigo)
            );

            if (yaSeleccionado) {
                return seccionesActuales;
            }

            if(seccionesSolicitud.some(sec => sec.asignatura?.Nombre === asignaturaActual!.Nombre)){
                mostrarDuplicado();
                
                return seccionesActuales;
            }

            setStateDesinscripciones(true);
            return [...seccionesActuales, seccionSeleccionada];
        });
    };

    const deseleccionarRamo = (seccion: Seccion) => {
        setSeccionesSolicitud(seccionesSolicitud.filter(sec => sec !== seccion));
        setStateDesinscripciones(false);
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
            gap: 10,
            border: '2px solid black',
            borderRadius: '8px',
            padding: 1,
            width:'80%'
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
                display:'flex',
                width:'100%',
                height:'30%'
                }}
                >
                    <Box
                    sx={{
                        display:'flex',
                        gap:2,
                        width:'85%'
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
                            width: '70%',
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
                            mt:'20px',
                            width:'30%'
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
                                width:'100%'
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
                sx={{
                    width:'100%',
                    height:'70%'
                }}
                spacing={5}
                divider={
                    <Divider
                        sx={{
                            width:'90%',
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
                        gap: 10,
                        width:'100%',
                        height:'70%'
                    }}
                    >

                        {/* Ramos seleccionados */}
                        <Box
                        component="fieldset"
                        sx={{
                            border: '2px solid black',
                            borderRadius: '8px',
                            padding: 0.5,
                            width: '50%',
                            height:'100%',
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
                                    width: '100%',
                                    minHeight:'250px'
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Código
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
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
                                            Seccion
                                        </TableCell>

                                        
                                        <TableCell sx={{
                                            border: '1px solid black',
                                            width: '20%',
                                            py: 0.25,
                                            px: 0.5
                                        }}>
                                            Nombre <br/> Profesor
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
                                                {nombreProfesor}
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
                            position:'relative',
                            width:'50%',
                            height: '100%'
                        }}
                        >
                            {/*Respuesta servidor */}
                            {stateRespuesta && (
                                <Box
                                sx={{
                                    display:'flex',
                                    width:'100%',
                                    height:'100%'
                                }}
                                >
                                    <Box>
                                        {stateError && (
                                            <Box
                                            sx={{
                                                display:'flex',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                width:'100%',
                                                height:'100%'
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
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    gap: 5,
                                                    width:'100%',
                                                    height:'100%'
                                                }}
                                            >
                                                <Table sx={{ tableLayout: 'fixed', width: '50%' }}>
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

                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        {respuestaServidor?.map(asig =>(
                                                                <TableRow
                                                                    key={asig.Codigo}
                                                                    onClick={() => {
                                                                        setStateNumNom(true);
                                                                        setAsignaturaActual(asig);
                                                                    }}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        backgroundColor: seccionesSolicitud.find(
                                                                            sec => sec.asignatura?.Codigo === asig.Codigo
                                                                        ) || asignaturaActual?.Codigo === asig.Codigo
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
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                                
                                                
                                                <Box
                                                sx={{
                                                    width:'50%',
                                                    height:'100%'
                                                }}
                                                >
                                                    {/*Seccion - Nombre */}
                                                    {stateNumNom && (
                                                        
                                                        <Box
                                                        sx={{
                                                            dispaly:'flex',
                                                            flexDirection:'column',
                                                            width:'100%',
                                                            height:'100%',
                                                            gap:10
                                                        }}
                                                        >
                                                            <Box
                                                            sx={{
                                                                display:'flex',
                                                                flexDirection:'column',
                                                                gap: 2,
                                                                height:'70%'
                                                            }}
                                                            >
                                                                {/*Secciones */}
                                                                <FormControl
                                                                sx={{
                                                                    width:'200px'
                                                                }}
                                                                >
                                                                    <InputLabel id="demo-simple-select-label">Seleccione <br/> una sección</InputLabel>
                                                                    <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Secciones"
                                                                    value={seccionesDisponibles}
                                                                    onChange={(e) => {
                                                                        if(e.target.value === "Seleccione"){
                                                                            setSeccionSeleccionada({
                                                                                Nombre_Profesor: '',
                                                                                num_Seccion: null,
                                                                                asignatura: null
                                                                            });
                                                                            setNombreProfesor('');
                                                                            setNum_Seccion(null);
                                                                            setStateNumNom(false);
                                                                        }

                                                                        
                                                                    }}
                                                                    >
                                                                        <MenuItem
                                                                        value={"Seleccione"}
                                                                        ></MenuItem>

                                                                        {seccionesDisponibles.map(sec => (
                                                                            <MenuItem
                                                                            key={sec}
                                                                            onClick={() => setNum_Seccion(Number(sec))}
                                                                            >
                                                                            {sec}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                                
                                                                <TextField
                                                                label='Nombre Profesor'
                                                                placeholder="Nombre Profesor"
                                                                value={nombreProfesor}
                                                                onChange={(e) => setNombreProfesor(e.target.value)}
                                                                sx={{
                                                                    width:'200px'
                                                                }}
                                                                />
                                                            </Box>

                                                            <Button
                                                            onClick={() => {
                                                                setSeccionSeleccionada({
                                                                    Nombre_Profesor: nombreProfesor,
                                                                    num_Seccion: num_Seccion,
                                                                    asignatura: asignaturaActual!
                                                                });
                                                                seleccionarSeccion();
                                                            }}
                                                            sx={{
                                                                fontWeight:'bold',
                                                                backgroundColor: '#003c58',
                                                                color:'white',
                                                                width:'200px',
                                                                height:'20%'
                                                            }}
                                                            >
                                                                Agregar seccion
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </Box>
                                                
                                                {stateSeccionDuplicada && (
                                                    <Typography
                                                    align="center"
                                                    sx={{
                                                        fontWeight:'bold',
                                                        fontSize:'15px',
                                                        position:'absolute',
                                                        right:'40%'
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
                        alignItems:'center',
                        height:'20%'
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
                                        {carta?.name}
                                    </Typography>
                                    <Button
                                    sx={{
                                        color:'red'
                                    }}
                                    onClick={() => {
                                        setCarta(null);
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
                                                setCarta(archivoSeleccionado);
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
                                                setCarta(archivoSeleccionado)
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