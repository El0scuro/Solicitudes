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
