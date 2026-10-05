'use client'

import { AppBar, Backdrop, Box, 
        Button, CircularProgress, 
        Toolbar, Typography 
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";


import Logo_Publica from "@/Imagenes/Logo escuela blanco.png";


import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListAltIcon from '@mui/icons-material/ListAlt';


export default function Menu_Estudiante(){
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Menu_Estudiante_Content/>
        </Suspense>
    );
}

function Menu_Estudiante_Content(){

    const router = useRouter();


    const searchParams = useSearchParams();
    
    const estudiante = searchParams.get('estudiante');


    const [loading, setLoading] = useState(false);


    const [stateMirarRealizar, setStateMirarRealizar] = useState(false);

    const [stateMirarActualizar, setStateMirarActualizar] = useState(false);

    const [stateMirarEnviadas, setStateMirarEnviadas] = useState(false);


    const [stateDescripcionRealizar, setStateDescripcionRealizar] = useState(false);
    
    const [stateDescripcionActualizar, setStateDescripcionActualizar] = useState(false);

    const [stateDescripcionEnviado, setStateDescripcionEnviado] = useState(false);

    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            backgroundColor:'#DCCDBA',
        }}
        >
            <AppBar
            sx={{
            backgroundColor:'#003c58',
            padding:5,
            position:'static',
            display:'flex'
            }}
            >
                <Toolbar>
                    <Button
                    onClick={() => router.push('/Login')}
                    sx={{
                        width:'300px',
                        height:'90px'
                    }}
                    >
                        <Box
                        component="img"
                        alt="Logo_Publica"
                        src={Logo_Publica.src}
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                        />
                    </Button>
                </Toolbar>
            </AppBar>

            {/*Cargando */}
            <Backdrop
            open={loading}
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
                            color: "white",
                        }}
                    />

                    <Typography
                        sx={{
                            marginTop: 2,
                            color: "white",
                            fontWeight:'bold',
                        }}
                    >
                        Cargando al sistema
                        <br/>
                        de solicitudes...
                    </Typography>
                </Box>
            </Backdrop>

            <Box
            sx={{
                display:'flex',
                width:'100%',
                height:'100%'
            }}
            >
                
                <Box
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor: '#003c58',
                    width:'25%'
                }}
                >
                    <Typography
                    align="center"
                    sx={{
                        color:'white',
                        fontWeight:'bold'
                    }}
                    >
                        Espacio para foto
                    </Typography>
                </Box>

                {/*Titulo y botones */}
                <Box
                sx={{
                    display:'flex',
                    height:'100%',
                    width:'75%',
                    gap:15
                }}
                >
                    {/*Titulo - Descripciones*/}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        mt:'10%',
                        ml:'10%',
                        gap:4
                    }}
                    >
                        {/*Título */}
                        <Typography
                        variant="h3"
                        sx={{
                            display:'flex',
                            fontWeight:'bold',
                            color:'#003c58'
                        }}
                        >
                            MENU PARA 
                            <br/>
                            ESTUDIANTES
                        </Typography>

                        {stateDescripcionRealizar && (
                            <Typography
                            align="center"
                            sx={{
                                fontWeight:'bold',
                                backgroundColor:'#F6F1E8',
                                border:'2px solid black',
                                borderRadius:'20px',
                                width:'300px',
                                height:'150px',
                                color:'#003c58'
                            }}
                            >
                                texto descriptivo para 
                                <br/>
                                completar la ficha
                            </Typography>
                        )}

                        {stateDescripcionActualizar && (
                            <Typography
                            align="center"
                            sx={{
                                fontWeight:'bold',
                                backgroundColor:'#F6F1E8',
                                border:'2px solid black',
                                borderRadius:'20px',
                                width:'300px',
                                height:'150px',
                                color:'#003c58'
                            }}
                            >
                                texto descriptivo para 
                                <br/>
                                actualizar datos
                            </Typography>
                        )}

                        {stateDescripcionEnviado && (
                            <Typography
                            align="center"
                            sx={{
                                fontWeight:'bold',
                                backgroundColor:'#F6F1E8',
                                border:'2px solid black',
                                borderRadius:'20px',
                                width:'300px',
                                height:'150px',
                                color:'#003c58'
                            }}
                            >
                                texto descriptivo para 
                                <br/>
                                revisar solicitudes
                            </Typography>
                        )}

                    </Box>
                        
                    {/*Realizar - Actualizar - Revisar */}
                    <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'flex-start',
                        height:'100%',
                        gap: 5,
                        mr:'5%'
                    }}
                    >
                        {/*Realizar */}
                        <Button
                        onMouseEnter={() => {
                            setStateDescripcionRealizar(true);
                            setStateMirarRealizar(true);
                        }}
                        onMouseLeave={() => {
                            setStateDescripcionRealizar(false);
                            setStateMirarRealizar(false);
                        }}
                        onClick={() => {
                            setLoading(true);
                            router.push(`/Ficha?estudiante=${encodeURIComponent(estudiante ?? '')}`)
                        }}
                        sx={{
                            display:'flex',
                            gap:0,
                            height:'auto',
                            width:'auto',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:active': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                            {/*Icono */}
                            <Box
                            sx={{
                                borderRadius:'100%',
                                height:'100px',
                                width:'100px',
                                border:'10px solid #24454A',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                zIndex:1000,
                                backgroundColor:'#F6F1E8'
                            }}
                            >
                                <ListAltIcon sx={{ width:'75px', height:'75px', color:'#5A2631'}}/>
                            </Box>

                            {/* Texto descriptivo */}
                            <Box
                                sx={{
                                    borderTopRightRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    width: stateMirarRealizar ? '200px' : '0px',
                                    height: '75px',
                                    borderTop: stateMirarRealizar ? '10px solid #24454A' : '0px solid black',
                                    borderRight: stateMirarRealizar ? '10px solid #24454A' : '0px solid black',
                                    borderBottom: stateMirarRealizar ? '10px solid #24454A' : '0px solid black',
                                    opacity: stateMirarRealizar ? 1 : 0,

                                    overflow: 'hidden',

                                    display: 'flex',
                                    alignItems: 'center',

                                    transform: stateMirarRealizar
                                    ? 'translateX(-20px)'
                                    : 'translateX(-80px)',

                                    transition: 'opacity 0.3s ease, transform 0.4s ease',

                                    zIndex: 1001,

                                    backgroundColor:'#F6F1E8'

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#003c58',
                                        whiteSpace: 'nowrap',
                                        ml:'50px'
                                    }}
                                >
                                    Completar ficha
                                </Typography>
                            </Box>
                        </Button>
                        

                        {/*Actualizar */}

                        <Button
                        onMouseEnter={() => {
                            setStateMirarActualizar(true);
                            setStateDescripcionActualizar(true);
                        }}
                        onMouseLeave={() => {
                            setStateDescripcionActualizar(false);
                            setStateMirarActualizar(false);
                        }}
                        onClick={() => {
                            setLoading(true);
                            router.push(`/Ficha?estudiante=${estudiante}`)
                        }}
                        sx={{
                            display:'flex',
                            gap:0,
                            height:'auto',
                            width:'auto',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },'&:active': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                            {/*Icono */}
                            <Box
                            sx={{
                                borderRadius:'100%',
                                height:'100px',
                                width:'100px',
                                border:'10px solid #24454A',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                zIndex:1001,
                                backgroundColor:'#F6F1E8'
                            }}
                            >
                                <ManageAccountsIcon sx={{ width:'75px', height:'75px', color:'#5A2631'}}/>
                            </Box>

                            {/* Texto descriptivo */}
                            <Box
                                sx={{
                                    borderTopRightRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    width: stateMirarActualizar ? '200px' : '0px',
                                    height: '75px',
                                    borderTop: stateMirarActualizar ? '10px solid #24454A' : '0px solid black',
                                    borderRight: stateMirarActualizar ? '10px solid #24454A' : '0px solid black',
                                    borderBottom: stateMirarActualizar ? '10px solid #24454A' : '0px solid black',
                                    opacity: stateMirarActualizar ? 1 : 0,

                                    overflow: 'hidden',

                                    display: 'flex',
                                    alignItems: 'center',

                                    transform: stateMirarActualizar
                                    ? 'translateX(-20px)'
                                    : 'translateX(-80px)',

                                    transition: 'opacity 0.3s ease, transform 0.4s ease',

                                    zIndex: 1001,

                                    backgroundColor:'#F6F1E8'

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#003c58',
                                        whiteSpace: 'nowrap',
                                        ml:'50px'
                                    }}
                                >
                                    Actualizar mis datos
                                </Typography>
                            </Box>
                        </Button>
                            
                        {/*Revisar */}
                        <Button
                        onMouseEnter={() => {
                            setStateDescripcionEnviado(true);
                            setStateMirarEnviadas(true);
                        }}
                        onMouseLeave={() => {
                            setStateDescripcionEnviado(false);
                            setStateMirarEnviadas(false);
                        }}
                        onClick={() => {
                            setLoading(true);
                            router.push(`/Ficha?estudiante=${estudiante}`)
                        }}
                        sx={{
                            display:'flex',
                            gap:0,
                            height:'auto',
                            width:'auto',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },'&:active': {
                                backgroundColor: 'transparent',
                            },
                        }}>
                            {/*Icono */}
                            <Box
                            sx={{
                                borderRadius:'100%',
                                height:'100px',
                                width:'100px',
                                border:'10px solid #24454A',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                zIndex:1001,
                                backgroundColor:'#F6F1E8'
                                
                            }}
                            >
                                <RuleIcon sx={{ width:'75px', height:'75px', color:'#5A2631'}}/>
                            </Box>

                            {/* Texto descriptivo */}
                            <Box
                                sx={{
                                    borderTopRightRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    width: stateMirarEnviadas ? '200px' : '0px',
                                    height: '75px',
                                    borderTop: stateMirarEnviadas ? '10px solid #24454A' : '0px solid black',
                                    borderRight: stateMirarEnviadas ? '10px solid #24454A' : '0px solid black',
                                    borderBottom: stateMirarEnviadas ? '10px solid #24454A' : '0px solid black',
                                    opacity: stateMirarEnviadas ? 1 : 0,

                                    overflow: 'hidden',

                                    display: 'flex',
                                    alignItems: 'center',

                                    transform: stateMirarEnviadas
                                    ? 'translateX(-20px)'
                                    : 'translateX(-80px)',

                                    transition: 'opacity 0.3s ease, transform 0.4s ease',

                                    zIndex: 1001,

                                    backgroundColor:'#F6F1E8'

                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#003c58',
                                        whiteSpace: 'nowrap',
                                        ml:'50px'
                                    }}
                                >
                                    Revisar mis solicitudes
                                </Typography>
                            </Box>
                        </Button>
                        
                    </Box>
                </Box>
            </Box>
            
            
        </Box>
    );
}