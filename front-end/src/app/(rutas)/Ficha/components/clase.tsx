'use client';

import { Box, Button, Table, TableBody, 
    TableCell, TableHead, TableRow, 
    Typography
} from "@mui/material";

import __url from "@/lib/const";


interface PropJustificacion {
    close: () => void;
}

export default function Justificar_Clase_Page({close} : PropJustificacion){

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