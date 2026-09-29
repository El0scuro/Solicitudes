-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: solicitud
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `Rut` varchar(55) NOT NULL,
  `Digito_Verificador` varchar(55) NOT NULL,
  `Primer_Nombre` varchar(100) NOT NULL,
  `Segundo_Nombre` varchar(100) DEFAULT NULL,
  `Primer_Apellido` varchar(100) NOT NULL,
  `Segundo_Apellido` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  PRIMARY KEY (`Rut`,`Digito_Verificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `Codigo` varchar(100) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Semestre` varchar(100) NOT NULL,
  PRIMARY KEY (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES ('APU 111','TEORIA DE LA ADMINISTRACION','PRIMERO'),('APU 112','FUNDAMENTOS DE LA CIENCIA POLITICA','PRIMERO'),('APU 113','NOCIONES GENERALES DE DERECHO','PRIMERO'),('APU 114','RAZONAMIENTO LOGICO MATEMATICO','PRIMERO');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cambio_seccion`
--

DROP TABLE IF EXISTS `cambio_seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cambio_seccion` (
  `ID_Solicitud` int NOT NULL,
  `Seccion_Original` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  CONSTRAINT `cambio_seccion_solicitud_FK` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cambio_seccion`
--

LOCK TABLES `cambio_seccion` WRITE;
/*!40000 ALTER TABLE `cambio_seccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `cambio_seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `Rut` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Digito_Verificador` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Primer_Nombre` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Segundo_Nombre` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Primer_Apellido` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Segundo_Apellido` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Celular` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Mail` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Semestre` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Ano_Ingreso` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Sede` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Contrasena` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ficha`
--

DROP TABLE IF EXISTS `ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha` (
  `ID_Ficha` int NOT NULL AUTO_INCREMENT,
  `Fecha_Actual` varchar(100) NOT NULL,
  `Estado` varchar(55) DEFAULT NULL,
  `Mail` varchar(384) NOT NULL,
  PRIMARY KEY (`ID_Ficha`),
  KEY `ficha_estudiante_FK` (`Mail`),
  CONSTRAINT `ficha_estudiante_FK` FOREIGN KEY (`Mail`) REFERENCES `estudiante` (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficha`
--

LOCK TABLES `ficha` WRITE;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion` (
  `ID_Solicitud` int NOT NULL,
  `Ruta_Carta` varchar(255) NOT NULL,
  `Tipo_Inscripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  CONSTRAINT `inscripcion_solicitud_FK` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion`
--

LOCK TABLES `inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jefe_carrera`
--

DROP TABLE IF EXISTS `jefe_carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jefe_carrera` (
  `Rut` varchar(55) NOT NULL,
  `Digito_Verificador` varchar(55) NOT NULL,
  `Primer_Nombre` varchar(100) NOT NULL,
  `Segundo_Nombre` varchar(100) DEFAULT NULL,
  `Primer_Apellido` varchar(100) NOT NULL,
  `Segundo_Apellido` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  `Sede` varchar(100) NOT NULL,
  PRIMARY KEY (`Rut`,`Digito_Verificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jefe_carrera`
--

LOCK TABLES `jefe_carrera` WRITE;
/*!40000 ALTER TABLE `jefe_carrera` DISABLE KEYS */;
/*!40000 ALTER TABLE `jefe_carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `justificacion`
--

DROP TABLE IF EXISTS `justificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `justificacion` (
  `ID_solicitud` int NOT NULL,
  `Fecha_Inasistencia` varchar(100) NOT NULL,
  `Tipo_Justificacion` varchar(100) NOT NULL,
  `Semestre` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_solicitud`),
  CONSTRAINT `justificacion_solicitud_FK` FOREIGN KEY (`ID_solicitud`) REFERENCES `solicitud` (`ID_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justificacion`
--

LOCK TABLES `justificacion` WRITE;
/*!40000 ALTER TABLE `justificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `justificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metadatos_cifrado`
--

DROP TABLE IF EXISTS `metadatos_cifrado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metadatos_cifrado` (
  `Mail` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Version_Llave` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Iv` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Atributo` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ID_Cifrado` int NOT NULL AUTO_INCREMENT,
  `AuthTag` varchar(384) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID_Cifrado`),
  KEY `metadatos_cifrado_estudiante_FK` (`Mail`),
  CONSTRAINT `metadatos_cifrado_estudiante_FK` FOREIGN KEY (`Mail`) REFERENCES `estudiante` (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metadatos_cifrado`
--

LOCK TABLES `metadatos_cifrado` WRITE;
/*!40000 ALTER TABLE `metadatos_cifrado` DISABLE KEYS */;
/*!40000 ALTER TABLE `metadatos_cifrado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `Rut` varchar(55) NOT NULL,
  `Digito_Verificador` varchar(55) NOT NULL,
  `Primer_Nombre` varchar(100) NOT NULL,
  `Segundo_Nombre` varchar(100) DEFAULT NULL,
  `Primer_Apellido` varchar(100) NOT NULL,
  `Segundo_Apellido` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  PRIMARY KEY (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES ('12345678','9','felipe','raul','robles','naveas','correo1@gmail.com'),('87654321','8','raul','felipe','naveas','robles','correo2@gmail.com'),('23456789','1','emilia','maira','gonzalez','gonzalez','correo3@gmail.com'),('98765432','2','maira','emilia','sanchez','sanchez','correo4@gmail.com');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas_justificativos`
--

DROP TABLE IF EXISTS `rutas_justificativos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas_justificativos` (
  `ID_Solicitud` int NOT NULL,
  `Ruta_Justificativo` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`,`Ruta_Justificativo`),
  CONSTRAINT `rutas_justificativos_justificacion_FK` FOREIGN KEY (`ID_Solicitud`) REFERENCES `justificacion` (`ID_solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas_justificativos`
--

LOCK TABLES `rutas_justificativos` WRITE;
/*!40000 ALTER TABLE `rutas_justificativos` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas_justificativos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seccion` (
  `Codigo` varchar(100) NOT NULL,
  `mail_Profesor` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num_Seccion` int NOT NULL,
  PRIMARY KEY (`Codigo`,`num_Seccion`),
  KEY `seccion_profesor_FK` (`mail_Profesor`),
  CONSTRAINT `seccion_asignatura_FK` FOREIGN KEY (`Codigo`) REFERENCES `asignatura` (`Codigo`),
  CONSTRAINT `seccion_profesor_FK` FOREIGN KEY (`mail_Profesor`) REFERENCES `profesor` (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES ('APU 111','correo1@gmail.com',1),('APU 112','correo1@gmail.com',2),('APU 113','correo2@gmail.com',1),('APU 114','correo2@gmail.com',1),('APU 111','correo3@gmail.com',2),('APU 113','correo3@gmail.com',2),('APU 112','correo4@gmail.com',1),('APU 114','correo4@gmail.com',2);
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secretaria`
--

DROP TABLE IF EXISTS `secretaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secretaria` (
  `Rut_Secretaria` varchar(55) NOT NULL,
  `Digito_Verificador_Secretaria` varchar(55) NOT NULL,
  `Rut_Administrador` varchar(55) NOT NULL,
  `Digito_Verificador_Administrador` varchar(55) NOT NULL,
  `Primer_Nombre` varchar(100) NOT NULL,
  `Segundo_Nombre` varchar(100) DEFAULT NULL,
  `Primer_Apellido` varchar(100) NOT NULL,
  `Segundo_Apellido` varchar(100) NOT NULL,
  `Mail` varchar(100) NOT NULL,
  PRIMARY KEY (`Mail`),
  KEY `secretaria_administrador_FK` (`Rut_Administrador`,`Digito_Verificador_Administrador`),
  CONSTRAINT `secretaria_administrador_FK` FOREIGN KEY (`Rut_Administrador`, `Digito_Verificador_Administrador`) REFERENCES `administrador` (`Rut`, `Digito_Verificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secretaria`
--

LOCK TABLES `secretaria` WRITE;
/*!40000 ALTER TABLE `secretaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `secretaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secretaria_seccion`
--

DROP TABLE IF EXISTS `secretaria_seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secretaria_seccion` (
  `Mail` varchar(100) NOT NULL,
  `num_Seccion` int NOT NULL,
  `Codigo` varchar(100) DEFAULT NULL,
  KEY `secretaria_seccion_seccion_FK` (`num_Seccion`),
  KEY `secretaria_seccion_secretaria_FK` (`Rut`),
  KEY `FK_secretaria_seccion_1` (`Codigo`,`num_Seccion`),
  CONSTRAINT `FK_secretaria_seccion_1` FOREIGN KEY (`Codigo`, `num_Seccion`) REFERENCES `seccion` (`Codigo`, `num_Seccion`),
  CONSTRAINT `secretaria_seccion_secretaria_FK` FOREIGN KEY (`Mail`) REFERENCES `secretaria` (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secretaria_seccion`
--

LOCK TABLES `secretaria_seccion` WRITE;
/*!40000 ALTER TABLE `secretaria_seccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `secretaria_seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `ID_Solicitud` int NOT NULL AUTO_INCREMENT,
  `ID_Ficha` int NOT NULL,
  `num_Seccion` int NOT NULL,
  `Codigo` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  KEY `solicitud_ficha_FK` (`ID_Ficha`),
  KEY `solicitud_seccion_FK` (`num_Seccion`),
  KEY `FK_solicitud_seccion_` (`Codigo`,`num_Seccion`),
  CONSTRAINT `FK_solicitud_seccion_` FOREIGN KEY (`Codigo`, `num_Seccion`) REFERENCES `seccion` (`Codigo`, `num_Seccion`),
  CONSTRAINT `solicitud_ficha_FK` FOREIGN KEY (`ID_Ficha`) REFERENCES `ficha` (`ID_Ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'solicitud'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-28 17:29:46
