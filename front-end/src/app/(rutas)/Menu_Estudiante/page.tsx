'use client'

import { AppBar, Backdrop, Box, 
        Button, CircularProgress, 
        Toolbar, Typography 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


import Logo_Publica from "@/Imagenes/Logo escuela blanco.png";
import Formulario from "@/Imagenes/Formulario.png";

import RuleIcon from '@mui/icons-material/Rule';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export default function Menu_Estudiante(){

    const router = useRouter();

    
    const [loading, setLoading] = useState(false);


    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            backgroundColor:'#E8D1A7',
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

                    <Typography
                    variant="h3"
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        ml:'200px'
                    }}
                    >
                        MENU PARA ESTUDIANTES
                    </Typography>
                </Toolbar>
            </AppBar>

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
                justifyContent:'center',
                height:'100%',
                gap: 10,
                mt:'12%'
            }}
            >
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
                    backgroundColor:'transparent',
                }}
                >
                    <Box
                    component='img'
                    src={Formulario.src}  
                    alt="Icono-Formulario" 
                    sx={{
                        width: '60%',
                        height:'60%',
                    }}
                    />
                    
                    <Typography
                    sx={{
                        fontWeight:'bold',
                        color:'#003c58'
                    }}
                    >
                        Realizar una solicitud
                    </Typography>
                </Button>

                <Button
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'flex-end',
                    width:'300px',
                    height:'350px',
                    backgroundColor:'transparent',
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

                <Button
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'flex-end',
                    width:'300px',
                    height:'350px',
                    backgroundColor:'transparent',
                    
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
    );
}