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


    return(
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            backgroundColor:'#E0D1B8',
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
                    backgroundColor:'#556B2F'
                }}
                >
                    <ListAltIcon
                    sx={{
                        width: '60%',
                        height:'60%',
                        color: "#72090F"
                    }}
                    />
                    
                    <Typography
                    sx={{
                        fontWeight:'bold',
                        color:'#E0D1B8'
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
                    backgroundColor:'#556B2F'
                }}
                >
                    <ManageAccountsIcon 
                    sx={{
                        width: '60%',
                        height:'60%',
                        color: "#72090F"
                    }}
                    />
                    
                    <Typography
                    sx={{
                        fontWeight:'bold',
                        color:'#E0D1B8'
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
                    backgroundColor:'#556B2F'
                    
                }}
                >
                    <RuleIcon
                    sx={{
                        width: '60%',
                        height:'60%',
                        color: "#72090F"
                    }}
                    />
                    
                    <Typography
                    sx={{
                        fontWeight:'bold',
                        color:'#E0D1B8'
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