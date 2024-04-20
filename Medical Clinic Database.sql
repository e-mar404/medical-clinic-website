CREATE DATABASE  IF NOT EXISTS `mdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: roundhouse.proxy.rlwy.net    Database: mdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Appointment`
--

DROP TABLE IF EXISTS `Appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `appointment_date` date NOT NULL,
  `appointment_status` enum('scheduled','confirm','past','cancelled','no show','complete') NOT NULL,
  `clinic_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_time` time NOT NULL,
  `confirmation` tinyint DEFAULT '0',
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `FK_Appointment_clinic_id` (`clinic_id`),
  KEY `FK_Appointment_patient_id` (`patient_id`),
  KEY `FK_Appointment_doctor_id` (`doctor_id`),
  CONSTRAINT `FK_Appointment_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `Clinic` (`clinic_id`),
  CONSTRAINT `FK_Appointment_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`employee_id`),
  CONSTRAINT `FK_Appointment_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointment`
--

LOCK TABLES `Appointment` WRITE;
/*!40000 ALTER TABLE `Appointment` DISABLE KEYS */;
INSERT INTO `Appointment` VALUES (1,'2024-04-19','cancelled',1,2,1,'15:00:00',1,'2024-04-18','root@192.168.48.4','2024-04-18','root@192.168.0.21'),(2,'2024-04-17','no show',2,3,2,'09:00:00',1,'2024-04-18','root@192.168.48.4',NULL,NULL),(3,'2024-04-17','complete',1,4,1,'15:00:00',1,'2024-04-18','root@192.168.48.4','2024-04-19','root@192.168.0.21'),(4,'2024-04-18','no show',1,5,1,'18:40:00',0,'2024-04-18','root@192.168.0.21','2024-04-18','event_scheduler@localhost'),(5,'2024-04-26','cancelled',1,5,1,'18:40:00',0,'2024-04-18','root@192.168.0.21','2024-04-18','root@192.168.0.21'),(6,'2024-04-19','no show',1,1,11,'11:00:00',0,'2024-04-19','root@192.168.3.195','2024-04-19','event_scheduler@localhost'),(7,'2024-04-28','complete',1,5,12,'15:00:00',0,'2024-04-19','root@192.168.0.21','2024-04-19','root@192.168.0.21'),(8,'2024-04-20','no show',1,1,11,'14:00:00',0,'2024-04-20','root@192.168.3.194','2024-04-20','event_scheduler@localhost'),(9,'2024-04-20','no show',1,1,12,'17:00:00',0,'2024-04-20','root@192.168.3.194','2024-04-20','event_scheduler@localhost'),(10,'2024-04-20','no show',1,3,11,'13:00:00',0,'2024-04-20','root@192.168.3.194','2024-04-20','event_scheduler@localhost');
/*!40000 ALTER TABLE `Appointment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Appointment_CheckForReferral` BEFORE INSERT ON `Appointment` FOR EACH ROW BEGIN
	IF EXISTS (
    SELECT D.Specialist
    FROM Employee as D
    WHERE 
      D.employee_id=New.doctor_id AND 
      D.Specialist
    ) AND 
    NOT EXISTS (
      SELECT * 
		  FROM mdb.Referral AS R, Employee AS D
			WHERE 
        R.expiration_date > NEW.appointment_date AND
		  	R.patient_id=NEW.patient_id AND
        R.doctor_id=NEW.doctor_id AND
        D.employee_id=NEW.doctor_id AND
        D.specialist) THEN
		      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Patient needs referral to see specialist, please contact your primary care doctor';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Appointment_ITrigger` BEFORE INSERT ON `Appointment` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Appointment_UTrigger` BEFORE UPDATE ON `Appointment` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Appointment_ChargePatientForNoShow` AFTER UPDATE ON `Appointment` FOR EACH ROW BEGIN
  IF NEW.appointment_status = 'no show' THEN
    IF NOT EXISTS (
      SELECT C.patient_id
      FROM Charges AS C
      WHERE
      NEW.appointment_status='no show' AND
      C.date_charged=NEW.appointment_date AND
      C.patient_id=NEW.patient_id
      ) THEN
      INSERT INTO Charges(patient_id, clinic_id, amount, date_charged) VALUES(NEW.patient_id, NEW.clinic_id, 15.00, NEW.appointment_date);
    END IF;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Appointment_ChargePatientForComplete` AFTER UPDATE ON `Appointment` FOR EACH ROW BEGIN
  IF NEW.appointment_status = 'complete' THEN
    IF NOT EXISTS (
        SELECT C.patient_id
        FROM Charges AS C
        WHERE
          C.date_charged = NEW.appointment_date AND
          C.patient_id = NEW.patient_id
      ) THEN
        INSERT INTO Charges(patient_id, clinic_id, amount, date_charged)
        VALUES(NEW.patient_id, NEW.clinic_id, 100.00, NEW.appointment_date);
    END IF;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Charges`
