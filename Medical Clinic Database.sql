CREATE DATABASE  IF NOT EXISTS `mdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mdb
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
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
  CONSTRAINT `FK_Appointment_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`clinic_id`),
  CONSTRAINT `FK_Appointment_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FK_Appointment_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,'2024-04-19','no show',1,2,1,'15:00:00',1,NULL,NULL,'2024-04-20','event_scheduler@localhost'),(2,'2024-04-17','no show',2,3,2,'09:00:00',1,NULL,NULL,NULL,NULL),(3,'2024-04-17','complete',1,4,1,'15:00:00',1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Appointment_CheckForReferral` BEFORE INSERT ON `appointment` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Appointment_ITrigger` BEFORE INSERT ON `appointment` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Appointment_UTrigger` BEFORE UPDATE ON `appointment` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Appointment_ChargePatientForNoShow` AFTER UPDATE ON `appointment` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Appointment_ChargePatientForComplete` AFTER UPDATE ON `appointment` FOR EACH ROW BEGIN
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
-- Table structure for table `charges`
--

DROP TABLE IF EXISTS `charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charges` (
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
  CONSTRAINT `FK_Charges_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`clinic_id`),
  CONSTRAINT `FK_Charges_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charges`
--

LOCK TABLES `charges` WRITE;
/*!40000 ALTER TABLE `charges` DISABLE KEYS */;
INSERT INTO `charges` (`patient_id`, `clinic_id`, `amount`, `date_charged`, `paid`, `invoice_num`) VALUES (2,1,15,'2024-04-19',0,1);
/*!40000 ALTER TABLE `charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinic`
--

DROP TABLE IF EXISTS `clinic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic` (
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
-- Dumping data for table `clinic`
--

LOCK TABLES `clinic` WRITE;
/*!40000 ALTER TABLE `clinic` DISABLE KEYS */;
INSERT INTO `clinic` VALUES (1,'Clinic (Houston-Downtown)',NULL,NULL,NULL,NULL,NULL,NULL),(2,'Clinic (Houston-Pearland)',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `clinic` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Clinic_ITrigger` BEFORE INSERT ON `clinic` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Clinic_UTrigger` BEFORE UPDATE ON `clinic` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
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
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Company_ITrigger` BEFORE INSERT ON `company` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Company_UTrigger` BEFORE UPDATE ON `company` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `contactinformation`
--

DROP TABLE IF EXISTS `contactinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactinformation` (
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
-- Dumping data for table `contactinformation`
--

LOCK TABLES `contactinformation` WRITE;
/*!40000 ALTER TABLE `contactinformation` DISABLE KEYS */;
INSERT INTO `contactinformation` VALUES ('btuason@gmail.com','1234567890','1 street dr',NULL,NULL,NULL,NULL),('dpoiltzer@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('drodrigues@gmail.com','1234567890','1 street dr',NULL,NULL,NULL,NULL),('eelbadawi@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('emarin@gmail.com','1234567890','1 street dr',NULL,NULL,NULL,NULL),('jbailey@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('lmckinney@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('mclavin@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('mzaker@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('nshepley@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('swong@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('szalman@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('uramamurthy@medc.org','1234567890','1 street dr',NULL,NULL,NULL,NULL),('yrodriguez@gmail.com','1234567890','1 street dr',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `contactinformation` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ContactInformation_ITrigger` BEFORE INSERT ON `contactinformation` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ContactInformation_UTrigger` BEFORE UPDATE ON `contactinformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
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
  CONSTRAINT `FK_Employee_email_address` FOREIGN KEY (`email_address`) REFERENCES `contactinformation` (`email_address`),
  CONSTRAINT `FK_Employee_primary_clinic` FOREIGN KEY (`primary_clinic`) REFERENCES `clinic` (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'lmckinney@medc.org',1,'Medical','Doctor',0,'Family Doctor','Lyle',NULL,'McKinney',NULL,NULL,NULL,NULL),(2,'szalman@medc.org',2,'Medical','Doctor',0,'Family Doctor','Sandra',NULL,'Zalman',NULL,NULL,NULL,NULL),(3,'eelbadawi@medc.org',1,'Medical','Doctor',1,'Cardiologist','Emran',NULL,'El-Badawi',NULL,NULL,NULL,NULL),(4,'swong@medc.org',2,'Medical','Doctor',1,'Dermatologist','Sissy',NULL,'Wong',NULL,NULL,NULL,NULL),(5,'uramamurthy@medc.org',1,'Staff','Administrator',0,'Manager','Uma',NULL,'Ramamurthy',NULL,NULL,NULL,NULL),(6,'nshepley@medc.org',2,'Staff','Administrator',0,'Manager','Nathan',NULL,'Shepley',NULL,NULL,NULL,NULL),(7,'mzaker@medc.org',1,'Staff','Receptionist',0,'Receptionist','Mohammad',NULL,'Zaker',NULL,NULL,NULL,NULL),(8,'jbailey@medc.org',2,'Staff','Receptionist',0,'Receptionist','Jeremy',NULL,'Bailey',NULL,NULL,NULL,NULL),(9,'mclavin@medc.org',1,'Medical','Nurse',0,'NP','Matt',NULL,'Clavin',NULL,NULL,NULL,NULL),(10,'dpoiltzer@medc.org',2,'Medical','Nurse',0,'NP','David',NULL,'Poiltzer',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Employee_CheckRolesTrigger` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Employee_ITrigger` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Employee_UTrigger` BEFORE UPDATE ON `employee` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `employee_login`
--

DROP TABLE IF EXISTS `employee_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_login` (
  `email_address` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `employee_id` int NOT NULL,
  KEY `FK_Employee_Login_employee_id` (`employee_id`),
  KEY `FK_Employee_Login_email_address` (`email_address`),
  CONSTRAINT `FK_Employee_Login_email_address` FOREIGN KEY (`email_address`) REFERENCES `contactinformation` (`email_address`),
  CONSTRAINT `FK_Employee_Login_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_login`
--

LOCK TABLES `employee_login` WRITE;
/*!40000 ALTER TABLE `employee_login` DISABLE KEYS */;
INSERT INTO `employee_login` VALUES ('lmckinney@medc.org','password',1),('szalman@medc.org','password',2),('eelbadawi@medc.org','password',3),('swong@medc.org','password',4),('uramamurthy@medc.org','password',5),('nshepley@medc.org','password',6),('mzaker@medc.org','password',7),('jbailey@medc.org','password',8),('mclavin@medc.org','password',9),('dpoiltzer@medc.org','password',10);
/*!40000 ALTER TABLE `employee_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managedby`
--

DROP TABLE IF EXISTS `managedby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managedby` (
  `company_id` int NOT NULL,
  `clinic_id` int NOT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_ManagedBy_company_id_clinic_id` (`company_id`,`clinic_id`),
  KEY `FK_ManagedBy_clinic_id` (`clinic_id`),
  CONSTRAINT `FK_ManagedBy_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinic` (`clinic_id`),
  CONSTRAINT `FK_ManagedBy_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managedby`
--

LOCK TABLES `managedby` WRITE;
/*!40000 ALTER TABLE `managedby` DISABLE KEYS */;
/*!40000 ALTER TABLE `managedby` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ManagedBy_ITrigger` BEFORE INSERT ON `managedby` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ManagedBy_UTrigger` BEFORE UPDATE ON `managedby` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
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
  CONSTRAINT `FK_Medication_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FK_Medication_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Medication_NoDuplicatePrescriptions` BEFORE INSERT ON `medication` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Medication_ITrigger` BEFORE INSERT ON `medication` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Medication_UTrigger` BEFORE UPDATE ON `medication` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
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
  CONSTRAINT `FK_Patient_email_address` FOREIGN KEY (`email_address`) REFERENCES `contactinformation` (`email_address`),
  CONSTRAINT `FK_Patient_primary_doctor_id` FOREIGN KEY (`primary_doctor_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'emarin@gmail.com','Emilio',NULL,'Marin','2003-07-13','M',1,NULL,NULL,NULL,NULL),(2,'btuason@gmail.com','Ben',NULL,'Tuason','2003-07-13','M',1,NULL,NULL,NULL,NULL),(3,'yrodriguez@gmail.com','Yesenia',NULL,'Rodriguez','2003-07-13','F',2,NULL,NULL,NULL,NULL),(4,'drodrigues@gmail.com','Debra',NULL,'Rodrigues','2003-07-13','F',2,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_ITrigger` BEFORE INSERT ON `patient` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_UTrigger` BEFORE UPDATE ON `patient` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patient_emergencycontacts`
--

DROP TABLE IF EXISTS `patient_emergencycontacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_emergencycontacts` (
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
  CONSTRAINT `FK_Patient_EmergencyContacts_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_emergencycontacts`
--

LOCK TABLES `patient_emergencycontacts` WRITE;
/*!40000 ALTER TABLE `patient_emergencycontacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_emergencycontacts` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_EmergencyContacts_ITrigger` BEFORE INSERT ON `patient_emergencycontacts` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_EmergencyContacts_UTrigger` BEFORE UPDATE ON `patient_emergencycontacts` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patient_financialinformation`
--

DROP TABLE IF EXISTS `patient_financialinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_financialinformation` (
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
  CONSTRAINT `FK_Patient_FinancialInformation_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_financialinformation`
--

LOCK TABLES `patient_financialinformation` WRITE;
/*!40000 ALTER TABLE `patient_financialinformation` DISABLE KEYS */;
INSERT INTO `patient_financialinformation` VALUES (1,'Gojo Satoru','123-123-123-1234','123','06/24',NULL,NULL,NULL,NULL),(1,'John Pham','999-999-999-9999','567','08/28',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `patient_financialinformation` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_FinancialInformation_ITrigger` BEFORE INSERT ON `patient_financialinformation` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_FinancialInformation_UTrigger` BEFORE UPDATE ON `patient_financialinformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patient_insuranceinformation`
--

DROP TABLE IF EXISTS `patient_insuranceinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_insuranceinformation` (
  `patient_id` int NOT NULL,
  `policy_number` varchar(50) DEFAULT NULL,
  `group_number` varchar(50) DEFAULT NULL,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_InsuranceInformation_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_InsuranceInformation_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_insuranceinformation`
--

LOCK TABLES `patient_insuranceinformation` WRITE;
/*!40000 ALTER TABLE `patient_insuranceinformation` DISABLE KEYS */;
INSERT INTO `patient_insuranceinformation` VALUES (1,'123456789','123456789',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `patient_insuranceinformation` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_InsuranceInformation_ITrigger` BEFORE INSERT ON `patient_insuranceinformation` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_InsuranceInformation_UTrigger` BEFORE UPDATE ON `patient_insuranceinformation` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patient_login`
--

DROP TABLE IF EXISTS `patient_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_login` (
  `email_address` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `patient_id` int NOT NULL,
  KEY `FK_Patient_Login_email_address` (`email_address`),
  KEY `FK_Patient_Login_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_Login_email_address` FOREIGN KEY (`email_address`) REFERENCES `contactinformation` (`email_address`),
  CONSTRAINT `FK_Patient_Login_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_login`
--

LOCK TABLES `patient_login` WRITE;
/*!40000 ALTER TABLE `patient_login` DISABLE KEYS */;
INSERT INTO `patient_login` VALUES ('emarin@gmail.com','password',1),('btuason@gmail.com','password',2),('yrodriguez@gmail.com','password',3),('drodrigues@gmail.com','password',4);
/*!40000 ALTER TABLE `patient_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_medicalhistory`
--

DROP TABLE IF EXISTS `patient_medicalhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_medicalhistory` (
  `patient_id` int NOT NULL,
  `conditions` text,
  `allergies` text,
  `family_history` text,
  `created` date DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `updated` date DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  UNIQUE KEY `UC_Patient_MedicalHistory_patient_id` (`patient_id`),
  CONSTRAINT `FK_Patient_MedicalHistory_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_medicalhistory`
--

LOCK TABLES `patient_medicalhistory` WRITE;
/*!40000 ALTER TABLE `patient_medicalhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_medicalhistory` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_MedicalHistory_ITrigger` BEFORE INSERT ON `patient_medicalhistory` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_MedicalHistory_UTrigger` BEFORE UPDATE ON `patient_medicalhistory` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `patient_medicalprocedure`
--

DROP TABLE IF EXISTS `patient_medicalprocedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_medicalprocedure` (
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
  CONSTRAINT `FK_Patient_MedicalProcedure_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FK_Patient_MedicalProcedure_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_medicalprocedure`
--

LOCK TABLES `patient_medicalprocedure` WRITE;
/*!40000 ALTER TABLE `patient_medicalprocedure` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_medicalprocedure` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_MedicalProcedure_ITrigger` BEFORE INSERT ON `patient_medicalprocedure` FOR EACH ROW BEGIN
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Patient_MedicalProcedure_UTrigger` BEFORE UPDATE ON `patient_medicalprocedure` FOR EACH ROW BEGIN
    SET NEW.updated = CURDATE();
    SET NEW.updatedby = USER();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
-- Table structure for table `referral`
--

DROP TABLE IF EXISTS `referral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referral` (
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `reason_for_referral` varchar(255) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  KEY `FK_Referral_patient_id` (`patient_id`),
  KEY `FK_Referral_doctor_id` (`doctor_id`),
  CONSTRAINT `FK_Referral_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FK_Referral_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referral`
--

LOCK TABLES `referral` WRITE;
/*!40000 ALTER TABLE `referral` DISABLE KEYS */;
INSERT INTO `referral` VALUES (1,3,'had heart attack 2 weeks ago','2024-05-01'),(2,4,'Ezcema','2024-05-01');
/*!40000 ALTER TABLE `referral` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `CancelNoShowAppointments` ON SCHEDULE EVERY 15 MINUTE STARTS '2024-04-20 14:28:37' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_for_no_show_appointments`(IN open_time TIME, IN close_time TIME)
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
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_appointments` (`appintment_date`,`doctor_fname`,`doctor_lname`,`patient_fname`,`patient_lname`) AS select `a`.`appointment_date` AS `appointment_date`,`d`.`first_name` AS `first_name`,`d`.`last_name` AS `last_name`,`p`.`first_name` AS `first_name`,`p`.`last_name` AS `last_name` from ((`appointment` `a` join `employee` `d`) join `patient` `p`) where ((`a`.`doctor_id` = `d`.`employee_id`) and (`a`.`patient_id` = `p`.`patient_id`)) order by `a`.`appointment_date` */;
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
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `num_patients_at_clinic` (`clinic_id`,`clinic_name`,`number_of_patients`) AS select `c`.`clinic_id` AS `clinic_id`,`c`.`clinic_name` AS `clinic_name`,count(0) AS `COUNT(*)` from ((select `p`.`patient_id` AS `p_id`,`c`.`clinic_id` AS `c_id` from ((`clinic` `c` join `patient` `p`) join `employee` `d`) where ((`p`.`primary_doctor_id` = `d`.`employee_id`) and (`d`.`primary_clinic` = `c`.`clinic_id`))) `patient_list` left join `clinic` `c` on((`c`.`clinic_id` = `patient_list`.`c_id`))) group by `c`.`clinic_id` */;
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
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `primary_clinic_for_employee` (`clinic_id`,`clinc_name`,`employee_fname`,`employee_lname`) AS select `c`.`clinic_id` AS `clinic_id`,`c`.`clinic_name` AS `clinic_name`,`e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name` from (`clinic` `c` join `employee` `e`) where (`c`.`clinic_id` = `e`.`primary_clinic`) */;
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
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `primary_doctor_for_patient` (`doctor_id`,`doctor_fname`,`doctor_lname`,`patient_id`,`patient_fname`,`patient_lname`) AS select `d`.`employee_id` AS `employee_id`,`d`.`first_name` AS `first_name`,`d`.`last_name` AS `last_name`,`p`.`patient_id` AS `patient_id`,`p`.`first_name` AS `first_name`,`p`.`last_name` AS `last_name` from (`employee` `d` join `patient` `p`) where (`d`.`employee_id` = `p`.`primary_doctor_id`) */;
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

-- Dump completed on 2024-04-20 14:45:24
