--
-- Table structure for table `secretaria`
--

DROP TABLE IF EXISTS `secretaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secretaria` (
  `Mail` varchar(100) NOT NULL,
  `Contrasena` varchar(384) NOT NULL,
  `Sede` varchar(100) NOT NULL,
  PRIMARY KEY (`Mail`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secretaria`
--

LOCK TABLES `secretaria` WRITE;
/*!40000 ALTER TABLE `secretaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `secretaria` ENABLE KEYS */;
UNLOCK TABLES;