--

DROP TABLE IF EXISTS `Charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Charges` (
  `patient_id` int NOT NULL,
  `clinic_id` int DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `date_charged` date DEFAULT NULL,
  `paid` tinyint DEFAULT '0',
  `invoice_num` int NOT NULL AUTO_INCREMENT,
  `charge_type` varchar(10) GENERATED ALWAYS AS ((case when (`amount` = 15) then _utf8mb4'no show' when (`amount` = 100) then _utf8mb4'complete' else NULL end)) STORED,
  PRIMARY KEY (`invoice_num`),
  KEY `FK_Charges_patient_id` (`patient_id`),
  KEY `FK_Charges_clinic_id` (`clinic_id`),
  CONSTRAINT `FK_Charges_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `Clinic` (`clinic_id`),
  CONSTRAINT `FK_Charges_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Charges`
--

LOCK TABLES `Charges` WRITE;
/*!40000 ALTER TABLE `Charges` DISABLE KEYS */;
INSERT INTO `Charges` (`patient_id`, `clinic_id`, `amount`, `date_charged`, `paid`, `invoice_num`) VALUES (5,1,100,'2024-04-26',100,1),(5,1,15,'2024-04-18',0,2),(1,1,15,'2024-04-19',0,3),(4,1,100,'2024-04-17',100,4),(5,1,100,'2024-04-28',0,5),(1,1,15,'2024-04-20',0,6),(3,1,15,'2024-04-20',0,7);
/*!40000 ALTER TABLE `Charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clinic`
--

DROP TABLE IF EXISTS `Clinic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clinic` (
  `clinic_id` int NOT NULL AUTO_INCREMENT,
  `clinic_name` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clinic`
--

LOCK TABLES `Clinic` WRITE;
/*!40000 ALTER TABLE `Clinic` DISABLE KEYS */;
INSERT INTO `Clinic` VALUES (1,'Clinic (Houston-Downtown)',NULL,NULL,'2024-04-18','root@192.168.48.4',NULL,NULL),(2,'Clinic (Houston-Pearland)',NULL,NULL,'2024-04-18','root@192.168.48.4',NULL,NULL);
/*!40000 ALTER TABLE `Clinic` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Clinic_ITrigger` BEFORE INSERT ON `Clinic` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Clinic_UTrigger` BEFORE UPDATE ON `Clinic` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Company` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Company_ITrigger` BEFORE INSERT ON `Company` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Company_UTrigger` BEFORE UPDATE ON `Company` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ContactInformation`
--

DROP TABLE IF EXISTS `ContactInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactInformation` (
  `email_address` varchar(50) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactInformation`
--

LOCK TABLES `ContactInformation` WRITE;
/*!40000 ALTER TABLE `ContactInformation` DISABLE KEYS */;
INSERT INTO `ContactInformation` VALUES ('btuason@gmail.com','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('dpoiltzer@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('drodrigues@gmail.com','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('eelbadawi@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('egilbert@medc.org','1234567890','1 street dr','2024-04-19','root@192.168.3.193',NULL,NULL),('emarin@gmail.com','1234567890','1 street DR','2024-04-18','root@192.168.48.4','2024-04-20','root@192.168.3.194'),('jbailey@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('john@gmail.com','123-233-2333','Street','2024-04-18','root@192.168.0.21',NULL,NULL),('lmckinney@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('mclavin@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('mzaker@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('nshepley@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('swong@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('szalman@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('test@medc.org','1234567890','123 Street','2024-04-18','root@192.168.0.21',NULL,NULL),('uramamurthy@medc.org','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL),('yrodriguez@gmail.com','1234567890','1 street dr','2024-04-18','root@192.168.48.4',NULL,NULL);
/*!40000 ALTER TABLE `ContactInformation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `ContactInformation_ITrigger` BEFORE INSERT ON `ContactInformation` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `ContactInformation_UTrigger` BEFORE UPDATE ON `ContactInformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `email_address` varchar(50) NOT NULL,
  `primary_clinic` int DEFAULT NULL,
  `employee_type` enum('Medical','Staff') DEFAULT NULL,
  `employee_role` enum('Doctor','Nurse','Receptionist','Administrator') DEFAULT NULL,
  `specialist` tinyint(1) DEFAULT '0',
  `title` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `FK_Employee_email_address` (`email_address`),
  KEY `FK_Employee_primary_clinic` (`primary_clinic`),
  CONSTRAINT `FK_Employee_email_address` FOREIGN KEY (`email_address`) REFERENCES `ContactInformation` (`email_address`),
  CONSTRAINT `FK_Employee_primary_clinic` FOREIGN KEY (`primary_clinic`) REFERENCES `Clinic` (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,'lmckinney@medc.org',2,'Medical','Doctor',0,'Family Doctor','Lyle',NULL,'McKinney','2024-04-18','root@192.168.48.4','2024-04-18','root@192.168.0.21'),(2,'szalman@medc.org',2,'Medical','Doctor',0,'Family Doctor','Sandra',NULL,'Zalman','2024-04-18','root@192.168.48.4',NULL,NULL),(3,'eelbadawi@medc.org',1,'Medical','Doctor',1,'Cardiologist','Emran',NULL,'El-Badawi','2024-04-18','root@192.168.48.4',NULL,NULL),(4,'swong@medc.org',2,'Medical','Doctor',1,'Dermatologist','Sissy',NULL,'Wong','2024-04-18','root@192.168.48.4',NULL,NULL),(5,'uramamurthy@medc.org',1,'Staff','Administrator',0,'Manager','Uma',NULL,'Ramamurthy','2024-04-18','root@192.168.48.4',NULL,NULL),(6,'nshepley@medc.org',2,'Staff','Administrator',0,'Manager','Nathan',NULL,'Shepley','2024-04-18','root@192.168.48.4',NULL,NULL),(7,'mzaker@medc.org',1,'Staff','Receptionist',0,'Receptionist','Mohammad',NULL,'Zaker','2024-04-18','root@192.168.48.4',NULL,NULL),(8,'jbailey@medc.org',2,'Staff','Receptionist',0,'Receptionist','Jeremy',NULL,'Bailey','2024-04-18','root@192.168.48.4',NULL,NULL),(9,'mclavin@medc.org',1,'Medical','Nurse',0,'NP','Matt',NULL,'Clavin','2024-04-18','root@192.168.48.4',NULL,NULL),(10,'dpoiltzer@medc.org',2,'Medical','Nurse',0,'NP','David',NULL,'Poiltzer','2024-04-18','root@192.168.48.4',NULL,NULL),(11,'test@medc.org',1,'Medical','Doctor',0,'General Doctor','Taylor ',NULL,'Swift`','2024-04-18','root@192.168.0.21',NULL,NULL),(12,'egilbert@medc.org',1,'Medical','Doctor',0,'Pediatrician','Elena',NULL,'Gilbert','2024-04-19','root@192.168.3.193',NULL,NULL);
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Employee_CheckRolesTrigger` BEFORE INSERT ON `Employee` FOR EACH ROW BEGIN
    IF NEW.employee_type = 'Medical' THEN
        IF NEW.employee_role NOT IN ('Doctor', 'Nurse') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid employee role for Medical type. Employee role must be either Doctor or Nurse.';
        END IF;
    ELSEIF NEW.employee_type = 'Staff' THEN
        IF NEW.employee_role NOT IN ('Receptionist', 'Administrator') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid employee role for Staff type. Employee role must be either Receptionist or Administrator.';
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee type and role must be specified.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Employee_ITrigger` BEFORE INSERT ON `Employee` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Employee_UTrigger` BEFORE UPDATE ON `Employee` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Employee_Login`
--

DROP TABLE IF EXISTS `Employee_Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee_Login` (
  `email_address` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `employee_id` int NOT NULL,
  KEY `FK_Employee_Login_employee_id` (`employee_id`),
  KEY `FK_Employee_Login_email_address` (`email_address`),
  CONSTRAINT `FK_Employee_Login_email_address` FOREIGN KEY (`email_address`) REFERENCES `ContactInformation` (`email_address`),
  CONSTRAINT `FK_Employee_Login_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee_Login`
--

LOCK TABLES `Employee_Login` WRITE;
/*!40000 ALTER TABLE `Employee_Login` DISABLE KEYS */;
INSERT INTO `Employee_Login` VALUES ('lmckinney@medc.org','password',1),('szalman@medc.org','password',2),('eelbadawi@medc.org','password',3),('swong@medc.org','password',4),('uramamurthy@medc.org','password',5),('nshepley@medc.org','password',6),('mzaker@medc.org','password',7),('jbailey@medc.org','password',8),('mclavin@medc.org','password',9),('dpoiltzer@medc.org','password',10),('test@medc.org','password',11),('egilbert@medc.org','password',12);
/*!40000 ALTER TABLE `Employee_Login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ManagedBy`
--

DROP TABLE IF EXISTS `ManagedBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ManagedBy` (
  `company_id` int NOT NULL,
  `clinic_id` int NOT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_ManagedBy_company_id_clinic_id` (`company_id`,`clinic_id`),
  KEY `FK_ManagedBy_clinic_id` (`clinic_id`),
  CONSTRAINT `FK_ManagedBy_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `Clinic` (`clinic_id`),
  CONSTRAINT `FK_ManagedBy_company_id` FOREIGN KEY (`company_id`) REFERENCES `Company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ManagedBy`
--

LOCK TABLES `ManagedBy` WRITE;
/*!40000 ALTER TABLE `ManagedBy` DISABLE KEYS */;
/*!40000 ALTER TABLE `ManagedBy` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `ManagedBy_ITrigger` BEFORE INSERT ON `ManagedBy` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `ManagedBy_UTrigger` BEFORE UPDATE ON `ManagedBy` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Medication`
--

DROP TABLE IF EXISTS `Medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medication` (
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `medication_name` varchar(50) DEFAULT NULL,
  `date_prescribed` date NOT NULL,
  `num_refills` int DEFAULT '1',
  `active` tinyint(1) DEFAULT '1',
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  KEY `FK_Medication_patient_id` (`patient_id`),
  KEY `FK_Medication_doctor_id` (`doctor_id`),
  CONSTRAINT `FK_Medication_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`employee_id`),
  CONSTRAINT `FK_Medication_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medication`
--

LOCK TABLES `Medication` WRITE;
/*!40000 ALTER TABLE `Medication` DISABLE KEYS */;
INSERT INTO `Medication` VALUES (5,1,'vitamin d','2024-04-18',NULL,0,'2024-04-18','root@192.168.0.21','2024-04-18','root@192.168.0.21');
/*!40000 ALTER TABLE `Medication` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Medication_NoDuplicatePrescriptions` BEFORE INSERT ON `Medication` FOR EACH ROW BEGIN
  IF EXISTS (
      SELECT patient_id, medication_name
      FROM Medication
      WHERE patient_id=NEW.patient_id AND medication_name=NEW.medication_name AND active
    ) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Patient already has already been prescribed that medication';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Medication_ITrigger` BEFORE INSERT ON `Medication` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Medication_UTrigger` BEFORE UPDATE ON `Medication` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `Patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `email_address` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `primary_doctor_id` int DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `FK_Patient_email_address` (`email_address`),
  KEY `FK_Patient_primary_doctor_id` (`primary_doctor_id`),
  CONSTRAINT `FK_Patient_email_address` FOREIGN KEY (`email_address`) REFERENCES `ContactInformation` (`email_address`),
  CONSTRAINT `FK_Patient_primary_doctor_id` FOREIGN KEY (`primary_doctor_id`) REFERENCES `Employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` VALUES (1,'emarin@gmail.com','Emilio',NULL,'Marin','2003-07-13','M',11,'2024-04-18','root@192.168.48.4','2024-04-18','root@192.168.0.21'),(2,'btuason@gmail.com','Ben',NULL,'Tuason','2003-07-13','M',11,'2024-04-18','root@192.168.48.4','2024-04-18','root@192.168.0.21'),(3,'yrodriguez@gmail.com','Yesenia',NULL,'Rodriguez','2003-07-13','F',2,'2024-04-18','root@192.168.48.4',NULL,NULL),(4,'drodrigues@gmail.com','Debra',NULL,'Rodrigues','2003-07-13','F',2,'2024-04-18','root@192.168.48.4',NULL,NULL),(5,'john@gmail.com','John',NULL,'Pham','2024-04-08','M',11,'2024-04-18','root@192.168.0.21','2024-04-18','root@192.168.0.21');
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_ITrigger` BEFORE INSERT ON `Patient` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_UTrigger` BEFORE UPDATE ON `Patient` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient_EmergencyContacts`
--

DROP TABLE IF EXISTS `Patient_EmergencyContacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_EmergencyContacts` (
  `patient_id` int NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `contact_relationship` varchar(50) NOT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_EmergencyContacts_contact_number` (`contact_number`),
  KEY `FK_Patient_EmergencyContacts_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_EmergencyContacts_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_EmergencyContacts`
--

LOCK TABLES `Patient_EmergencyContacts` WRITE;
/*!40000 ALTER TABLE `Patient_EmergencyContacts` DISABLE KEYS */;
INSERT INTO `Patient_EmergencyContacts` VALUES (5,'Barack Obama','813','POTUS','2024-04-18','root@192.168.0.21',NULL,NULL);
/*!40000 ALTER TABLE `Patient_EmergencyContacts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_EmergencyContacts_ITrigger` BEFORE INSERT ON `Patient_EmergencyContacts` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_EmergencyContacts_UTrigger` BEFORE UPDATE ON `Patient_EmergencyContacts` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient_FinancialInformation`
--

DROP TABLE IF EXISTS `Patient_FinancialInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_FinancialInformation` (
  `patient_id` int NOT NULL,
  `name_on_card` varchar(50) NOT NULL,
  `card_number` varchar(50) NOT NULL,
  `cvv` varchar(50) NOT NULL,
  `expiration_date` varchar(5) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_FinancialInformation_card_number` (`card_number`),
  KEY `FK_Patient_FinancialInformation_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_FinancialInformation_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_FinancialInformation`
--

LOCK TABLES `Patient_FinancialInformation` WRITE;
/*!40000 ALTER TABLE `Patient_FinancialInformation` DISABLE KEYS */;
INSERT INTO `Patient_FinancialInformation` VALUES (1,'Gojo Satoru','123-123-123-1234','123','06/24','2024-04-18','root@192.168.48.4',NULL,NULL),(5,'John Pham','1412515','122','12/23','2024-04-18','root@192.168.0.21',NULL,NULL),(1,'John Pham','999-999-999-9999','567','08/28','2024-04-18','root@192.168.48.4',NULL,NULL);
/*!40000 ALTER TABLE `Patient_FinancialInformation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_FinancialInformation_ITrigger` BEFORE INSERT ON `Patient_FinancialInformation` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_FinancialInformation_UTrigger` BEFORE UPDATE ON `Patient_FinancialInformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient_InsuranceInformation`
--

DROP TABLE IF EXISTS `Patient_InsuranceInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_InsuranceInformation` (
  `patient_id` int NOT NULL,
  `policy_number` varchar(50) DEFAULT NULL,
  `group_number` varchar(50) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_InsuranceInformation_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_InsuranceInformation_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_InsuranceInformation`
--

LOCK TABLES `Patient_InsuranceInformation` WRITE;
/*!40000 ALTER TABLE `Patient_InsuranceInformation` DISABLE KEYS */;
INSERT INTO `Patient_InsuranceInformation` VALUES (1,'123456789','123456789','2024-04-18','root@192.168.48.4',NULL,NULL),(5,'135315','5312531','2024-04-18','root@192.168.0.21',NULL,NULL);
/*!40000 ALTER TABLE `Patient_InsuranceInformation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_InsuranceInformation_ITrigger` BEFORE INSERT ON `Patient_InsuranceInformation` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_InsuranceInformation_UTrigger` BEFORE UPDATE ON `Patient_InsuranceInformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient_Login`
--

DROP TABLE IF EXISTS `Patient_Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_Login` (
  `email_address` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `patient_id` int NOT NULL,
  KEY `FK_Patient_Login_email_address` (`email_address`),
  KEY `FK_Patient_Login_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_Login_email_address` FOREIGN KEY (`email_address`) REFERENCES `ContactInformation` (`email_address`),
  CONSTRAINT `FK_Patient_Login_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_Login`
--

LOCK TABLES `Patient_Login` WRITE;
/*!40000 ALTER TABLE `Patient_Login` DISABLE KEYS */;
INSERT INTO `Patient_Login` VALUES ('emarin@gmail.com','password',1),('btuason@gmail.com','password',2),('yrodriguez@gmail.com','password',3),('drodrigues@gmail.com','password',4),('john@gmail.com','password',5);
/*!40000 ALTER TABLE `Patient_Login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient_MedicalHistory`
--

DROP TABLE IF EXISTS `Patient_MedicalHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_MedicalHistory` (
  `patient_id` int NOT NULL,
  `conditions` text,
  `allergies` text,
  `family_history` text,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_MedicalHistory_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_MedicalHistory_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_MedicalHistory`
--

LOCK TABLES `Patient_MedicalHistory` WRITE;
/*!40000 ALTER TABLE `Patient_MedicalHistory` DISABLE KEYS */;
INSERT INTO `Patient_MedicalHistory` VALUES (5,'asthma','cat dander','no family history listed','2024-04-18','root@192.168.0.21','2024-04-18','root@192.168.0.21');
/*!40000 ALTER TABLE `Patient_MedicalHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_MedicalHistory_ITrigger` BEFORE INSERT ON `Patient_MedicalHistory` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_MedicalHistory_UTrigger` BEFORE UPDATE ON `Patient_MedicalHistory` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Patient_MedicalProcedure`
--

DROP TABLE IF EXISTS `Patient_MedicalProcedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patient_MedicalProcedure` (
  `procedure_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `procedure_date` date NOT NULL,
  `procedure_description` text NOT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`procedure_id`),
  KEY `FK_Patient_MedicalProcedure_patient_id` (`patient_id`),
  KEY `FK_Patient_MedicalProcedure_doctor_id` (`doctor_id`),
  CONSTRAINT `FK_Patient_MedicalProcedure_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`employee_id`),
  CONSTRAINT `FK_Patient_MedicalProcedure_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient_MedicalProcedure`
--

LOCK TABLES `Patient_MedicalProcedure` WRITE;
/*!40000 ALTER TABLE `Patient_MedicalProcedure` DISABLE KEYS */;
/*!40000 ALTER TABLE `Patient_MedicalProcedure` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_MedicalProcedure_ITrigger` BEFORE INSERT ON `Patient_MedicalProcedure` FOR EACH ROW BEGIN
    SET NEW.created = CURDATE();
    SET NEW.createdby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Patient_MedicalProcedure_UTrigger` BEFORE UPDATE ON `Patient_MedicalProcedure` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Referral`
--

DROP TABLE IF EXISTS `Referral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Referral` (
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `reason_for_referral` varchar(255) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  KEY `FK_Referral_patient_id` (`patient_id`),
  KEY `FK_Referral_doctor_id` (`doctor_id`),
  CONSTRAINT `FK_Referral_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `Employee` (`employee_id`),
  CONSTRAINT `FK_Referral_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Referral`
--

LOCK TABLES `Referral` WRITE;
/*!40000 ALTER TABLE `Referral` DISABLE KEYS */;
INSERT INTO `Referral` VALUES (1,3,'had heart attack 2 weeks ago','2024-05-01'),(2,4,'Ezcema','2024-05-01'),(5,4,'new mole','2024-04-30');
/*!40000 ALTER TABLE `Referral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `all_appointments`
--

DROP TABLE IF EXISTS `all_appointments`;
/*!50001 DROP VIEW IF EXISTS `all_appointments`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `all_appointments` AS SELECT 
 1 AS `appintment_date`,
 1 AS `doctor_fname`,
 1 AS `doctor_lname`,
 1 AS `patient_fname`,
 1 AS `patient_lname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `num_patients_at_clinic`
--

DROP TABLE IF EXISTS `num_patients_at_clinic`;
/*!50001 DROP VIEW IF EXISTS `num_patients_at_clinic`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `num_patients_at_clinic` AS SELECT 
 1 AS `clinic_id`,
 1 AS `clinic_name`,
 1 AS `number_of_patients`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `primary_clinic_for_employee`
--

DROP TABLE IF EXISTS `primary_clinic_for_employee`;
/*!50001 DROP VIEW IF EXISTS `primary_clinic_for_employee`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `primary_clinic_for_employee` AS SELECT 
 1 AS `clinic_id`,
 1 AS `clinc_name`,
 1 AS `employee_fname`,
 1 AS `employee_lname`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `primary_doctor_for_patient`
--

DROP TABLE IF EXISTS `primary_doctor_for_patient`;
/*!50001 DROP VIEW IF EXISTS `primary_doctor_for_patient`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `primary_doctor_for_patient` AS SELECT 
 1 AS `doctor_id`,
 1 AS `doctor_fname`,
 1 AS `doctor_lname`,
 1 AS `patient_id`,
 1 AS `patient_fname`,
 1 AS `patient_lname`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'mdb'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `CancelNoShowAppointments` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = '-05:00' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `CancelNoShowAppointments` ON SCHEDULE EVERY 15 MINUTE STARTS '2024-04-20 13:32:22' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  CALL check_for_no_show_appointments('9:00', '17:30');
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'mdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `check_for_no_show_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `check_for_no_show_appointments`(IN open_time TIME, IN close_time TIME)
BEGIN
  SET SQL_SAFE_UPDATES = 0;
  IF (CURRENT_TIME() BETWEEN open_time AND close_time) THEN
  
  UPDATE Appointment
  SET appointment_status='no show'
  WHERE 
    appointment_status='scheduled' AND (
    appointment_date <= CURDATE() AND 
    CURTIME() > SUBTIME(appointment_time, '-00:15') OR
    appointment_date < CURDATE());
  
  END IF;
  SET SQL_SAFE_UPDATES = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `all_appointments`
--

/*!50001 DROP VIEW IF EXISTS `all_appointments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `all_appointments` (`appintment_date`,`doctor_fname`,`doctor_lname`,`patient_fname`,`patient_lname`) AS select `A`.`appointment_date` AS `appointment_date`,`D`.`first_name` AS `first_name`,`D`.`last_name` AS `last_name`,`P`.`first_name` AS `first_name`,`P`.`last_name` AS `last_name` from ((`Appointment` `A` join `Employee` `D`) join `Patient` `P`) where ((`A`.`doctor_id` = `D`.`employee_id`) and (`A`.`patient_id` = `P`.`patient_id`)) order by `A`.`appointment_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `num_patients_at_clinic`
--

/*!50001 DROP VIEW IF EXISTS `num_patients_at_clinic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `num_patients_at_clinic` (`clinic_id`,`clinic_name`,`number_of_patients`) AS select `C`.`clinic_id` AS `clinic_id`,`C`.`clinic_name` AS `clinic_name`,count(0) AS `COUNT(*)` from ((select `P`.`patient_id` AS `p_id`,`C`.`clinic_id` AS `c_id` from ((`Clinic` `C` join `Patient` `P`) join `Employee` `D`) where ((`P`.`primary_doctor_id` = `D`.`employee_id`) and (`D`.`primary_clinic` = `C`.`clinic_id`))) `patient_list` left join `Clinic` `C` on((`C`.`clinic_id` = `patient_list`.`c_id`))) group by `C`.`clinic_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `primary_clinic_for_employee`
--

/*!50001 DROP VIEW IF EXISTS `primary_clinic_for_employee`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `primary_clinic_for_employee` (`clinic_id`,`clinc_name`,`employee_fname`,`employee_lname`) AS select `C`.`clinic_id` AS `clinic_id`,`C`.`clinic_name` AS `clinic_name`,`E`.`first_name` AS `first_name`,`E`.`last_name` AS `last_name` from (`Clinic` `C` join `Employee` `E`) where (`C`.`clinic_id` = `E`.`primary_clinic`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `primary_doctor_for_patient`
--

/*!50001 DROP VIEW IF EXISTS `primary_doctor_for_patient`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `primary_doctor_for_patient` (`doctor_id`,`doctor_fname`,`doctor_lname`,`patient_id`,`patient_fname`,`patient_lname`) AS select `D`.`employee_id` AS `employee_id`,`D`.`first_name` AS `first_name`,`D`.`last_name` AS `last_name`,`P`.`patient_id` AS `patient_id`,`P`.`first_name` AS `first_name`,`P`.`last_name` AS `last_name` from (`Employee` `D` join `Patient` `P`) where (`D`.`employee_id` = `P`.`primary_doctor_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 18:22:47
