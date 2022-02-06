const mysql = require('mysql2');
const dbconfig = require('../public/javascript/database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);

//users table
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` VARCHAR(60) NOT NULL, \
    `username` VARCHAR(45) NOT NULL, \
    `password` VARCHAR(100) NOT NULL, \
    `firstname` VARCHAR(45) NOT NULL, \
    `lastname` VARCHAR(45) NOT NULL, \
    `email` VARCHAR(45) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

//robot table
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.robot_table + '` ( \
    `idRobot` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `robotName` VARCHAR(45) NOT NULL, \
        PRIMARY KEY (`idRobot`), \
    UNIQUE INDEX `id_UNIQUE` (`idRobot` ASC), \
    UNIQUE INDEX `robotName_UNIQUE` (`robotName` ASC) \
)');

// sensorDistancia
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.sensor1_table + '` ( \
    `idSensorDistancia` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `infoSensor` FLOAT NOT NULL, \
    `dateTime` DATETIME NOT NULL, \
    `robot_idRobot` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`idSensorDistancia`), \
    INDEX `fk_SensorDistancia_Robot1_idx` (`robot_idRobot` ASC) VISIBLE, \
    CONSTRAINT `fk_SensorDistancia_Robot1` \
        FOREIGN KEY (`robot_idRobot`) \
        REFERENCES `robot` (`idRobot`) \
        ON DELETE NO ACTION \
        ON UPDATE NO ACTION \
)');

// SensorFumaca
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.sensor2_table + '` ( \
    `idSensorFumaca` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `infoSensor` FLOAT NOT NULL, \
    `dateTime` DATETIME NOT NULL, \
    `robot_idRobot` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`idSensorFumaca`), \
    INDEX `fk_SensorFumaca_Robot1_idx` (`robot_idRobot` ASC) VISIBLE, \
    CONSTRAINT `fk_SensorFumaca_Robot1` \
        FOREIGN KEY (`robot_idRobot`) \
        REFERENCES `robot` (`idRobot`) \
        ON DELETE NO ACTION \
        ON UPDATE NO ACTION \
)');

// SensorGas
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.sensor3_table + '` ( \
    `idSensorGas` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `infoSensor` FLOAT NOT NULL, \
    `dateTime` DATETIME NOT NULL, \
    `robot_idRobot` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`idSensorGas`), \
    INDEX `fk_SensorGas_Robot1_idx` (`robot_idRobot` ASC) VISIBLE, \
    CONSTRAINT `fk_SensorGas_Robot1` \
        FOREIGN KEY (`robot_idRobot`) \
        REFERENCES `robot` (`idRobot`) \
        ON DELETE NO ACTION \
        ON UPDATE NO ACTION \
)');

// SensorTemperatura
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.sensor4_table + '` ( \
    `idSensorTemperatura` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `infoSensor` FLOAT NOT NULL, \
    `dateTime` DATETIME NOT NULL, \
    `robot_idRobot` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`idSensorTemperatura`), \
    INDEX `fk_SensorTemperatura_Robot1_idx` (`robot_idRobot` ASC) VISIBLE, \
    CONSTRAINT `fk_SensorTemperatura_Robot1` \
        FOREIGN KEY (`robot_idRobot`) \
        REFERENCES `robot` (`idRobot`) \
        ON DELETE NO ACTION \
        ON UPDATE NO ACTION \
)');

// SensorLuz
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.sensor5_table + '` ( \
    `idSensorLuz` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `infoSensor` FLOAT NOT NULL, \
    `dateTime` DATETIME NOT NULL, \
    `robot_idRobot` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`idSensorLuz`), \
    INDEX `fk_SensorLuz_Robot_idx` (`robot_idRobot` ASC) VISIBLE, \
    CONSTRAINT `fk_SensorLuz_Robot1` \
        FOREIGN KEY (`robot_idRobot`) \
        REFERENCES `robot` (`idRobot`) \
        ON DELETE NO ACTION \
        ON UPDATE NO ACTION \
)');

console.log('Success: Database Created!')

connection.end();