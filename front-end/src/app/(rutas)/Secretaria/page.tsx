'use client';

import { AppBar, Box, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Typography, BottomNavigation, BottomNavigationAction, Card } from "@mui/material";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Logo_Publica from "@/Imagenes/Logo escuela blanco.png"
import { Ficha } from "@/types/ficha";

export default function Secretarias() {
    
    const [fichasAprobadas, setFichasAprobadas] = useState<Ficha>({
        Fecha_Actual: '',
        Estado: ''
    })

    const [openMenu, setOpenMenu] = useState(false);


    const [descripcionSolicitud, setDescripcionSolicitud] = useState(false);
    const [pageSolicitud, setPageSolicitud] = useState(false);
    const [solicitudViewValue, setSolicitudViewValue] = useState(false);


    const [descripcionAsignatura, setDescripcionAsignatura] = useState(false);
    const [pageAsignatura, setPageAsignatura] = useState(false);
    const [AsignaturaViewValue, setAsignaturaViewValue] = useState(false);
    

    const [descripcionSeccion, setDescripcionSeccion] = useState(false);
    const [pageSeccion, setPageSeccion] = useState(false);
    const [seccionViewValue, setSeccionViewValue] = useState(false);
    

    const [descripcionProfesor, setDescripcionProfesor] = useState(false);
    const [pageProfesor, setPageProfesor] = useState(false);
    const [ProfesorViewValue, setProfesorViewValue] = useState(false);


    const [descripcionEstudiante, setDescripcionEstudiante] = useState(false);
    const [pageEstudiante, setPageEstudiante] = useState(false);
    const [estudianteViewValue, setEstudianteViewValue] = useState(false);


    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            {/* APPBAR */}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#003c58',
                    boxShadow: '10'
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >

                    {/* BOTÓN DEL MENÚ */}
                    <IconButton
                        onClick={() => setOpenMenu(true)}
                        sx={{
                            color: 'white',
                            marginRight: 2
                        }}
                    >
                        <MenuIcon />
                    </IconButton>


                    {/* LOGO */}
                    <Box
                        component="img"
                        alt="Logo_Publica"
                        src={Logo_Publica.src}
                        sx={{
                            width: '300px',
                            height: '90px'
                        }}
                    />

                </Toolbar>
            </AppBar>


            {/* DRAWER */}
            <Drawer
                variant="temporary"
                open={openMenu}
                onClose={() => setOpenMenu(false)}
            >
                <Box
                    sx={{
                        width: 250
                    }}
                >

                    <List>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    setOpenMenu(false);
                                    setPageSolicitud(true);
                                    setPageAsignatura(false);
                                    setPageSeccion(false);
                                    setPageProfesor(false);
                                    setPageEstudiante(false);
                                }}
                            >
                                <ListItemText 
                                onMouseEnter={() => {
                                    setDescripcionSolicitud(true);
                                    setDescripcionAsignatura(false);
                                    setDescripcionSeccion(false);
                                    setDescripcionProfesor(false);
                                    setDescripcionEstudiante(false);
                                }}
                                onMouseLeave={() => setDescripcionSolicitud(false)}
                                primary="Solicitudes Aprobadas" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onMouseEnter={() => {
                                    setDescripcionSolicitud(false);
                                    setDescripcionAsignatura(true);
                                    setDescripcionSeccion(false);
                                    setDescripcionProfesor(false);
                                    setDescripcionEstudiante(false);
                                }}
                                onMouseLeave={() => setDescripcionAsignatura(false)}
                                onClick={() => {
                                    setOpenMenu(false);
                                    setPageSolicitud(false);
                                    setPageAsignatura(true);
                                    setPageSeccion(false);
                                    setPageProfesor(false);
                                    setPageEstudiante(false);
                                }}
                            >
                                <ListItemText primary="Asignaturas" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onMouseEnter={() => {
                                    setDescripcionSolicitud(false);
                                    setDescripcionAsignatura(false);
                                    setDescripcionSeccion(true);
                                    setDescripcionProfesor(false);
                                    setDescripcionEstudiante(false);
                                }}
                                onMouseLeave={() => setDescripcionSeccion(false)}
                                onClick={() => {
                                    setOpenMenu(false);
                                    setPageSolicitud(false);
                                    setPageAsignatura(false);
                                    setPageSeccion(true);
                                    setPageProfesor(false);
                                    setPageEstudiante(false);
                                }}
                            >
                                <ListItemText primary="Secciones" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onMouseEnter={() => {
                                    setDescripcionSolicitud(false);
                                    setDescripcionAsignatura(false);
                                    setDescripcionSeccion(false);
                                    setDescripcionProfesor(true);
                                    setDescripcionEstudiante(false);
                                }}
                                onMouseLeave={() => setDescripcionProfesor(false)}
                                onClick={() => {
                                    setOpenMenu(false);
                                    setPageSolicitud(false);
                                    setPageAsignatura(false);
                                    setPageSeccion(false);
                                    setPageProfesor(true);
                                    setPageEstudiante(false);
                                }}
                            >
                                <ListItemText primary="Profesores" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                            onMouseEnter={() => {
                                setDescripcionSolicitud(false);
                                setDescripcionAsignatura(false);
                                setDescripcionSeccion(false);
                                setDescripcionProfesor(false);
                                setDescripcionEstudiante(true);
                            }}
                            onMouseLeave={() => setDescripcionEstudiante(false)}
                            onClick={() => {
                                    setOpenMenu(false);
                                    setPageSolicitud(false);
                                    setPageAsignatura(false);
                                    setPageSeccion(false);
                                    setPageProfesor(false);
                                    setPageEstudiante(true);
                                }}
                            >
                                <ListItemText primary="Estudiantes" />
                                
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Box
                    sx={{
                        display:'flex',
                        mt:'300px'
                    }}
                    >
                        {descripcionSolicitud && (
                            <Typography
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Espacio para revisar las solicitudes aprobadas por el jefe de carrera.
                            </Typography>
                        )}

                        {descripcionAsignatura && (
                            <Typography
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Espacio para agregar, eliminar o actualizar los datos de las asignaturas de la malla curricular oficial.
                            </Typography>
                        )}

                        {descripcionSeccion && (
                            <Typography
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Espacio para agregar, eliminar o actualizar los datos de las secciones de cada asignatura.
                            </Typography>
                        )}

                        {descripcionProfesor && (
                            <Typography
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Espacio para agregar o eliminar profesores y actualizar sus datos.
                            </Typography>
                        )}

                        {descripcionEstudiante && (
                            <Typography
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                                Espacio para eliminar estudiantes del sistema de solicitudes académicas
                            </Typography>
                        )}
                    </Box>
                    
                </Box>
            </Drawer>


            {/* CONTENIDO DE LA PÁGINA */}
            <Box
                sx={{
                    padding: 3
                }}
            >
               
                {pageSolicitud && (
                    <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        height:'100%',
                        p:3,
                        justifyContent:'center'
                    }}
                    >
                        <Box 
                        sx={{ 
                            display:'flex', 
                            width: '100%', 
                            borderTopLeftRadius:1,
                            flexDirection: 'column' 
                            }}>
                                
                            <Box
                            sx={{
                                display:'flex',
                                justifyContent:'flex-start'
                            }}
                            >
                                <BottomNavigation
                                    showLabels
                                    value={solicitudViewValue}
                                    onChange={(event, newValue) => {
                                        setSolicitudViewValue(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label="Visualizar asignaciones" value="ver" icon={<VisibilityIcon />} />
                                    <BottomNavigationAction label="Generar asignación" value="crear" icon={<AddBoxIcon />} />
                                </BottomNavigation>
                            </Box>
                            
                            <Card
                            sx={{
                                width:'auto',
                                height:'auto',
                                
                            }}
                            >
                                {solicitudViewValue && (
                                    <Box>

                                    </Box>
                                )}
                            </Card>
                        </Box>
                    </Box>
                )}
            </Box>

        </Box>
    );
}