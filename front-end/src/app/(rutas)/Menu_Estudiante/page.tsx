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

    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            backgroundColor:'#EFE8DB',
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
                width:'100%'
            }}
            >
                {/*Titulo */}
                <Typography
                variant="h3"
                sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                    alignItems:'center'
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
                    justifyContent:'center',
                    height:'100%',
                    gap: 10,
                    mt:'12%'
                }}
                >
                    {/*Realizar */}
                    <Button
                    onMouseEnter={() => setStateMirarRealizar(true)}
                    onMouseLeave={() => setStateMirarRealizar(false)}
                    sx={{
                        display:'flex',
                        gap:0
                    }}>
                        {/*Icono */}
                        <Box
                        sx={{
                            borderRadius:'100%',
                            height:'200px',
                            width:'200px',
                            border:'10px solid black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            ml: stateMirarRealizar ? '30px' : '0px',
                            zIndex:1001
                        }}
                        >
                            <ListAltIcon sx={{ width:'150px', height:'150px'}}/>
                        </Box>

                        {/*Texto desciptivo */}
                        {stateMirarRealizar && (
                            <Box
                            sx={{
                                borderRadius:'20px',
                                width:'500px',
                                height:'80px',
                                border:'10px solid black',
                                zIndex:1000
                            }}
                            >
                                <Typography
                                sx={{
                                    fontWeight:'bold',
                                    color:'#003c58'
                                }}
                                >
                                    Realizar una solicitud
                                </Typography>
                            </Box>
                        )}
                    </Button>

                    {/* Realizar solicitud*/}
                    <Button
                    onClick={() => {
                        setLoading(true);
                        router.push('/Ficha');
                    }}
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'flex-end',
                        width:'300px',
                        height:'350px',
                        backgroundColor:'#556B2F',
                        borderRadius:'20px'
                    }}
                    >
                        
                        
                        
                    </Button>

                    {/*Actualizar datos perfil */}
                    <Button
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'flex-end',
                        width:'300px',
                        height:'350px',
                        backgroundColor:'#556B2F',
                        borderRadius:'20px'
                    }}
                    >
                        <ManageAccountsIcon 
                        sx={{
                            width: '60%',
                            height:'60%',
                            color: "#4C221A"
                        }}
                        />
                        
                        <Typography
                        sx={{
                            fontWeight:'bold',
                            color:'#003c58'
                        }}
                        >
                            Actualizar mis 
                            <br/>
                            datos personales
                        </Typography>
                    </Button>

                    {/*Revisar estado solicitudes */}
                    <Button
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'flex-end',
                        width:'300px',
                        height:'350px',
                        backgroundColor:'#556B2F',
                        borderRadius:'20px'
                        
                    }}
                    >
                        <RuleIcon
                        sx={{
                            width: '60%',
                            height:'60%',
                            color: "#4C221A"
                        }}
                        />
                        
                        <Typography
                        sx={{
                            fontWeight:'bold',
                            color:'#003c58'
                        }}
                        >
                            Revisar estado de 
                            <br/>
                            mis solicitudes
                        </Typography>
                    </Button>

                    
                </Box>
            </Box>
            
        </Box>
    );
}