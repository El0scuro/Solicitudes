'use client'

import { AppBar, Backdrop, Box, 
        Button, CircularProgress, 
        Toolbar, Typography 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


import Logo_Publica from "@/Imagenes/Logo escuela blanco.png";


import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListAltIcon from '@mui/icons-material/ListAlt';


export default function Menu_Estudiante(){

    const router = useRouter();

    
    const [loading, setLoading] = useState(false);


    const [stateMirarRealizar, setStateMirarRealizar] = useState(false);

    const [stateMirarActualizar, setStateMirarActualizar] = useState(false);

    const [stateMirarEnviadas, setStateMirarEnviadas] = useState(false);

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
                height:'100%',
                width:'100%',
                
            }}
            >
                {/*Titulo */}
                <Typography
                variant="h3"
                sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                    alignItems:'center',
                    ml:'4%',
                    fontWeight:'bold',
                    color:'#F6F1E8'
                }}
                >
                    MENU PARA 
                    <br/>
                    ESTUDIANTES
                </Typography>

                {/*Realizar - Actualizar - Revisar */}
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'flex-end',
                    height:'100%',
                    gap: 5,
                    mr:'5%'
                }}
                >
                    {/*Realizar */}
                    <Button
                    onMouseEnter={() => setStateMirarRealizar(true)}
                    onMouseLeave={() => setStateMirarRealizar(false)}
                    sx={{
                        display:'flex',
                        gap:0,
                        height:'auto',
                        width:'auto'
                    }}>
                        {/*Icono */}
                        <Box
                        sx={{
                            borderRadius:'100%',
                            height:'100px',
                            width:'100px',
                            border:'10px solid black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            zIndex:1001
                        }}
                        >
                            <ListAltIcon sx={{ width:'75px', height:'75px'}}/>
                        </Box>

                        {/* Texto descriptivo */}
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: stateMirarRealizar ? '400px' : '0px',
                                height: '75px',
                                border: stateMirarRealizar ? '10px solid black' : '0px solid black',
                                opacity: stateMirarRealizar ? 1 : 0,

                                overflow: 'hidden',

                                display: 'flex',
                                alignItems: 'center',

                                transform: stateMirarRealizar
                                ? 'translateX(-40px)'
                                : 'translateX(-90px)',

                                transition: 'opacity 0.3s ease, transform 0.4s ease',

                                zIndex: 1000,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#003c58',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Realizar una solicitud
                            </Typography>
                        </Box>
                    </Button>

                    {/*Actualizar */}
                    <Button
                    onMouseEnter={() => setStateMirarActualizar(true)}
                    onMouseLeave={() => setStateMirarActualizar(false)}
                    sx={{
                        display:'flex',
                        gap:0,
                        height:'auto',
                        width:'auto'
                    }}>
                        {/*Icono */}
                        <Box
                        sx={{
                            borderRadius:'100%',
                            height:'100px',
                            width:'100px',
                            border:'10px solid black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            zIndex:1001
                        }}
                        >
                            <ManageAccountsIcon sx={{ width:'75px', height:'75px'}}/>
                        </Box>

                        {/* Texto descriptivo */}
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: stateMirarActualizar ? '400px' : '0px',
                                height: '75px',
                                border: stateMirarActualizar ? '10px solid black' : '0px solid black',
                                opacity: stateMirarActualizar? 1 : 0,

                                overflow: 'hidden',

                                display: 'flex',
                                alignItems: 'center',

                                transform: stateMirarActualizar
                                ? 'translateX(-40px)'
                                : 'translateX(-90px)',

                                transition: 'opacity 0.3s ease, transform 0.4s ease',

                                zIndex: 1000,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#003c58',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Actualizar mis datos
                            </Typography>
                        </Box>
                    </Button>

                    {/*Revisar */}
                    <Button
                    onMouseEnter={() => setStateMirarEnviadas(true)}
                    onMouseLeave={() => setStateMirarEnviadas(false)}
                    sx={{
                        display:'flex',
                        gap:0,
                        height:'auto',
                        width:'auto'
                    }}>
                        {/*Icono */}
                        <Box
                        sx={{
                            borderRadius:'100%',
                            height:'100px',
                            width:'100px',
                            border:'10px solid black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            zIndex:1001
                        }}
                        >
                            <RuleIcon sx={{ width:'75px', height:'75px'}}/>
                        </Box>

                        {/* Texto descriptivo */}
                        <Box
                            sx={{
                                borderRadius: '20px',
                                width: stateMirarEnviadas ? '400px' : '0px',
                                height: '75px',
                                border: stateMirarEnviadas ? '10px solid black' : '0px solid black',
                                opacity: stateMirarEnviadas ? 1 : 0,

                                overflow: 'hidden',

                                display: 'flex',
                                alignItems: 'center',

                                transform: stateMirarEnviadas
                                ? 'translateX(-40px)'
                                : 'translateX(-90px)',

                                transition: 'opacity 0.3s ease, transform 0.4s ease',

                                zIndex: 1000,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#003c58',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Revisar mis solicitudes
                            </Typography>
                        </Box>
                    </Button>
                    

                    
                </Box>
            </Box>
            
        </Box>
    );
}